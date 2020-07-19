import React, { useState, useContext } from "react"
import { ScrollView } from "react-native"
import WebView from "react-native-webview"
import { Button, Overlay, Text } from "react-native-elements"
import { AppContext } from "components"
import style from "components/style"
import TosText from "components/text/TalkerTos"

let ROverlay = (props) => {
  const { showRoverlay, setShowRoverlay } = useContext(AppContext)

  return (
    <Overlay
      isVisible={showRoverlay}
      overlayStyle={{ marginHorizontal: 50, height: 300, width: "90%" }}
    >
      <>
        <Text style={style.title}>Disclaimer</Text>
        <WebView source={{ html: TosText }} />
        <Button title={"I Agree"} onPress={() => setShowRoverlay(false)} />
      </>
    </Overlay>
  )
}
export default ROverlay
