import React, { useState, useContext } from "react"
import { ScrollView } from "react-native"
import { Button, Text } from "react-native-elements"
import WebView from "react-native-webview"
import { AppContext, HTMLView, Overlay } from "components"
import style from "components/style"
import TosText from "components/text/ListenerTos"

let LOverlay = (props) => {
  const { showLoverlay, setShowLoverlay } = useContext(AppContext)

  return (
    <Overlay
      isVisible={showLoverlay}
      overlayStyle={{ marginHorizontal: 50, height: 450, width: "90%" }}
    >
      <>
        <Text style={style.title}>Important Tips For Listeners</Text>
        <HTMLView html={TosText} />
        <Button title={"I Agree"} onPress={() => setShowLoverlay(false)} />
      </>
    </Overlay>
  )
}
export default LOverlay
