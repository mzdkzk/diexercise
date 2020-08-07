import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import Dropup, { DropupItem } from './base/Dropup'
import firebase from '../../utils/firebase'
import { MemberData } from '../../scheme/db'
import { UserStorage } from '../../scheme/storage'

type Props = {
  roomId: string
  user: firebase.User | undefined
  userStorage: UserStorage
}

const MembersDropup: React.FC<Props> = ({ roomId, user, userStorage }) => {
  const [members, setMembers] = useState<MemberData[]>([])
  const db = firebase.firestore()
  const membersRef = db.collection('rooms').doc(roomId).collection('members')

  useEffect(() => {
    if (!user) return
    // 5秒間隔で各クライアントからメンバー情報の更新処理を行い
    // メンバー情報を取得した際に10秒間更新がなかったユーザーを退出したものとみなす
    const intervalId = setInterval(() => {
      membersRef.doc(user.uid).set({
        user: userStorage,
        updatedAt: dayjs().toDate()
      })
    }, 3000)
    const unsubscribe = membersRef.onSnapshot(snapshot => {
      const currentMembers = snapshot.docs
        .map(member => member.data() as MemberData)
        .filter(memberData => {
          const memberUpdatedAt = memberData.updatedAt.toDate()
          const fewSecondsAgo = dayjs().subtract(10, 'second').toDate()
          return memberUpdatedAt > fewSecondsAgo
        })
      setMembers(currentMembers)
    })
    return () => {
      clearInterval(intervalId)
      unsubscribe()
    }
  }, [user])

  return (
    <Dropup buttonImgSrc="/control/members.svg" buttonImgAlt="メニューボタン">
      {members.map((member, i) => (
        <DropupItem key={i}>{member.user.name}</DropupItem>
      ))}
    </Dropup>
  )
}

export default MembersDropup
