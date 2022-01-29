import { rrfProps, store } from "./redux"

import Navigator from "./screens"
import { Provider } from "react-redux"
import React from "react"
import { ReactReduxFirebaseProvider } from "react-redux-firebase"

export default function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Navigator />
      </ReactReduxFirebaseProvider>
    </Provider>
  )
}