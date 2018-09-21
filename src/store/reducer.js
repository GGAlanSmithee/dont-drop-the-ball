import {combineReducers} from 'redux'
import {reducer as ball} from 'component/ball/store'
import {reducer as player} from 'component/player/store'
import {reducer as team} from 'component/team/store'

export default function createRootReducer() {
    return combineReducers({
        ball,
        player,
        team
    })
}