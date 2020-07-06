import unfetch from 'isomorphic-unfetch'

type JSONRequestInit = RequestInit & {
  json?: { [key: string]: any }
}

type Fetcher = (input: string, init: JSONRequestInit) => Promise<Response>

type Request = (input: string, init?: JSONRequestInit) => Promise<Response>

const fetcher: Fetcher = async (input, init) => {
  input = `${process.env.NEXT_PUBLIC_API_BASE_URL || ''}${input}`
  init.headers = Object.assign(init.headers || {}, {
    'Content-Type': 'application/json'
  })
  init.mode = 'cors'
  init.body = JSON.stringify(init.json)
  return await unfetch(input, init)
}

export default class {
  static get: Request = async (input, init?) => {
    init = init || {}
    init.method = 'GET'
    return await fetcher(input, init)
  }

  static post: Request = async (input, init?) => {
    init = init || {}
    init.method = 'POST'
    return await fetcher(input, init)
  }

  static delete: Request = async (input, init?) => {
    init = init || {}
    init.method = 'DELETE'
    return await fetcher(input, init)
  }
}
