import React, { Component } from 'react';
import classNames from 'classnames'
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            mode: "beginning",
            mainCount: 0,
            listeners: [],
        }
    }
    componentDidMount() {
        this.startCounting()
    }
    startCounting() {
        let listeners = this.state.listeners
        setInterval(() => {
            listeners.forEach(l => l())
        }, 10)
    }
    startTimer() {
        this.setState({mode: 'timing'})
        this.addListener(() => {
            this.setState({mainCount: this.state.mainCount + 1})
        })
    }
    addListener(listener) {
        this.setState({listeners: this.state.listeners.push(listener)})
    }
    formatCount(count) {
        let hours = Math.floor(count / 3600)
        count = count % 3600
        let minutes = Math.floor(count / 60)
        let seconds = count % 60


        let hoursStr = hours > 0 ? `${hours}:` : ""
        let minutesPadLength = hours > 0 ? 2 : 1
        let minutesStr = hours > 0 || minutes > 0 ? `${this.zeroPad(minutes, minutesPadLength)}:` : ""
        let secondsPadLength = hours > 0 || minutes > 0 ? 2 : 1
        let secondsStr = `${this.zeroPad(seconds, secondsPadLength)}`

        return `${hoursStr}${minutesStr}${secondsStr}`
    }
    zeroPad(number, pad) {
        let numStr = number + ""
        while (numStr.length < pad) {
            numStr = `0${numStr}`
        }
        return numStr
    }
    render() {
        return (
            <div className="master">
                <div className={classNames({hidden: this.state.mode !== "beginning"})}>
                    <button className="main-button" onClick={() => this.startTimer()}>
                        Start
                    </button>
                </div>
                <div className={classNames({hidden: this.state.mode !== "timing"})}>
                    {this.formatCount(this.state.mainCount)}
                </div>
                <div className={classNames({hidden: this.state.mode !== "credits"})}>
                    Logo graphic by <a href="http://www.flaticon.com/authors/freepik">freepik</a> from <a href="http://www.flaticon.com/">Flaticon</a> is licensed under <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC BY 3.0</a>. Check out the new logo that I created on <a href="http://logomakr.com" title="Logo Maker">LogoMaker.com</a> https://logomakr.com/13RLKq13RLKq
                </div>
            </div>
        );
    }
}

export default App;
