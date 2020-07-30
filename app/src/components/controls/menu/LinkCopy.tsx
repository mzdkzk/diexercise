import React, { useState } from 'react'
import copy from 'clipboard-copy'
import { DropupImg, DropupItem } from '../base/Dropup'

const LinkCopy: React.FC<{ roomId: string }> = ({ roomId }) => {
  const [copied, setCopied] = useState<boolean>(false)

  const onClickHandler = async () => {
    await copy(`${location.origin}/?roomId=${roomId}`)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <DropupItem type="button" onClick={onClickHandler}>
      <DropupImg src="/dropup/copy.svg" alt="ルームへのリンクを取得" />
      {copied ? 'コピーしました！' : 'ルームへのリンクを取得'}
    </DropupItem>
  )
}

export default LinkCopy
