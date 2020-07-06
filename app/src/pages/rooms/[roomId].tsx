import React, { useEffect, useState } from 'react'
import { withRouter, NextRouter } from 'next/router'
import { Word, Button, Layout } from '../../components'
import firebase from '../../utils/firebase'
import request from '../../utils/request'
import { WordData } from '../../scheme/db'

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

const IndexPage: React.FC<{ router: NextRouter }> = ({ router }) => {
  const [storedWords, setStoredWords] = useState<string[]>([''])
  const { roomId } = router.query

  let currentWordId: string | undefined
  let mediaStream: MediaStream | undefined

  const recognition = getRecognition()
  const db = firebase.firestore()
  const wordsRef = db.collection('rooms').doc(`${roomId}`).collection('words')

  useEffect(() => {
    const unsubscribe = wordsRef.orderBy('updatedAt').onSnapshot(snapshot => {
      setStoredWords(snapshot.docs.map(doc => (doc.data() as WordData).text))
    })
    return () => {
      stopRecord()
      unsubscribe()
    }
  }, [])

  const start = async () => {
    if (!recognition) {
      alert('このブラウザは音声入力に対応していません')
      return
    }
    mediaStream = await navigator.mediaDevices.getUserMedia({
      video: false,
      audio: true
    })
    recognition.addEventListener('result', async e => {
      const result = e.results[e.resultIndex][0].transcript
      if (e.results[e.resultIndex].isFinal) {
        request.post(`/rooms/${roomId}/${currentWordId}`, {
          json: { text: result }
        })
        currentWordId = undefined
      } else {
        if (!currentWordId) {
          currentWordId = `${+new Date()}`
        }
        wordsRef.doc(currentWordId).set(
          {
            text: result,
            updatedAt: new Date()
          },
          { merge: true }
        )
      }
    })
    recognition.start()
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
    request.delete(`/rooms/${roomId}`)
  }

  return (
    <Layout>
      <Button onClick={start}>Start</Button>
      <Button onClick={stopRecord}>Stop</Button>
      <Button onClick={deleteData}>Delete</Button>
      <div>
        {storedWords.map((word, i) => (
          <Word key={i}>{word}</Word>
        ))}
      </div>
    </Layout>
  )
}

export default withRouter(IndexPage)
