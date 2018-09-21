import {connect} from 'react-redux'
import {getActiveTeam, getTeams} from 'component/team/store'
import {updateTeam, addTeam, setAsActive as setActiveTeam} from 'component/team/service'
import {truncate} from 'component/app/service'
import {fetchPlayers} from 'component/player/service'
import {fetchBalls} from 'component/ball/service'
import Header from './header'

const mapStateToProps = (state, {player}) => ({
    team: getActiveTeam(state),
    teams: getTeams(state)
})

const mapDispatchToProps = {
    setActiveTeam,
    updateTeam,
    addTeam,
    truncate,
    fetchPlayers,
    fetchBalls
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)