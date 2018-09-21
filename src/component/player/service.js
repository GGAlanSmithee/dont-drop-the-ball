import db, {Player} from 'db'

import {getActiveTeamId} from 'component/team/store'

import {
    successAction,
    failureAction,
    fetchAction,
    addAction,
    updateAction
} from './store'

const defaultPlayer = new Player().toJSON()

delete defaultPlayer.id

const fetchPlayers = () => async (dispatch, getState) => {
    dispatch(fetchAction())
    
    try {
        const activeTeamId = getActiveTeamId(getState())
        
        if (activeTeamId === 0) {
            throw 'No team selected, cannot fetch players'
        }
        
        const players = await db.players.where({teamId: activeTeamId}).toArray()
                 
        dispatch(successAction(players))
        
        return players
    } catch (error) {
         dispatch(failureAction(error))
         
         return null
    }
}

const addPlayer = player => (dispatch, getState) => {
    dispatch(addAction())

    try {
        return db.transaction('rw', db.players, async () => {
            const activeTeamId = getActiveTeamId(getState())
            
            if (activeTeamId === 0) {
                throw 'No team selected, cannot add player'
            }
            
            await db.players
                .where('[teamId+isActive]')
                .equals([activeTeamId, 1])
                .modify(t => t.isActive = 0)
            
            await db.players.add({...defaultPlayer, ...player, isActive: 1})

            dispatch(fetchPlayers())
        })
    } catch (error) {
        dispatch(failureAction(error))
        
        return Promise.reject()
    }
}

const updatePlayer = player => (dispatch, getState) => {
    dispatch(updateAction())
    
    try {
        return db.transaction('rw', db.players, async () => {
            if (player.isActive) {
                const activeTeamId = getActiveTeamId(getState())
            
                if (activeTeamId === 0) {
                    throw 'No team selected, cannot update player'
                }
        
                await db.players
                    .where('[teamId+isActive]')
                    .equals([activeTeamId, 1])
                    .modify(t => t.isActive = 0)
            }

            await db.players.update(player.id, player)

            dispatch(fetchPlayers())
        })
    } catch (error) {
        dispatch(failureAction(error))
        
        return Promise.reject()
    }
}

const setAsActive = id => async dispatch => {
    const oldPlayer = await db.players.get(id)
    
    if (oldPlayer == null || oldPlayer.id !== id || oldPlayer.isActive) {
        return
    }
    
    dispatch(updatePlayer({...oldPlayer, isActive: 1}))
}

export {
    fetchPlayers,
    setAsActive,
    updatePlayer,
    addPlayer
}