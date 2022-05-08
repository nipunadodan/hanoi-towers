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
        disks: {},
        activeDisk:{
            disk:0,
            tower:0
        },
        won:0,
        startTime:null,
        timeLapsed:0
    }

    componentDidMount() {
        this.reset()
    }

    startTimer = () => {
        this.setState({
            startTime: Date.now()
        }, function () {
            this.timer = setInterval(this.clock, 100)
        })

    }

    stopTimer = () => {
        clearInterval(this.timer)
    }

    clock = () => {
        const {startTime} = this.state
        const elapsedTime = Date.now() - startTime;
        this.setState({
            timeLapsed:elapsedTime / 1000
        })
    }

    hasWon = () => {
        const {disks, noOfDisks} = this.state
        const towers = [...Array(noOfDisks+1).keys()];
        towers.shift()
        const won = disks.find((tower, index) => {
            if(index !== 1){
                return JSON.stringify(tower) === JSON.stringify(towers)
            }
            return false
        })
        if(won){
            this.setState({
                won:1
            }, function () {
                this.stopTimer()
            })
        }
        console.log(towers)
        console.log('disks')
        console.log(disks)
    }

    avoidSelect = (e) => {
        if(e.detail > 1 ){
            e.preventDefault()
        }
    }

    changeDisksCount = (change) => (event) => {
        this.setState(prevState => ({
            noOfDisks:(change === 'dn' ? prevState.noOfDisks-1 : prevState.noOfDisks+1)
            //noOfDisks: prevState.noOfDisks+1
        }),this.reset)
    }

    pickDisk = (disk, index, tower) => (event) => {
        if(this.state.won){
            alert('Game over! You\'ve won!!')
        }else {
            if (index === 0) {
                this.setState({
                    activeDisk: {
                        disk: disk,
                        tower: tower
                    }
                })
            } else {
                alert('You can\'t select lower discs')
            }
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
            disks: towers,
            won:0,
            timeLapsed:0,
            startTime:null
        }, function () {
            this.stopTimer()
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
        }), function () {
            this.hasWon()
            if(this.state.moves === 1){
                this.startTimer()
            }
        })
    }

    render() {
        const {disks, activeDisk} = this.state;
        return (
            <>
                <h1 className={'text-center'}>Hanoi Towers</h1>
                <p className={'text-center'}>Instructions: Select a disc you want to move and then select the Tower name you want your selected disc to move.</p>
                <div className={'text-center'} style={{padding:'10px'}}>
                    Discs count
                    <span onClick={this.changeDisksCount('dn')} onMouseDown={this.avoidSelect} className={'button'}>-</span>
                    <span style={{fontSize:'1.5em', 'margin':'0 10px',fontWeight:'bold'}}>{this.state.noOfDisks}</span>
                    <span onClick={this.changeDisksCount('up')} onMouseDown={this.avoidSelect} className={'button'}>+</span>
                    <span onClick={this.reset} onMouseDown={this.avoidSelect} style={{color: '#888', margin:'10px', cursor:'pointer'}}>Reset</span>
                    <div style={{margin:'15px 0 10px'}}>Complete the game in a minimum moves of {2**this.state.noOfDisks - 1}</div>
                </div>
                <div className={'towers'}>
                    {
                        Object.keys(disks).map((tower, index) => (
                            <div key={index} className={'tower'}>
                                <div onClick={this.moveDisk(tower)} onMouseDown={this.avoidSelect} className={'towerLabel'}>Tower {tower}</div>
                                {
                                    disks[tower].map((x, index) => {
                                        return (
                                            <div
                                                key={index}
                                                onClick={this.pickDisk(x, index, tower)}
                                                onMouseDown={this.avoidSelect}
                                                className={'disk'}
                                                style={{
                                                    width: (x / this.state.noOfDisks * 90) + '%',
                                                    background: (activeDisk.disk === x ? '#34C1FE' : '#34C1FE55'),
                                                    color: (activeDisk.disk === x ? '#fff' : '#80D9FF'),
                                                    borderColor: (activeDisk.disk === x ? '#34C1FE' : '#80D9FF'),
                                                }}
                                            >{x}</div>
                                        )
                                    })
                                }
                            </div>
                        ))
                    }
                </div>

                <div className={'text-center'} style={{margin:'20px 0'}}>
                    Moves by you <span style={{background:(this.state.moves <= 2**this.state.noOfDisks - 1 ? 'green' : 'red'), padding: '10px', color:'white', borderRadius: '5px', width:'20px', display:'inline-block',margin:'0 35px 0 5px'}}>{this.state.moves}</span> Timer: {this.state.timeLapsed} s
                    {
                        this.state.won && this.state.moves === 2**this.state.noOfDisks - 1
                            ? <p key={'won'} style={{color: 'green'}}>You won!</p>
                            : [
                                (this.state.won
                                        ? <p key={'won2'}>You've completed the game but passed the minimum moves</p>
                                    : ''
                                )
                            ]
                    }
                </div>
            </>
        )
    }
}

export default Home