import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"
import { createStore, combineReducers } from "redux"
import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
} from "react-redux-firebase"
import fbConfig from "../firebase/config.json"

firebase.initializeApp(fbConfig)

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
