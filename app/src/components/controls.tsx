import styled from 'styled-components'
import colors from '../config/colors'

export const ControlContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
`

export const ControlButton = styled.button<{ isPressed?: boolean }>`
  background-color: ${({ isPressed }) =>
    isPressed ? colors.buttons.pressed : colors.buttons.normal};
  width: 4rem;
  height: 4rem;
  cursor: pointer;
  img {
    width: 3rem;
    height: 3rem;
  }
`
