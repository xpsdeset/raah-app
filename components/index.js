import React, { createContext } from "react"
import { WebView as RNWebView } from "react-native-webview"
import WWebView from "react-native-web-webview"
import {
  View,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Image,
  Keyboard,
  Dimensions,
  Platform,
} from "react-native"
import Images from "./Images"
import globalStyles from "./style"
import { isLoaded, isEmpty } from "react-redux-firebase"
import _ from "lodash"
import { Overlay as NOverlay } from "react-native-elements"
import Modal from "modal-react-native-web"

let Container = ({ children, style, bg }) => {
  function dismissKeyboard() {
    if (Platform.OS != "web") {
      Keyboard.dismiss()
    }
  }
  let Cview = (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          ...style,
        }}
      >
        {children}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )

  if (bg) Cview = <Background bg={bg}>{Cview}</Background>

  return Cview
}

let Row = ({ children, style }) => {
  return <View style={style}>{children}</View>
}

let Background = ({ children, noCenter, bg }) => {
  let { width, height } = Dimensions.get("window")

  let src = Images.background
  if (bg == "white") src = Images.backgroundWhite

  if (Platform.OS == "web") {
    width = "100%"
    height = "100%"
  } else {
    width = width < height ? width : height
    height = width < height ? height : width
  }

  return (
    <ImageBackground
      source={src}
      style={noCenter ? { flex: 1 } : globalStyles.bg}
      imageStyle={{
        resizeMode: "repeat",
        width,
        height,
      }}
    >
      {children}
    </ImageBackground>
  )
}

let Loader = ({ item, children }) => {
  return (
    <>
      {!isLoaded(item) ? (
        <Loading />
      ) : isEmpty(item) ? (
        <Container bg>{children}</Container>
      ) : (
        children
      )}
    </>
  )
}

let isSafe = (item) => isLoaded(item) && !isEmpty(item) && !_.isEmpty(item)
let isSafeEmpty = (item) => isLoaded(item) && isEmpty(item)

let Logo = () => <Image source={Images.logo} style={globalStyles.logo} />

let Loading = () => (
  <Container bg="white">
    <Logo />
  </Container>
)

const WebView = Platform.OS === "web" ? WWebView : RNWebView

let HTMLView = ({ html, style = {} }) => (
  <WebView source={{ html }} style={style} />
)

let FontSize = () => (Platform.OS == "web" ? 15 : 27)

let Overlay = ({ children, ...props }) => {
  if (Platform.OS === "web") props.ModalComponent = Modal
  return <NOverlay {...props}>{children}</NOverlay>
}

const AppContext = createContext(null)

export {
  Container,
  Row,
  Loader,
  isSafe,
  isSafeEmpty,
  Logo,
  Background,
  Loading,
  AppContext,
  HTMLView,
  Overlay,
  FontSize,
}
