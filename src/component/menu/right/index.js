import {connect} from 'react-redux'
import {getPlayers, getActivePlayer} from 'component/player/store'
import {getBalls, getIsLoading} from 'component/ball/store'
import {addBall, updateBall} from 'component/ball/service'
import Right from './right'

const mapStateToProps = state => {
    const player = getActivePlayer(state)
    
    return {
        player,
        players: getPlayers(state),
        balls: getBalls(state, player),
        loading: getIsLoading(state)
    }
}

const mapDispatchToProps = {
    addBall,
    updateBall
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Right)