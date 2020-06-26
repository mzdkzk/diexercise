import admin from 'firebase-admin'

if (!admin.apps.length) {
  const serviceAccount = require('../../serviceAccountKey.json')
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://live-reference.firebaseio.com'
  })
}

export default admin
