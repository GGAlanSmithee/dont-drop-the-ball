import styled from 'styled-components'

const Footer = styled.header`
    grid-area: footer;
    text-align: center;
    line-height: 3rem;
    font-size: 1rem;
`

const Foot = ({team}) => (
    <Footer>
        &copy; Alan Smithee 2017
    </Footer>
)

export default Foot