import React, { useEffect, useState } from 'react'
import { Word, Button, Layout } from '../components'

const getRecognition = (): SpeechRecognition | null => {
  if (typeof window === 'undefined') return null
  const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
  const recognition = new SpeechRecognition()
  recognition.lang = 'ja-JP'
  recognition.interimResults = true
  recognition.continuous = true
  return recognition
}

export const IndexPage: React.FC = () => {
  const [words, setWords] = useState<string[]>([''])
  let mediaStream:MediaStream|undefined

  const recognition = getRecognition()
  if (recognition == null) {
    return (
      <p>このブラウザは音声入力に対応していません</p>
    )
  }

  useEffect(() => {
    return stopRecord
  }, [])

  const start = () => {
    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then(stream => {
        mediaStream = stream
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
  }

  const stopRecord = () => {
    recognition.stop()
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop())
    }
  }

  return (
    <Layout>
      <Button onClick={start}>Start</Button>
      <Button onClick={() => {
        setWords([])
        stopRecord()
      }}>Stop</Button>
      <div>
        {words.map((word, i) => {
          const color = `rgba(0, 0, 0, ${i === words.length - 1 ? '0.2' : '1.0'})`
          return <Word key={i} color={color}>{word}</Word>
        })}
      </div>
    </Layout>
  )
}

export default IndexPage
