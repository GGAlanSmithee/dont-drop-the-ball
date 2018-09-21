import PropTypes from 'prop-types'
import styled from 'styled-components'
import {size} from 'style'

const Icon = ({className, type}) => (
    <i className={className}>
        {type}
    </i>
)

Icon.propTypes = {
    className: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
}

const getSize = (small, large) => {
    let s = null

    if (small) s = 'small'
    if (large) s = 'large'

    return size('Icon', s)
}

const StyledIcon = styled(Icon).attrs({
    className: 'material-icons'
})`
    font-size: ${({small, large}) => getSize(small, large)};
`

export default StyledIcon
