import React, { useState } from "react"
import { Button, Input } from "react-native-elements"
import { View, Text } from "react-native"
import ReportTos from "components/text/ReportTos"
import { Overlay } from "components"

const Menu = (props) => {
  let [showEndConvo, setShowEndConvo] = useState(false)
  let [showReport, setShowReport] = useState(false)

  let {
    showMenu,
    setShowMenu,
    endConversation,
    user,
    setReportReason,
    reportConversation,
  } = props

  return (
    <>
      <Overlay
        isVisible={showMenu}
        onBackdropPress={() => setShowMenu(false)}
        overlayStyle={{
          position: "absolute",
          top: 60,
          right: 5,
        }}
      >
        <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
          <Button
            title="End Conversation"
            type="clear"
            onPress={() => {
              setShowMenu(false)
              setShowEndConvo(true)
            }}
            titleStyle={{ fontSize: 12, color: "black" }}
          />
          <Button
            title="Report"
            type="clear"
            onPress={() => {
              setShowMenu(false)
              setShowReport(true)
            }}
            titleStyle={{ fontSize: 12, color: "black" }}
          />
        </View>
      </Overlay>

      <Overlay
        isVisible={showEndConvo}
        overlayStyle={{ alignItems: "center", width: 300 }}
      >
        <Text style={{ fontSize: 16 }}>
          Are you sure you want to end this conversation
        </Text>
        <View
          style={{
            marginTop: 20,
            marginBottom: 15,
            flexDirection: "row",
          }}
        >
          <Button
            title="Yes"
            titleStyle={{ fontSize: 12 }}
            buttonStyle={{ marginRight: 15, width: 50 }}
            onPress={() => {
              setShowEndConvo(false)
              endConversation()
            }}
          />
          <Button
            title="No"
            titleStyle={{ fontSize: 12 }}
            buttonStyle={{ marginRight: 15, width: 50 }}
            onPress={() => setShowEndConvo(false)}
          />
        </View>
      </Overlay>
      <Overlay
        isVisible={showReport}
        overlayStyle={{
          alignItems: "center",
          width: "90%",
        }}
      >
        <Text style={{ fontSize: 14 }}>Report this user</Text>
        <View style={{ margin: 8 }}>
          {ReportTos.split("\n").map((d, i) => (
            <Text style={{ fontSize: 10, marginTop: 3 }} key={d}>
              {d}
            </Text>
          ))}
        </View>
        <Input
          label="Reason"
          errorStyle={{ color: "red" }}
          onChangeText={setReportReason}
        />
        <View
          style={{
            marginTop: 20,
            marginBottom: 15,
            flexDirection: "row",
          }}
        >
          <Button
            title="Report"
            titleStyle={{ fontSize: 12 }}
            buttonStyle={{ marginRight: 15 }}
            onPress={() => {
              setShowReport(false)
              reportConversation()
            }}
          />
          <Button
            title="Cancel"
            titleStyle={{ fontSize: 12 }}
            buttonStyle={{ marginRight: 15 }}
            onPress={() => setShowReport(false)}
          />
        </View>
      </Overlay>
    </>
  )
}

export default Menu
