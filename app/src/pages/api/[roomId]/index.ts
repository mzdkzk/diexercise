import { NextApiRequest, NextApiResponse } from 'next'
import { ApiData } from '../../../scheme/api'
import admin from '../../../utils/firebase-admin'

const handler = async (req: NextApiRequest, res: NextApiResponse<ApiData>) => {
  const db = admin.firestore()
  const wordsRef = db
    .collection('rooms')
    .doc(`${req.query.roomId}`)
    .collection('words')

  wordsRef.get().then(snapshot => {
    const batch = db.batch()
    snapshot.docs.forEach(doc => batch.delete(doc.ref))
    batch.commit()
  })

  res.json({ isSuccess: true })
}

export default handler
