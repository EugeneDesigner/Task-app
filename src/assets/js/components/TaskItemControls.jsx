import React, { Component } from 'react';
import Icons from '../common/Icons'

class TaskItemControls extends Component {
  static propTypes = {
    itemId: React.PropTypes.string.isRequired,
    onDelete: React.PropTypes.func.isRequired,
  }

  handleDelete = () => {
    if ((this.props.active && this.props.itemId === this.props.active) || !this.props.active) {
      this.props.onDelete(this.props.itemId)
    }
  }

  handleComplete = () => {
    this.props.onComplete(this.props.itemId)
    this.props.addActiveTask(this.props.itemId)
  }

  handleActive = () => {
    this.props.startTask(this.props.itemId)
    document.getElementById("digits-background").style.display = 'block'
    this.props.addActiveTask(this.props.itemId)
  }

  showTime = () => {
    let clock = document.getElementById('clock')
    if (clock.style.opacity === '1') {
      clock.style.transform = 'translateX(60px)'
      clock.style.opacity   = '0'
    } else {
      clock.style.transform = 'translateX(0)'
      clock.style.opacity   = '1'
    }

  }

  handleStop = () => {
    this.props.stopClock(this.props.itemId)
    this.props.stopActiveTask(this.props.itemId)
  }

  render() {
    return (
      <div className="tasks__item__controls">
        { this.props.active && this.props.itemId === this.props.active ?
          <div className="tasks__item__controls--pending">
            <button onClick={this.handleComplete} id="finish"><Icons icon="finish"/></button>
            <button onClick={this.handleStop} id="pause"><Icons  icon="stop"/></button>
          </div>
          :
          <div className="tasks__item__controls--pending">

            {this.props.onComplete ? <button onClick={this.handleActive} id="start" disabled={this.props.active}><Icons icon="start"/></button> : <button onClick={this.showTime} id="clock" disabled={this.props.active}><Icons icon="clock"/></button>}
            <button onClick={this.handleDelete} id="delete" disabled={this.props.active}><Icons  icon="delete"/></button>
          </div>
        }
      </div>
    );
  }
}

export default TaskItemControls
