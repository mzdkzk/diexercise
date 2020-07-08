import React, { useEffect, useState } from 'react'
import request from '../utils/request'

type Props = {
  word: string
}

type ReferenceData = {
  body: string
  url: string
}

const Reference: React.FC<Props> = ({ word }) => {
  const [reference, setReference] = useState<ReferenceData | null>(null)

  useEffect(() => {
    if (word === '') return
    const search = async () => {
      const response = await request.get(`/api/reference?word=${word}`)
      const responseJson = await response.json()
      setReference(responseJson.body || null)
    }
    search()
  }, [word])

  return (
    <div>
      <p>{word}</p>
      <p>{reference && reference.body}</p>
      <p>
        {reference ? (
          <a target="_blank" rel="noreferrer" href={reference.url}>
            Google検索へ
          </a>
        ) : (
          ''
        )}
      </p>
    </div>
  )
}

export default Reference
