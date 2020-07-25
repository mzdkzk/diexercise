import reactStringReplace from 'react-string-replace'
import React from 'react'
import { WordData } from '../scheme/db'
import styled from 'styled-components'

const CaptionContainer = styled.div`
  overflow: scroll;
  height: 100%;
`

const CaptionItem = styled.div`
  margin-top: 1rem;
`

const Speaker = styled.p`
  text-align: initial;
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1rem;
`

const Word = styled.p<{ color?: string }>`
  text-align: initial;
  font-size: 1.5rem;
  line-height: 1.5rem;
  color: ${({ color }) => color || 'black'};
  max-height: 3rem;
  overflow: hidden;
`

type Props = {
  words: WordData[]
  onClickWord: (word: string) => void
}

const Caption: React.FC<Props> = ({ words, onClickWord }) => {
  return (
    <CaptionContainer>
      {words.map(word => {
        const replacedText = reactStringReplace(
          word.text,
          /\[(.+?)\]/g,
          (match, i) => (
            <a href="#" key={i} onClick={() => onClickWord(match)}>
              {match}
            </a>
          )
        )
        return (
          <CaptionItem key={+word.updatedAt}>
            <Speaker>{word.user.name}</Speaker>
            <Word>{replacedText}</Word>
          </CaptionItem>
        )
      })}
    </CaptionContainer>
  )
}

export default Caption
