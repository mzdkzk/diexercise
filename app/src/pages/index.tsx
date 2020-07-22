import React, { useState } from 'react'
import { Button } from '../components'
import Link from 'next/link'
import Router from 'next/router'
import request from '../utils/request'
import { ApiData } from '../scheme/api'
import { Form, Input } from '../components/forms'
import { Layout } from '../components/layouts'
import { PageFC } from '../scheme/pages'
import firebase from '../utils/firebase'

const IndexPage: PageFC = () => {
  const [ownerName, setOwnerName] = useState<string>('')
  const [isLoading, setLoading] = useState<boolean>(false)
  const onChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setOwnerName(e.currentTarget.value)
  }
  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const response = await request.post('/api/rooms', {
      json: { ownerName }
    })
    await firebase.auth().signInAnonymously()
    const responseJson: ApiData = await response.json()
    Router.push('/rooms/[roomId]', `/rooms/${responseJson.body!.roomId}`)
  }
  return (
    <Layout>
      <h1>Live※Reference</h1>
      <Form onSubmit={onSubmitHandler}>
        <Input
          onChange={onChangeHandler}
          placeholder="ユーザー名を入力してルームを作成"
          required
        />
        <Button type="submit">{isLoading ? '作成中...' : '作成'}</Button>
      </Form>
      <Link href="/rooms/[roomId]" as="/rooms/test">
        <a>テスト用ルーム</a>
      </Link>
    </Layout>
  )
}

export default IndexPage
