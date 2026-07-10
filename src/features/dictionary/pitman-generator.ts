// Pitman shorthand stroke outline generator
// Converts any English word into a descriptive Pitman stroke representation

export interface GeneratedOutline {
  word: string
  pronunciation: string
  meaning: string
  outline: string
  rule: string
}

// Known Pitman contractions (common words with fixed shorthand forms)
const CONTRACTIONS: Record<string, string> = {
  the: "TH",
  and: "N-D",
  to: "T",
  of: "F",
  in: "N",
  it: "T",
  is: "S",
  for: "F",
  with: "W",
  have: "H-V",
  this: "TH-S",
  that: "TH-T",
  will: "W-L",
  we: "W",
  you: "Y",
  your: "Y-R",
  are: "R",
  our: "R",
  not: "N-T",
  but: "B-T",
  from: "F-R-M",
  which: "W-CH",
  what: "W-T",
  who: "H",
  when: "W-N",
  where: "W-R",
  there: "TH-R",
  their: "TH-R",
  them: "TH-M",
  these: "TH-S",
  those: "TH-S",
  than: "TH-N",
  then: "TH-N",
  can: "K-N",
  could: "K-D",
  would: "W-D",
  should: "SH-D",
  may: "M",
  might: "M-T",
  must: "M-S-T",
  shall: "SH-L",
  also: "L-S",
  very: "V-R",
  just: "J-S-T",
  well: "W-L",
  still: "S-T-L",
  such: "S-CH",
  each: "E-CH",
  much: "M-CH",
  many: "M-N",
}

const CONSONANT_MAP: Record<string, { stroke: string; heavy: boolean; dir: string; desc: string }> = {
  p: { stroke: "P", heavy: false, dir: "down-straight", desc: "light down-straight stroke (as in P)" },
  b: { stroke: "B", heavy: true, dir: "down-straight", desc: "heavy down-straight stroke (as in B)" },
  t: { stroke: "T", heavy: false, dir: "down-straight", desc: "light down-straight stroke (as in T)" },
  d: { stroke: "D", heavy: true, dir: "down-straight", desc: "heavy down-straight stroke (as in D)" },
  k: { stroke: "K", heavy: false, dir: "down-straight", desc: "light down-straight stroke (as in K)" },
  g: { stroke: "G", heavy: true, dir: "down-straight", desc: "heavy down-straight stroke (as in G)" },
  f: { stroke: "F", heavy: false, dir: "up-straight", desc: "light up-straight stroke (as in F)" },
  v: { stroke: "V", heavy: true, dir: "up-straight", desc: "heavy up-straight stroke (as in V)" },
  s: { stroke: "S", heavy: false, dir: "up-curve", desc: "light up-curve stroke (as in S)" },
  z: { stroke: "Z", heavy: true, dir: "up-curve", desc: "heavy up-curve stroke (as in Z)" },
  l: { stroke: "L", heavy: false, dir: "curve-down", desc: "light clockwise curve (as in L)" },
  r: { stroke: "R", heavy: true, dir: "curve-up", desc: "heavy anticlockwise curve (as in R)" },
  m: { stroke: "M", heavy: true, dir: "curve-down", desc: "heavy clockwise curve (as in M)" },
  n: { stroke: "N", heavy: false, dir: "curve-down", desc: "light clockwise curve (as in N)" },
  w: { stroke: "W", heavy: false, dir: "hook-up", desc: "light upward hook (as in W)" },
  y: { stroke: "Y", heavy: false, dir: "hook-down", desc: "light downward hook (as in Y)" },
  h: { stroke: "H", heavy: false, dir: "dot", desc: "light dot (as in H)" },
}

const DIGRAPH_MAP: Record<string, { stroke: string; heavy: boolean; dir: string; desc: string }> = {
  ch: { stroke: "CH", heavy: false, dir: "down-straight", desc: "light down-straight stroke (CH sound)" },
  sh: { stroke: "SH", heavy: false, dir: "up-straight", desc: "light up-straight stroke (SH sound)" },
  th: { stroke: "TH", heavy: false, dir: "up-straight", desc: "light up-straight stroke (TH unvoiced)" },
  wh: { stroke: "W", heavy: false, dir: "hook-up", desc: "light upward hook (WH sound)" },
  ng: { stroke: "NG", heavy: false, dir: "curve-down-tail", desc: "light downward curve with tail (NG)" },
  nk: { stroke: "NK", heavy: true, dir: "curve-down-tail", desc: "heavy downward curve with tail (NK)" },
  zh: { stroke: "ZH", heavy: true, dir: "up-straight", desc: "heavy up-straight stroke (ZH sound)" },
  dh: { stroke: "DH", heavy: true, dir: "up-straight", desc: "heavy up-straight stroke (DH voiced TH)" },
  ck: { stroke: "K", heavy: false, dir: "down-straight", desc: "light down-straight stroke (K sound)" },
}

const VOWELS = new Set(["a", "e", "i", "o", "u"])

const SHORT_VOWEL_DESC: Record<string, string> = {
  a: "ă (short A) — light dot",
  e: "ĕ (short E) — light dot",
  i: "ĭ (short I) — light dot",
  o: "ŏ (short O) — light dash",
  u: "ŭ (short U) — light dot",
}

const LONG_VOWEL_DESC: Record<string, string> = {
  a: "ā (long A) — heavy dash",
  e: "ē (long E) — heavy dot",
  i: "ī (long I) — heavy dot",
  o: "ō (long O) — heavy dash",
  u: "ū (long U) — heavy dot",
}

const DIPHTHONGS: Record<string, string> = {
  oi: "OI diphthong — combined hook",
  oy: "OI diphthong — combined hook",
  ou: "OW diphthong — upward hook",
  ow: "OW diphthong — upward hook",
  ea: "ē (long E) — second-place heavy dot",
  ee: "ē (long E) — second-place heavy dot",
  oa: "ō (long O) — first-place heavy dash",
  ai: "ā (long A) — first-place heavy dash",
  ay: "ā (long A) — first-place heavy dash",
  ie: "ī (long I) — second-place heavy dot",
  ue: "ū (long U) — third-place heavy dot",
  ui: "ū (long U) — third-place heavy dot",
}

const VOWEL_PLACEMENT: Record<string, string> = {
  a: "first-place",
  e: "second-place",
  i: "third-place",
  o: "first-place",
  u: "second-place",
}

function isConsonant(ch: string): boolean {
  return /^[bcdfghjklmnpqrstvwxyz]$/i.test(ch)
}

function autoPronounce(word: string): string {
  if (word.length <= 1) return word
  const parts: string[] = []
  let current = ""
  for (let i = 0; i < word.length; i++) {
    current += word[i]
    if (VOWELS.has(word[i]) && i + 1 < word.length && !VOWELS.has(word[i + 1])) {
      parts.push(current)
      current = ""
    }
  }
  if (current) parts.push(current)
  return parts.join("-")
}

export function generatePitmanOutline(word: string): GeneratedOutline {
  const clean = word.toLowerCase().trim()
  if (!clean) {
    return {
      word: word || "(empty)",
      pronunciation: "",
      meaning: "No word provided",
      outline: "—",
      rule: "Enter a word to see its Pitman shorthand outline.",
    }
  }

  // Check known contraction first
  const contraction = CONTRACTIONS[clean]
  if (contraction) {
    const strokeList = contraction.split("-")
    const ruleLines = strokeList.map((s) => {
      const info = CONSONANT_MAP[s.toLowerCase()] || DIGRAPH_MAP[s.toLowerCase() as keyof typeof DIGRAPH_MAP]
      if (info) return `• ${s}: ${info.desc}`
      // Try each letter
      const letters = s.split("").map((c) => {
        const ci = CONSONANT_MAP[c.toLowerCase()]
        return ci ? `${c}: ${ci.desc}` : null
      }).filter(Boolean).join("\n")
      return letters || `• ${s}`
    }).join("\n")

    return {
      word,
      pronunciation: autoPronounce(clean),
      meaning: `Pitman shorthand outline for "${word}". This is a standard Pitman contraction.`,
      outline: contraction,
      rule: [
        `"${word}" is a standard Pitman shorthand contraction written as:`,
        ruleLines,
        `\nNote: In Pitman shorthand, common words like "${word}" have fixed contracted forms to maximize writing speed. Practice writing the entire outline without lifting your pen.`,
        `\nStroke key: Thin lines = LIGHT (voiceless) sounds. Thick lines = HEAVY (voiced) sounds.`,
      ].join("\n\n"),
    }
  }

  const strokes: string[] = []
  const rules: string[] = []
  const vowelInfo: string[] = []
  let i = 0
  let lastChar = ""
  let lastStroke = ""

  while (i < clean.length) {
    const ch = clean[i]

    if (VOWELS.has(ch)) {
      // Silent 'e' at end of word
      if (ch === "e" && i === clean.length - 1) {
        if (i >= 2 && "aio".includes(clean[i - 2])) {
          const vowel = clean[i - 2]
          vowelInfo.push(`${LONG_VOWEL_DESC[vowel]} — made long by silent final E`)
        }
        i++
        continue
      }

      // Diphthong check
      if (i + 1 < clean.length) {
        const pair = clean.slice(i, i + 2)
        const diph = DIPHTHONGS[pair]
        if (diph) {
          vowelInfo.push(diph)
          i += 2
          continue
        }
      }

      // Long vowel patterns (vowel + vowel)
      if (i + 1 < clean.length && "aeiou".includes(clean[i + 1])) {
        const longDesc = LONG_VOWEL_DESC[ch]
        if (longDesc) {
          vowelInfo.push(longDesc)
          i++
          continue
        }
      }

      // Regular vowel
      const placement = VOWEL_PLACEMENT[ch] || "second-place"
      const shortDesc = SHORT_VOWEL_DESC[ch] || ""
      const longDesc = LONG_VOWEL_DESC[ch] || ""
      // Determine if likely long (open syllable)
      const nextCh = i + 1 < clean.length ? clean[i + 1] : ""
      const isLikelyLong =
        (ch === "a" && nextCh === "e") ||
        (ch === "e" && nextCh === "e") ||
        (ch === "i" && nextCh === "e") ||
        (ch === "o" && nextCh === "a") ||
        (ch === "o" && nextCh === "o") ||
        (ch === "u" && nextCh === "e")

      vowelInfo.push(isLikelyLong
        ? `${placement} ${longDesc}`
        : `${placement} ${shortDesc}`
      )
      i++
      continue
    }

    if (!isConsonant(ch)) {
      i++
      continue
    }

    // Check digraphs
    if (i + 1 < clean.length) {
      const pair = clean.slice(i, i + 2)
      const digraph = DIGRAPH_MAP[pair as keyof typeof DIGRAPH_MAP]
      if (digraph) {
        if (digraph.stroke !== lastStroke) {
          strokes.push(digraph.stroke)
          rules.push(`${digraph.stroke}: ${digraph.desc}`)
          lastStroke = digraph.stroke
        }
        i += 2
        lastChar = pair
        continue
      }
    }

    // 'c' → K or S
    if (ch === "c") {
      const next = i + 1 < clean.length ? clean[i + 1] : ""
      const stroke = "iey".includes(next) ? "S" : "K"
      const desc = "iey".includes(next)
        ? "S: light up-curve stroke (soft C → S sound)"
        : "K: light down-straight stroke (hard C → K sound)"
      if (ch !== lastChar) {
        strokes.push(stroke)
        rules.push(desc)
        lastStroke = stroke
        lastChar = ch
      }
      i++
      continue
    }

    // 'q' → K
    if (ch === "q") {
      if (ch !== lastChar) {
        strokes.push("K")
        rules.push("K: light down-straight stroke (Q → K sound)")
        lastStroke = "K"
        lastChar = ch
      }
      i++
      if (i < clean.length && clean[i] === "u") i++
      continue
    }

    // 'x' → KS
    if (ch === "x") {
      strokes.push("K", "S")
      if ("K" !== (strokes.length > 1 ? strokes[strokes.length - 2] : "")) {
        rules.push("K: light down-straight stroke (X → KS)")
      }
      rules.push("S: light up-curve stroke (X → KS)")
      lastStroke = "S"
      lastChar = ch
      i++
      continue
    }

    // Single consonant
    const mapped = CONSONANT_MAP[ch]
    if (mapped) {
      const s = mapped.stroke
      // Only collapse if same letter repeated (e.g., 'll' → L, 'tt' → T)
      if (ch !== lastChar) {
        strokes.push(s)
        rules.push(`${s}: ${mapped.desc}`)
        lastStroke = s
        lastChar = ch
      }
      i++
      continue
    }

    i++
  }

  const outline = strokes.length > 0 ? strokes.join("-") : "—"

  let ruleText = ""
  if (strokes.length > 0) {
    const strokeLines = [...new Set(rules)].join("\n")
    ruleText = [
      `The Pitman shorthand outline for "${word}" uses the following strokes in sequence:`,
      strokeLines,
    ].join("\n\n")

    if (vowelInfo.length > 0) {
      const vowelLines = [...new Set(vowelInfo)].map((v) => `• ${v}`).join("\n")
      ruleText += `\n\nVowel marks placed relative to the consonant strokes:\n${vowelLines}
• Short vowels = light marks
• Long vowels = heavy marks
• First-place = above/beginning of stroke
• Second-place = level with stroke
• Third-place = below/end of stroke`
    }

    ruleText += `\n\nStroke thickness guide:
• LIGHT strokes (thin lines) — voiceless sounds like P, T, K, F, S, TH, SH, CH
• HEAVY strokes (thick lines) — voiced sounds like B, D, G, V, Z, DH, ZH, J, R, M
Practice writing with consistent pen pressure to clearly distinguish light from heavy strokes.`
  } else {
    ruleText = "This word does not map to standard Pitman consonant strokes. Try a different word."
  }

  return {
    word,
    pronunciation: autoPronounce(clean),
    meaning: `Pitman shorthand outline for "${word}". The stroke sequence breaks down the word into its Pitman shorthand components for writing practice.`,
    outline,
    rule: ruleText,
  }
}
