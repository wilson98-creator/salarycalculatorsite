#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * scripts/generate-news.mjs
 *
 * Auto-generates "Money Briefs" — weekly plain-English summaries of the
 * top Australian financial news from trusted sources.
 *
 * Runs in GitHub Actions on a cron schedule. Picks the freshest 1-2 items
 * per source, de-duplicates against the existing content/news/ folder, and
 * writes JSON files using structured templates (no paid LLM API needed).
 *
 * The site is statically generated, so the new JSON files get picked up at
 * the next `next build` triggered by the auto-deploy on push.
 */

import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = join(__dirname, '..', 'content', 'news');
const STATE_DIR = join(__dirname, '..', '.github', 'state');

const MAX_PER_RUN = 2; // 2 briefs per scheduled run

/** Source feed definitions. All URLs verified working as of Aug 2026.
 *  `filter` is an optional regex — items whose title does not match
 *  the filter are dropped. RBA does not need a filter (all items are
 *  monetary-policy / official releases). For SMH/Age/Guardian we use
 *  a finance keyword filter so we don't accidentally pick up a story
 *  about a celebrity or a sports result that happens to be in the
 *  "Business" feed. */
const FEEDS = [
  {
    id: 'rba',
    name: 'Reserve Bank of Australia',
    url: 'https://www.rba.gov.au/rss/rss-cb-media-releases.xml',
    category: 'interest-rates',
    kicker: 'RBA · Media release',
    sourceUrl: 'https://www.rba.gov.au/media-releases/',
  },
  {
    id: 'smh-business',
    name: 'Sydney Morning Herald',
    url: 'https://www.smh.com.au/rss/business.xml',
    category: 'general',
    kicker: 'SMH · Business',
    sourceUrl: 'https://www.smh.com.au/business',
    filter: /(rate|inflation|wage|tax|super|ato|asx|market|bank|economy|gdp|cpi|jobs|unemployment|housing|mortgage|property|dollar|treasury|rba|cost of living|interest|pay|salary|finance|invest|share|fund|earning|spent|spend|price|prices|cost|consumer|retail|mining|energy|gas|electric|company|companies|corporate|profit|revenue|merger|acquisition|division|trading|trader|wall street|wall st|bond|yield)/i,
  },
  {
    id: 'age-business',
    name: 'The Age',
    url: 'https://www.theage.com.au/rss/business.xml',
    category: 'general',
    kicker: 'The Age · Business',
    sourceUrl: 'https://www.theage.com.au/business',
    filter: /(rate|inflation|wage|tax|super|ato|asx|market|bank|economy|gdp|cpi|jobs|unemployment|housing|mortgage|property|dollar|treasury|rba|cost of living|interest|pay|salary|finance|invest|share|fund|earning|spent|spend|price|prices|cost|consumer|retail|mining|energy|gas|electric|company|companies|corporate|profit|revenue|merger|acquisition|division|trading|trader|wall street|wall st|bond|yield)/i,
  },
  {
    id: 'guardian-au',
    name: 'The Guardian Australia',
    url: 'https://www.theguardian.com/au/business/rss',
    category: 'general',
    kicker: 'The Guardian · Business',
    sourceUrl: 'https://www.theguardian.com/au/business',
    filter: /(rate|inflation|wage|tax|super|ato|asx|market|bank|economy|gdp|cpi|jobs|unemployment|housing|mortgage|property|dollar|treasury|rba|cost of living|interest|pay|salary|finance|invest|share|fund|earning|spent|spend|price|prices|cost|consumer|retail|mining|energy|gas|electric|company|companies|corporate|profit|revenue|merger|acquisition|division|trading|trader|wall street|wall st|bond|yield|australia|australian|nsw|vic|qld|wa|sa|tas|act|nt|fair work|ato|treasury|ombs)/i,
  },
];

/** Drop a few RSS feed patterns that produce unusable briefs. Live blogs
 *  bundle multiple stories into one feed item and always have a
 *  "Get our email newsletter" / "Follow today's news live" sign-up CTA
 *  baked into the description. Editorial pieces with no financial
 *  hook are also dropped. */
const TITLE_BLOCKLIST = [
  /news live:/i,
  /live blog/i,
  /newsletter/i,
  /opinion:/i,
  /editorial:/i,
  /letters:/i,
];

/** Read every existing post id+sourceUrl so we can de-dupe. */
function getExistingSlugs() {
  if (!existsSync(CONTENT_DIR)) return new Set();
  return new Set(
    readdirSync(CONTENT_DIR)
      .filter((f) => f.endsWith('.json'))
      .map((f) => f.replace(/\.json$/, ''))
  );
}

function getAlreadyPostedUrls() {
  if (!existsSync(CONTENT_DIR)) return new Set();
  const urls = new Set();
  for (const f of readdirSync(CONTENT_DIR).filter((x) => x.endsWith('.json'))) {
    try {
      const p = JSON.parse(readFileSync(join(CONTENT_DIR, f), 'utf-8'));
      if (p.sourceUrl) urls.add(p.sourceUrl);
    } catch { /* ignore */ }
  }
  return urls;
}

/** Fetch an RSS feed and parse the first N items. */
async function fetchFeed(feed) {
  try {
    const res = await fetch(feed.url, {
      headers: { 'user-agent': 'SalaryCalc/1.0 (+https://thesalarycalc.com.au/)' },
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) {
      console.warn(`[news] ${feed.id} HTTP ${res.status}`);
      return [];
    }
    const xml = await res.text();
    return parseRss(xml, feed);
  } catch (err) {
    console.warn(`[news] ${feed.id} fetch failed: ${err.message}`);
    return [];
  }
}

function parseRss(xml, feed) {
  // Minimal RSS parser using regex (avoids extra deps). Good enough for
  // headline + description + link + pubDate.
  const items = [];
  const itemRegex = /<item[\s>]([\s\S]*?)<\/item>/gi;
  let match;
  while ((match = itemRegex.exec(xml)) !== null && items.length < 10) {
    const body = match[1];
    const title = pickTag(body, 'title');
    const link = pickTag(body, 'link') || pickTag(body, 'guid');
    const description = pickTag(body, 'description');
    const pubDate = pickTag(body, 'pubDate') || pickTag(body, 'dc:date');
    if (!title || !link) continue;
    const cleanTitle = stripHtml(title).trim();
    const cleanDescription = stripHtml(description || '').trim();
    // Drop live blogs, newsletters, opinion pieces, etc. — see TITLE_BLOCKLIST.
    if (TITLE_BLOCKLIST.some((re) => re.test(cleanTitle))) {
      console.log(`[news] drop (blocklist): ${cleanTitle.slice(0, 70)}…`);
      continue;
    }
    items.push({
      title: cleanTitle,
      link: stripHtml(link).trim(),
      description: cleanDescription,
      pubDate: pubDate ? new Date(pubDate) : new Date(),
      feed,
    });
  }
  return items;
}

function pickTag(body, tag) {
  // Handle <title>foo</title> and <title><![CDATA[foo]]></title> and <atom:title>
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i');
  const m = body.match(re);
  if (!m) return null;
  return m[1]
    .replace(/^<!\[CDATA\[/i, '')
    .replace(/\]\]>$/, '')
    .trim();
}

function stripHtml(s) {
  // Decode entities FIRST, otherwise literal HTML produced by the decoder
  // (e.g. &lt;p&gt; → <p>) survives the tag-strip regex pass.
  // Then strip tags, then decode any remaining entities.
  return s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8216;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#\d+;/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#\d+;/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Build the structured layman-explanation body using a topic-based template. */
function buildExplanation(item) {
  const t = item.title.toLowerCase();
  const src = item.feed.id;

  // RBA rate decision
  if (src === 'rba' && /cash rate|interest rate|rate decision|board|monetary/.test(t)) {
    return {
      body: [
        `The Reserve Bank of Australia (RBA) made a monetary policy decision this week. Headline: ${item.title}.`,
        `In the accompanying statement, the Board explained the factors behind the decision and the data it is watching. The RBA's mandate is price stability — keeping CPI inflation between 2 and 3 per cent on a sustainable basis — while supporting full employment.`,
        `Markets read the decision and the statement carefully. The shape of the published statement, the language around inflation and the labour market, and the Governor's press conference all shape expectations of the next move.`,
      ].join('\n\n'),
      whatItMeans: [
        'Variable-rate mortgage: Your monthly repayment does not change this month unless your lender re-prices the rate independently. Most lenders pass RBA moves through within 1–3 months.',
        'Fixed-rate refinance: If your fixed rate is ending in the next 3–6 months, lenders are quietly trimming or lifting their 2- and 3-year fixed offers. Worth shopping around now.',
        'Savers: Term deposit and bonus-saver rates follow the cash rate with a lag. Big four banks are offering 4.5–5.0% on 12-month TDs today.',
        'First-home buyers: Serviceability buffers are still tight. Lenders test at the customer rate + 3%, so today\'s rates are still restricting borrowing capacity.',
      ],
      relatedSlugs: ['mortgage-calculator', 'loan-payoff-calculator', 'hecs-calculator'],
      category: 'interest-rates',
    };
  }

  // ABS wage / CPI / labour
  if (src === 'abs-news' || /wage price|wpi|cpi|inflation|labour force|unemployment/.test(t)) {
    return {
      body: [
        `The Australian Bureau of Statistics released a key economic data print this week. Headline: ${item.title}.`,
        `ABS data points set the context for the Reserve Bank's next decision, the Treasurer's fiscal projections, and the Fair Work Commission's minimum-wage ruling. They are the official numbers everything else is built on.`,
        `For a household, the most important ABS releases are the Wage Price Index (pay rises), CPI (cost-of-living), and the monthly labour force survey (jobs + unemployment).`,
      ].join('\n\n'),
      whatItMeans: [
        'Most workers: Your next pay rise is likely in the 3.5–4.0% range if you ask. Anything under 3% in 2026 is effectively a pay cut after inflation.',
        'Hiring managers: Budget 4% wage growth into 2026 forecasts. Anything below is a real-terms pay cut for staff.',
        'RBA-watchers: Wage growth above 3.5% keeps services inflation sticky and reduces the case for an early cut.',
      ],
      relatedSlugs: ['hecs-calculator', 'casual-pay-calculator', 'guides/stage-3-tax-cuts'],
      category: 'wages',
    };
  }

  // Tax / ATO
  if (/ato|tax|deduction|cgt|carry.?back|stage ?3|offsets|tax cut/.test(t)) {
    return {
      body: [
        `Tax-related news from ${item.feed.name}. Headline: ${item.title}.`,
        `Tax rules, thresholds, and offsets change every year. Most of the time the ATO, Treasury, or the relevant Minister makes the change with a long lead-in.`,
        `The practical impact for most people is in three places: the marginal rate that applies to the next dollar earned, the tax offsets available at low and middle incomes, and the rules around deductions and CGT events.`,
      ].join('\n\n'),
      whatItMeans: [
        'Run your numbers: If the change is to a tax bracket or offset, the take-home pay calculator will pick it up automatically. Pick the matching financial year.',
        'Check deductions: If the change is to deduction rules (work-related expenses, home office, etc.) make sure your last return used the right rates.',
        'If in doubt, talk to a registered tax agent. The ATO\'s Tax Agent Register is searchable by name and location.',
      ],
      relatedSlugs: ['guides/australian-income-tax', 'salary-sacrifice-calculator', 'guides/stage-3-tax-cuts'],
      category: 'tax',
    };
  }

  // Super
  if (/super|sgc|superannuation|concessional|non.concessional/.test(t)) {
    return {
      body: [
        `Super-related news from ${item.feed.name}. Headline: ${item.title}.`,
        `Superannuation rules in Australia are set by a combination of legislation (the Superannuation Industry (Supervision) Act), regulations, and ATO determinations. They change often.`,
        `The most important levers for an individual are the concessional (before-tax) cap, the non-concessional (after-tax) cap, the Division 293 threshold for high-income earners, and the bring-forward rule for lump sums.`,
      ].join('\n\n'),
      whatItMeans: [
        'Concessional cap: For FY 2026–27 it is $30,000. If your employer is paying 12% of an above-average salary, you might already be near the cap.',
        'Division 293: If you earn more than $250,000, an extra 15% tax applies to your concessional super contributions. Plan around it.',
        'Salary sacrifice: For most people in the 30% bracket, salary-sacrificing to super saves about 15% tax (30% marginal minus 15% super tax). Use the calculator.',
      ],
      relatedSlugs: ['salary-sacrifice-calculator', 'guides/superannuation'],
      category: 'super',
    };
  }

  // Property
  if (/property|house price|home value|mortgage rate|housing/.test(t)) {
    return {
      body: [
        `Property-related news from ${item.feed.name}. Headline: ${item.title}.`,
        `Australian residential property is influenced by interest rates, population growth, dwelling approvals, and state-based stamp-duty settings. The CoreLogic Home Value Index is the most-cited monthly data point.`,
        `The general rule of thumb: when rates go up, prices soften 6–12 months later. When rates come down, prices firm with a similar lag.`,
      ].join('\n\n'),
      whatItMeans: [
        'Owner-occupiers: If you are buying in Sydney or Melbourne, the market is currently flat-to-soft. There is no rush. Negotiate aggressively.',
        'Upgraders: The days of 10% annual capital gains look to be over. Run the numbers on a 5- to 7-year hold, not a 2- to 3-year flip.',
        'Investors: Work the gross yield, not the headline price. Negative gearing still works in the right suburbs — but the maths is tighter than 2021.',
      ],
      relatedSlugs: ['mortgage-calculator', 'loan-payoff-calculator'],
      category: 'property',
    };
  }

  // Generic — fall back to a simple structured explanation.
  return {
    body: [
      `${item.feed.name} published this story this week. Headline: ${item.title}.`,
      `We pulled the headline and summary so you can decide whether it's worth reading in full. The original article is linked at the top of this brief.`,
      `The "what this means for you" section below is a generic, hand-written reminder to think about how any piece of Australian financial news lands on your own pay, mortgage, super, and tax position.`,
    ].join('\n\n'),
    whatItMeans: [
      'Check the source: This is a third-party summary. Always cross-check the original article (linked at the top) before acting on it.',
      'Run your numbers: If the story affects your pay, mortgage, super, or tax, run the relevant calculator with the new assumptions.',
      'If in doubt, talk to a registered professional. Tax agents, financial advisers, and mortgage brokers are searchable via the ATO, ASIC, and AFCA registers.',
    ],
    relatedSlugs: ['guides/australian-income-tax'],
    category: 'general',
  };
}

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

/* ──────────────────────────────────────────────────────────
   GROQ LLM INTEGRATION
   If GROQ_API_KEY is set, call Llama 3.1 70B to generate a real, unique
   explanation for each article. Falls back to the template-based
   `buildExplanation` if no key is set, or if the API call fails.

   Free tier: https://console.groq.com (sign up with Google, grab an API key)
   Add GROQ_API_KEY as a GitHub Actions secret to enable.
   ────────────────────────────────────────────────────────── */
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.3-70b-versatile';

async function buildExplanationWithLlm(item) {
  if (!process.env.GROQ_API_KEY) return null;

  const systemPrompt = `You are an Australian finance writer for SalaryCalc (thesalarycalc.com.au). You write plain-English "Money Briefs" that summarise the week's biggest Australian financial news for everyday workers, borrowers, savers, and taxpayers.

Style rules:
- Australian English spelling (organisation, recognise, colour).
- Plain language. No "according to reports", no "stakeholders", no "headwinds".
- Always start the first paragraph with a concrete fact, not a hedge.
- No em dashes, use commas or full stops instead.
- Keep total body to 100-150 words across 2-3 short paragraphs.
- "What this means" bullets must start with the affected group in 2-4 words, then a colon, then the practical impact in one sentence. Examples: "Variable-rate mortgage:", "Savers:", "Workers on awards:", "First-home buyers:".
- Pick 1-3 related calculator/guide slugs from the list. Only pick ones that genuinely help the reader.
- Do NOT make up specific numbers you don't know. Use approximate language if needed.
- Output ONLY the JSON object, no commentary, no markdown fences.`;

  const userPrompt = `Article to summarise:

Title: ${item.title}
Source: ${item.feed.name}
Source URL: ${item.link}
RSS description: ${item.description}

Related URL slugs you can pick from:
- / (main pay calculator)
- /salary-sacrifice-calculator
- /hecs-calculator
- /casual-pay-calculator
- /mortgage-calculator
- /loan-payoff-calculator
- /guides/australian-income-tax
- /guides/hecs-repayment
- /guides/medicare-levy-surcharge
- /guides/salary-sacrifice
- /guides/superannuation
- /guides/stage-3-tax-cuts

Return a JSON object with exactly these fields:
{
  "body": "<2-3 paragraphs, 100-150 words total, plain Australian English>",
  "whatItMeans": ["<bullet 1>", "<bullet 2>", "<bullet 3>", "<bullet 4 (optional)>"],
  "category": "<one of: interest-rates | tax | super | wages | inflation | property | markets | general>",
  "relatedSlugs": ["<slug 1>", "<slug 2>"]
}`;

  try {
    const res = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.6,
        max_tokens: 800,
        response_format: { type: 'json_object' },
      }),
      signal: AbortSignal.timeout(30_000),
    });

    if (!res.ok) {
      console.warn(`[news] Groq HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
      return null;
    }

    const json = await res.json();
    const text = json?.choices?.[0]?.message?.content;
    if (!text) {
      console.warn('[news] Groq returned empty content');
      return null;
    }

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (err) {
      console.warn(`[news] Groq returned non-JSON: ${text.slice(0, 200)}`);
      return null;
    }

    if (!parsed.body || !Array.isArray(parsed.whatItMeans)) {
      console.warn('[news] Groq returned invalid shape');
      return null;
    }

    return {
      body: String(parsed.body),
      whatItMeans: parsed.whatItMeans.map((s) => String(s)).filter(Boolean),
      category: typeof parsed.category === 'string' ? parsed.category : 'general',
      relatedSlugs: Array.isArray(parsed.relatedSlugs)
        ? parsed.relatedSlugs.map((s) => String(s).replace(/^\/|\/$/g, '')).filter(Boolean)
        : [],
    };
  } catch (err) {
    console.warn(`[news] Groq call failed: ${err.message}`);
    return null;
  }
}

function writePost(item) {
  const date = item.pubDate.toISOString().slice(0, 10);
  const slug = slugify(item.title);
  const id = `${date}-${slug}`;

  // Synchronous write — explanation was generated before this in main().
  const filename = `${id}.json`;
  const filepath = join(CONTENT_DIR, filename);
  if (existsSync(filepath)) {
    console.log(`[news] skip (already exists): ${filename}`);
    return false;
  }

  const exp = item._explanation;
  // Build the excerpt. description is already stripHtml'd in parseRss, but
  // apply again as a safety net. Trim to 2 sentences max so cards stay tidy.
  let excerpt = stripHtml(item.description || '').trim();
  if (excerpt.length > 220) excerpt = excerpt.slice(0, 217).trim() + '…';
  // Defensive: if any HTML tag survived, drop the whole excerpt and fall
  // back to a generic intro so the published JSON never contains raw markup.
  if (/<[a-z][^>]*>/i.test(excerpt)) {
    excerpt = `Summary of ${item.title}, published by ${item.feed.name}.`;
  }

  const post = {
    id,
    date,
    title: item.title.replace(/\.$/, ''),
    excerpt,
    source: item.feed.name,
    sourceUrl: item.link,
    category: exp.category,
    kicker: item.feed.kicker,
    body: exp.body,
    whatItMeans: exp.whatItMeans,
    relatedSlugs: exp.relatedSlugs,
    autoGenerated: true,
    llmGenerated: !!item._llmGenerated,
  };

  writeFileSync(filepath, JSON.stringify(post, null, 2) + '\n', 'utf-8');
  const tag = item._llmGenerated ? ' (LLM)' : ' (template)';
  console.log(`[news] wrote${tag}: ${filename}`);
  return true;
}

async function main() {
  if (!existsSync(CONTENT_DIR)) {
    console.error(`[news] content dir missing: ${CONTENT_DIR}`);
    process.exit(1);
  }

  const existing = getExistingSlugs();
  const posted = getAlreadyPostedUrls();

  console.log(`[news] existing posts: ${existing.size}, already-posted URLs: ${posted.size}`);

  const allItems = [];
  for (const feed of FEEDS) {
    console.log(`[news] fetching ${feed.id}…`);
    const items = await fetchFeed(feed);
    const filtered = feed.filter ? items.filter((it) => feed.filter.test(it.title)) : items;
    console.log(`[news]   ${items.length} item(s) → ${filtered.length} after filter`);
    for (const it of filtered) {
      if (!posted.has(it.link)) allItems.push(it);
    }
  }

  // Sort newest first across all sources, then take MAX_PER_RUN
  allItems.sort((a, b) => b.pubDate - a.pubDate);
  const fresh = allItems.slice(0, MAX_PER_RUN);

  console.log(`[news] selected ${fresh.length} fresh item(s) to write`);

  if (process.env.GROQ_API_KEY) {
    console.log(`[news] GROQ_API_KEY set — using Llama 3.3 70B for explanations`);
  } else {
    console.log(`[news] no GROQ_API_KEY — falling back to template-based explanations. To enable, set GROQ_API_KEY in GitHub Actions secrets (get a free key at https://console.groq.com)`);
  }

  // Build explanation for each fresh item. If GROQ_API_KEY is set, use the LLM;
  // otherwise (or on LLM failure) fall back to the template.
  for (const item of fresh) {
    let exp = await buildExplanationWithLlm(item);
    if (exp) {
      item._llmGenerated = true;
    } else {
      exp = buildExplanation(item);
      item._llmGenerated = false;
    }
    item._explanation = exp;
  }

  let written = 0;
  for (const item of fresh) {
    if (writePost(item)) written += 1;
  }

  console.log(`[news] done. wrote ${written} new post(s).`);
}

main().catch((err) => {
  console.error('[news] fatal:', err);
  process.exit(1);
});
