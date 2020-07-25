import React, { useState } from 'react'
import Router, { useRouter } from 'next/router'
import request from '../utils/request'
import { ApiData } from '../scheme/api'
import { Input, Button } from '../components/forms'
import { Layout } from '../components/layouts'
import { PageFC } from '../scheme/pages'
import firebase from '../utils/firebase'
import { useLocalStorage } from '../utils/storage'
import { UserStorage } from '../scheme/storage'
import styled from 'styled-components'

const Title = styled.h1`
  margin-top: 10rem;
  font-size: 3rem;
  line-height: 3rem;
`

const NameInput = styled(Input)`
  min-width: 30rem;
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  margin-top: 3rem;
`

const NameButton = styled(Button)`
  padding: 1rem 2rem;
  border-radius: 1rem;
  margin-top: 2rem;
`

const IndexPage: PageFC = () => {
  const [userStorage, setUserStorage] = useLocalStorage<UserStorage>(
    'live-reference.user',
    { name: '' }
  )
  const [isLoading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const { roomId } = router.query

  const onChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setUserStorage({ name: e.currentTarget.value })
  }

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    if (!roomId) {
      const credential = await firebase.auth().signInAnonymously()
      const response = await request.post('/api/rooms', {
        json: { owner: userStorage, uid: credential.user!.uid }
      })
      const responseJson: ApiData = await response.json()
      Router.push('/rooms/[roomId]', `/rooms/${responseJson.body!.roomId}`)
    } else {
      Router.push('/rooms/[roomId]', `/rooms/${roomId}`)
    }
  }

  return (
    <Layout>
      <Title>Live※Reference</Title>
      <form onSubmit={onSubmitHandler}>
        <NameInput
          onChange={onChangeHandler}
          value={userStorage.name}
          placeholder="ユーザー名を入力"
          required
        />
        <br />
        <NameButton type="submit">
          {'ルーム'}
          {roomId ? 'に入室' : 'を作成'}
          {isLoading ? '中...' : ''}
        </NameButton>
      </form>
    </Layout>
  )
}

export default IndexPage
