import Toast from "react-native-tiny-toast"

export default (msg) => {
  Toast.show(msg, {
    position: Toast.position.top,
  })
}
