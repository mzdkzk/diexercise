import styled from 'styled-components'
import colors from '../config/colors'

const Button = styled.button`
  background-color: ${colors.buttons.default};
  font-size: 1.2rem;
  font-weight: 700;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  min-width: 5rem;
  &,
  * {
    color: ${colors.buttons.text};
  }
  &:hover {
    background-color: ${colors.buttons.hover};
  }
`

export default Button
