import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const initialState = {
  token: '',
  currentUser: {}
}

export const setToken = (token) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_TOKEN',
      payload: token
    })
  }
}

const reducer = (state = initialState, action) => {
  if(action.type === 'SET_TOKEN') {
    return {
      ...state,
      token: action.payload
    }
  }

  if(action.type === 'SET_USER') {
    return {
      ...state,
      user: action.payload
    }
  }

  return state
}

const store = createStore(reducer, applyMiddleware(thunk))

export default store