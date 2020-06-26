import firebase from 'firebase'

export type WordData = firebase.firestore.DocumentData & {
  text: string
  createdAt: firebase.firestore.Timestamp
}
