import React, { useEffect, useState } from 'react'
import request from '../utils/request'
import { ControlButton, ControlContainer } from './controls'
import firebase from '../utils/firebase'
import { UserStorage } from '../scheme/storage'

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

type Props = {
  roomId: string
  user: UserStorage
}

const Control: React.FC<Props> = ({ roomId, user }) => {
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null)

  const db = firebase.firestore()
  const wordsRef = db.collection('rooms').doc(roomId).collection('words')

  // アンマウント時に音声入力を停止
  useEffect(() => {
    return () => stopRecord()
  }, [])

  let wordId: string | undefined

  const startRecord = () => {
    const recognition = getRecognition()
    if (!recognition) {
      alert('このブラウザは音声入力に対応していません')
      return
    }
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
            .set({ user, text, updatedAt: new Date() }, { merge: true })
        }
      }
    }
    recognition.addEventListener('result', onResult)
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
    <ControlContainer>
      <ControlButton>
        <img src="/menu.svg" />
      </ControlButton>
      <ControlButton
        isPressed={isRecording}
        onClick={() => {
          if (isRecording) {
            stopRecord()
          } else {
            startRecord()
          }
        }}>
        <img src="/microphone.svg" />
      </ControlButton>
      <ControlButton>
        <img src="/members.svg" />
      </ControlButton>
    </ControlContainer>
  )
}

export default Control
