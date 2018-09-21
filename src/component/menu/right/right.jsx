import PropTypes from 'prop-types'
import {Fragment, PureComponent} from 'react'
import styled from 'styled-components'
import HoverIcon from 'component/hover-icon'
import Balls from 'component/ball/list'
import Ball from 'component/ball'

const Wrapper = styled.aside`
    grid-area: right-menu;
    
    height: 100%;
    width: 100%;
`

const HeaderSection = styled.section`
    padding: 1rem 0;
    text-align: center;
`

const Title = styled.h3`
    font-size: 3rem;
`

const TaskInput = styled.input`
    display: block;
    width: 90%;
    margin: 0 auto;
`

const PassList = styled.ul`
    width: 90%;
    margin: auto;
    
    margin: 1rem auto;
`

const PassItem = styled.li`
    margin: 0.2rem 0;
    padding: 0.2rem;
    
    background-color: lightgrey;
    
    &:hover {
        background-color: grey;
        cursor: pointer;
    }
`

const PlayerShape = PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
})

class RightMenu extends PureComponent {
    static propTypes = {
        players: PropTypes.arrayOf(
            PlayerShape
        ).isRequired,
        player: PlayerShape,
        balls: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            playerId: PropTypes.number.isRequired,
            task: PropTypes.string.isRequired
        })).isRequired,
        updateBall: PropTypes.func.isRequired,
        addBall: PropTypes.func.isRequired
    }
    
    state = {
        activeBall: null
    }
    
    addBallToPlayer = () => {
        const {addBall, player: {id: playerId}} = this.props

        addBall({
            playerId,
            task: 'New task'
        }).then(activeBall => {
            this.setState({
                activeBall
            })
        })
    }
    
    updateActiveBallTask = ({target: {value: task}}) => {
        this.setState({
            activeBall: {
                ...this.state.activeBall,
                task: task.substring(0, 44)
            }
        })
    }
    
    updateBall = ball => {
        if (ball == null) {
            return
        }
        
        const {updateBall} = this.props
        
        updateBall(ball)
    }

    updateActiveBall = () => {
        const {activeBall} = this.state
        
        this.updateBall(activeBall)
    }
    
    passBallToPlayer = player => {
        if (player == null) {
            return
        }
        
        const {balls, activeBall} = this.state
        
        const ball = {
            ...activeBall,
            playerId: player.id
        }
        
        this.updateBall(ball)
        
        this.setState({
            activeBall: balls.length ? balls[0] : null
        })
    }

    componentWillReceiveProps({player, balls = []}) {
        const {player: oldPlayer} = this.props

        if (player == null) {
            this.setState({
                activeBall: null
            })
            
            return
        }
        
        if (oldPlayer == null || oldPlayer.id !== player.id) {
            this.setState({
                activeBall: balls.length ? balls[0] : null
            })
        }
    }
    
    renderEmpty = () => (
        <Wrapper>
            <HeaderSection>
                <Title>
                    DDTB
                </Title>
            </HeaderSection>
            
            <hr/>
        </Wrapper>
    )
    
    renderList = () => {
        const {activeBall} = this.state
        const {players, player: {id, name}, balls = []} = this.props

        return (
            <Wrapper>
                <HeaderSection>
                    <Title>
                        {name}
                    </Title>
                </HeaderSection>
                
                <hr/>
                
                <Balls>
                    {balls.map((ball, i) => {
                        const isActive = activeBall != null && ball.id === activeBall.id
                        
                        return (
                            <Ball key={`${ball.task.substring(10)}.${i}`} active={isActive} onClick={() => this.setState({activeBall: ball})}>
                                <HoverIcon type={'brightness_1'} large/>
                            </Ball>
                        )
                    })}

                    <Ball key={'add-ball'} onClick={this.addBallToPlayer}>
                        <HoverIcon type={'add_circle'} large/>
                    </Ball>
                </Balls>
                
                {activeBall && (
                    <Fragment>
                        <TaskInput key={'ball-task-input'} value={activeBall.task} onChange={this.updateActiveBallTask} onBlur={this.updateActiveBall}/>
                        
                        <PassList key={'ball-pass'}>
                            {players.filter(p => p.id !== id).map(player => (
                                <span key={`pass-to-${player.name}`} onClick={() => this.passBallToPlayer(player)}>
                                    <PassItem>
                                        pass to {player.name}
                                    </PassItem>
                                </span>
                            ))}
                        </PassList>
                    </Fragment>
                )}
            </Wrapper>
        )
    }
    
    render() {
        const {player} = this.props
        
        if (player == null) {
            return this.renderEmpty()
        }

        return this.renderList()
    }
}

export default RightMenu