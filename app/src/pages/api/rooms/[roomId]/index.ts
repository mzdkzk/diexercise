import { NextApiHandler } from 'next'
import { ApiData } from '../../../../scheme/api'
import admin from '../../../../utils/firebase-admin'
import { cors } from '../../../../utils/api-middleware'

const handler: NextApiHandler<ApiData> = async (req, res) => {
  await cors(req, res, { methods: ['DELETE'] })
  const db = admin.firestore()

  const wordsRef = db
    .collection('rooms')
    .doc(`${req.query.roomId}`)
    .collection('words')

  const snapshot = await wordsRef.get()
  const batch = db.batch()
  snapshot.docs.forEach(doc => batch.delete(doc.ref))
  await batch.commit()

  res.json({ isSuccess: true })
}

export default handler
