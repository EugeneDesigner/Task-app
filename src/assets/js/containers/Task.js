import React, { Component } from 'react'
import * as actions from '../actions/actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import App from '../components/App'


class Task extends Component {

  render() {
    const {toggleComplete, editItem, addItem, deleteItem, addTime, startTask, finishTime, stopActiveTask} = this.props.actions
    return (
      <section className="global">
        <div id="digits-background"></div>
        <App
          tasks={this.props.tasks}
          toggleComplete={toggleComplete}
          editItem={editItem}
          addItem={addItem}
          deleteItem={deleteItem}
          addTime={addTime}
          startTask={startTask}
          finishTime={finishTime}
          stopActiveTask={stopActiveTask}
        />
      </section>
    )
  }

}


function mapStateToProperties(state) {
  return {
    tasks: state.tasks
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}


export default connect(mapStateToProperties, mapDispatchToProps)(Task)
