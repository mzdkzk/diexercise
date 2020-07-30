import React, { useState } from 'react'
import Dropup from './base/Dropup'
import LinkCopy from './menu/LinkCopy'
import DeleteLog from './menu/DeleteLog'
import DeleteModal from './menu/modal/DeleteModal'

const MenuDropup: React.FC<{ roomId: string }> = ({ roomId }) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)

  return (
    <>
      <Dropup buttonImgSrc="/menu.svg" buttonImgAlt="メニューボタン">
        <LinkCopy roomId={roomId} />
        <DeleteLog openModal={() => setDeleteModalOpen(true)} />
      </Dropup>
      <DeleteModal
        roomId={roomId}
        isOpen={isDeleteModalOpen}
        modalClose={() => setDeleteModalOpen(false)}
      />
    </>
  )
}

export default MenuDropup
