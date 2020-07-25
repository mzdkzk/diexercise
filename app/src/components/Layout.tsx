import React from 'react'
import Head from 'next/head'

type Props = {
  title?: string
}

const Layout: React.FC<Props> = ({ children, title }) => (
  <>
    <Head>
      <title>{(title ? `${title} - ` : '') + 'Live※Reference'}</title>
    </Head>
    {children}
  </>
)

export default Layout
