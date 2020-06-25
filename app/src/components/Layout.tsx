import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import colors from '../config/colors'

type Props = {
  title?: string
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  border: solid 0.5rem ${colors.primary};
  box-sizing: border-box;
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
