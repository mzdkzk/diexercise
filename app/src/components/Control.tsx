import React, { useEffect, useState } from 'react'
import request from '../utils/request'
import firebase from '../utils/firebase'
import { UserStorage } from '../scheme/storage'
import styled from 'styled-components'
import colors from '../config/colors'
import MenuDropup from './controls/MenuDropup'
import MembersDropup from './controls/MemberDropup'

const ControlContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
`

const ControlButton = styled.button<{ isPressed?: boolean }>`
  background-color: ${({ isPressed }) =>
    isPressed ? colors.dropup.pressed : colors.dropup.default};
  width: 4rem;
  height: 4rem;
  cursor: pointer;
  img {
    width: 3rem;
    height: 3rem;
  }
`

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
  user: firebase.User | undefined
  userStorage: UserStorage
}

const Control: React.FC<Props> = ({ roomId, user, userStorage }) => {
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
    <ControlContainer>
      <MenuDropup roomId={roomId} />
      <ControlButton
        isPressed={isRecording}
        onClick={() => {
          if (isRecording) {
            stopRecord()
          } else {
            startRecord()
          }
        }}>
        <img src="/control/microphone.svg" />
      </ControlButton>
      <MembersDropup roomId={roomId} user={user} userStorage={userStorage} />
    </ControlContainer>
  )
}

export default Control
