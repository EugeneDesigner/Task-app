import React, { Component } from 'react'
import TaskStats from './Completed/Taskstats'
import CompletedItem from './Completed/CompletedItem'
import AddTask from './AddTask'
import Clock from './Timer/Clock'
import TimeSelection from './Timer/TimeSelection'
import update from 'react/lib/update'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Container from './Pending/Container'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      activeElement: '',
      goalTime: '',
      tasks: props.tasks
    }
  this.handleTime = this.handleTime.bind(this)
  this.addActiveTask = this.addActiveTask.bind(this)
  this.stopClock= this.stopClock.bind(this)
  }

  addActiveTask(itemId) {
    if (this.state.activeElement) {
      this.setState({
        activeElement: '',
        goalTime: false
      })
    } else {
      this.setState({
        activeElement: itemId
      })
    }
  }

  stopClock(itemId) {
    if (this.state.activeElement && this.state.activeElement === itemId) {
      this.setState({
        activeElement: '',
        goalTime: 'stop'
      })
    }
  }
  handleTime(time) {
    if (time) {
      this.setState({
        goalTime: Date.parse(new Date()) + time})
    } else {
      this.setState({goalTime: '', activeElement: ''})
    }
  }
  render() {
    const {toggleComplete, editItem, addItem, deleteItem, addTime, startTask, finishTime, stopActiveTask} = this.props

    const taskList = this.props.tasks
    let completedItems = []
    const taskItems = taskList.map(function(item, i){
      if (item['completed']) {
        completedItems.push(
          <CompletedItem
            key={item.id}
            itemId={item.id}
            name={item.name}
            onDelete={deleteItem}
            time={item.time}
          />
        )
      }
    }, this)

    return (
      <div className="tasks">
      
        <Clock deadline={this.state.goalTime ? this.state.goalTime : false} itemId={this.state.activeElement ? this.state.activeElement : ''} finishTime={finishTime} handleTime={this.handleTime}/>

        {this.state.activeElement ? <TimeSelection activeElement={this.state.activeElement} addTime={addTime} onTime={this.handleTime}/> : null}


        <h1>Pending</h1>
        <AddTask addItem={addItem}/>
        <Container cards={taskList}
                    startTask={startTask}
                    addActiveTask={this.addActiveTask}
                    onDelete={deleteItem}
                    onComplete={toggleComplete}
                    onChange={editItem}
                    active={this.state.activeElement}
                    stopActiveTask={stopActiveTask}
                    stopClock={this.stopClock}

        />
        <h1>Done</h1>
        <TaskStats
          tasksCounter={this.props.tasks.length}
          completed={this.props.tasks.filter(item => item.completed).length}
        />

          <ul className="tasks__list">
            {completedItems.length > 0 ? completedItems : <p>No completed tasks to display</p>}
          </ul>
      </div>
    );
  }
}




export default DragDropContext(HTML5Backend)(App)
