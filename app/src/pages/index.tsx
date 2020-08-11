import React, { useState } from 'react'
import Router, { useRouter } from 'next/router'
import request from '../utils/request'
import { ApiData } from '../scheme/api'
import Layout from '../components/Layout'
import { PageFC } from '../scheme/pages'
import firebase from '../utils/firebase'
import { useLocalStorage } from '../utils/storage'
import { UserStorage } from '../scheme/storage'
import styled from 'styled-components'
import colors from '../config/colors'

const Title = styled.h1`
  margin-top: 10rem;
  font-size: 3rem;
  line-height: 3rem;
  img {
    max-width: 30rem;
  }
`

const Button = styled.button`
  background-color: ${colors.buttons.default};
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  min-width: 5rem;
  padding: 1rem 2rem;
  border-radius: 1rem;
  margin-top: 2rem;
  &,
  * {
    color: ${colors.buttons.text};
  }
  &:hover {
    background-color: ${colors.buttons.hover};
  }
`

const Input = styled.input`
  font-size: 1.2rem;
  text-align: initial;
  min-width: 30rem;
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  margin-top: 3rem;
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
    const credential = await firebase.auth().signInAnonymously()
    if (!roomId) {
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
      <Title>
        <img src="/title.svg" />
      </Title>
      <form onSubmit={onSubmitHandler}>
        <Input
          onChange={onChangeHandler}
          value={userStorage.name}
          placeholder="ユーザー名を入力"
          required
        />
        <br />
        <Button type="submit">
          {'ルーム'}
          {roomId ? 'に入室' : 'を作成'}
          {isLoading ? '中...' : ''}
        </Button>
      </form>
    </Layout>
  )
}

export default IndexPage
