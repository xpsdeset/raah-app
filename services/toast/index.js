import Toast from "./Toast"
import { ToastAndroid, Platform } from "react-native"

export default (text) => {
  if ((Platform.OS = "web"))
    Toast.show(text, {
      duration: 5000,
    })

  if ((Platform.OS = "android")) ToastAndroid.show(text, 5000)
}
