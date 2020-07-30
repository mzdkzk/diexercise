import React from 'react'
import { DropupImg, DropupItem } from '../base/Dropup'

type Props = {
  openModal: () => void
}

const DeleteLog: React.FC<Props> = ({ openModal }) => {
  return (
    <DropupItem type="button" onClick={openModal}>
      <DropupImg src="/dropup/trash.svg" alt="ログの削除" />
      {'ログの削除'}
    </DropupItem>
  )
}

export default DeleteLog
