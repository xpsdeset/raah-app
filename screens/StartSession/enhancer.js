import React, { useEffect, useState } from "react"
import { BackHandler } from "react-native"
import { useNavigation } from "@react-navigation/native"
import toast from "services/toast"

import { useSelector } from "react-redux"
import { useFirebase } from "react-redux-firebase"

export default (Component) => (props) => {
  const navigation = useNavigation()

  const [reason, setReason] = useState("")

  const firebase = useFirebase()
  const auth = useSelector((state) => state.firebase.auth)

  const onStartSession = async () => {
    navigation.navigate("SeekerLoungeScreen", { uid: auth.uid })
    firebase.set(`waiting/${auth.uid}`, {
      reason,
      time: firebase.database.ServerValue.TIMESTAMP,
    })
  }

  useEffect(() => {
    const handleBackPress = () => navigation.navigate("FrontPageScreen")
    BackHandler.addEventListener("hardwareBackPress", handleBackPress)
    return BackHandler.removeEventListener("hardwareBackPress", handleBackPress)
  }, [])

  return <Component {...props} {...{ setReason, onStartSession }} />
}
