import React from 'react'
import Dropup from './base/Dropup'
import LinkCopy from './menu/LinkCopy'

const MenuDropup: React.FC<{ roomId: string }> = ({ roomId }) => {
  return (
    <Dropup buttonImgSrc="/menu.svg" buttonImgAlt="メニューボタン">
      <LinkCopy roomId={roomId} />
    </Dropup>
  )
}

export default MenuDropup
