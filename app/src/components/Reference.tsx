import React, { useEffect, useState } from 'react'
import request from '../utils/request'

type Props = {
  word: string
}

const Reference: React.FC<Props> = ({ word }) => {
  const [reference, setReference] = useState<string>('')

  useEffect(() => {
    if (word === '') return
    const search = async () => {
      const response = await request.get(`/api/reference?word=${word}`)
      const responseJson = await response.json()
      if (responseJson.body) {
        setReference(responseJson.body.text)
      }
    }
    search()
  }, [word])

  return (
    <div>
      <p>{word}</p>
      <p>{reference}</p>
      <p>
        {word ? (
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.google.com/search?q=${word}`}>
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
