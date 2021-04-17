import React from "react"
import { Loader, Container, Row, isSafe, isSafeEmpty } from "components"
import { ListItem, Button, Card, Text } from "react-native-elements"
import { View } from "react-native"
import enhancer from "./enhancer"
import ListenerOverlay from "./components/ListenerOverlay"
import nobodyTextGen from "components/text/NobodyText"
import { FlatList } from "react-native"

const waitingPoolScreen = ({ waitingPool, acceptSession, route }) => {
  let notify = false
  if (route.params && route.params.notify) notify = true
  let renderItem = ({ item }) => {
    let d = waitingPool[item]
    let reason = "Would rather not say"
    if (!d) return null
    if (d.reason !== "") reason = d.reason
    return (
      <ListItem>
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: "bold", paddingLeft: "30%" }}>
            <View style={{ width: 250 }}>{reason}</View>
            <Button title={"Connect"} onPress={() => acceptSession(item)} />
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>
    )
  }
  return (
    <>
      <ListenerOverlay />
      <Loader item={waitingPool}>
        {isSafe(waitingPool) && (
          <FlatList
            data={Object.keys(waitingPool)}
            keyExtractor={(item) => item}
            renderItem={renderItem}
          />
        )}
        {isSafeEmpty(waitingPool) && (
          <Card wrapperStyle={{ alignItems: "center" }}>
            <Text h1>&#128533; </Text>
            <Text>Nobody wants to talk.</Text>
            <Text>{nobodyTextGen(notify)}.</Text>
          </Card>
        )}
      </Loader>
    </>
  )
}

export default enhancer(waitingPoolScreen)
