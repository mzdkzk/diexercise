import { NextPage } from 'next'
import { AppProps } from 'next/app'
import firebase from '../utils/firebase'

export type PageProps = {
  user?: firebase.User
}

// any型のpagePropsに型を与える
// https://qiita.com/Takepepe/items/56acedaf94cb0d0c388f
export type AppPageProps = Omit<AppProps<PageProps>, 'pageProps'> & {
  pageProps: PageProps
}

export type PageFC<P = {}> = NextPage<P & PageProps>
