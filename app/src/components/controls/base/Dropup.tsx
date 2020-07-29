import React, { useState } from 'react'
import styled from 'styled-components'
import colors from '../../../config/colors'

const DropupButton = styled.button<{ isPressed?: boolean }>`
  background-color: ${({ isPressed }) =>
    isPressed ? colors.controls.pressed : colors.controls.default};
  width: 4rem;
  height: 4rem;
  cursor: pointer;
  img {
    width: 3rem;
    height: 3rem;
  }
`

const DropupItemContainer = styled.div`
  position: absolute;
  bottom: 50px;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`

export const DropupItem = styled.button`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  &:hover {
    background-color: #ddd;
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
