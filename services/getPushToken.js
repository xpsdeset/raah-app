import { Notifications } from "expo"
import * as Permissions from "expo-permissions"
import Constants from "expo-constants"
import toast from "services/toast"

export default async () => {
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
      toast("Failed to get push token for push notification!")
      return
    }
    let token = await Notifications.getExpoPushTokenAsync()
    return token
  } else {
    return "nf"
  }
}
