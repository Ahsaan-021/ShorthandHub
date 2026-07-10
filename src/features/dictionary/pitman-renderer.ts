// Self-contained Pitman shorthand SVG renderer
// Renders stroke sequences (e.g. "K-T", "F-R-M") as proper Pitman glyphs
// Fully self-contained — no external API dependencies

export interface PitmanStrokeDef {
  angle: number       // degrees from positive x-axis (counter-clockwise)
  length: number      // stroke length in units
  voiced: boolean     // thick (voiced) / thin (voiceless)
  curve: number       // quadratic bezier curve offset; 0 = straight
  label: string
  endSide: "right" | "left" | "bottom" | "top"  // which side the "tip" is on (for joining)
}

const STROKE_DEFS: Record<string, PitmanStrokeDef> = {
  P:    { angle: 135, length: 32, voiced: false, curve: 0,  label: "P",  endSide: "left" },
  B:    { angle: 135, length: 32, voiced: true,  curve: 0,  label: "B",  endSide: "left" },
  SH:   { angle: 135, length: 28, voiced: false, curve: 6,  label: "SH", endSide: "left" },
  ZH:   { angle: 135, length: 28, voiced: true,  curve: 6,  label: "ZH", endSide: "left" },

  T:    { angle: 0,   length: 30, voiced: false, curve: 0,  label: "T",  endSide: "right" },
  D:    { angle: 0,   length: 30, voiced: true,  curve: 0,  label: "D",  endSide: "right" },
  TH:   { angle: 0,   length: 28, voiced: false, curve: 0,  label: "TH", endSide: "right" },
  DH:   { angle: 0,   length: 28, voiced: true,  curve: 0,  label: "DH", endSide: "right" },

  K:    { angle: 45,  length: 32, voiced: false, curve: 0,  label: "K",  endSide: "top" },
  G:    { angle: 45,  length: 32, voiced: true,  curve: 0,  label: "G",  endSide: "top" },
  CH:   { angle: 52,  length: 34, voiced: false, curve: 0,  label: "CH", endSide: "top" },
  J:    { angle: 52,  length: 34, voiced: true,  curve: 0,  label: "J",  endSide: "top" },

  F:    { angle: 45,  length: 30, voiced: false, curve: 5,  label: "F",  endSide: "top" },
  V:    { angle: 45,  length: 30, voiced: true,  curve: 5,  label: "V",  endSide: "top" },

  L:    { angle: 45,  length: 28, voiced: false, curve: 0,  label: "L",  endSide: "top" },
  R:    { angle: 135, length: 28, voiced: false, curve: 0,  label: "R",  endSide: "left" },

  M:    { angle: 0,   length: 30, voiced: true,  curve: 8,  label: "M",  endSide: "right" },
  N:    { angle: 0,   length: 28, voiced: false, curve: 6,  label: "N",  endSide: "right" },
  NG:   { angle: 0,   length: 28, voiced: false, curve: 6,  label: "NG", endSide: "right" },

  S:    { angle: 45,  length: 14, voiced: false, curve: 0,  label: "S",  endSide: "top" },
  Z:    { angle: 45,  length: 14, voiced: true,  curve: 0,  label: "Z",  endSide: "top" },
  W:    { angle: 45,  length: 24, voiced: false, curve: 10, label: "W",  endSide: "top" },
  Y:    { angle: 135, length: 24, voiced: false, curve: 8,  label: "Y",  endSide: "left" },
  H:    { angle: 45,  length: 18, voiced: false, curve: 0,  label: "H",  endSide: "top" },
}

function deg2rad(deg: number): number {
  return (deg * Math.PI) / 180
}

interface Point { x: number; y: number }

function endpoint(p: Point, angleDeg: number, len: number): Point {
  const rad = deg2rad(angleDeg)
  return { x: p.x + len * Math.cos(rad), y: p.y - len * Math.sin(rad) }
}

// Minimum x/y extension of a stroke (for bounding box)
function strokeBounds(points: Point[]): { minX: number; minY: number; maxX: number; maxY: number } {
  return {
    minX: Math.min(...points.map(p => p.x)),
    maxX: Math.max(...points.map(p => p.x)),
    minY: Math.min(...points.map(p => p.y)),
    maxY: Math.max(...points.map(p => p.y)),
  }
}

interface StrokePathData {
  points: Point[]      // all coordinate pairs: [start, ...(cp), end]
  commands: string[]   // path commands: ['M', 'L'] or ['M', 'Q']
  end: Point
}

function strokePathData(def: PitmanStrokeDef, start: Point, scale: number): StrokePathData {
  const len = def.length * scale
  const endPt = endpoint(start, def.angle, len)

  if (def.curve === 0) {
    return { points: [start, endPt], commands: ['M', 'L'], end: endPt }
  }

  const mid = { x: (start.x + endPt.x) / 2, y: (start.y + endPt.y) / 2 }
  const perpRad = deg2rad(def.angle + 90)
  const offset = def.curve * scale
  const cp = {
    x: mid.x + offset * Math.cos(perpRad),
    y: mid.y - offset * Math.sin(perpRad),
  }
  return { points: [start, cp, endPt], commands: ['M', 'Q'], end: endPt }
}

export interface PitmanRenderOptions {
  strokeOutline: string
  scale?: number
}

export interface PitmanRenderResult {
  svg: string
  width: number
  height: number
}

export function renderPitmanOutline(options: PitmanRenderOptions): PitmanRenderResult {
  const scale = options.scale ?? 1
  const pad = 10 * scale
  const baseY = 30 * scale
  const baseX = pad + 4 * scale

  const labels = options.strokeOutline.split("-").map((s) => s.trim()).filter(Boolean)
  if (labels.length === 0) return { svg: "", width: 0, height: 0 }

  interface StrokeEntry {
    label: string
    def: PitmanStrokeDef
    pathData: StrokePathData
    sw: number
  }

  const entries: StrokeEntry[] = []

  let cursor: Point = { x: baseX, y: baseY }

  for (const label of labels) {
    const def = STROKE_DEFS[label]
    if (!def) continue

    const sw = def.voiced ? 4.5 * scale : 2 * scale

    const pathData = strokePathData(def, cursor, scale)
    entries.push({ label, def, pathData, sw })

    cursor = { ...pathData.end }
    const gap = 4 * scale
    switch (def.endSide) {
      case "right": cursor.x += gap; break
      case "left":  cursor.x -= gap; break
      case "bottom": cursor.y += gap; break
      case "top":    cursor.y -= gap; break
    }
  }

  if (entries.length === 0) return { svg: "", width: 0, height: 0 }

  // Compute bounding box from all stroke points
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
  for (const e of entries) {
    const b = strokeBounds(e.pathData.points)
    if (b.minX < minX) minX = b.minX
    if (b.maxX > maxX) maxX = b.maxX
    if (b.minY < minY) minY = b.minY
    if (b.maxY > maxY) maxY = b.maxY
  }

  const w = maxX - minX + pad * 2
  const h = maxY - minY + pad * 2
  const ox = pad - minX
  const oy = pad - minY

  // Build paths by shifting coordinates
  const paths = entries
    .map((e) => {
      const pts = e.pathData.points.map(p => ({
        x: (p.x + ox).toFixed(1),
        y: (p.y + oy).toFixed(1),
      }))
      const cmds = e.pathData.commands
      // Commands: 'M' uses 1 point, 'L' uses 1, 'Q' uses 2 (cp then end)
      let d = ""
      let pi = 0
      for (const cmd of cmds) {
        d += cmd
        d += `${pts[pi].x},${pts[pi].y}`
        pi++
        if (cmd === 'Q') {
          d += ` ${pts[pi].x},${pts[pi].y}`
          pi++
        }
      }
      return `  <path d="${d}" fill="none" stroke="currentColor" stroke-width="${e.sw.toFixed(1)}" stroke-linecap="round" stroke-linejoin="round"/>`
    })
    .join("\n")

  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w.toFixed(0)} ${h.toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" fill="none">`,
    `  <rect width="100%" height="100%" fill="transparent"/>`,
    paths,
    `</svg>`,
  ].join("\n")

  return { svg, width: Math.ceil(w), height: Math.ceil(h) }
}

export function svgToDataUrl(svg: string): string {
  const encoded = encodeURIComponent(svg)
    .replace(/'/g, "%27")
    .replace(/"/g, "%22")
  return `data:image/svg+xml;charset=utf-8,${encoded}`
}
