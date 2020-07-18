import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import colors from '../config/colors'

export const GridContainer = styled.div`
  // https://stackoverflow.com/questions/44488357/equal-height-rows-in-css-grid-layout
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-rows: 1fr;
  width: 100%;
  height: 100%;
  background-color: ${colors.borders.right}; // RightBoxの丸角を埋めるため
`

const Box = styled.div`
  padding: 2rem;
  box-sizing: border-box;
  background-color: white;
`

const LeftBox = styled(Box)``

const RightBox = styled(Box)`
  border: solid 0.5rem ${colors.borders.right};
  border-radius: 1rem;
`

export const LeftTopBox = styled(LeftBox)`
  border-top: solid 1rem ${colors.borders.left};
  grid-column: 1 / 2;
  grid-row: 1 / 7;
`

export const LeftBottomBox = styled(LeftBox)`
  background-color: ${colors.borders.left};
  grid-column: 1 / 2;
  grid-row: 7 / 8;
`

export const RightTopBox = styled(RightBox)`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
`

export const RightBottomBox = styled(RightBox)`
  grid-column: 2 / 3;
  grid-row: 2 / 8;
`

type Props = {
  title?: string
}

export const Layout: React.FC<Props> = ({ children, title }) => (
  <>
    <Head>
      <title>{(title ? `${title} - ` : '') + 'Live※Reference'}</title>
    </Head>
    {children}
  </>
)
