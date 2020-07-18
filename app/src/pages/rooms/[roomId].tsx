import React, { useEffect, useState } from 'react'
import { Word } from '../../components'
import firebase from '../../utils/firebase'
import request from '../../utils/request'
import { WordData } from '../../scheme/db'
import {
  GridContainer,
  Layout,
  LeftBottomBox,
  LeftTopBox,
  RightBottomBox,
  RightTopBox
} from '../../components/layouts'
import reactStringReplace from 'react-string-replace'
import Reference from '../../components/Reference'
import { GetServerSideProps } from 'next'
import { ControlButton, ControlContainer } from '../../components/controls'

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

const RoomPage: React.FC<{ roomId: string }> = ({ roomId }) => {
  const [storedWords, setStoredWords] = useState<string[]>([''])
  const [refWord, setRefWord] = useState<string>('')

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
        request.post(`/api/rooms/${roomId}/${currentWordId}`, {
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
    request.delete(`/api/rooms/${roomId}`)
  }

  return (
    <Layout title={`ルーム[ID: ${roomId}]`}>
      <GridContainer>
        <LeftTopBox>
          <div>
            {storedWords.map((word, i) => {
              const children = reactStringReplace(
                word,
                /\[(.+?)\]/g,
                (match, i) => (
                  <a href="#" key={i} onClick={() => setRefWord(match)}>
                    {match}
                  </a>
                )
              )
              return <Word key={i}>{children}</Word>
            })}
          </div>
        </LeftTopBox>
        <LeftBottomBox>
          <ControlContainer>
            <ControlButton>
              <img onClick={stopRecord} src="/menu.svg" />
            </ControlButton>
            <ControlButton>
              <img onClick={start} src="/microphone.svg" />
            </ControlButton>
            <ControlButton>
              <img onClick={deleteData} src="/members.svg" />
            </ControlButton>
          </ControlContainer>
        </LeftBottomBox>
        <RightTopBox>
          {refWord}
          {refWord ? (
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://www.google.com/search?q=${refWord}`}>
              Google検索へ
            </a>
          ) : (
            ''
          )}
        </RightTopBox>
        <RightBottomBox>
          <Reference word={refWord} />
        </RightBottomBox>
      </GridContainer>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const roomId = `${params!.roomId}`
  return {
    props: { roomId }
  }
}

export default RoomPage
