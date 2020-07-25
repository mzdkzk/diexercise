import React, { useState } from 'react'
import {
  GridContainer,
  Layout,
  LeftBottomBox,
  LeftTopBox,
  RightBottomBox,
  RightTopBox
} from '../../components/layouts'
import Reference from '../../components/Reference'
import { GetServerSideProps } from 'next'
import Router from 'next/router'
import Control from '../../components/Control'
import { PageFC } from '../../scheme/pages'
import { useLocalStorage } from '../../utils/storage'
import { UserStorage } from '../../scheme/storage'
import Caption from '../../components/Caption'

const RoomPage: PageFC<{ roomId: string }> = ({ roomId }) => {
  const [userStorage] = useLocalStorage<UserStorage>('live-reference.user')
  if (typeof window !== 'undefined' && !userStorage.name) {
    Router.push(`/?roomId=${roomId}`)
  }
  const [refWord, setRefWord] = useState<string>('')

  return (
    <Layout title={`ルーム[ID: ${roomId}]`}>
      <GridContainer>
        <LeftTopBox>
          <Caption roomId={roomId} onClickWord={word => setRefWord(word)} />
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
