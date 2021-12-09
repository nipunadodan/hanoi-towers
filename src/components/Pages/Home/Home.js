import React, {Component} from "react";
import './Home.scss'

/*
07.45
08.48 - 09.13 break
09.18 -
* */

class Home extends Component{
    state = {
        towers:['a','b','c'],
        discs : [
            {disk:1,tower:'a'},
            {disk:2,tower:'a'},
            {disk:3,tower:'a'},
            {disk:4,tower:'a'},
            {disk:5,tower:'a'},
        ],
        activeDisk:0,
        destinationTower:''
    }

    pickDisk = (disk) => (event) => {
        this.setState({
            activeDisk:disk
        })
    }

    moveDisk = (destinationTower) => (event) => {
        let discs = [...this.state.discs];
        discs[this.state.activeDisk-1] = {
            ...discs[this.state.activeDisk-1],
            tower:destinationTower
        }
        this.setState(prevState => ({
            discs
        }))
    }

    componentDidMount() {

    }

    render() {
        const {towers, discs, activeDisk} = this.state;
        return (
            <div className={'towers'}>
                {
                    towers.map(tower => (
                        <div className={'tower'}>
                            <div onClick={this.moveDisk(tower)} className={'towerLabel'}>Tower {tower}</div>
                            {
                                discs.map(x => {
                                    if (x.tower === tower) {
                                        return (<div
                                                onClick={this.pickDisk(x.disk)}
                                                className={'disk'}
                                                style={{
                                                    width: (x.disk * 20) + '%',
                                                    background: (activeDisk === x.disk ? '#f00' : '#555')
                                                }}
                                            >{x.disk}</div>
                                        )
                                    } else {
                                        return <></>
                                    }
                                })
                            }
                        </div>
                    ))

                }
            </div>
        )
    }
}

export default Home