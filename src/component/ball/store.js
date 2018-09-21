const SUCCESS = 'BALL_SUCCESS'
const FAILURE = 'BALL_FAILURE'

const FETCH_LIST = 'BALLS_FETCH'
const ADD        = 'BALL_ADD'
const UPDATE     = 'BALL_UPDATE'

const successAction = (balls) => ({
    type: SUCCESS,
    balls
})

const failureAction = (error) => ({
    type: FAILURE,
    error
})

const fetchAction = () => ({
    type: FETCH_LIST
})

const addAction = () => ({
    type: ADD
})

const updateAction = () => ({
    type: UPDATE
})

const getBalls = (state, player) => state.ball.list.filter(b => player ? b.playerId === player.id : true)
const getBallCount = (state, player) => getBalls(state, player).length
const getIsLoading = state => state.ball.loading
const getActiveBall = state => state.ball.list.find(t => t.isActive === 1)

const initialState = {
    list: [],
    loading: false,
    error: null
}

export const reducer = (state = initialState, {type, balls: list, error}) => {
    switch (type) {
        case FETCH_LIST:
            return {
                ...state,
                loading: true
            }
        case SUCCESS:
            return {
                ...state,
                list
            }
        case FAILURE:
            return {
                ...state,
                error
            }
        default: {
            return state
        }
    }
}

export {
    successAction,
    failureAction,
    fetchAction,
    addAction,
    updateAction,
    getBalls,
    getBallCount,
    getIsLoading,
    getActiveBall
}