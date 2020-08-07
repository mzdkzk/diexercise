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
`

const ScrollbarContainer = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
  padding-right: 0.5rem;
  ::-webkit-scrollbar {
    width: 0.8rem;
  }
  ::-webkit-scrollbar-track {
    background-color: ${colors.scrollBar.track};
    border-radius: 1rem;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${colors.scrollBar.thumb};
    border-radius: 1rem;
  }
`

const ReferenceWord = styled.div`
  font-weight: bold;
  color: ${colors.text.bold};
  font-size: 1.8rem;
  padding-bottom: 1rem;
  letter-spacing: 0.2em;
`

const ReferenceDetail = styled.div`
  font-family: 'メイリオ', 'Meiryo', 'ＭＳ ゴシック',
    'Hiragino Kaku Gothic ProN', 'ヒラギノ角ゴ ProN W3', sans-serif;
  font-size: 1.2rem;
  color: ${colors.text.detail};
  line-height: 1.5;
  word-break: normal;
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
  border-radius: 1.5rem 1.5rem 1rem 1rem;
`

export const RightBottomBox = styled(RightBox)`
  border-top: solid 0.5rem ${colors.borders.right};
  border-bottom: solid 1rem ${colors.borders.right};
  grid-column: 2 / 3;
  grid-row: 2 / 10;
  border-radius: 1rem 1rem 1.5rem 1.5rem;
`

const RoomPage: PageFC<{ roomId: string }> = ({ roomId, user }) => {
  const [userStorage] = useLocalStorage<UserStorage>('live-reference.user')
  if (typeof window !== 'undefined' && !userStorage) {
    Router.push(`/?roomId=${roomId}`)
  }
  const [refWord, setRefWord] = useState<string>('')

  return (
    <Layout title={`ルーム[ID: ${roomId}]`}>
      <GridContainer>
        <LeftTopBox>
          <ScrollbarContainer>
            <Caption roomId={roomId} onClickWord={word => setRefWord(word)} />
          </ScrollbarContainer>
        </LeftTopBox>
        <LeftBottomBox>
          <Control roomId={roomId} user={user} userStorage={userStorage} />
        </LeftBottomBox>
        <RightTopBox>
          <ReferenceWord>{refWord}</ReferenceWord>
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
          <ScrollbarContainer>
            <ReferenceDetail>
              <Reference word={refWord} />
            </ReferenceDetail>
          </ScrollbarContainer>
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
