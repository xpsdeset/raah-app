import React, { useEffect } from "react"
import { Linking } from "react-native"
import { BackHandler } from "react-native"
import { useSelector } from "react-redux"
import { useFirebase } from "react-redux-firebase"
import { useFocusEffect } from "@react-navigation/native"
import Constants from "expo-constants"

let enhancer = (Component) => (props) => {
  let { navigation } = props
  const firebase = useFirebase()

  const profile = useSelector((state) => state.firebase.profile)

  const updateNotify = () => {
    let notify = "yes"
    if (profile.notify == "yes") notify = "no"
    firebase.updateProfile({ notify })
  }

  const onNavigateToStarSession = () => {
    navigation.navigate("StartSessionScreen")
  }

  const onNavigateToWaitingPool = () => {
    navigation.navigate("WaitingPoolScreen")
  }

  const openLink = (link) => {
    Linking.openURL(Constants.manifest.extra[link])
  }

  useFocusEffect(() => {
    if (profile.notify == "busy") firebase.updateProfile({ notify: "yes" })
  })

  useEffect(() => {
    const handleBackPress = () => true
    BackHandler.addEventListener("hardwareBackPress", handleBackPress)
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress)
    }
  })

  return (
    <Component
      {...props}
      {...{
        onNavigateToWaitingPool,
        onNavigateToStarSession,
        openLink,
        profile,
        updateNotify,
      }}
    />
  )
}

export default enhancer
