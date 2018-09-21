const SUCCESS = 'TEAM_SUCCESS'
const FAILURE = 'TEAM_FAILURE'

const FETCH_LIST = 'TEAMS_FETCH'
const ADD        = 'TEAM_ADD'
const UPDATE     = 'TEAM_UPDATE'

const successAction = (teams) => ({
    type: SUCCESS,
    teams
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

const getTeams = state => state.team.list
const getActiveTeam = state => state.team.list.find(t => t.isActive == 1)
const getActiveTeamId = state => {
    const activeTeam = getActiveTeam(state)
    
    if (activeTeam == null) {
        return 0
    }
    
    return activeTeam.id
}

const getIsLoading = state => !state.team.loaded

const initialState = {
    list: [],
    loading: false,
    error: null
}

export const reducer = (state = initialState, {type, teams: list, error}) => {
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
    getTeams,
    getActiveTeam,
    getActiveTeamId,
    getIsLoading
}