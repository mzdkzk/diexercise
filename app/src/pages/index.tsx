import React, { useEffect, useState } from 'react'
import { Word, Button, Layout } from '../components'
import firebase from '../utils/firebase'
import request from '../utils/request'
import { WordData } from '../type/db'

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
  const [prevWords, setPrevWords] = useState<string[]>([''])
  const [currentWord, setCurrentWord] = useState<string>('')
  let mediaStream: MediaStream | undefined

  const recognition = getRecognition()

  useEffect(() => {
    const db = firebase.firestore()
    const roomDoc = db.collection('rooms').doc('test')
    const unsubscribe = roomDoc
      .collection('words')
      .orderBy('createdAt')
      .onSnapshot(snapshot => {
        setPrevWords(snapshot.docs.map(doc => (doc.data() as WordData).text))
      })
    return () => {
      stopRecord()
      unsubscribe()
    }
  }, [])

  const start = () => {
    if (recognition) {
      navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then(stream => {
          mediaStream = stream
          recognition.addEventListener('result', e => {
            for (let i = e.resultIndex; i < e.results.length; i++) {
              const result = e.results[i][0].transcript
              if (e.results[i].isFinal) {
                // onSnapshotまでに少しラグがあるため、結果を先に表示
                setCurrentWord('')
                prevWords.push(result)
                setPrevWords(new Array(...prevWords))
                request.post('/api/test', { json: { text: result } })
              } else {
                setCurrentWord(result)
              }
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

  const deleteData = () => {
    request.delete('/api/test')
  }

  return (
    <Layout>
      <Button onClick={start}>Start</Button>
      <Button onClick={stopRecord}>Stop</Button>
      <Button onClick={deleteData}>Delete</Button>
      <div>
        {prevWords.map((word, i) => (
          <Word key={i}>{word}</Word>
        ))}
        <Word color={'rgba(0,0,0,0.3)'}>{currentWord}</Word>
      </div>
    </Layout>
  )
}

export default IndexPage
