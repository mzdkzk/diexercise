import React, { useState } from 'react'
import styled from 'styled-components'
import colors from '../../../config/colors'

const DropupButton = styled.button<{ isPressed?: boolean }>`
  background-color: ${({ isPressed }) =>
    isPressed ? colors.controls.pressed : colors.controls.default};
  width: 4rem;
  height: 4rem;
  cursor: pointer;
  &:hover {
    background-color: ${({ isPressed }) =>
      isPressed ? colors.controls.pressed : colors.controls.hover};
  }
  img {
    width: 3rem;
    height: 3rem;
  }
`

const DropupItemContainer = styled.div`
  position: absolute;
  bottom: 5rem;
  left: -5rem;
  min-width: 20rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
`

export const DropupItem = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  width: 100%;
  text-align: left;
  &:hover {
    background-color: ${colors.controls.itemHover};
  }
`

const DropupContainer = styled.div<{ isPressed: boolean }>`
  position: relative;
  display: inline-block;
  & ${DropupItemContainer} {
    display: ${({ isPressed }) => (isPressed ? 'block' : 'none')};
  }
`

type Props = {
  buttonImgSrc: string
  buttonImgAlt: string
}

const Dropup: React.FC<Props> = ({ buttonImgSrc, buttonImgAlt, children }) => {
  const [pressed, setPressed] = useState<boolean>(false)

  return (
    <DropupContainer isPressed={pressed}>
      <DropupButton isPressed={pressed} onClick={() => setPressed(!pressed)}>
        <img src={buttonImgSrc} alt={buttonImgAlt} />
      </DropupButton>
      <DropupItemContainer>{children}</DropupItemContainer>
    </DropupContainer>
  )
}

export default Dropup
