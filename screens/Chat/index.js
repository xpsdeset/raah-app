import React from "react"
import { Background, Row } from "components"
import { Button, Overlay, Text, Header } from "react-native-elements"
import globalStyles from "components/style"
import style from "./style"
import chatEnhancer from "./enhancer"
import { GiftedChat } from "react-native-gifted-chat"
import TypingIndicator from "react-native-gifted-chat/lib/TypingIndicator"
import { Image } from "react-native"
import images from "components/Images"
import Menu from "./components"

const chatScreen = (props) => {
  let roomInfo = props.route.params
  let myText, src

  let {
    session,
    user,
    onSend,
    onInputTextChanged,
    oppoRole,
    setShowMenu,
    endConversation,
  } = props

  const endChatFooter = {
    renderInputToolbar: () => (
      <Button
        title="End conversation"
        onPress={endConversation}
        buttonStyle={{ borderRadius: 0, height: 50 }}
      />
    ),
  }

  let messages = []

  if (session && session.messages) {
    Object.keys(session.messages).forEach((_id) => {
      let avatar = images.icon_listener
      let message = session.messages[_id]
      if (message.id != user._id && oppoRole == "talker") {
        avatar = images.teller_display_right
      }
      if (!message.system)
        messages.unshift({
          _id,
          text: message.text,
          system: message.system,
          createdAt: new Date(message.time),
          user: {
            avatar,
            _id: message.id,
          },
        })
      else
        messages.unshift({
          _id,
          text: message.text,
          system: message.system,
        })
    })
  }

  if (roomInfo.role == "listener") {
    myText = "You are listening"
    src = images.icon_listener
  } else {
    myText = "You are talking"
    src = images.teller_display_right
  }

  return (
    <Background noCenter>
      <Header
        placement="left"
        leftComponent={<Image source={src} style={style.icon} />}
        centerComponent={{ text: myText, style: { color: "#fff" } }}
        rightComponent={{
          icon: "options-vertical",
          type: "simple-line-icon",
          color: "#fff",
          onPress: () => setShowMenu(true),
        }}
      />
      <Menu {...props} />
      {session && (
        <GiftedChat
          {...{
            messages,
            onSend,
            user,
            onInputTextChanged,
            renderFooter: () => (
              <TypingIndicator
                isTyping={session.typing && session.typing[oppoRole]}
              />
            ),
            renderDay: null,
          }}
          {...(session.ses_ended && endChatFooter)}
        />
      )}
    </Background>
  )
}

export default chatEnhancer(chatScreen)
