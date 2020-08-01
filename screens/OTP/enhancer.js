import React, { useState, useEffect } from "react"
import { BackHandler } from "react-native"
import { useFirebase } from "react-redux-firebase"
import toast from "services/toast"

export default (Component) => (props) => {
  let { navigation } = props
  const firebase = useFirebase()
  const [phoneNumber, setPhoneNumber] = useState("+91")
  const [verificationId, setVerificationId] = useState()
  const [verificationCode, setVerificationCode] = useState()
  const [phase2, setPhase2] = useState(false)
  const firebaseConfig = firebase.apps.length
    ? firebase.app().options
    : undefined

  useEffect(() => {
    const handleBackPress = () => true
    BackHandler.addEventListener("hardwareBackPress", handleBackPress)

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress)
    }
  }, [])

  let sendVerificationCode = (recaptchaVerifier) => async () => {
    try {
      const phoneProvider = new firebase.auth.PhoneAuthProvider()
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current
      )
      setVerificationId(verificationId)
      toast("Verification code has been sent to your phone.")
    } catch (err) {
      toast(`Error: ${err.message}`)
    }
  }

  let postVerification = async () => {
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      )
      await firebase.auth().signInWithCredential(credential)
    } catch (err) {
      toast(err.message)
    }
  }

  return (
    <Component
      {...props}
      {...{
        phoneNumber,
        setPhoneNumber,
        verificationId,
        verificationCode,
        setVerificationCode,
        firebaseConfig,
        sendVerificationCode,
        postVerification,
        phase2,
        setPhase2,
      }}
    />
  )
}
