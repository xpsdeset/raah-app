import {
  Dimensions,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { createContext } from "react";

import Images from "./Images";
import _ from "lodash";
import globalStyles from "./style"

let Container = ({ children, style, bg }) => {
  function dismissKeyboard() {
    if (Platform.OS != "web") {
      Keyboard.dismiss();
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
  );

  if (bg) Cview = <Background bg={bg}>{Cview}</Background>;

  return Cview;
};

let Row = ({ children, style }) => {
  return <View style={style}>{children}</View>;
};

let Background = ({ children, noCenter, bg }) => {
  let { width, height } = Dimensions.get("window");

  let src = Images.background;
  if (bg == "white") src = Images.backgroundWhite;

  if (Platform.OS == "web") {
    width = "100%";
    height = "100%";
  } else {
    width = width < height ? width : height;
    height = width < height ? height : width;
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
  );
};

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
  );
};

let isSafe = (item) => isLoaded(item) && !isEmpty(item) && !_.isEmpty(item);
let isSafeEmpty = (item) => isLoaded(item) && isEmpty(item);

let Logo = () => <Image source={Images.logo} style={globalStyles.logo} />;

let Loading = () => (
  <Container bg="white">
    <Logo />
  </Container>
);

let FontSize = () => (Platform.OS == "web" ? 15 : 27);

const AppContext = createContext(null);

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
  FontSize,
};
