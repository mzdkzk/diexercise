import * as firebase from 'firebase/app'
import 'firebase/firestore'

if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey: 'AIzaSyDzIPpjGZx1p1hniXZHMtjjtmQi_GkDIt0',
    authDomain: 'live-reference.firebaseapp.com',
    databaseURL: 'https://live-reference.firebaseio.com',
    projectId: 'live-reference',
    storageBucket: 'live-reference.appspot.com',
    messagingSenderId: '224497228747',
    appId: '1:224497228747:web:c44eca51ed2b379610f44e'
  }
  firebase.initializeApp(firebaseConfig)
}

export default firebase.firestore()
