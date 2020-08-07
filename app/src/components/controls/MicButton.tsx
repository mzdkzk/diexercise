import React, { useEffect, useState } from 'react'
import firebase from '../../utils/firebase'
import request from '../../utils/request'
import { UserStorage } from '../../scheme/storage'
import Button from './base/Button'

const getRecognition = (
  onResult: (e: SpeechRecognitionEvent) => void
): SpeechRecognition | null => {
  const SpeechRecognition = (window as any).webkitSpeechRecognition
  if (typeof SpeechRecognition === 'undefined') {
    return null
  }
  const recognition: SpeechRecognition = new SpeechRecognition()
  recognition.lang = 'ja-JP'
  recognition.interimResults = true
  recognition.continuous = true
  recognition.addEventListener('result', onResult)
  recognition.addEventListener('error', e => {
    console.log(`[SpeechRecognition] errorイベント(${e.error})`)
    if (e.error === 'no-speech') {
      recognition.start()
      console.log(`[SpeechRecognition] 再開しました`)
    }
  })
  recognition.addEventListener('speechend', () => {
    console.log('[SpeechRecognition] speechendイベント')
    setTimeout(() => {
      try {
        recognition.start()
        console.log('[SpeechRecognition] 再開しました')
      } catch (e) {
        console.log('[SpeechRecognition] 再開しようとしてエラーになりました')
      }
    }, 500)
  })
  return recognition
}

type Props = {
  roomId: string
  userStorage: UserStorage
}

const MicButton: React.FC<Props> = ({ roomId, userStorage }) => {
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null)

  const db = firebase.firestore()
  const wordsRef = db.collection('rooms').doc(roomId).collection('words')

  // アンマウント時に音声入力を停止
  useEffect(() => {
    return () => stopRecord()
  }, [])

  let wordId: string | undefined
  const onResult = async (e: SpeechRecognitionEvent) => {
    const text = e.results[e.resultIndex][0].transcript
    if (e.results[e.resultIndex].isFinal) {
      await request.post(`/api/rooms/${roomId}/${wordId}`, {
        json: { text }
      })
      wordId = undefined
    } else {
      wordId = wordId || `${+new Date()}`
      // Firestoreへの書き込み数削減のために奇数文字ずつDBに適用
      if (text.length % 2 === 1) {
        await wordsRef
          .doc(wordId)
          .set(
            { user: userStorage, text, updatedAt: new Date() },
            { merge: true }
          )
      }
    }
  }

  const startRecord = () => {
    const recognition = getRecognition(onResult)
    if (recognition == null) {
      alert('このブラウザは音声入力に対応していません')
      return
    }
    recognition.start()
    setRecognition(recognition)
  }

  const stopRecord = () => {
    if (recognition) {
      recognition.stop()
    }
    setRecognition(null)
  }

  const isRecording = recognition !== null
  return (
    <Button
      isPressed={isRecording}
      onClick={() => {
        if (isRecording) {
          stopRecord()
        } else {
          startRecord()
        }
      }}>
      <img src="/control/microphone.svg" />
    </Button>
  )
}

export default MicButton
