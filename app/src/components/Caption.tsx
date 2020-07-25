import reactStringReplace from 'react-string-replace'
import React from 'react'
import { WordData } from '../scheme/db'
import styled from 'styled-components'

const Word = styled.span<{ color?: string }>`
  font-size: 1.5rem;
  color: ${({ color }) => color || 'black'};
`

type Props = {
  words: WordData[]
  onClickWord: (word: string) => void
}

const Caption: React.FC<Props> = ({ words, onClickWord }) => {
  return (
    <>
      {words.map((word, i) => {
        const children = reactStringReplace(
          word.text,
          /\[(.+?)\]/g,
          (match, i) => (
            <a href="#" key={i} onClick={() => onClickWord(match)}>
              {match}
            </a>
          )
        )
        return <Word key={i}>{children}</Word>
      })}
    </>
  )
}

export default Caption
