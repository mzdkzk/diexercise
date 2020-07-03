import React from 'react'
import { Button, Layout } from '../components'
import Link from 'next/link'

const IndexPage: React.FC = () => {
  const onChangeHandler = () => {}
  return (
    <Layout>
      <h1>トークルームを作成</h1>
      <input onChange={onChangeHandler} placeholder="管理者名を入力" />
      <Button>作成</Button>
      <Link href="/rooms/[roomId]" as="/rooms/test">
        <a>テスト用ルーム</a>
      </Link>
    </Layout>
  )
}

export default IndexPage
