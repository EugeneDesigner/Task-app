import uuid from 'uuid/v4';


const initialState = []



export default function app(state = initialState, action) {
  switch (action.type) {
   case 'STOP_TASK':
   return state.map(task =>
      task.id === action.itemId ?
        { ...task, start: action.start } :
        task
    )
   case 'TOGGLE_COMPLETE':
   return state.map(task =>
      task.id === action.itemId ?
        { ...task, completed: !task.completed } :
        task
    )
   case 'START_TASK':
   return state.map(task =>
      task.id === action.itemId ?
        { ...task, start: action.start } :
        task
    )
    case 'FINISH_TIME':
    return state.map(task =>
       task.id === action.itemId ?
         { ...task, time: action.time, start: action.start, completed: action.completed, goalTime: action.goalTime } :
        task
     )
   case 'EDIT_ITEM':
     return state.map(task =>
        task.id === action.itemId ?
          { ...task, name: action.name } :
          task
      )
   case 'CANCEL_EDITING':
     return cancelEditing(state, action.itemId)
   case 'DONE_EDITING':
     return doneEditing(state, action.itemId, action.newName)
   case 'CLEAR_COMPLETED':
     return state.filter(task => task.completed === false)

   case 'ADD_TIME':
   return state.map(task =>
      task.id === action.itemId ?
        { ...task, goalTime: action.goalTime} :
        task
    )
   case 'ADD_ITEM':
   return [
      {
        id: uuid(),
        completed: false,
        name: action.name,
        active: false,
        time: '',
        start: false
      },
      ...state
    ]

   case 'DELETE_ITEM':
     return state.filter(task =>
      task.id !== action.itemId)
 }
 return state
}
