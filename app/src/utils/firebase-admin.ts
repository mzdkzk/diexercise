import admin from 'firebase-admin'
import fs from 'fs'
import path from 'path'

if (!admin.apps.length) {
  let serviceAccountKey: Buffer | undefined
  try {
    serviceAccountKey = fs.readFileSync(
      path.join(process.env.ROOT!, 'serviceAccountKey.json')
    )
  } catch (e) {
    serviceAccountKey = Buffer.from(
      process.env.FIREBASE_SA_KEY_BASE64!,
      'base64'
    )
  }
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(serviceAccountKey.toString())),
    databaseURL: 'https://live-reference.firebaseio.com'
  })
}

export default admin
