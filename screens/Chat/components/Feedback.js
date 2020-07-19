import React from "react"
import { CheckBox, Text, Button } from "react-native-elements"
import { Container, Row } from "components"
import { ActivityIndicator } from "react-native"
import globalStyles from "components/style"

const feedbackComponent = (props) => {
  return (
    <Container>
      <Row>
        <Text>
          Rate your chat. Your partner will be notified of the results.
        </Text>
      </Row>
      <Row>
        <CheckBox
          checked={props.thumbs}
          checkedIcon={{ type: "font-awesome", name: "thumbs-down" }}
          onPress={() => props.setThumbs(!props.thumbs)}
          uncheckedIcon={{ type: "font-awesome", name: "thumbs-up" }}
        />
      </Row>
      <Row>
        <CheckBox
          checked={props.star}
          title="Gold Star"
          onPress={() => props.setStar("gold")}
        />

        <CheckBox
          checked={props.star}
          title="Silver Star"
          onPress={() => props.setStar("silver")}
        />

        <CheckBox
          checked={props.star}
          title="Bronze Star"
          onPress={() => props.setStar("bronze")}
        />
      </Row>
      <Row>
        {props.endPressed ? (
          <ActivityIndicator size="small" color="#00ff00" />
        ) : (
          <Button
            containerStyle={globalStyles.buttonContainerStyle}
            buttonStyle={globalStyles.buttonStyle}
            disabled={props.endPressed}
            title="Cancel"
            onPress={() => props.onEndSession()}
          />
        )}
      </Row>
    </Container>
  )
}

export default feedbackComponent
