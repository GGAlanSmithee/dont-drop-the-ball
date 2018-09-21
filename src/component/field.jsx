import styled from 'styled-components'
import FieldImage from 'img/field.svg'

const Field = styled.div`
    grid-area: field;
    
    height: 100%;
    width: 100%;
    
    background-image: url(${FieldImage});
    background-size: cover;
`

export default Field