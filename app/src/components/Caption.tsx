import reactStringReplace from 'react-string-replace'
import React, { useEffect, useState } from 'react'
import { WordData } from '../scheme/db'
import styled from 'styled-components'
import firebase from '../utils/firebase'

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
  roomId: string
  onClickWord: (word: string) => void
}

const Caption: React.FC<Props> = ({ roomId, onClickWord }) => {
  const [storedWords, setStoredWords] = useState<WordData[]>([])

  const db = firebase.firestore()
  const wordsRef = db.collection('rooms').doc(`${roomId}`).collection('words')

  useEffect(() => {
    const unsubscribe = wordsRef
      .orderBy('updatedAt', 'desc')
      .onSnapshot(snapshot => {
        setStoredWords(snapshot.docs.map(doc => doc.data() as WordData))
      })
    return () => unsubscribe()
  }, [])

  return (
    <CaptionContainer>
      {storedWords.map(word => {
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
