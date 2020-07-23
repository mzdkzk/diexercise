import styled from 'styled-components'
import colors from '../config/colors'

export const Button = styled.button`
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

export const Input = styled.input`
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  border-radius: 0;
  text-align: initial;
`
