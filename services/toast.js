import Toast from "react-native-tiny-toast"

export default (msg) => {
  Toast.show(msg, {
    position: 50,
    duration: 5000,
  })
}
