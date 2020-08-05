import React, { useRef, useState } from 'react'
import { DropupImg, DropupItem } from '../base/Dropup'
import firebase from '../../../utils/firebase'
import { WordData } from '../../../scheme/db'

const convertTextToURL = (text: string) => {
  const blob = new Blob([text], {
    type: 'text/plain'
  })
  return URL.createObjectURL(blob)
}

const ExportLog: React.FC<{ roomId: string }> = ({ roomId }) => {
  const [downloading, setDownloading] = useState<boolean>(false)
  const anchorRef = useRef<HTMLAnchorElement>(null)

  const onClickHandler = async () => {
    setDownloading(true)
    const db = firebase.firestore()
    const words = await db
      .collection('rooms')
      .doc(`${roomId}`)
      .collection('words')
      .orderBy('updatedAt', 'desc')
      .get()
    let output = `<h1>ルームID:${roomId}</h1>`
    words.forEach(word => {
      const wordData = word.data() as WordData
      wordData.text = wordData.text.replace(
        /\[(.+?)\]/g,
        '<a href="https://google.com/search?q=$1" target="_blank">$1</a>'
      )
      output += `<h3>${wordData.user.name}</h3><p>${wordData.text}</p>`
    })
    anchorRef.current!.href = convertTextToURL(output)
    anchorRef.current!.click()
    setTimeout(() => {
      setDownloading(false)
    }, 2000)
  }

  return (
    <>
      <DropupItem type="button" onClick={onClickHandler}>
        <DropupImg src="/dropup/export.svg" alt="ルームへのリンクを取得" />
        {downloading ? '書き出しました！' : 'ログの書き出し'}
      </DropupItem>
      <a
        ref={anchorRef}
        style={{ display: 'none' }}
        download={`output_${roomId}.html`}
      />
    </>
  )
}

export default ExportLog
