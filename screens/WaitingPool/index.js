import React from "react"
import { Loader, Container, Row, isSafe } from "components"
import { ListItem, Button } from "react-native-elements"
import enhancer from "./enhancer"
import ListenerOverlay from "./components/ListenerOverlay"
import { Text, FlatList } from "react-native"

const waitingPoolScreen = ({ waitingPool, acceptSession }) => {
  let renderItem = ({ item }) => {
    let d = waitingPool[item]
    let reason = "Would rather not say"
    if (!d) return null
    if (d.reason !== "") reason = d.reason
    return (
      <ListItem
        title={reason}
        bottomDivider
        rightElement={
          <Button title={"Connect"} onPress={() => acceptSession(item)} />
        }
      />
    )
  }
  return (
    <>
      <ListenerOverlay />
      <Loader item={waitingPool} emptyText="Nobody wants to talk.">
        {isSafe(waitingPool) && (
          <FlatList
            data={Object.keys(waitingPool)}
            keyExtractor={(item) => item}
            renderItem={renderItem}
          />
        )}
      </Loader>
    </>
  )
}

export default enhancer(waitingPoolScreen)
