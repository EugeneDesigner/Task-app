import React, { Component } from 'react'

class AddTask extends Component {

  constructor() {
    super()
    this.state = {
      task: ''
    }

    this.valueChange = this.valueChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  static propTypes = {
    addItem: React.PropTypes.func.isRequired,
  }

  valueChange(e) {
    this.setState({
      task: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.task) {
      this.props.addItem(this.state.task)
      this.setState({
        task: ''
      })
    }
  }

  render() {
    return (
      <form
        className="tasks__form"
        onSubmit={this.handleSubmit}
      >
        <input
          ref='search__input'
          type="text"
          name="text"
          value={this.state.task}
          onChange={this.valueChange}
          required
        />
        <button type="submit"> Add new task </button>
      </form>
    )
  }
}

export default AddTask
