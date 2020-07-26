import React, { useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { Linking } from "react-native"
import { BackHandler } from "react-native"
import { useSelector } from "react-redux"
import { useFirebase } from "react-redux-firebase"
import Banned from "./components/Banned"

import Constants from "expo-constants"

let enhancer = (Component) => (props) => {
  const firebase = useFirebase()

  const navigation = useNavigation()
  const profile = useSelector((state) => state.firebase.profile)

  const updateNotify = () => {
    return firebase.updateProfile({ notify: !profile.notify })
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

  useEffect(() => {
    const handleBackPress = () => true
    BackHandler.addEventListener("hardwareBackPress", handleBackPress)
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress)
    }
  })

  if (profile.banned) return <Banned {...props} />

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
