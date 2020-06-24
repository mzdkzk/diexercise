import React, { useEffect, useState } from 'react'
import Word from '../components/Word'

const getRecognition = (): SpeechRecognition => {
  const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
  const recognition = new SpeechRecognition()
  recognition.lang = 'ja-JP'
  recognition.interimResults = true
  recognition.continuous = true
  return recognition
}

export const IndexPage:React.FC = () => {
  const [words, setWords] = useState<string[]>([''])

  useEffect(() => {
    const recognition = getRecognition()
    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then(() => {
        recognition.addEventListener('result', (e) => {
          for (let i = e.resultIndex; i < e.results.length; i++) {
            words[words.length - 1] = e.results[i][0].transcript
            if (e.results[i].isFinal) {
              words.push('')
            }
            setWords(new Array(...words))
          }
        })
        recognition.start()
      })
    return () => recognition.stop()
  })

  return (
    <>
      {words.map((word, i) => {
        const color = `rgba(0, 0, 0, ${i === words.length - 1 ? '0.2' : '1.0'})`
        return <Word key={i} color={color}>{word}</Word>
      })}
    </>
  )
}

export default IndexPage
