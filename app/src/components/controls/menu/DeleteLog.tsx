import React from 'react'
import { DropupImg, DropupItem } from '../base/Dropup'

type Props = {
  isModalOpen: boolean
  openModal: () => void
}

const DeleteLog: React.FC<Props> = ({ isModalOpen, openModal }) => {
  return (
    <DropupItem type="button" isPressed={isModalOpen} onClick={openModal}>
      <DropupImg src="/dropup/trash.svg" alt="ログの削除" />
      {'ログの削除'}
    </DropupItem>
  )
}

export default DeleteLog
