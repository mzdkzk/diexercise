import React, { useState } from 'react'
import { Button } from '../components'
import Router, { useRouter } from 'next/router'
import request from '../utils/request'
import { ApiData } from '../scheme/api'
import { Form, Input } from '../components/forms'
import { Layout } from '../components/layouts'
import { PageFC } from '../scheme/pages'
import firebase from '../utils/firebase'
import { useLocalStorage } from '../utils/storage'
import { UserStorage } from '../scheme/storage'

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
        json: { ownerName: userStorage, uid: credential.user!.uid }
      })
      const responseJson: ApiData = await response.json()
      Router.push('/rooms/[roomId]', `/rooms/${responseJson.body!.roomId}`)
    } else {
      Router.push('/rooms/[roomId]', `/rooms/${roomId}`)
    }
  }

  return (
    <Layout>
      <h1>Live※Reference</h1>
      <Form onSubmit={onSubmitHandler}>
        <Input
          onChange={onChangeHandler}
          value={userStorage.name}
          placeholder="ユーザー名を入力"
          required
        />
        <Button type="submit">
          {'ルーム'}
          {roomId ? 'に入室' : 'を作成'}
          {isLoading ? '中...' : ''}
        </Button>
      </Form>
    </Layout>
  )
}

export default IndexPage
