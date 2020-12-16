import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const initialState = {
  token: '',
  currentUser: {},
  loading: false,
  error: false
}

export const setToken = (token) => {
  console.log(token);
  return (dispatch) => {
    dispatch({
      type: 'SET_TOKEN',
      payload: token
    })
  }
}


// const reducer = (state = initialState, action) => {
//   if(action.type === 'SET_TOKEN') {
//     return {
//       ...state,
//       token: action.payload

// export const getToken = () => {
//   return async (dispatch) => {
//     try {
//       const token = await AsyncStorage.getItem()
      
//     } catch (err) {
      
//     } finally {


//     }

//   }
// }


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
    case 'GET_TOKEN':
      return { ...state, token: action.payload }
    case 'SET_USER':
      return { ...state, currentUser: action.payload}
    default:
      return state
  }
}

const store = createStore(reducer, applyMiddleware(thunk))

export default store