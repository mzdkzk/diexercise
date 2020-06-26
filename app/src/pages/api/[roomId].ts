import { NextApiRequest, NextApiResponse } from 'next'
import Mecab from 'mecab-async'
import { ApiData } from '../../scheme/api'
import admin from '../../utils/firebase-admin'

const handler = async (req: NextApiRequest, res: NextApiResponse<ApiData>) => {
  const db = admin.firestore()
  const roomDoc = db.collection('rooms').doc(`${req.query.roomId}`)

  const postHandler = () => {
    const mecab = new Mecab()
    mecab.command = 'mecab -d /neologd'
    const result = mecab.parseSyncFormat(req.body.text)
    let text = ''
    result.forEach(item => {
      if (item.lexical === '名詞') {
        text += `[${item.kanji}]`
      } else {
        text += item.kanji
      }
    })
    roomDoc.collection('words').add({
      text,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    })
    res.json({ isSuccess: true })
  }

  const deleteHandler = () => {
    roomDoc
      .collection('words')
      .get()
      .then(snapshot => {
        const batch = db.batch()
        snapshot.docs.forEach(doc => batch.delete(doc.ref))
        batch.commit()
      })
    res.json({ isSuccess: true })
  }

  switch (req.method) {
    case 'POST':
      postHandler()
      break
    case 'DELETE':
      deleteHandler()
      break
  }
}

export default handler
