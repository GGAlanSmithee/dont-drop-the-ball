import 'react-select/dist/react-select.css'
import PropTypes from 'prop-types'
import {PureComponent} from 'react'
import Grid from 'component/grid'
import Field from 'component/field'
import Header from 'component/header'
import LeftMenu from 'component/menu/left'
import RightMenu from 'component/menu/right'
import Footer from 'component/footer'
import Player from 'component/player'

class App extends PureComponent {
    static propTypes = {
        players: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired
        })).isRequired,
        teamsAreLoading: PropTypes.bool.isRequired,
        ballsAreLoading: PropTypes.bool.isRequired,
        playersAreLoading: PropTypes.bool.isRequired,
        loadData: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.loadData()
    }

    render() {
        const {players} = this.props
        
        return (
            <Grid>
                <Header/>
                
                <LeftMenu/>
                
                <Field>
                    {players.map((player, i) => (
                        <Player key={`${i}.${player.name}`} player={player}/>
                    ))}
                </Field>
                
                <RightMenu/>
                
                <Footer/>
            </Grid>
        )
    }
}

export default App