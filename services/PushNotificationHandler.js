import React, { useEffect } from "react"
import { AppState } from "react-native"
import * as Notifications from "expo-notifications"
import { useNavigation } from "@react-navigation/native"

export default function Container() {
  const navigation = useNavigation()

  var appState
  const _handleAppStateChange = (nextAppState) => {
    appState = nextAppState
  }

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        let notBody = response.notification.request.content.data.body
        if (appState === "active") {
          Notifications.dismissAllNotificationsAsync()
        }
        if (notBody.screen == "waitingPool") {
          console.log(navigation)
          navigation.navigate("WaitingPoolScreen")
        }
      }
    )
    return () => subscription.remove()
  }, [navigation])

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange)

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange)
    }
  }, [])

  return <></>
}
