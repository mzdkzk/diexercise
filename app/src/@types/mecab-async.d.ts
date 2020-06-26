declare module 'mecab-async' {
  type ParsedData = {
    kanji: string
    lexical: string
    compound: string
    compound2: string
    compound3: string
    conjugation: string
    inflection: string
    original: string
    reading: string
    pronunciation: string
  }

  class Mecab {
    command: string
    options: {}
    parser: (data) => ParsedData | null

    parseSync: (str: string) => void
    parse: (
      str: string,
      callback: (err: any, result: string[][]) => void
    ) => void

    parseSyncFormat: (str: string) => ParsedData[]
    parseFormat: (
      str: string,
      callback: (err: any, result: ParsedData[]) => void
    ) => void

    wakachiSync: (str: string) => string[]
    wakachi: (
      str: string,
      callback: (err: any, result: string[]) => void
    ) => void
  }

  export = Mecab
}
