import firebase from 'firebase'

export type WordData = firebase.firestore.DocumentData & {
  text: string
  updatedAt: firebase.firestore.Timestamp
}

export type RoomData = firebase.firestore.DocumentData & {
  ownerName: string
  createdAt: firebase.firestore.Timestamp
}
