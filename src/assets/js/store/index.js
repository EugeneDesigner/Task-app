import { compose, createStore, combineReducers, applyMiddleware } from 'redux'
import reducer from '../reducers'
import thunk from 'redux-thunk'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

const store = createStoreWithMiddleware(reducer)

export default store
