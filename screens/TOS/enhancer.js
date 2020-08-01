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
    let { verificationId, verificationCode } = props.route.params
    setLoading(true)
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      )
      await firebase.auth().signInWithCredential(credential)
      props.navigation.navigate("FrontPageScreen")
    } catch (err) {
      toast(`Error: ${err.message}`)
    }
  }

  return (
    <Component
      {...props}
      {...{
        postVerification,
        loading,
      }}
    />
  )
}
