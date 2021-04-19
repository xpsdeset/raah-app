import * as React from "react"
import { Image } from "react-native"
import { Input, Button, Text } from "react-native-elements"
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha"
import { Container, Row } from "components"
import images from "components/Images"
import enhancer from "./enhancer"
import style from "components/style"

let OTP = (props) => {
  let {
    phoneNumber,
    setPhoneNumber,
    verificationId,
    firebaseConfig,
    sendVerificationCode,
    setVerificationCode,
    postVerification,
    phase2,
    setPhase2,
  } = props

  const recaptchaVerifier = React.useRef(null)

  return (
    <Container bg>
      {!phase2 && (
        <>
          <Image source={images.logo} style={style.logo} />
          <Text style={{ marginTop: 20, marginBottom: 50, width: 300 }}>
            Raah is a place to offer/seek comfort. Raah requests you to do phone
            number verification to help us protect against trolls and spam.
          </Text>
          <Button
            title="Continue"
            disabled={!phoneNumber}
            onPress={() => setPhase2(true)}
          />
        </>
      )}
      {phase2 && (
        <>
          <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
            attemptInvisibleVerification={true}
          />

          <Text style={{ marginTop: 20 }}>Enter phone number</Text>
          <Input
            placeholder="+1 999 999 9999"
            inputContainerStyle={style.inputContainerStyle}
            autoFocus
            autoCompleteType="tel"
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          <Button
            title="Send Verification Code"
            disabled={!phoneNumber}
            onPress={sendVerificationCode(recaptchaVerifier)}
          />
          <Text style={{ marginTop: 20 }}>Enter Verification code</Text>
          <Input
            inputContainerStyle={style.inputContainerStyle}
            editable={!!verificationId}
            placeholder="123456"
            onChangeText={setVerificationCode}
          />
          <Button
            title="Confirm Verification Code"
            disabled={!verificationId}
            onPress={postVerification}
          />
        </>
      )}
    </Container>
  )
}

export default enhancer(OTP)
