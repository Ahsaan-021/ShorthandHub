export interface PitmanStrokeDef {
  angle: number
  length: number
  voiced: boolean
  curve: number
  label: string
  endSide: "right" | "left" | "bottom" | "top"
}

const STROKE_DEFS: Record<string, PitmanStrokeDef> = {
  // Downstrokes — written top→bottom
  // P/B: 45° from vertical, right-leaning (backslash direction)
  P:  { angle: -45, length: 32, voiced: false, curve: 0,  label: "P",  endSide: "bottom" },
  B:  { angle: -45, length: 32, voiced: true,  curve: 0,  label: "B",  endSide: "bottom" },
  // T/D: vertical down (straight)
  T:  { angle: -90, length: 30, voiced: false, curve: 0,  label: "T",  endSide: "bottom" },
  D:  { angle: -90, length: 30, voiced: true,  curve: 0,  label: "D",  endSide: "bottom" },
  // CH/J: 30° from vertical, left-leaning (forward-slash direction)
  CH: { angle: -120, length: 34, voiced: false, curve: 0,  label: "CH", endSide: "bottom" },
  J:  { angle: -120, length: 34, voiced: true,  curve: 0,  label: "J",  endSide: "bottom" },
  // K/G: horizontal left→right
  K:  { angle: 0,   length: 32, voiced: false, curve: 0,  label: "K",  endSide: "right" },
  G:  { angle: 0,   length: 32, voiced: true,  curve: 0,  label: "G",  endSide: "right" },
  // R (Ar): same direction as P/B (down-right, 45°)
  R:  { angle: -45, length: 30, voiced: false, curve: 0,  label: "R",  endSide: "bottom" },
  // H (downward): 30° from vertical, left-leaning (like CH but lighter)
  H:  { angle: -120, length: 20, voiced: false, curve: 0,  label: "H",  endSide: "bottom" },

  // Curved downstrokes
  // F/V: 45° down-right, quarter-circle opening upward
  F:  { angle: -45, length: 30, voiced: false, curve: 7,  label: "F",  endSide: "bottom" },
  V:  { angle: -45, length: 30, voiced: true,  curve: 7,  label: "V",  endSide: "bottom" },
  // TH/DH: vertical down, quarter-circle opening right
  TH: { angle: -90, length: 28, voiced: false, curve: 7,  label: "TH", endSide: "bottom" },
  DH: { angle: -90, length: 28, voiced: true,  curve: 7,  label: "DH", endSide: "bottom" },
  // S/Z: vertical down, quarter-circle opening left (half-length)
  S:  { angle: -90, length: 15, voiced: false, curve: -5, label: "S",  endSide: "bottom" },
  Z:  { angle: -90, length: 15, voiced: true,  curve: -5, label: "Z",  endSide: "bottom" },
  // SH/ZH: 45° down-right, quarter-circle opening upward
  SH: { angle: -45, length: 28, voiced: false, curve: 7,  label: "SH", endSide: "bottom" },
  ZH: { angle: -45, length: 28, voiced: true,  curve: 7,  label: "ZH", endSide: "bottom" },

  // Horizontal curved strokes (left→right)
  // M: curves below the baseline (U-shape)
  M:  { angle: 0,   length: 30, voiced: true,  curve: -8, label: "M",  endSide: "right" },
  // N/NG: curves above the baseline (arch)
  N:  { angle: 0,   length: 28, voiced: false, curve: 8,  label: "N",  endSide: "right" },
  NG: { angle: 0,   length: 28, voiced: false, curve: 8,  label: "NG", endSide: "right" },

  // Upstrokes — written bottom→top
  // L (Ell): 45° from vertical, up-right
  L:  { angle: 45,  length: 28, voiced: false, curve: 0,  label: "L",  endSide: "top" },
  // Ray: 60° from vertical, up-right (shallower than L)
  RAY: { angle: 30, length: 28, voiced: false, curve: 0, label: "RAY", endSide: "top" },
  // H (upward): 60° from vertical
  H2: { angle: 30, length: 18, voiced: false, curve: 0, label: "H2", endSide: "top" },
  // W (Way): upstroke with hook
  W:  { angle: 30,  length: 24, voiced: false, curve: 8,  label: "W",  endSide: "top" },
  // Y (Yay): upstroke
  Y:  { angle: 30,  length: 24, voiced: false, curve: -8, label: "Y",  endSide: "top" },
}

function deg2rad(deg: number): number {
  return (deg * Math.PI) / 180
}

interface Point { x: number; y: number }

function endpoint(p: Point, angleDeg: number, len: number): Point {
  const rad = deg2rad(angleDeg)
  return { x: p.x + len * Math.cos(rad), y: p.y - len * Math.sin(rad) }
}

function strokeBounds(points: Point[]): { minX: number; minY: number; maxX: number; maxY: number } {
  return {
    minX: Math.min(...points.map(p => p.x)),
    maxX: Math.max(...points.map(p => p.x)),
    minY: Math.min(...points.map(p => p.y)),
    maxY: Math.max(...points.map(p => p.y)),
  }
}

interface StrokePathData {
  points: Point[]
  commands: string[]
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

function lookupStroke(label: string): PitmanStrokeDef | undefined {
  let def = STROKE_DEFS[label]
  if (def) return def
  def = STROKE_DEFS[label.toUpperCase()]
  return def
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
    const def = lookupStroke(label)
    if (!def) continue

    const sw = def.voiced ? 5 * scale : 2 * scale

    const pathData = strokePathData(def, cursor, scale)
    entries.push({ label, def, pathData, sw })

    cursor = { ...pathData.end }
    const gap = 2 * scale
    switch (def.endSide) {
      case "right": cursor.x += gap; break
      case "left":  cursor.x -= gap; break
      case "bottom": cursor.y += gap; break
      case "top":    cursor.y -= gap; break
    }
  }

  if (entries.length === 0) return { svg: "", width: 0, height: 0 }

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

  const paths = entries
    .map((e) => {
      const pts = e.pathData.points.map(p => ({
        x: (p.x + ox).toFixed(1),
        y: (p.y + oy).toFixed(1),
      }))
      const cmds = e.pathData.commands
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
