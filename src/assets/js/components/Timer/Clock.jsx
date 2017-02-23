  import React, {Component} from 'react';

  class Clock extends Component {
    constructor(props) {
        super(props)
        this.state = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            id: ''
        }

      this.getTimeUntil = this.getTimeUntil.bind(this)
      this.toHumanTime  = this.toHumanTime.bind(this)
      }

  componentWillMount() {
      this.getTimeUntil(this.props.deadline)
  }

  componentDidMount() {
        setInterval(() => this.getTimeUntil(this.props.deadline), 1000)

  }
  shouldComponentUpdate() {
    if (this.props.itemId && !this.state.id) {
      this.setState({id: this.props.itemId})
    }
    return true
  }
  componentWillUnmount() {
    clearInterval()
  }
  leading0(num) {
      return num < 10 ? '0' + num : num
  }

  toHumanTime(time) {
    const seconds = Math.floor((time/1000) % 60)
    const minutes = Math.floor((time/1000/60) % 60)
    const hours = Math.floor(time/(1000*60*60) % 24)
    const days = Math.floor(time/(1000*60*60*24))
    this.setState({days, hours, minutes, seconds})
  }


    getTimeUntil(deadline) {
        if (deadline && deadline !== 'stop') {
          const time = deadline - Date.parse(new Date())
          if (time == 0 && this.state.id) {
            this.toHumanTime(this.state.initialTime)
            this.props.finishTime(this.state.days + 'd:' + this.state.hours + 'h:' + this.state.minutes + 'm:' + this.state.seconds + 's', this.state.id)
            this.props.handleTime('')
          }
          this.toHumanTime(time)
          this.setState({currentTime: time})

          if (!this.state.initialTime) {
            this.setState({initialTime: time})
          }
        }
        else {
          if (this.state.initialTime) {
            console.log('here')
            const {initialTime, currentTime} = this.state
            const time = initialTime - currentTime
            this.toHumanTime(time)
            if (deadline !== 'stop') {
              this.props.finishTime(this.state.days + 'd:' + this.state.hours + 'h:' + this.state.minutes + 'm:' + this.state.seconds + 's', this.state.id)
            }
          }
          this.setState({days: 0, hours: 0, minutes: 0, seconds: 0, initialTime: '', currentTime: '', id: ''})
        }
    }

    render() {

        return (
            <div className="tasks__clock">
                <div className="clock-days">{this.leading0(this.state.days)}d</div>
                <div className="clock-hours">{this.leading0(this.state.hours)}h</div>
                <div className="clock-minutes">{this.leading0(this.state.minutes)}m</div>
                <div className="clock-seconds">{this.leading0(this.state.seconds)}s</div>
            </div>
        )
    }
}

export default Clock
