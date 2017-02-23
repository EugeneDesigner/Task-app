import React, { Component } from 'react';

class Taskstats extends Component {
  static propTypes = {
    tasksCounter: React.PropTypes.number,
    completed: React.PropTypes.number,
  }

  static defaultProps = {
    todoCounter: 0,
    completed: 0,
  }

  render() {
    return (
      <div className="tasks__stats">
        <span>Completed: {this.props.completed} of {this.props.tasksCounter}</span>
      </div>
    );
  }
}

export default Taskstats;
