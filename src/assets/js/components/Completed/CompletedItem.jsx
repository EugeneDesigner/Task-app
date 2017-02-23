import React, { Component } from 'react'
import TaskItemControls from '../TaskItemControls';

class CompletedItem extends Component {

  handleDelete = (itemId) => {
    this.props.onDelete(itemId)
  }
  render() {
    return (
      <li className='tasks__item'>
        <p className='tasks__item__value'>{this.props.name} <span className="tasks__item__value--time" id="clock">{this.props.time}</span></p>

        <TaskItemControls
          itemId={this.props.itemId}
          onDelete={this.handleDelete}
        />
      </li>
    )
  }
}

export default CompletedItem
