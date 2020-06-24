import styled from 'styled-components'

const Word = styled.span<{ color?: string }>`
  font-size: 1.5rem;
  color: ${({color}) => color ? color : 'black'}
`

export default Word
