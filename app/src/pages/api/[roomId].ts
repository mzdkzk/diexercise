import { NextApiRequest, NextApiResponse } from 'next'
import { ApiData } from '../../type/api'
import admin from '../../utils/firebase-admin'

const handler = async (req: NextApiRequest, res: NextApiResponse<ApiData>) => {
  const db = admin.firestore()
  const roomDoc = db.collection('rooms').doc(`${req.query.roomId}`)
  switch (req.method) {
    case 'POST':
      roomDoc.collection('words').add({
        text: req.body.text,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      })
      res.json({ isSuccess: true })
      break
    case 'DELETE':
      roomDoc
        .collection('words')
        .get()
        .then(snapshot => {
          const batch = db.batch()
          snapshot.docs.forEach(doc => batch.delete(doc.ref))
          batch.commit()
        })
      res.json({ isSuccess: true })
      break
  }
}

export default handler
