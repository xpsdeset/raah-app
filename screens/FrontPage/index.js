import { Feather, MaterialCommunityIcons } from "@expo/vector-icons"
import React from "react"
import { Container, Row } from "components"
import frontPageEnhancer from "./enhancer"
import style from "./style"
import globalStyles from "components/style"
import { Image } from "react-native"
import images from "components/Images"
import { CheckBox, Input, Button } from "react-native-elements"
import PushNotificationHandler from "services/PushNotificationHandler"

const frontPageScreen = (props) => {
  return (
    <Container bg>
      <PushNotificationHandler />
      <Row
        style={[
          {
            marginTop: 10,
            width: 280,
            flexDirection: "row-reverse",
          },
        ]}
      >
        <Feather
          name="instagram"
          size={24}
          color="black"
          style={{ marginLeft: 5 }}
          onPress={() => props.openLink("insta_link")}
        />
        <Feather
          name="twitter"
          size={24}
          color="black"
          style={{ marginLeft: 5 }}
          onPress={() => props.openLink("twitter_link")}
        />
        <MaterialCommunityIcons
          name="telegram"
          size={26}
          color="black"
          // style={{ alignSelf: "flex-start" }}
          onPress={() => props.openLink("telegram_group")}
        />
      </Row>
      <Image
        source={images.logo}
        style={[style.logo, { marginTop: 5, marginBottom: 20 }]}
      />
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
          buttonStyle={{ backgroundColor: "white" }}
          titleStyle={{ fontSize: 14, color: "black" }}
          title={"Get notified when someone is waiting \n on Telegram"}
          onPress={() => props.openLink("telegram_notify")}
        />
      </Row>

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
