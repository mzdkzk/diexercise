import React, { useEffect, useState } from 'react'
import { Word } from '../../components'
import firebase from '../../utils/firebase'
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
import Control from '../../components/Control'
import { PageFC } from '../../scheme/pages'
import { useLocalStorage } from '../../utils/storage'
import { UserStorage } from '../../scheme/storage'

const RoomPage: PageFC<{ roomId: string }> = ({ roomId }) => {
  const [userStorage] = useLocalStorage<UserStorage>('live-reference.user')
  const [storedWords, setStoredWords] = useState<string[]>([''])
  const [refWord, setRefWord] = useState<string>('')

  const db = firebase.firestore()
  const wordsRef = db.collection('rooms').doc(`${roomId}`).collection('words')

  useEffect(() => {
    const unsubscribe = wordsRef.orderBy('updatedAt').onSnapshot(snapshot => {
      setStoredWords(snapshot.docs.map(doc => (doc.data() as WordData).text))
    })
    return () => unsubscribe()
  }, [])

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
          <Control roomId={roomId} user={userStorage} />
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
