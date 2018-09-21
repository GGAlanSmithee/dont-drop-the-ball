const SUCCESS = 'PLAYER_SUCCESS'
const FAILURE = 'PLAYER_FAILURE'

const FETCH_LIST = 'PLAYERS_FETCH'
const ADD        = 'PLAYER_ADD'
const UPDATE     = 'PLAYER_UPDATE'

const successAction = (players) => ({
    type: SUCCESS,
    players
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

const getPlayers = state => state.player.list
const getIsLoading = state => state.player.loading
const getActivePlayer = state => state.player.list.find(t => t.isActive === 1)
const getActivePlayerId = state => {
    const activePlayer = getActivePlayer(state)
    
    if (activePlayer == null) {
        return 0
    }
    
    return activePlayer.id
}

const initialState = {
    list: [],
    loading: false,
    error: null
}

export const reducer = (state = initialState, {type, players: list, error}) => {
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
    getPlayers,
    getIsLoading,
    getActivePlayer,
    getActivePlayerId
}