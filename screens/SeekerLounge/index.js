import React from "react"
import { Container, Row, Logo } from "components"
import { Button, Text } from "react-native-elements"
import seekerLoungeEnhancer from "./enhancer"
import globalStyles from "components/style"

const seekerLoungeScreen = (props) => {
  return (
    <Container bg>
      <Text h4>Please wait</Text>
      <Text>While we connect you with someone.</Text>
      <Logo />
      <Row>
        <Button title="Cancel" onPress={props.onCancelSession} />
      </Row>
    </Container>
  )
}

export default seekerLoungeEnhancer(seekerLoungeScreen)
