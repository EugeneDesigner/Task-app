import React, { Component } from 'react'
import update from 'react/lib/update'
import PendingTask from './PendingTask'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'



class Container extends Component {

  constructor(props) {
    super(props)
    this.state = {
      cards: props.cards
    }


    this.moveCard   = this.moveCard.bind(this)
  }

  shouldComponentUpdate() {
    return true
  }
  componentWillReceiveProps(newProps) {
    this.setState({cards: newProps.cards})
}
  moveCard(dragIndex, hoverIndex) {
    const { cards } = this.state
    const dragCard = cards[dragIndex]

    this.setState(update(this.state, {
      cards: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard]
        ]
      }
    }))
  }


  render() {
    const { cards } = this.state

    return (
      <ul className="tasks__list">
        {cards.map((card, i) => {
          if (!card.completed) {
            return (
              <PendingTask
                  key={card.id}
                  active={this.props.active}
                  id={card.id}
                  name={card.name}
                  onDelete={this.props.onDelete}
                  onComplete={this.props.onComplete}
                  onChange={this.props.onChange}
                  start={card.start}
                  startTask={this.props.startTask}
                  addActiveTask={this.props.addActiveTask}
                  index={i}
                  moveCard={this.moveCard}
                  stopClock={this.props.stopClock}
                  stopActiveTask={this.props.stopActiveTask} />
            )
          }

        })}
      </ul>
    )

  }
}

export default DragDropContext(HTML5Backend)(Container)
