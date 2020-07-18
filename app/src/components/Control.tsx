import React, { useEffect, useState } from 'react'
import request from '../utils/request'
import { ControlButton, ControlContainer } from './controls'
import firebase from '../utils/firebase'

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

const Control: React.FC<{ roomId: string }> = ({ roomId }) => {
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null)
  const [isRecording, setIsRecording] = useState<boolean>(false)

  const db = firebase.firestore()
  const wordsRef = db.collection('rooms').doc(roomId).collection('words')

  // アンマウント時に音声入力を停止
  useEffect(() => {
    const recognition = getRecognition()
    if (!recognition) {
      alert('このブラウザは音声入力に対応していません')
      return
    } else {
      setRecognition(recognition)
    }
    return () => stopRecord()
  }, [])

  let wordId: string | undefined

  const startRecord = () => {
    if (!recognition) {
      alert('このブラウザは音声入力に対応していません')
      return
    }
    const onResult = async (e: SpeechRecognitionEvent) => {
      const result = e.results[e.resultIndex][0].transcript
      if (e.results[e.resultIndex].isFinal) {
        await request.post(`/api/rooms/${roomId}/${wordId}`, {
          json: { text: result }
        })
      } else {
        wordId = wordId || `${+new Date()}`
        await wordsRef.doc(wordId).set(
          {
            text: result,
            updatedAt: new Date()
          },
          { merge: true }
        )
      }
    }
    recognition.addEventListener('result', onResult)
    recognition.start()
    setIsRecording(true)
  }

  const stopRecord = () => {
    if (recognition) {
      recognition.stop()
    }
    setIsRecording(false)
  }

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
