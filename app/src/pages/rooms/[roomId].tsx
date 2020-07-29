import React, { useState } from 'react'
import Layout from '../../components/Layout'
import Reference from '../../components/Reference'
import { GetServerSideProps } from 'next'
import Router from 'next/router'
import Control from '../../components/Control'
import { PageFC } from '../../scheme/pages'
import { useLocalStorage } from '../../utils/storage'
import { UserStorage } from '../../scheme/storage'
import Caption from '../../components/Caption'
import styled from 'styled-components'
import colors from '../../config/colors'

export const GridContainer = styled.div`
  // https://stackoverflow.com/questions/44488357/equal-height-rows-in-css-grid-layout
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-rows: 1fr;
  width: 100vw;
  height: 100vh;
  background-color: ${colors.borders.right}; // RightBoxの丸角を埋めるため
`

const Box = styled.div`
  padding: 1rem;
  box-sizing: border-box;
  background-color: white;
`

const LeftBox = styled(Box)``

const RightBox = styled(Box)`
  border-left: solid 1rem ${colors.borders.right};
  border-right: solid 1rem ${colors.borders.right};
  border-radius: 1.5rem;
`

export const LeftTopBox = styled(LeftBox)`
  border-top: solid 1rem ${colors.borders.left};
  grid-column: 1 / 2;
  grid-row: 1 / 9;
`

export const LeftBottomBox = styled(LeftBox)`
  background-color: ${colors.borders.left};
  grid-column: 1 / 2;
  grid-row: 9 / 10;
`

export const RightTopBox = styled(RightBox)`
  border-top: solid 1rem ${colors.borders.right};
  border-bottom: solid 0.5rem ${colors.borders.right};
  grid-column: 2 / 3;
  grid-row: 1 / 2;
`

export const RightBottomBox = styled(RightBox)`
  border-top: solid 0.5rem ${colors.borders.right};
  border-bottom: solid 1rem ${colors.borders.right};
  grid-column: 2 / 3;
  grid-row: 2 / 10;
`

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
