import React, {Component} from "react";
import './Home.scss'

/*
    07.35 (started)
    08.48 - 09.13 (break) (1.13)
    09.18 - 10.31 (break) (1.18)
    10.54 - 22.35 (break) (1.43)
    00.12 (finished) (3.20)
* */

class Home extends Component{
    state = {
        moves:0,
        noOfDisks:5,
        noOfTowers:3,
        disks: {
            1: [1, 2, 3, 4, 5],
            2: [],
            3: []
        },
        activeDisk:{
            disk:0,
            tower:0
        },
    }

    changeDisks = (count) => (event) => {
        console.log(count)
        this.setState(prevState => ({
            noOfDisks:(count === 'dn' ? prevState.noOfDisks-1 : prevState.noOfDisks+1)
            //noOfDisks: prevState.noOfDisks+1
        }),this.reset)
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

    reset = () => {
        let towers = []
        for(let x=1; x <= this.state.noOfTowers; x++){
            towers[x] = []
        }
        towers[1] = [...Array(parseInt(this.state.noOfDisks)+1).keys()];
        towers[1].shift()
        this.setState({
            moves:0,
            disks: towers

        })
    }

    moveDisk = (destinationTower) => (event) => {
        const {disks, activeDisk} = this.state

        if(activeDisk.tower !==0) {
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
            moves:prevState.moves+1,
            discs :{
                disks
            },
            activeDisk:{
                disk:0,
                tower:0
            },
        }))
    }

    render() {
        const {disks, activeDisk} = this.state;
        return (
            <>
                <div className={'text-center'} style={{padding:'10px'}}>
                    Disc count
                    <span onClick={this.changeDisks('dn')} className={'button'}>-</span>
                    <span style={{fontSize:'1.5em', 'margin':'0 5px'}}>{this.state.noOfDisks}</span>
                    <span onClick={this.changeDisks('up')} className={'button'}>+</span>
                    <span onClick={this.reset} style={{color: '#888', margin:'10px', cursor:'pointer'}}>Reset</span>
                    <div style={{margin:'15px 0 10px'}}> Minimum Moves {2**this.state.noOfDisks - 1}</div>
                </div>
                <div className={'towers'}>
                    {
                        Object.keys(disks).map((tower, index) => (
                            <div key={index} className={'tower'}>
                                <div onClick={this.moveDisk(tower)} className={'towerLabel'}>Tower {tower}</div>
                                {
                                    disks[tower].map((x, index) => {
                                        return (
                                            <div
                                                key={index}
                                                onClick={this.pickDisk(x, index, tower)}
                                                className={'disk'}
                                                style={{
                                                    width: (x / this.state.noOfDisks * 90) + '%',
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

                <div className={'text-center'} style={{margin:'20px 0'}}>Moves by you <span style={{background:(this.state.moves <= 2**this.state.noOfDisks - 1 ? 'green' : 'red'), padding: '10px', color:'white', borderRadius: '5px', width:'20px', display:'inline-block'}}>{this.state.moves}</span></div>
            </>
        )
    }
}

export default Home