import React, { useEffect, useState } from "react"
import { BackHandler } from "react-native"
import toast from "services/toast"
import { useSelector } from "react-redux"
import { useFirebaseConnect, useFirebase } from "react-redux-firebase"
import { useFocusEffect } from "@react-navigation/native"

export default (Component) => (props) => {
  let { navigation } = props
  let session = props.route.params
  let { roomId } = session
  let myRole = props.route.params.role
  let oppoRole = myRole == "listener" ? "talker" : "listener"
  let firebase = useFirebase()

  let roomRef = firebase.ref(`rooms/${roomId}`)
  let typingRef = roomRef.child("typing")
  let messagesRef = roomRef.child("messages")
  let reportRef = firebase.ref(`reports`)

  let [isTyping, setIsTyping] = useState(false)
  let [showMenu, setShowMenu] = useState(false)
  let [reportReason, setReportReason] = useState("")

  const auth = useSelector((state) => state.firebase.auth)
  const profile = useSelector((state) => state.firebase.profile)

  useFirebaseConnect([`rooms/${roomId}`])
  session = useSelector(
    (state) => state.firebase.data.rooms && state.firebase.data.rooms[roomId]
  )
  let user = { myRole, _id: auth.uid }

  let onSend = (msgs) => {
    typingRef.update({ [myRole]: false })
    msgs.forEach((msg) => {
      messagesRef.push({
        text: msg.text,
        time: firebase.database.ServerValue.TIMESTAMP,
        id: auth.uid,
      })
    })
  }

  let timeoutVar

  let endConversation = () => {
    messagesRef.push({
      text: "Your buddy has left",
      time: firebase.database.ServerValue.TIMESTAMP,
      id: auth.uid,
      system: true,
    })
    roomRef.update({ ses_ended: true })

    navigation.navigate("FrontPageScreen")
  }
  let reportConversation = () => {
    reportRef.push({
      roomId,
      reason: reportReason,
      by: auth.uid,
      for: session[oppoRole],
    })
    roomRef.update({ report: true })
    toast("Sorry about this,The incident has been recorded.")
    endConversation()
  }

  let onInputTextChanged = () => {
    clearTimeout(timeoutVar)
    if (!isTyping) {
      setIsTyping(true)
      typingRef.update({ [myRole]: true })

      timeoutVar = setTimeout(() => {
        setIsTyping(false)
        typingRef.update({ [myRole]: false })
      }, 1000)
    }
  }

  useFocusEffect(() => {
    if (profile.notify == "yes") firebase.updateProfile({ notify: "busy" })
  })

  useEffect(() => {
    const handleBackPress = () => true
    BackHandler.addEventListener("hardwareBackPress", handleBackPress)
    return BackHandler.removeEventListener("hardwareBackPress", handleBackPress)
  }, [])

  return (
    <Component
      {...props}
      {...{
        session,
        onSend,
        user,
        onInputTextChanged,
        oppoRole,
        showMenu,
        setShowMenu,
        endConversation,
        setReportReason,
        reportConversation,
      }}
    />
  )
}
