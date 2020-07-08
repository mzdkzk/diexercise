import { NextApiHandler } from 'next'
import { ApiData } from '../../scheme/api'
import { cors } from '../../utils/api-middleware'
import request from '../../utils/request'

type Response = {
  body: string
}

const handler: NextApiHandler<ApiData> = async (req, res) => {
  await cors(req, res, { methods: ['POST'] })
  const url = `http://wikipedia.simpleapi.net/api?keyword=${req.query.word}&output=json`
  console.info(url)
  const response = await request.get(url)
  const responseJson: Response[] = await response.json()
  if (responseJson) {
    res.json({ isSuccess: true, body: { text: responseJson[0].body } })
  } else {
    res.json({ isSuccess: true })
  }
}

export default handler
