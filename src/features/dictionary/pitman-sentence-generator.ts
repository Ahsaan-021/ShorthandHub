import { generatePitmanOutline } from "./pitman-generator"

export interface SenseGroup {
  text: string
  words: {
    word: string
    strokes: string
    pronunciation: string
  }[]
  combinedStrokes: string
}

export interface SentenceOutlineResult {
  sentence: string
  senseGroups: SenseGroup[]
  fullOutline: string
}

// Known Pitman phraseography (multi-word phrases written without pen lift)
const PHRASE_MAP: Record<string, string[]> = {
  "i am": ["I", "M"],
  "i have": ["I", "V"],
  "i will": ["I", "L"],
  "i shall": ["I", "SH-L"],
  "i can": ["I", "K-N"],
  "i could": ["I", "K-D"],
  "i would": ["I", "W-D"],
  "i should": ["I", "SH-D"],
  "i may": ["I", "M"],
  "i might": ["I", "M-T"],
  "i must": ["I", "M-S-T"],
  "i am not": ["I", "M", "N-T"],
  "i have not": ["I", "V", "N-T"],
  "i have been": ["I", "V", "B-N"],
  "i will be": ["I", "L", "B"],
  "i am going": ["I", "M", "G-NG"],
  "i am sorry": ["I", "M", "S-R"],
  "i am glad": ["I", "M", "G-L-D"],
  "you are": ["Y", "R"],
  "you have": ["Y", "V"],
  "you will": ["Y", "L"],
  "you can": ["Y", "K-N"],
  "you must": ["Y", "M-S-T"],
  "we are": ["W", "R"],
  "we have": ["W", "V"],
  "we will": ["W", "L"],
  "we can": ["W", "K-N"],
  "we shall": ["W", "SH-L"],
  "they are": ["TH", "R"],
  "they have": ["TH", "V"],
  "they will": ["TH", "L"],
  "they can": ["TH", "K-N"],
  "he is": ["H", "S"],
  "he has": ["H", "S"],
  "he will": ["H", "L"],
  "he can": ["H", "K-N"],
  "she is": ["SH", "S"],
  "she has": ["SH", "S"],
  "she will": ["SH", "L"],
  "it is": ["T", "S"],
  "it has": ["T", "S"],
  "it will": ["T", "L"],
  "there is": ["TH-R", "S"],
  "there are": ["TH-R", "R"],
  "there has": ["TH-R", "S"],
  "there have": ["TH-R", "V"],
  "there will": ["TH-R", "L"],
  "there can": ["TH-R", "K-N"],
  "there must": ["TH-R", "M-S-T"],
  "there should": ["TH-R", "SH-D"],
  "there would": ["TH-R", "W-D"],
  "there could": ["TH-R", "K-D"],
  "as well as": ["S", "L", "S"],
  "as soon as": ["S", "S-N", "S"],
  "as much as": ["S", "M-CH", "S"],
  "as far as": ["S", "F-R", "S"],
  "on the": ["N", "TH"],
  "in the": ["N", "TH"],
  "of the": ["F", "TH"],
  "for the": ["F", "TH"],
  "to the": ["T", "TH"],
  "by the": ["B", "TH"],
  "with the": ["W", "TH"],
  "at the": ["T", "TH"],
  "from the": ["F-R-M", "TH"],
  "and the": ["N-D", "TH"],
  "is the": ["S", "TH"],
  "are the": ["R", "TH"],
  "have the": ["V", "TH"],
  "will the": ["L", "TH"],
  "can the": ["K-N", "TH"],
  "on a": ["N", "A"],
  "in a": ["N", "A"],
  "of a": ["F", "A"],
  "to a": ["T", "A"],
  "for a": ["F", "A"],
  "with a": ["W", "A"],
  "at a": ["T", "A"],
  "have a": ["V", "A"],
  "do not": ["D", "N-T"],
  "does not": ["D-S", "N-T"],
  "did not": ["D-D", "N-T"],
  "was not": ["W-S", "N-T"],
  "were not": ["W-R", "N-T"],
  "have not": ["V", "N-T"],
  "has not": ["H-S", "N-T"],
  "had not": ["H-D", "N-T"],
  "will not": ["L", "N-T"],
  "shall not": ["SH-L", "N-T"],
  "can not": ["K-N", "N-T"],
  "cannot": ["K-N", "N-T"],
  "could not": ["K-D", "N-T"],
  "would not": ["W-D", "N-T"],
  "should not": ["SH-D", "N-T"],
  "must not": ["M-S-T", "N-T"],
  "may not": ["M", "N-T"],
  "might not": ["M-T", "N-T"],
  "need not": ["N-D", "N-T"],
  "i do not": ["I", "D", "N-T"],
  "i did not": ["I", "D-D", "N-T"],
  "i had not": ["I", "H-D", "N-T"],
  "i could not": ["I", "K-D", "N-T"],
  "i would not": ["I", "W-D", "N-T"],
  "i should not": ["I", "SH-D", "N-T"],
  "you do not": ["Y", "D", "N-T"],
  "you did not": ["Y", "D-D", "N-T"],
  "you have not": ["Y", "V", "N-T"],
  "it is not": ["T", "S", "N-T"],
  "it was not": ["T", "W-S", "N-T"],
  "there is no": ["TH-R", "S", "N"],
  "there are no": ["TH-R", "R", "N"],
  "first of all": ["F-R-S-T", "F", "L"],
  "at once": ["T", "W-N-S"],
  "at first": ["T", "F-R-S-T"],
  "at last": ["T", "L-S-T"],
  "at least": ["T", "L-S-T"],
  "in fact": ["N", "F-K-T"],
  "in order": ["N", "R-D-R"],
  "in order to": ["N", "R-D-R", "T"],
  "in addition": ["N", "D-SH-N"],
  "in general": ["N", "J-N-R-L"],
  "in particular": ["N", "P-R-T-K-L-R"],
  "on account": ["N", "K-N-T"],
  "on account of": ["N", "K-N-T", "F"],
  "on behalf": ["N", "B-H-F"],
  "on the other hand": ["N", "TH", "R", "N-D"],
  "more and more": ["M-R", "N-D", "M-R"],
  "more or less": ["M-R", "R", "L-S"],
  "so as to": ["S", "S", "T"],
  "with regard to": ["W", "R-G-R-D", "T"],
  "with respect to": ["W", "R-S-P-K-T", "T"],
  "in the first place": ["N", "TH", "F-R-S-T", "P-L-S"],
}

function normalize(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim()
}

function splitIntoSenseGroups(sentence: string): string[][] {
  const normalized = normalize(sentence)
  const words = normalized.split(/\s+/)
  if (words.length === 0) return []

  const groups: string[][] = []
  let i = 0

  while (i < words.length) {
    let longestMatch: string[] | null = null
    let longestPhrase = ""

    // Try to match the longest phrase starting at i
    for (let len = Math.min(6, words.length - i); len >= 2; len--) {
      const phrase = words.slice(i, i + len).join(" ")
      if (PHRASE_MAP[phrase]) {
        longestMatch = words.slice(i, i + len)
        longestPhrase = phrase
        break
      }
    }

    if (longestMatch) {
      groups.push(longestMatch)
      i += longestMatch.length
    } else {
      // Single word sense group
      groups.push([words[i]])
      i++
    }
  }

  return groups
}

function generatePhraseStrokes(phraseWords: string[]): string {
  const phrase = phraseWords.join(" ").toLowerCase()
  const mapped = PHRASE_MAP[phrase]
  if (mapped) {
    return mapped.join("-")
  }

  // For unknown phrases, just combine individual word strokes
  const allStrokes: string[] = []
  for (const word of phraseWords) {
    const generated = generatePitmanOutline(word)
    if (generated.outline && generated.outline !== "—") {
      const strokes = generated.outline.split("-")
      allStrokes.push(...strokes)
    }
  }
  return allStrokes.join("-")
}

export function generatePitmanSentence(sentence: string): SentenceOutlineResult {
  const trimmed = sentence.trim()
  if (!trimmed) {
    return { sentence, senseGroups: [], fullOutline: "" }
  }

  // Check if it's a single word
  if (!trimmed.includes(" ")) {
    const gen = generatePitmanOutline(trimmed)
    const strokes = gen.outline !== "—" ? gen.outline : ""
    return {
      sentence: trimmed,
      senseGroups: [{
        text: trimmed,
        words: [{
          word: gen.word,
          strokes: gen.outline,
          pronunciation: gen.pronunciation,
        }],
        combinedStrokes: strokes,
      }],
      fullOutline: strokes,
    }
  }

  const senseGroupsRaw = splitIntoSenseGroups(trimmed)

  const senseGroups: SenseGroup[] = []
  const fullOutlines: string[] = []

  for (const groupWords of senseGroupsRaw) {
    const phrase = groupWords.join(" ")
    const combinedStrokes = generatePhraseStrokes(groupWords)

    const wordDetails = groupWords.map((w) => {
      const gen = generatePitmanOutline(w)
      return {
        word: gen.word,
        strokes: gen.outline,
        pronunciation: gen.pronunciation,
      }
    })

    senseGroups.push({
      text: phrase,
      words: wordDetails,
      combinedStrokes,
    })

    if (combinedStrokes) fullOutlines.push(combinedStrokes)
  }

  return {
    sentence: trimmed,
    senseGroups,
    fullOutline: fullOutlines.join(" / "),
  }
}
