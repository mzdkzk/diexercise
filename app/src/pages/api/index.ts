import admin from 'firebase-admin'
import { NextApiRequest, NextApiResponse } from 'next'
import { ApiData } from '../../type/api'

const handler = async (req: NextApiRequest, res: NextApiResponse<ApiData>) => {
  let serviceAccount: {} | undefined
  try {
    serviceAccount = await import('../../../serviceAccountKey.json')
  } catch (e) {
    res.json({ isSuccess: false })
    return
  }

  const firebase = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://live-reference.firebaseio.com'
  })
  const db = firebase.firestore()
  db.collection('words').add({
    text: req.body.text,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  })

  res.json({ isSuccess: true })
}

export default handler
