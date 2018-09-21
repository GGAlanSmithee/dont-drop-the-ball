import db, {Ball} from 'db'

import {getPlayers, getActivePlayerId} from 'component/player/store'

import {
    successAction,
    failureAction,
    fetchAction,
    addAction,
    updateAction
} from './store'

const defaultBall = new Ball().toJSON()

delete defaultBall.id

const fetchBalls = () => async (dispatch, getState) => {
    dispatch(fetchAction())
    
    try {
        const players = getPlayers(getState())

        const balls = await db.balls
            .where('playerId')
            .anyOf(players.map(p => p.id))
            .toArray()

        dispatch(successAction(balls))
        
        return balls
    } catch (error) {
         dispatch(failureAction(error))
         
         return null
    }
}

const addBall = ball => (dispatch, getState) => {
    dispatch(addAction())

    try {
        return db.transaction('rw', db.balls, async () => {
            const activePlayerId = getActivePlayerId(getState())
        
            if (activePlayerId === 0) {
                throw 'No player selected, cannot add ball'
            }

            await db.balls
                .where('[playerId+isActive]')
                .equals([activePlayerId, 1])
                .modify(t => t.isActive = 0)
            
            await db.balls.add({...defaultBall, ...ball, isActive: 1})

            dispatch(fetchBalls())
        })
    } catch (error) {
        dispatch(failureAction(error))
        
        return Promise.reject()
    }
}

const updateBall = ball => (dispatch, getState) => {
    dispatch(updateAction())
    
    try {
        return db.transaction('rw', db.balls, async () => {
            if (ball.isActive) {
                const activePlayerId = getActivePlayerId(getState())
        
                if (activePlayerId === 0) {
                    throw 'No player selected, cannot update ball'
                }
        
                await db.balls
                    .where('[playerId+isActive]')
                    .equals([activePlayerId, 1])
                    .modify(t => t.isActive = 0)
            }

            await db.balls.update(ball.id, ball)

            dispatch(fetchBalls())
        })
    } catch (error) {
        dispatch(failureAction(error))
        
        return Promise.reject()
    }
}

const setAsActive = id => async dispatch => {
    const oldBall = await db.balls.get(id)
    
    if (oldBall == null || oldBall.id !== id || oldBall.isActive) {
        return
    }
    
    dispatch(updateBall({...oldBall, isActive: 1}))
}

export {
    fetchBalls,
    setAsActive,
    updateBall,
    addBall
}