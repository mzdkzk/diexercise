import React from 'react'
import Dropup from './base/Dropup'

const MembersDropup: React.FC<{ roomId: string }> = () => {
  return (
    <Dropup
      buttonImgSrc="/control/members.svg"
      buttonImgAlt="メニューボタン"></Dropup>
  )
}

export default MembersDropup
