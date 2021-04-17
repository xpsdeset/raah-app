import React, { useState, useContext } from "react"
import { ScrollView } from "react-native"
import { Button, Text } from "react-native-elements"
import { AppContext, HTMLView, Overlay } from "components"
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
        <HTMLView html={TosText} />
        <Button title={"I Agree"} onPress={() => setShowRoverlay(false)} />
      </>
    </Overlay>
  )
}
export default ROverlay
