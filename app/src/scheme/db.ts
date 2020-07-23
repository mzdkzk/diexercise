import firebase from 'firebase'
import { UserStorage } from './storage'

export type WordData = firebase.firestore.DocumentData & {
  user: UserStorage
  text: string
  updatedAt: firebase.firestore.Timestamp
}

export type RoomData = firebase.firestore.DocumentData & {
  owner: UserStorage
  createdAt: firebase.firestore.Timestamp
}
