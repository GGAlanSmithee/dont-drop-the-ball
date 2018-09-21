import db from 'db'

import {fetchTeams} from 'component/team/service'
import {fetchPlayers} from 'component/player/service'
import {fetchBalls} from 'component/ball/service'

import {successAction as setTeams} from 'component/team/store'
import {successAction as setPlayers} from 'component/player/store'
import {successAction as setBalls} from 'component/ball/store'

const loadData = () => async dispatch => {
    await dispatch(fetchTeams())
    await dispatch(fetchPlayers())
    await dispatch(fetchBalls())
}

const truncate = () => dispatch => {
    db.transaction('rw', db.teams, db.players, db.balls, async () => {
        db.balls.clear()
        db.players.clear()
        db.teams.clear()
        
        await dispatch(setBalls([]))
        await dispatch(setPlayers([]))
        await dispatch(setTeams([]))
    })
}

export {
    truncate,
    loadData,
    updateAll
}