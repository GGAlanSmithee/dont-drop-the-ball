import styled from 'styled-components'

const Ball = styled.span`
    text-align: center;
    ${p => p.active ? 'color: grey;' : ''}
`

export default Ball