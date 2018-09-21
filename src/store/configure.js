import {createStore, applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createRootReducer from './reducer'

/*
 * @param {Object} initial state to bootstrap our stores with for server-side rendering
 * @param {History Object} a history object. We use `createMemoryHistory` for server-side rendering,
 *                          while using browserHistory for client-side
 *                          rendering.
 */
export default function configureStore(initialState, history) {
    const middleware = [
        thunkMiddleware
    ]

    const devToolMiddleware = __DEV__ && typeof window === 'object' && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f

    const store = createStore(
        createRootReducer(),
        initialState,
        compose(
            applyMiddleware(...middleware),
            devToolMiddleware
        )
    )

    if (module.hot) {
        module.hot.accept('./reducer', () => {
            const nextReducer = require('./reducer')

            store.replaceReducer(nextReducer)
        })
    }

    return store
}
