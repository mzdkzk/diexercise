import admin from 'firebase-admin'
import fs from 'fs'
import path from 'path'

if (!admin.apps.length) {
  const serviceAccountKey = fs.readFileSync(
    path.join(process.env.ROOT!, 'serviceAccountKey.json')
  )
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(serviceAccountKey.toString())),
    databaseURL: 'https://live-reference.firebaseio.com'
  })
}

export default admin
