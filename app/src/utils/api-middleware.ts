import http from 'http'
import Cors from 'cors'

export const initMiddleware = <T>(middleware: any) => {
  return (req: http.IncomingMessage, res: http.ServerResponse) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result: T | Error) => {
        if (result instanceof Error) {
          return reject(result)
        }
        return resolve(result)
      })
    })
}

export const cors = async (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  options?: Cors.CorsOptions | Cors.CorsOptionsDelegate
): Promise<void> => {
  const middleware = await initMiddleware<void>(Cors(options))
  await middleware(req, res)
}
