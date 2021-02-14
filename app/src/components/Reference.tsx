import React, { useEffect, useState } from 'react'
import request from '../utils/request'

type Props = {
  word: string
}

type WikipediaResponse = {
  query: {
    pages: {
      [key: number]: {
        extract?: string
      }
    }
  }
}

const Reference: React.FC<Props> = ({ word }) => {
  const [reference, setReference] = useState<string>('')

  useEffect(() => {
    if (word === '') return
    const search = async () => {
      const response = await request.get(
        `https://ja.wikipedia.org/w/api.php?` +
          `format=json&` +
          `action=query&` +
          `prop=extracts&` +
          `origin=*&` +
          `explaintext&` +
          `exintro&` +
          `titles=${word}`
      )
      const responseJson: WikipediaResponse = await response.json()
      const page = Object.values(responseJson.query.pages)[0]
      setReference(page.extract || '[単語の意味が見つかりませんでした]')
    }
    search()
  }, [word])

  return (
    <div>
      <p>{word}</p>
      <p>{reference}</p>
    </div>
  )
}

export default Reference
