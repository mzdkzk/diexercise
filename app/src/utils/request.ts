import unfetch from 'isomorphic-unfetch'

type JSONRequestInit = RequestInit & {
  json?: { [key: string]: string }
}

type Fetcher = (input: RequestInfo, init: JSONRequestInit) => Promise<Response>

type Request = (input: RequestInfo, init?: JSONRequestInit) => Promise<Response>

const fetcher: Fetcher = async (input, init) => {
  init.headers = Object.assign(init.headers || {}, {
    'Content-Type': 'application/json'
  })
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
