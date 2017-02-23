import React, { Component } from 'react'
import TimeInput from './TimeInput'


class TimeSelection extends Component {
  constructor() {
    super()

    this.state = {
      days: '00',
      hours: '00',
      mins: '00',
      secs: '00'
    }
  this.changeTime = this.changeTime.bind(this)
  this.newTime    = this.newTime.bind(this)
  }

  changeTime(e) {
    let number = e.target.value.toString()
    if (number.length > 2) {
      alert('it is a very foundamental task, or, maybe, it should not take so many ' + e.target.name + '. Try using other fields as well')
    } else if (number.indexOf('-') != -1) {
      return
    }
    else {
      this.setState({
        [e.target.name]: e.target.value
      })
    }

  }

  newTime(e) {
    const {days, hours, mins, secs} = this.state
    if (Math.max(parseInt(days), parseInt(hours), parseInt(mins), parseInt(secs)) > 0) {
      let time = parseInt(days)*86400000 + parseInt(hours)*3600000 + parseInt(mins)*60000 + parseInt(secs)*1000
      this.props.addTime(time, this.props.activeElement)
      this.props.onTime(time)
      document.getElementById("digits").style.display = 'none'
      document.getElementById("digits-background").style.display = 'none'
    } else {
      alert('you may need some time to finish the task')
    }

  }
  render() {
    return (

      <div id="digits">
        <div>
          <p>Days<span className="colon">: </span>
            <input type="number"
                   pattern="[0-8]+"
                   className="digits"
                   onChange={this.changeTime}
                   value={this.state.days}
                   name='days'/>
          </p>
          <p>Hours<span className="colon">: </span>
            <input type="number"
                   className="digits"
                   onChange={this.changeTime}
                   value={this.state.hours}
                   name='hours'/>
          </p>
          <p>Mins<span className="colon">: </span>
            <input type="number"
                   className="digits"
                   value={this.state.mins}
                   onChange={this.changeTime}
                   name='mins'/></p>
          <p>Secs<span className="colon last">: </span>
            <input type="number"
                   className="digits"
                   value={this.state.secs}
                   onChange={this.changeTime}
                   name='secs'/></p>

          <div onClick={this.newTime} id="start-clock">Start</div>
        </div>
      </div>
    )
  }
}

export default TimeSelection
