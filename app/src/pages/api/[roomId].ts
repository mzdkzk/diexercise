import admin from 'firebase-admin'
import { NextApiRequest, NextApiResponse } from 'next'
import { ApiData } from '../../type/api'
import firestore from '../../utils/firestore-admin'

const handler = async (req: NextApiRequest, res: NextApiResponse<ApiData>) => {
  const roomDoc = firestore.collection('rooms').doc(`${req.query.roomId}`)
  roomDoc.collection('words').add({
    text: req.body.text,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  })

  res.json({ isSuccess: true })
}

export default handler
