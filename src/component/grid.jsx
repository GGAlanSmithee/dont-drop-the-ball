import styled from 'styled-components'

const Grid = styled.div`
    display: grid;
    
    grid-template-areas:
      "header     header  header"
      "left-menu  field   right-menu"
      "footer     footer  footer";

    align-items: stretch;
    
    grid-auto-columns: 300px auto 300px;
    grid-auto-rows: 80px auto 80px;
    
    width: 100%;
    height: 100%;
`

export default Grid