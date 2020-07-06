import React, { useState } from 'react'
import { Button, Layout } from '../components'
import Link from 'next/link'
import Router from 'next/router'
import request from '../utils/request'
import { ApiData } from '../scheme/api'
import { Form, Input } from '../components/forms'

const IndexPage: React.FC = () => {
  const [ownerName, setOwnerName] = useState<string>('')
  const onChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setOwnerName(e.currentTarget.value)
  }
  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await request.post('/rooms', {
      json: { ownerName }
    })
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
        <Button type="submit">作成</Button>
      </Form>
      <Link href="/rooms/[roomId]" as="/rooms/test">
        <a>テスト用ルーム</a>
      </Link>
    </Layout>
  )
}

export default IndexPage
