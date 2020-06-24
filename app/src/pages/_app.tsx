import React from 'react'
import colors from '../config/colors'
import { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps) => {
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
          color: ${colors.primary};
          font-size: 18px;
          line-height: 20px;
          background-color: ${colors.background};
          font-family: 'M PLUS 1p', monospace;
        }
      `}</style>
      <Component {...pageProps} />
    </>
  )
}

export default App
