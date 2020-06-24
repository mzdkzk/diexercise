import styled from 'styled-components'
import colors from '../config/colors'

const Button = styled.button`
  background-color: ${colors.primary};
  font-size: 1.2rem;
  font-weight: 700;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  min-width: 5rem;
  &,
  * {
    color: ${colors.white};
  }
  &:hover {
    background-color: ${colors.accent};
  }
`

export default Button
