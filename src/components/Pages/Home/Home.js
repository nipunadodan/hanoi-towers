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
        noOfDisks:5,
        noOfTowers:3,
        disks: {
            1: [1, 2, 3, 4, 5],
            2: [],
            3: []
        },
        activeDisk:{
            disk:'',
            tower:''
        },
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        const {noOfTowers, noOfDisks,disks} = this.state;

        if(name === 'noOfTowers') {
            const towers = {};
            for(let x=1; x <= value; x++){
                towers[x] = []
            }
            towers[1] = [...Array(noOfDisks+1).keys()];
            towers[1].shift()
            console.log(noOfDisks)
            this.setState({
                noOfTowers: value,
                disks:{
                    ...towers,
                }
            })
        }else if(name === 'noOfDisks'){
            disks[1] = [...Array(parseInt(value)+1).keys()];
            disks[1].shift()
            this.setState({
                noOfDisks: parseInt(value),
                disks: {
                    ...disks
                }
            })
        }
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
            <>
                <div className={'text-center'} style={{padding:'10px'}}>
                    <input type={'number'} name={'noOfDisks'} style={{width:'40px', padding:'5px', margin:'5px 10px', textAlign:'center'}} value={this.state.noOfDisks} onChange={this.handleChange}/> Discs
                    <input type={'number'} name={'noOfTowers'} style={{width:'40px', padding:'5px', margin:'5px 10px', textAlign:'center'}} value={this.state.noOfTowers} onChange={this.handleChange}/> Towers
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
                                                    width: (x / disks[tower].length * 90) + '%',
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
            </>
        )
    }
}

export default Home