import React, {Component} from "react";
import './Home.scss'

/*
07.45
08.48 - 09.13 break
09.18 -
* */

class Home extends Component{
    state = {
        disks: {
            a: [1, 2, 3, 4, 5],
            b: [],
            c: []
        },
        activeDisk:{
            disk:'',
            tower:''
        },
    }

    pickDisk = (disk, index, tower) => (event) => {
        if(index === 0) {
            this.setState({
                activeDisk: {
                    disk:disk,
                    tower:tower
                }
            })
        }else {
            alert('You can\'t select lower discs')
        }
    }

    moveDisk = (destinationTower) => (event) => {
        const {disks, activeDisk} = this.state

        if(activeDisk.tower !=='') {
            if(disks[destinationTower][0] > activeDisk.disk || disks[destinationTower].length === 0) {
                disks[activeDisk.tower].shift(activeDisk.disk)
                disks[destinationTower].unshift(activeDisk.disk)
            }else {
                alert('You can\'t move bigger disks on to smaller disks')
            }
        }else {
            alert('Please select a disk to move here')
        }

        this.setState(prevState => ({
            discs :{
                disks
            },
            activeDisk:{
                disk:'',
                tower:''
            },
        }))
    }

    componentDidMount() {

    }

    render() {
        const {disks, activeDisk} = this.state;
        return (
            <div className={'towers'}>
                {
                    Object.keys(disks).map((tower,index) => (
                        <div className={'tower'}>
                            <div onClick={this.moveDisk(tower)} className={'towerLabel'}>Tower {tower}</div>
                            {
                                disks[tower].map((x, index) => {
                                    return (
                                        <div
                                            onClick={this.pickDisk(x, index, tower)}
                                            className={'disk'}
                                            style={{
                                                width: (x * 20) + '%',
                                                background: (activeDisk.disk === x ? '#f00' : '#555')
                                            }}
                                        >{x}</div>
                                    )
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