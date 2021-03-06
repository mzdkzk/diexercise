import React, { useState } from 'react'
import colors from '../config/colors'
import { AppProps } from 'next/app'
import firebase from '../utils/firebase'

const App = ({ Component, pageProps }: AppProps) => {
  const [user, setUser] = useState<firebase.User | undefined>(undefined)
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      setUser(user)
    }
  })
  return (
    <>
      <style global jsx>{`
        @import 'https://fonts.googleapis.com/css?family=M+PLUS+1p';
        * {
          margin: 0;
          padding: 0;
          border: 0 solid ${colors.background};
          text-align: center;
          font-family: inherit;
        }
        body {
          width: 100%;
          height: 100%;
          color: ${colors.text};
          font-size: 18px;
          line-height: 20px;
          background-color: ${colors.background};
          font-family: 'M PLUS 1p', monospace;
        }
      `}</style>
      <Component user={user} {...pageProps} />
    </>
  )
}

export default App
