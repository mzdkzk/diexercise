import reactStringReplace from 'react-string-replace'
import React, { useState } from 'react'
import { WordData } from '../scheme/db'
import { RefWordContext } from '../utils/context'
import styled from 'styled-components'

const Word = styled.span<{ color?: string }>`
  font-size: 1.5rem;
  color: ${({ color }) => color || 'black'};
`

const Caption: React.FC<{ words: WordData[] }> = ({ words }) => {
  const [refWord, setRefWord] = useState<string>('')

  return (
    <RefWordContext.Provider value={refWord}>
      {words.map((word, i) => {
        const children = reactStringReplace(
          word.text,
          /\[(.+?)\]/g,
          (match, i) => (
            <a href="#" key={i} onClick={() => setRefWord(match)}>
              {match}
            </a>
          )
        )
        return <Word key={i}>{children}</Word>
      })}
    </RefWordContext.Provider>
  )
}

export default Caption
