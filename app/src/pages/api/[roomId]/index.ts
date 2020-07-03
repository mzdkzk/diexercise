import { NextApiHandler } from 'next'
import { ApiData } from '../../../scheme/api'
import admin from '../../../utils/firebase-admin'
import { cors } from '../../../utils/api-middleware'

const handler: NextApiHandler<ApiData> = async (req, res) => {
  await cors(req, res, { methods: ['POST', 'DELETE'] })
  const db = admin.firestore()

  const handlePOST = async () => {
    const roomRef = await db.collection('rooms').add({
      ownerName: req.body.ownerName,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    })
    res.json({ isSuccess: true, body: { roomId: roomRef.id } })
  }

  const handleDELETE = async () => {
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

  switch (req.method) {
    case 'POST':
      await handlePOST()
      break
    case 'DELETE':
      await handleDELETE()
      break
  }
}

export default handler
