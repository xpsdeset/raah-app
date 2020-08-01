import React, { useState, useEffect } from "react"
import { BackHandler } from "react-native"
import { useSelector } from "react-redux"
import toast from "services/toast"
import { useFirebase } from "react-redux-firebase"

export default (Component) => (props) => {
  let { navigation } = props

  let [loading, setLoading] = useState(false)

  const firebase = useFirebase()

  useEffect(() => {
    const handleBackPress = () => true
    BackHandler.addEventListener("hardwareBackPress", handleBackPress)

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress)
    }
  }, [])

  let postVerification = async () => {
    firebase.updateProfile({ tos: true })
  }

  return (
    <Component
      {...props}
      {...{
        postVerification,
      }}
    />
  )
}
