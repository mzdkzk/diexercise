import React, { useState } from 'react'
import styled from 'styled-components'
import colors from '../../../config/colors'
import Button from './Button'

const DropupItemContainer = styled.div`
  background-color: white;
  position: absolute;
  bottom: 5rem;
  left: -5rem;
  min-width: 20rem;
  height: 20rem;
  overflow-y: scroll;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`

export const DropupImg = styled.img`
  width: 1rem;
  margin-right: 0.5rem;
`

export const DropupItem = styled.button<{ isPressed?: boolean }>`
  background-color: ${({ isPressed }) =>
    isPressed ? colors.dropup.pressed : 'white'};
  padding: 0.8rem 1.2rem;
  font-size: 1rem;
  width: 100%;
  text-align: left;
  outline: none;
  &:hover {
    background-color: ${colors.dropup.hover};
  }
`

const DropupContainer = styled.div<{ isPressed: boolean }>`
  position: relative;
  display: inline-block;
  & ${DropupItemContainer} {
    display: ${({ isPressed }) => (isPressed ? 'block' : 'none')};
  }
`

const DropupOverlay = styled.div<{ isPressed: boolean }>`
  display: ${({ isPressed }) => (isPressed ? 'block' : 'none')};
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
`

type Props = {
  buttonImgSrc: string
  buttonImgAlt: string
}

const Dropup: React.FC<Props> = ({ buttonImgSrc, buttonImgAlt, children }) => {
  const [pressed, setPressed] = useState<boolean>(false)
  return (
    <>
      <DropupContainer isPressed={pressed}>
        <Button isPressed={pressed} onClick={() => setPressed(!pressed)}>
          <img src={buttonImgSrc} alt={buttonImgAlt} />
        </Button>
        <DropupItemContainer>{children}</DropupItemContainer>
      </DropupContainer>
      <DropupOverlay isPressed={pressed} onClick={() => setPressed(false)} />
    </>
  )
}

export default Dropup
