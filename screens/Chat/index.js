import React from "react"
import { Background, Row } from "components"
import { Button, Overlay, Text, Header } from "react-native-elements"
import { Platform } from "react-native"

import globalStyles from "components/style"
import style from "./style"
import enhancer from "./enhancer"
import { GiftedChat, Composer } from "react-native-gifted-chat"
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
    minInputToolbarHeight: 0,
    renderInputToolbar: () => null,
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

  if (roomInfo?.role == "listener") {
    myText = "You are listening"
    src = images.icon_listener
  } else {
    myText = "You are talking"
    src = images.teller_display_right
  }

  const renderComposer = (props) => (
    <Composer
      {...props}
      textInputProps={{
        ...props.textInputProps,
        // for enabling the Return key to send a message only on web
        blurOnSubmit: Platform.OS === "web",
        onSubmitEditing:
          Platform.OS === "web"
            ? () => {
                if (props.text && props.onSend) {
                  props.onSend({ text: props.text.trim() }, true)
                }
              }
            : undefined,
      }}
    />
  )

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
            renderComposer,
            renderFooter: () =>
              session.ses_ended ? (
                <Button
                  title="End conversation"
                  onPress={endConversation}
                  buttonStyle={{ borderRadius: 0, height: 50 }}
                />
              ) : (
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

export default enhancer(chatScreen)
