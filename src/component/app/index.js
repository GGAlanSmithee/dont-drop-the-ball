import {connect} from 'react-redux'
import {getIsLoading as getTeamsAreLoading} from 'component/team/store'
import {getPlayers, getIsLoading as getPlayersAreLoading} from 'component/player/store'
import {getIsLoading as getBallsAreLoading} from 'component/ball/store'
import {getActiveTeam} from 'component/team/store'
import {loadData} from './service'
import App from './app'

const mapStateToProps = state => ({
    players: getPlayers(state, getActiveTeam(state)),
    teamsAreLoading: getTeamsAreLoading(state),
    ballsAreLoading: getBallsAreLoading(state),
    playersAreLoading: getPlayersAreLoading(state)
})

const mapDispatchToProps = {
    loadData
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)