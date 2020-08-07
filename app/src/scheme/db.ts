import firebase from 'firebase'
import { UserStorage } from './storage'

export type WordData = firebase.firestore.DocumentData & {
  user: UserStorage
  text: string
  updatedAt: firebase.firestore.Timestamp
}

export type RoomData = firebase.firestore.DocumentData & {
  owner: UserStorage
  uid: string
  createdAt: firebase.firestore.Timestamp
}

export type MemberData = firebase.firestore.DocumentData & {
  user: UserStorage
  updatedAt: firebase.firestore.Timestamp
}
