import styled from 'styled-components'
import colors from '../../../config/colors'

const Button = styled.button<{ isPressed?: boolean }>`
  background-color: ${({ isPressed }) =>
    isPressed ? colors.dropup.pressed : colors.dropup.default};
  width: 4rem;
  height: 4rem;
  cursor: pointer;
  outline: none;
  &:hover {
    background-color: ${({ isPressed }) =>
      isPressed ? colors.dropup.pressed : colors.dropup.hover};
  }
  img {
    width: 3rem;
    height: 3rem;
  }
`

export default Button
