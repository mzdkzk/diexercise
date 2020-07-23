import { NextApiHandler } from 'next'
import { ApiData } from '../../../scheme/api'
import admin from '../../../utils/firebase-admin'
import { cors } from '../../../utils/api-middleware'

const handler: NextApiHandler<ApiData> = async (req, res) => {
  await cors(req, res, { methods: ['POST'] })
  const db = admin.firestore()
  const { owner, uid } = req.body
  const roomRef = await db.collection('rooms').add({
    owner,
    uid,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  })
  res.json({ isSuccess: true, body: { roomId: roomRef.id } })
}

export default handler
