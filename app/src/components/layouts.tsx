import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import colors from '../config/colors'

type Props = {
  title?: string
}

const Container = styled.div`
  // https://stackoverflow.com/questions/44488357/equal-height-rows-in-css-grid-layout
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-rows: 1fr;
  width: 100%;
  height: 100%;
`

const Box = styled.div`
  border: solid 0.5rem ${colors.primary};
  box-sizing: border-box;
`
export const LeftBox = styled(Box)`
  grid-row: 1 / 3;
  grid-column: 1 / 2;
`

export const RightTopBox = styled(Box)`
  grid-row: 1 / 2;
  grid-column: 2 / 3;
`

export const RightBottomBox = styled(Box)`
  grid-row: 2 / 3;
  grid-column: 2 / 3;
`

export const Layout: React.FC<Props> = ({ children, title }) => (
  <Container>
    <Head>
      <title>{(title ? `${title} - ` : '') + 'Live※Reference'}</title>
    </Head>
    {children}
  </Container>
)
