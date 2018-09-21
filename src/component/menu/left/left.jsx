import PropTypes from 'prop-types'
import {PureComponent} from 'react'
import styled from 'styled-components'
import HoverIcon from 'component/hover-icon'

const Wrapper = styled.aside`
    grid-area: left-menu;
    
    height: 100%;
    width: 100%;
    
    text-align: center;
`

const Input = styled.input`
    display: block;
    margin: 0 auto;
    
    outline: none;
    
    ${p => p.error ? 'color: red;' : ''}
    ${p => p.error ? 'border: 1px solid red;' : 'border: 1px solid black;'}
`

class LeftMenu extends PureComponent {
    static propTypes = {
        addPlayer: PropTypes.func.isRequired,
        activeTeam: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired
        })
    }
    
    state = {
        error: false,
        name: ''
    }
    
    addPlayer = () => {
        const {name} = this.state

        if (name === '') {
            this.setState({error: true})
            
            return
        }

        const {addPlayer, activeTeam} = this.props
        
        const player = {
            teamId: activeTeam ? activeTeam.id : null,
            name,
            x: 0,
            y: 0
        }
        
        addPlayer(player).then(id => {
            this.setState({error: false, name: ''})
        })
    }
    
    onChange = ({target: {value, name}}) => {
        this.setState({
            error: false,
            [name]: value
        })
    }

    render() {
        const {error, name} = this.state
        
        return (
            <Wrapper>
                <span onClick={this.addPlayer}>
                    <HoverIcon type={'person_add'} large/>
                </span>
                
                <Input onChange={this.onChange} type={'text'} name={'name'} value={name} placeholder={'name'} error={error}/>
            </Wrapper>
        )
    }
}

export default LeftMenu