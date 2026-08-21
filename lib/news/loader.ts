import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import type { NewsPost } from './types';

const CONTENT_DIR = join(process.cwd(), 'content', 'news');

/**
 * Read every JSON file in `content/news/` and return them as NewsPost[],
 * sorted newest first. This runs at build time (Next.js static export).
 *
 * Each file is one weekly brief. Filename convention:
 *   YYYY-MM-DD-slug.json
 * but the loader doesn't care about the filename — it reads every file.
 */
export function loadAllNews(): NewsPost[] {
  let files: string[];
  try {
    files = readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.json'));
  } catch {
    return [];
  }

  const posts: NewsPost[] = [];
  for (const file of files) {
    const raw = readFileSync(join(CONTENT_DIR, file), 'utf-8');
    try {
      const parsed = JSON.parse(raw) as NewsPost;
      if (parsed && parsed.id && parsed.date && parsed.title) {
        posts.push(parsed);
      }
    } catch (err) {
      // Skip malformed files — do not break the build for one bad post.
      // eslint-disable-next-line no-console
      console.warn(`[news] skipping invalid JSON: ${file} (${(err as Error).message})`);
    }
  }

  posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  return posts;
}

export function getLatestNews(limit = 4): NewsPost[] {
  return loadAllNews().slice(0, limit);
}

export function getNewsBySlug(slug: string): NewsPost | undefined {
  return loadAllNews().find((p) => p.id === slug);
}

export function getRelatedNews(post: NewsPost, limit = 3): NewsPost[] {
  return loadAllNews()
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, limit);
}
