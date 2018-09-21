import Draggable from 'react-draggable'
import {PureComponent} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import HoverIcon from 'component/hover-icon'

const Row = styled.div`
`

const Wrapper = styled.div`
    position: absolute;
    display: inline-block;
    text-align: center;
`

const Name = styled.span`
    white-space: nowrap;
    font-weight: bold;
`

const BallCount = styled.span`
    position: absolute;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    top: 0;
    left: 2.5rem;
    right: 0;
`

class Player extends PureComponent {
    static propTypes = {
        player: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired
        }).isRequired,
        ballCount: PropTypes.number.isRequired,
        setAsActive: PropTypes.func.isRequired,
        updatePlayer: PropTypes.func.isRequired
    }

    onContextMenu = e => {
        e.preventDefault()
        e.stopPropagation()
    }
    
    onClick = () => {
        const {player: {id}, setAsActive} = this.props
        
        setAsActive(id)
    }

    onStop = (e, {x, y}) => {
        e.preventDefault()
        e.stopPropagation()
        
        const {updatePlayer, player} = this.props
        
        updatePlayer({
            ...player,
            x,
            y
        })
    }
    
    render() {
        const {player: {name, x, y}, ballCount} = this.props

        return (
            <Draggable defaultPosition={{x, y}} onStop={this.onStop}>
                <Wrapper onContextMenu={this.onContextMenu} onClick={this.onClick}>
                    <Row>
                        <HoverIcon type={'person'} large/>
                        
                        <BallCount>
                            {ballCount}
                        </BallCount>
                    </Row>
                    
                    <Row>
                        <Name>
                            {name}
                        </Name>
                    </Row>
                </Wrapper>
            </Draggable>
        )
    }
}

export default Player