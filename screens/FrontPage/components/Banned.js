import * as React from "react"
import { Image } from "react-native"
import { Text } from "react-native-elements"
import { Container } from "components"
import images from "components/Images"
import style from "components/style"

let Banned = (props) => {
  return (
    <Container bg>
      <Image source={images.logo} style={style.logo} />
      <Text h4>You have been banned</Text>
      <Text style={{ marginTop: 20, marginBottom: 50, width: 300 }}>
        We have received too many reports for you.
      </Text>
    </Container>
  )
}

export default Banned
