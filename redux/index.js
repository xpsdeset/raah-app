import { combineReducers, createStore } from "redux"

import { firebase } from '../firebase/config'
import {
  firebaseReducer,
} from "react-redux-firebase"

const rootReducer = combineReducers({
  firebase: firebaseReducer,
})

const initialState = {}
const store = createStore(rootReducer, initialState)

const rrfProps = {
  firebase,
  dispatch: store.dispatch,
  debug: true,
  initializeAuth: true,
  config: {
    userProfile: "users",
  },
}

export { store, rrfProps }