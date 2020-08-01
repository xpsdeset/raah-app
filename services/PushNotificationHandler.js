import React, { useState, useEffect, useRef } from "react"
import { AppState } from "react-native"
import Constants from "expo-constants"
import * as Notifications from "expo-notifications"
import * as Permissions from "expo-permissions"
import { Text, View, Button, Platform } from "react-native"
import { useFirebase } from "react-redux-firebase"
import { useNavigation } from "@react-navigation/native"

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

export default function TokenHandler() {
  const navigation = useNavigation()
  const [expoPushToken, setExpoPushToken] = useState("")
  const [notification, setNotification] = useState(false)
  const responseListener = useRef()
  const firebase = useFirebase()

  var appState
  const _handleAppStateChange = (nextAppState) => {
    appState = nextAppState
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then((deviceToken) => {
      firebase.updateProfile({ deviceToken })
      setExpoPushToken(deviceToken)
    })

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        let notBody = response.notification.request.content.data

        if (notBody.screen == "waitingPool") {
          navigation.navigate("WaitingPoolScreen")
        }
        Notifications.dismissAllNotificationsAsync()
      }
    )
    AppState.addEventListener("change", _handleAppStateChange)

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange)
      Notifications.removeNotificationSubscription(responseListener)
    }
  }, [])

  return null
}

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications

async function registerForPushNotificationsAsync() {
  let token
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    )
    let finalStatus = existingStatus
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
      finalStatus = status
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!")
      return
    }
    token = (await Notifications.getExpoPushTokenAsync()).data
  } else {
    alert("Must use physical device for Push Notifications")
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    })
  }

  return token
}
