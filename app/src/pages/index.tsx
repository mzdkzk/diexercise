import React, { useEffect, useState } from 'react'
import { Word, Button, Layout } from '../components'

const getRecognition = (): SpeechRecognition | null => {
  try {
    const SpeechRecognition =
      (window as any).webkitSpeechRecognition ||
      (window as any).SpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.lang = 'ja-JP'
    recognition.interimResults = true
    recognition.continuous = true
    return recognition
  } catch (e) {
    return null
  }
}

export const IndexPage: React.FC = () => {
  const [words, setWords] = useState<string[]>([''])
  let mediaStream: MediaStream | undefined

  const recognition = getRecognition()

  useEffect(() => {
    return stopRecord
  }, [])

  const start = () => {
    if (recognition) {
      navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then(stream => {
          mediaStream = stream
          recognition.addEventListener('result', e => {
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
    } else {
      alert('このブラウザは音声入力に対応していません')
    }
  }

  const stopRecord = () => {
    if (recognition) {
      recognition.stop()
    }
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop())
      mediaStream = undefined
    }
  }

  return (
    <Layout>
      <Button onClick={start}>Start</Button>
      <Button
        onClick={() => {
          setWords([])
          stopRecord()
        }}>
        Stop
      </Button>
      <div>
        {words.map((word, i) => {
          const color = `rgba(0, 0, 0, ${
            i === words.length - 1 ? '0.2' : '1.0'
          })`
          return (
            <Word key={i} color={color}>
              {word}
            </Word>
          )
        })}
      </div>
    </Layout>
  )
}

export default IndexPage
