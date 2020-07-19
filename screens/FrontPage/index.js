import { Feather } from "@expo/vector-icons"
import React from "react"
import { Container, Row } from "components"
import frontPageEnhancer from "./enhancer"
import style from "./style"
import globalStyles from "components/style"
import { Image } from "react-native"
import images from "components/Images"
import { Input, Button } from "react-native-elements"

const frontPageScreen = (props) => {
  return (
    <Container bg>
      <Feather
        name="instagram"
        size={24}
        color="black"
        style={{ alignSelf: "flex-end" }}
        onPress={() => props.openLink("insta_link")}
      />
      <Image source={images.logo} style={style.logo} />
      <Row style={globalStyles.row}>
        <Button
          icon={
            <Image source={images.teller_display_right} style={style.icon} />
          }
          title="Talk to Someone"
          onPress={() => props.onNavigateToStarSession()}
        />
      </Row>
      <Row style={globalStyles.row}>
        <Button
          icon={
            <Image
              source={images.icon_listener}
              style={style.icon}
              iconContainerStyle={style.iconContainerStyle}
            />
          }
          title="Listen to Someone"
          onPress={() => props.onNavigateToWaitingPool()}
        />
      </Row>
      {/* <Row style={globalStyles.row}>
        <Button title="Donate" onPress={() => onPress={() => props.openLink("donation_link")}} />
      </Row> */}
      <Row style={globalStyles.row}>
        <Button
          title="Feedback / Report Bugs"
          onPress={() => props.openLink("feedback_link")}
          type="clear"
          titleStyle={{ fontSize: 12 }}
        />
      </Row>
    </Container>
  )
}

export default frontPageEnhancer(frontPageScreen)
