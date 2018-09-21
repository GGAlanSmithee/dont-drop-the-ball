import {connect} from 'react-redux'
import {updatePlayer, setAsActive} from 'component/player/service'
import {getBallCount} from 'component/ball/store'
import Player from './player'

const mapStateToProps = (state, {player}) => ({
    ballCount: getBallCount(state, player)
})

const mapDispatchToProps = {
    updatePlayer,
    setAsActive
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Player)