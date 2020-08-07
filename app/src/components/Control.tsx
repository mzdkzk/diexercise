import React from 'react'
import firebase from '../utils/firebase'
import { UserStorage } from '../scheme/storage'
import styled from 'styled-components'
import MenuDropup from './controls/MenuDropup'
import MembersDropup from './controls/MemberDropup'
import MicButton from './controls/MicButton'

const ControlContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
`

type Props = {
  roomId: string
  user: firebase.User | undefined
  userStorage: UserStorage
}

const Control: React.FC<Props> = ({ roomId, user, userStorage }) => {
  return (
    <ControlContainer>
      <MenuDropup roomId={roomId} />
      <MicButton roomId={roomId} userStorage={userStorage} />
      <MembersDropup roomId={roomId} user={user} userStorage={userStorage} />
    </ControlContainer>
  )
}

export default Control
