'use client';

/**
 * LineChart — small pure-SVG line chart for calculators.
 * No external chart library. Renders a smooth line over a baseline grid,
 * works in both light and dark mode via CSS variables.
 *
 * Props:
 *   series: array of named data series, each with x and y values
 *   xLabel, yLabel: optional axis labels
 *   height: pixel height of the chart (default 200)
 *   yFormat: how to format Y values on the axis (default: thousands with k suffix)
 *   yMin, yMax: optional override for the y-axis range
 *   xFormat: how to format X axis ticks (default: just show the index as a number)
 */

export interface ChartSeries {
  name: string;
  color?: string; // CSS variable name like 'var(--brand-500)' or hex
  points: Array<{ x: number; y: number; label?: string }>;
}

interface LineChartProps {
  series: ChartSeries[];
  xLabel?: string;
  yLabel?: string;
  height?: number;
  yFormat?: (v: number) => string;
  yMin?: number;
  yMax?: number;
  xFormat?: (v: number) => string;
  /** Optional caption shown below the chart */
  caption?: string;
}

const PADDING = { top: 16, right: 16, bottom: 32, left: 56 };

export function LineChart({
  series,
  xLabel,
  yLabel,
  height = 220,
  yFormat = defaultYFormat,
  yMin,
  yMax,
  xFormat = (v) => v.toString(),
  caption,
}: LineChartProps) {
  if (series.length === 0 || series.every((s) => s.points.length === 0)) {
    return null;
  }

  // Compute ranges
  const allPoints = series.flatMap((s) => s.points);
  const xValues = allPoints.map((p) => p.x);
  const yValues = allPoints.map((p) => p.y);

  const xMin = Math.min(...xValues);
  const xMax = Math.max(...xValues);
  const computedYMin = yMin ?? Math.min(0, ...yValues);
  const computedYMax = yMax ?? Math.max(...yValues) * 1.05;

  // Grid layout
  const width = 720; // logical, scales via viewBox
  const innerW = width - PADDING.left - PADDING.right;
  const innerH = height - PADDING.top - PADDING.bottom;

  const xScale = (x: number) => {
    if (xMax === xMin) return PADDING.left + innerW / 2;
    return PADDING.left + ((x - xMin) / (xMax - xMin)) * innerW;
  };
  const yScale = (y: number) => {
    if (computedYMax === computedYMin) return PADDING.top + innerH / 2;
    return PADDING.top + (1 - (y - computedYMin) / (computedYMax - computedYMin)) * innerH;
  };

  // Y-axis ticks: 4 evenly spaced
  const yTicks = 4;
  const yTickValues = Array.from({ length: yTicks + 1 }, (_, i) =>
    computedYMin + (i / yTicks) * (computedYMax - computedYMin)
  );

  // X-axis ticks: pick a reasonable count based on data range
  const xTickCount = Math.min(6, xValues.length);
  const xTickStep = xValues.length > 1 ? Math.floor((xValues.length - 1) / (xTickCount - 1)) : 1;
  const xTickValues = xValues.length > 1
    ? Array.from({ length: xTickCount }, (_, i) => xValues[Math.min(i * xTickStep, xValues.length - 1)])
    : [xMin];

  const defaultColors = [
    'var(--ledger-500)',
    'var(--brand-500)',
    'var(--accent2-500)',
    'var(--ink-600)',
  ];

  return (
    <figure className="not-prose">
      <div
        className="rounded-lg border border-ink-200 bg-ink-50 p-4 dark:border-ink-700 dark:bg-ink-900"
        role="img"
        aria-label={caption ?? `${yLabel ?? 'Y'} vs ${xLabel ?? 'X'}`}
      >
        <svg
          viewBox={`0 0 ${width} ${height}`}
          width="100%"
          height={height}
          preserveAspectRatio="xMidYMid meet"
          className="overflow-visible"
        >
          {/* Horizontal grid lines + Y axis labels */}
          {yTickValues.map((yv, i) => (
            <g key={`y-${i}`}>
              <line
                x1={PADDING.left}
                x2={width - PADDING.right}
                y1={yScale(yv)}
                y2={yScale(yv)}
                stroke="var(--ink-200)"
                strokeWidth={1}
                strokeDasharray={i === 0 ? '0' : '2 3'}
                className="dark:[stroke:var(--ink-700)]"
              />
              <text
                x={PADDING.left - 8}
                y={yScale(yv) + 4}
                textAnchor="end"
                fontSize="11"
                fontFamily="ui-monospace, SFMono-Regular, monospace"
                fill="var(--ink-500)"
                className="dark:fill-[var(--ink-400)]"
              >
                {yFormat(yv)}
              </text>
            </g>
          ))}

          {/* X axis labels */}
          {xTickValues.map((xv, i) => (
            <text
              key={`x-${i}`}
              x={xScale(xv)}
              y={height - PADDING.bottom + 18}
              textAnchor="middle"
              fontSize="11"
              fontFamily="ui-monospace, SFMono-Regular, monospace"
              fill="var(--ink-500)"
              className="dark:fill-[var(--ink-400)]"
            >
              {xFormat(xv)}
            </text>
          ))}

          {/* Y axis title */}
          {yLabel && (
            <text
              x={PADDING.left - 44}
              y={PADDING.top + innerH / 2}
              textAnchor="middle"
              transform={`rotate(-90 ${PADDING.left - 44} ${PADDING.top + innerH / 2})`}
              fontSize="11"
              fontFamily="ui-monospace, SFMono-Regular, monospace"
              fill="var(--ink-600)"
              className="dark:fill-[var(--ink-400)]"
            >
              {yLabel}
            </text>
          )}

          {/* X axis title */}
          {xLabel && (
            <text
              x={PADDING.left + innerW / 2}
              y={height - 4}
              textAnchor="middle"
              fontSize="11"
              fontFamily="ui-monospace, SFMono-Regular, monospace"
              fill="var(--ink-600)"
              className="dark:fill-[var(--ink-400)]"
            >
              {xLabel}
            </text>
          )}

          {/* Series lines */}
          {series.map((s, idx) => {
            const color = s.color ?? defaultColors[idx % defaultColors.length];
            const pathD = s.points
              .map((p, i) => `${i === 0 ? 'M' : 'L'} ${xScale(p.x).toFixed(1)} ${yScale(p.y).toFixed(1)}`)
              .join(' ');
            return (
              <g key={s.name}>
                <path
                  d={pathD}
                  fill="none"
                  stroke={color}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {s.points.length <= 20 && s.points.map((p, i) => (
                  <circle
                    key={`p-${idx}-${i}`}
                    cx={xScale(p.x)}
                    cy={yScale(p.y)}
                    r={3}
                    fill="var(--ink-50)"
                    stroke={color}
                    strokeWidth={1.5}
                    className="dark:fill-[var(--ink-900)]"
                  />
                ))}
              </g>
            );
          })}
        </svg>
      </div>
      {/* Legend */}
      {series.length > 1 && (
        <ul className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-600">
          {series.map((s, idx) => {
            const color = s.color ?? defaultColors[idx % defaultColors.length];
            return (
              <li key={s.name} className="flex items-center gap-1.5">
                <span
                  aria-hidden="true"
                  className="inline-block h-2 w-3 rounded-sm"
                  style={{ background: color }}
                />
                {s.name}
              </li>
            );
          })}
        </ul>
      )}
      {caption && (
        <figcaption className="mt-2 text-xs text-ink-500">{caption}</figcaption>
      )}
    </figure>
  );
}

function defaultYFormat(v: number): string {
  if (v === 0) return '$0';
  const abs = Math.abs(v);
  if (abs >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `$${Math.round(v / 1_000)}k`;
  return `$${Math.round(v)}`;
}
