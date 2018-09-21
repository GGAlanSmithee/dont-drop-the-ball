import {connect} from 'react-redux'
import {addPlayer} from 'component/player/service'
import {getActiveTeam} from 'component/team/store'
import Left from './left'

const mapStateToProps = state => ({
    activeTeam: getActiveTeam(state)
})

const mapDispatchToProps = {
    addPlayer
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Left)