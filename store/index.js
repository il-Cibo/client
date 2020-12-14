import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const initialState = {
  token: ''
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
      token: action.payload
    }
  }

  return state
}

const store = createStore(reducer, applyMiddleware(thunk))

export default store