import React, { useEffect } from "react"

let enhancer = (Component) => (props) => {
  let { navigation } = props

  const onNavigateToFrontScreen = () => {
    navigation.navigate("FrontPageScreen")
  }
  return (
    <Component
      {...props}
      {...{
        onNavigateToFrontScreen
      }}
    />
  )
}

export default enhancer
