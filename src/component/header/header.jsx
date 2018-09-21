import {PureComponent} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Creatable as Select} from 'react-select'

const Header = styled.header`
    grid-area: header;
    
    display: flex;
    align-items: center;
    justify-content: center;
    
    font-size: 1rem;
`

const StyledSelect = styled(Select)`
    width: 300px;
`

const TeamShape = PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
})

class Head extends PureComponent {
    static propTypes = {
        setActiveTeam: PropTypes.func.isRequired,
        truncate: PropTypes.func.isRequired,
        fetchPlayers: PropTypes.func.isRequired,
        fetchBalls: PropTypes.func.isRequired,
        addTeam: PropTypes.func.isRequired,
        teams: PropTypes.arrayOf(TeamShape).isRequired,
        team: TeamShape
    }

    clearAllTables = () => {
        this.props.truncate()
    }
    
    handleChange = (selectedTeam) => {
        if (selectedTeam === null || selectedTeam.name === null || selectedTeam.name === '') {
            return
        }
        
        const {id} = selectedTeam
        const {setActiveTeam, fetchPlayers, fetchBalls} = this.props
        
        if (id > 0) {
            setActiveTeam(id)
                .then(() => fetchPlayers())
                .then(() => fetchBalls())

            return
        }
            
        const {name} = selectedTeam
        const {addTeam} = this.props

        addTeam({name})
            .then(() => fetchPlayers())
            .then(() => fetchBalls())
    }
    
    componentWillReceiveProps({team}) {
        const {team: oldTeam} = this.props
        
        if (!team || !oldTeam || team.id === oldTeam.id) {
            return
        }
        
        const {fetchPlayers, fetchBalls} = this.props
        
        fetchPlayers()
            .then(() => fetchBalls())
    }
  
    render() {
        const {teams, team} = this.props

        return (
            <Header>
                <StyledSelect
                    valueKey={'id'}
                    labelKey={'name'}
                    name={'teams'}
                    placeholder={'Select Team'}
                    promptTextCreator={label => `Add new Team: "${label}"`}
                    newOptionCreator={({valueKey, labelKey, label}) => ({[valueKey]: 0, [labelKey]: label})}
                    value={team ? team.id : 0}
                    onChange={this.handleChange}
                    options={teams.map(({id, name}) => ({id, name}))}/>
                    
                {__DEV__ && (
                    <button onClick={this.clearAllTables}>
                        Clear All Tables
                    </button>
                )}
            </Header>
        )
    }
}

export default Head