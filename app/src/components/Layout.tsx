import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'

type Props = {
  title?: string
}

const Container = styled.div`
  max-width: 30rem;
  margin-left: auto;
  margin-right: auto;
`

const Layout: React.FC<Props> = ({ children, title }) => (
  <Container>
    <Head>
      <title>{(title ? `${title} - ` : '') + 'Live※Reference'}</title>
    </Head>
    {children}
  </Container>
)

export default Layout
