import { NextApiHandler } from 'next'
import Mecab from 'mecab-async'
import { ApiData } from '../../../scheme/api'
import admin from '../../../utils/firebase-admin'
import { cors } from '../../../utils/api-middleware'

const handler: NextApiHandler<ApiData> = async (req, res) => {
  await cors(req, res, { methods: ['POST'] })

  const db = admin.firestore()
  const wordsRef = db
    .collection('rooms')
    .doc(`${req.query.roomId}`)
    .collection('words')

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
  await wordsRef.doc(`${req.query.wordId}`).update({
    text,
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  })
  res.json({ isSuccess: true })
}

export default handler
