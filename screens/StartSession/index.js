import React from "react"
import { Container, Row } from "components"
import { Input, Text, Button } from "react-native-elements"
import startSessionEnhancer from "./enhancer"
import globalStyles from "components/style"
import ROverlay from "./components/ROverlay"

const startSessionScreen = (props) => {
  return (
    <>
      <ROverlay />
      <Container bg>
        <Row>
          <Input
            onChangeText={props.setReason}
            label="What do you wanna talk about?"
          />
        </Row>
        <Row style={globalStyles.row}>
          <Text h5>If you prefer not to say, you can continue.</Text>
        </Row>
        <Row style={globalStyles.row}>
          <Button title="Continue" onPress={props.onStartSession} />
        </Row>
      </Container>
    </>
  )
}

export default startSessionEnhancer(startSessionScreen)
