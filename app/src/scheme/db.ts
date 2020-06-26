import firebase from 'firebase'

export type WordData = firebase.firestore.DocumentData & {
  text: string
  updatedAt: firebase.firestore.Timestamp
}
