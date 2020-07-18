import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import colors from '../config/colors'

type Props = {
  title?: string
}

export const GridContainer = styled.div`
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

export const LeftTopBox = styled(Box)`
  grid-column: 1 / 2;
  grid-row: 1 / 7;
`

export const LeftBottomBox = styled(Box)`
  grid-column: 1 / 2;
  grid-row: 7 / 8;
`

export const RightTopBox = styled(Box)`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
`

export const RightBottomBox = styled(Box)`
  grid-column: 2 / 3;
  grid-row: 2 / 8;
`

export const Layout: React.FC<Props> = ({ children, title }) => (
  <>
    <Head>
      <title>{(title ? `${title} - ` : '') + 'Live※Reference'}</title>
    </Head>
    {children}
  </>
)
