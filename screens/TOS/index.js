import React, { useEffect } from "react"
import { View, Text, ScrollView } from "react-native"
import { Button } from "react-native-elements"
import { Loading } from "components"
import TosText from "components/text/MainTos"
import toast from "services/toast"
import style from "components/style"
import enhancer from "./enhancer"
import WebView from "react-native-webview"

const TOS = ({ postVerification, loading }) => {
  if (loading) return <Loading />
  return (
    <View
      style={[
        {
          flex: 1,
          marginTop: 20,
        },
      ]}
    >
      <Text style={style.title}>Terms and conditions</Text>
      <WebView
        source={{ html: TosText }}
        style={{
          marginBottom: 10,
        }}
      />
      <Button title={"I Agree"} onPress={postVerification} />
    </View>
  )
}

export default enhancer(TOS)
