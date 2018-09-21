import db, {Team} from 'db'

import {
    successAction,
    failureAction,
    fetchAction,
    addAction,
    updateAction
} from './store'

const defaultTeam = new Team().toJSON()

delete defaultTeam.id

const fetchTeams = () => async dispatch => {
    dispatch(fetchAction())
    
    try {
        const teams = await db.teams.toArray()
                 
        dispatch(successAction(teams))
        
        return teams
    } catch (error) {
         dispatch(failureAction(error))
         
         return null
    }
}

const addTeam = team => dispatch => {
    dispatch(addAction())

    try {
        return db.transaction('rw', db.teams, async () => {
            await db.teams
                .where('isActive')
                .equals(1)
                .modify(t => t.isActive = 0)
            
            await db.teams.add({...defaultTeam, ...team, isActive: 1})

            dispatch(fetchTeams())
        })
    } catch (error) {
        dispatch(failureAction(error))
        
        return Promise.reject()
    }
}

const updateTeam = team => dispatch => {
    dispatch(updateAction())
    
    try {
        return db.transaction('rw', db.teams, async () => {
            if (team.isActive) {
                await db.teams.where('isActive').equals(1).modify(t => t.isActive = 0)
            }

            await db.teams.update(team.id, team)

            dispatch(fetchTeams())
        })
    } catch (error) {
        dispatch(failureAction(error))
        
        return Promise.reject()
    }
}

const setAsActive = id => async dispatch => {
    const oldTeam = await db.teams.get(id)
    
    if (oldTeam == null || oldTeam.id !== id || oldTeam.isActive) {
        return
    }
    
    return dispatch(updateTeam({...oldTeam, isActive: 1}))
}

export {
    fetchTeams,
    setAsActive,
    updateTeam,
    addTeam
}