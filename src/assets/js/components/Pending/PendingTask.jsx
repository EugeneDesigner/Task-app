import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import ItemTypes from './ItemTypes'
import { DragSource, DropTarget } from 'react-dnd'
import flow from 'lodash/flow'
import TaskItemControls from '../TaskItemControls'


const style = {
  cursor: 'move',
};

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    };
  }
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index


    if (dragIndex === hoverIndex) {
      return;
    }

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()


    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2


    const clientOffset = monitor.getClientOffset()


    const hoverClientY = clientOffset.y - hoverBoundingRect.top


    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return
    }


    props.moveCard(dragIndex, hoverIndex)

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex
  }
}

const Proptypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  isDragging: PropTypes.bool.isRequired,
  id: PropTypes.any.isRequired,
  text: PropTypes.string.isRequired,
  moveCard: PropTypes.func.isRequired
}




class PendingTask extends Component {

  state = {
    edit: false,
    value: this.props.name
  }


  handleClick = () => {
      this.setState({ edit: true });
      this.textInput.focus();
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (e.target.value) {
      this.setState({
        value: e.target.value,
        edit: false,
      });
      this.props.onChange(this.props.id, e.target.value)
    } else {
      this.props.onDelete(this.props.id);
      }
    }
  }

  handleDelete = (itemId) => {
    this.props.onDelete(itemId)
  }

  handleComplete = (itemId) => {
    this.props.onComplete(itemId)
  }
  addActiveTask = (itemId) => {
    this.props.addActiveTask(itemId)
  }

  handleFocus = () => {
    this.setState({ edit: true });
  }

  render() {

    const { text, isDragging, connectDragSource, connectDropTarget, index, id } = this.props;
    const opacity = isDragging ? 0 : 1;
    var liClassName
    if (this.props.start) {
      liClassName = (this.props.id ===this.props.active  ? 'tasks__item active' : 'tasks__item')
    } else if (!this.props.start && this.props.active) {
      liClassName = 'tasks__item disabled'
    } else {
      liClassName = 'tasks__item'
    }


    return connectDragSource(connectDropTarget(

      <li className={liClassName}>
        <div className="tasks__item__value" onClick={this.handleClick}>
          <span>{this.state.value}</span>

          <input
            ref={(node) => { this.textInput = node; }}
            className={this.state.edit ? 'tasks__input' : 'tasks__input hidden'}
            type="text"
            defaultValue={this.state.value}
            readOnly={this.props.active ? !this.props.start : false}
            onKeyPress={this.handleKeyPress}
            onFocus={this.handleFocus}
            onBlur={() => this.setState({ edit: false })}
          />
        </div>
        <TaskItemControls
          itemId={this.props.id}
          onDelete={this.handleDelete}
          onComplete={this.handleComplete}
          startTask={this.props.startTask}
          addActiveTask={this.props.addActiveTask}
          active={this.props.active}
          start={this.props.start}
          stopActiveTask={this.props.stopActiveTask}
          stopClock={this.props.stopClock}
        />
      </li>
    ))
  }
}

PendingTask.propTypes = Proptypes

export default flow(
  DropTarget(ItemTypes.CARD, cardTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  })),
  DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))
)(PendingTask)
