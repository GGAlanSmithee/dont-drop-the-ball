import {render} from 'react-dom'
import {Provider} from 'react-redux'
import OriginalApp from 'component/app'
import configureStore from 'store/configure'

const store = configureStore()

const renderApp = App => {
    render(
        <Provider store={store}>
            <App/>
        </Provider>,
        document.getElementById('app')
    )
}

renderApp(OriginalApp)

if (module.hot) {
    module.hot.accept('component/app', () => {
        const NewApp = require('component/app').default

        renderApp(NewApp)
    })
}
