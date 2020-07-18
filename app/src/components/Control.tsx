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
  const recognition = getRecognition()
  const [isRecording, setIsRecording] = useState<boolean>(false)

  let currentWordId: string | undefined
  let mediaStream: MediaStream | undefined

  const db = firebase.firestore()
  const wordsRef = db.collection('rooms').doc(roomId).collection('words')

  // アンマウント時に音声入力を停止
  useEffect(() => {
    return () => stopRecord()
  }, [])

  const startRecord = async () => {
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
        await request.post(`/api/rooms/${roomId}/${currentWordId}`, {
          json: { text: result }
        })
        currentWordId = undefined
      } else {
        if (!currentWordId) {
          currentWordId = `${+new Date()}`
        }
        await wordsRef.doc(currentWordId).set(
          {
            text: result,
            updatedAt: new Date()
          },
          { merge: true }
        )
      }
    })
    recognition.start()
    setIsRecording(true)
  }

  const stopRecord = () => {
    if (recognition) {
      recognition.stop()
    }
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop())
      mediaStream = undefined
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
          isRecording ? stopRecord() : startRecord()
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
