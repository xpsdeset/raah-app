import React from "react"
import { StatusBar } from "expo-status-bar"
import { store, rrfProps } from "./redux"
import { Provider } from "react-redux"
import Navigator from "./screens"
import { ReactReduxFirebaseProvider } from "react-redux-firebase"

console.disableYellowBox = true

export default function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Navigator />
      </ReactReduxFirebaseProvider>
    </Provider>
  )
}
