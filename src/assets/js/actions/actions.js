export function toggleComplete(itemId) {
  return {
      type: 'TOGGLE_COMPLETE',
      itemId
  }
}


export function editItem(itemId, name) {
  return {
    type: 'EDIT_ITEM',
    itemId,
    name
  }
}

export function stopActiveTask(itemId) {
  return {
    type: 'STOP_TASK',
    itemId,
    start: false,
    goalTime: false
  }
}
export function finishTime(time, itemId) {
  return {
    type: 'FINISH_TIME',
    itemId,
    time,
    start: false,
    completed: true,
    goalTime: false
  }
}
export function startTask(itemId) {
  return {
    type: 'START_TASK',
    itemId,
    start: true
  }
}
export function addTime(time, itemId) {
  return {
    type: 'ADD_TIME',
    itemId,
    goalTime: time
  }
}

export function cancelEditing(itemId) {
  return {
    type: 'CANCEL_EDITING',
    itemId
  }
}


export function clearCompleted() {
  return {
    type: 'CLEAR_COMPLETED'
  }
}


export function addItem(name) {
  return {
    type: 'ADD_ITEM',
    name
  }
}

export function deleteItem(itemId) {
  return {
    type: 'DELETE_ITEM',
    itemId
  }
}
