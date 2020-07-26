import React, { createContext } from "react"
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

let Container = ({ children, style, bg }) => {
  let Cview = (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
  const { width, height } = Dimensions.get("window")
  let src = Images.background
  if (bg == "white") src = Images.backgroundWhite
  return (
    <ImageBackground
      source={src}
      style={noCenter ? { flex: 1 } : globalStyles.bg}
      imageStyle={{
        resizeMode: "repeat",
        width: width < height ? width : height,
        height: width < height ? height : width,
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
}
