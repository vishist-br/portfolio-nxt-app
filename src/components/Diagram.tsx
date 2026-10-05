"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useId, useRef } from "react";
import type { Diagram as DiagramSpec, DiagramEdge, DiagramNode } from "@/content/site";

// Grid geometry, in SVG user units.
const COL = 232;
const ROW = 128;
const NODE_W = 172;
const NODE_H = 64;
const PAD_X = 20;
const PAD_BOTTOM = 18;
const OVER_Y = 16;

type Box = { x: number; y: number; w: number; h: number; cx: number; cy: number };
type Point = [number, number];

function boxOf(node: DiagramNode, padTop: number): Box {
  const x = PAD_X + node.col * COL;
  const y = padTop + node.row * ROW;
  const w = NODE_W + ((node.span ?? 1) - 1) * COL;
  return { x, y, w, h: NODE_H, cx: x + w / 2, cy: y + NODE_H / 2 };
}

/** Corner points of an edge, from the source node's border to the target's. */
function route(edge: DiagramEdge, a: Box, b: Box, aNode: DiagramNode): Point[] {
  const right = b.x >= a.x + a.w;
  const down = b.y > a.y;
  switch (edge.route ?? "h") {
    case "v": {
      // A wide node accepts the arrow wherever the narrow one is.
      const x = (aNode.span ?? 1) > 1 ? b.cx : a.cx;
      return down ? [[x, a.y + a.h], [x, b.y]] : [[x, a.y], [x, b.y + b.h]];
    }
    case "hv": {
      const startX = b.cx > a.cx ? a.x + a.w : a.x;
      return [[startX, a.cy], [b.cx, a.cy], [b.cx, down ? b.y : b.y + b.h]];
    }
    case "vh": {
      const endX = b.cx > a.cx ? b.x : b.x + b.w;
      return [[a.cx, down ? a.y + a.h : a.y], [a.cx, b.cy], [endX, b.cy]];
    }
    case "over":
      return [[a.cx, a.y], [a.cx, OVER_Y], [b.cx, OVER_Y], [b.cx, b.y]];
    default:
      return right ? [[a.x + a.w, a.cy], [b.x, b.cy]] : [[a.x, a.cy], [b.x + b.w, b.cy]];
  }
}

function toPath(points: Point[]): string {
  return points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y}`).join(" ");
}

function lengthOf(points: Point[]): number {
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    total += Math.abs(points[i][0] - points[i - 1][0]) + Math.abs(points[i][1] - points[i - 1][1]);
  }
  return total;
}

/** Where to put an edge label: the middle of its longest segment. */
function labelAt(points: Point[]): { x: number; y: number; vertical: boolean } {
  let best = 1;
  let bestLen = -1;
  for (let i = 1; i < points.length; i++) {
    const len = Math.abs(points[i][0] - points[i - 1][0]) + Math.abs(points[i][1] - points[i - 1][1]);
    if (len > bestLen) {
      bestLen = len;
      best = i;
    }
  }
  const [x1, y1] = points[best - 1];
  const [x2, y2] = points[best];
  const vertical = x1 === x2;
  return { x: (x1 + x2) / 2, y: (y1 + y2) / 2, vertical };
}

const NODE_STYLE: Record<NonNullable<DiagramNode["kind"]>, { stroke: string; fill: string; dash?: string }> = {
  default: { stroke: "var(--line-strong)", fill: "var(--surface)" },
  accent: { stroke: "var(--accent-ink)", fill: "color-mix(in srgb, var(--accent) 12%, var(--surface))" },
  store: { stroke: "var(--line-strong)", fill: "var(--surface-2)" },
  external: { stroke: "var(--line-strong)", fill: "transparent", dash: "5 5" },
};

export function Diagram({ spec }: { spec: DiagramSpec }) {
  const uid = useId().replace(/:/g, "");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const moving = inView && !reduce;

  const padTop = spec.edges.some((e) => e.route === "over") ? 50 : 18;
  const byId = new Map(spec.nodes.map((n) => [n.id, n]));
  const cols = Math.max(...spec.nodes.map((n) => n.col + (n.span ?? 1)));
  const rows = Math.max(...spec.nodes.map((n) => n.row)) + 1;
  const width = PAD_X * 2 + (cols - 1) * COL + NODE_W;
  const height = padTop + (rows - 1) * ROW + NODE_H + PAD_BOTTOM;

  const edges = spec.edges.map((edge) => {
    const from = byId.get(edge.from);
    const to = byId.get(edge.to);
    if (!from || !to) throw new Error(`Diagram "${spec.title}": unknown node in ${edge.from} -> ${edge.to}`);
    const points = route(edge, boxOf(from, padTop), boxOf(to, padTop), from);
    return { edge, points, d: toPath(points), length: lengthOf(points), label: labelAt(points) };
  });

  return (
    <figure>
      <div
        ref={ref}
        tabIndex={0}
        role="group"
        aria-label={`${spec.title} diagram. Scroll sideways if it is cut off.`}
        className="overflow-x-auto rounded-2xl border border-line bg-surface/40 p-3 md:p-5"
      >
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-labelledby={`${uid}-t ${uid}-d`}
          className="mx-auto block h-auto w-full"
          style={{ minWidth: Math.min(width, 1040), maxWidth: width }}
        >
          <title id={`${uid}-t`}>{spec.title}</title>
          <desc id={`${uid}-d`}>{spec.summary}</desc>
          <defs>
            <marker id={`${uid}-arrow`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 1 L9 5 L0 9 Z" fill="var(--muted)" />
            </marker>
          </defs>

          {edges.map(({ edge, d, length, label }, i) => (
            <g key={`${edge.from}-${edge.to}`}>
              <path
                d={d}
                fill="none"
                stroke="var(--line-strong)"
                strokeWidth={1.5}
                strokeDasharray={edge.dashed ? "3 5" : undefined}
                markerEnd={`url(#${uid}-arrow)`}
                markerStart={edge.both ? `url(#${uid}-arrow)` : undefined}
              />
              {!edge.dashed && (
                <path
                  d={d}
                  fill="none"
                  stroke="var(--accent-ink)"
                  strokeWidth={1.5}
                  strokeOpacity={0.75}
                  className={moving ? "flow-line" : undefined}
                  strokeDasharray="5 7"
                />
              )}
              {moving && (
                <circle r={edge.dashed ? 3 : 4} fill="var(--accent-ink)">
                  <animateMotion
                    dur={`${Math.max(1.1, length / 150).toFixed(2)}s`}
                    begin={`${(i % 4) * 0.25}s`}
                    repeatCount="indefinite"
                    path={d}
                  />
                </circle>
              )}
              {edge.label && (
                <text
                  x={label.vertical ? label.x + 9 : label.x}
                  y={label.vertical ? label.y + 4 : label.y - 9}
                  textAnchor={label.vertical ? "start" : "middle"}
                  fontSize={12.5}
                  fill="var(--muted)"
                  stroke="var(--bg)"
                  strokeWidth={5}
                  paintOrder="stroke"
                  strokeLinejoin="round"
                >
                  {edge.label}
                </text>
              )}
            </g>
          ))}

          {spec.nodes.map((node) => {
            const b = boxOf(node, padTop);
            const style = NODE_STYLE[node.kind ?? "default"];
            return (
              <g key={node.id}>
                <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={12} fill="var(--bg)" />
                <rect
                  x={b.x}
                  y={b.y}
                  width={b.w}
                  height={b.h}
                  rx={12}
                  fill={style.fill}
                  stroke={style.stroke}
                  strokeWidth={1.5}
                  strokeDasharray={style.dash}
                />
                <text x={b.x + 14} y={b.y + (node.sub ? 27 : 37)} fontSize={15} fontWeight={600} fill="var(--text)">
                  {node.label}
                </text>
                {node.sub && (
                  <text x={b.x + 14} y={b.y + 47} fontSize={12.5} fill="var(--muted)">
                    {node.sub}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">{spec.summary}</figcaption>
    </figure>
  );
}
