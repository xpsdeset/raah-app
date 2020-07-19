import React, { useEffect, useState } from "react"
import { BackHandler } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useSelector } from "react-redux"
import { useFirebase, useFirebaseConnect } from "react-redux-firebase"

export default (Component) => (props) => {
  useFirebaseConnect(["waiting"])
  const navigation = useNavigation()
  const firebase = useFirebase()
  const waitingPool = useSelector((state) => state.firebase.data["waiting"])
  const auth = useSelector((state) => state.firebase.auth)

  let acceptSession = (partnerId) => {
    let obj = {
      talker: partnerId,
      listener: auth.uid,
      sessionStarted: firebase.database.ServerValue.TIMESTAMP,
    }
    let roomId = `${partnerId}-${auth.uid}`
    firebase.ref(`rooms/${roomId}`).set(obj)
    firebase.ref(`waiting/${partnerId}/listener`).set(auth.uid)
    props.navigation.navigate("ChatScreen", { roomId, role: "listener" })
  }

  useEffect(() => {
    const handleBackPress = () => navigation.navigate("FrontPageScreen")
    BackHandler.addEventListener("hardwareBackPress", handleBackPress)
    return BackHandler.removeEventListener("hardwareBackPress", handleBackPress)
  }, [])

  return <Component {...props} {...{ waitingPool, acceptSession }} />
}
