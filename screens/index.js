import React, { useState } from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"
import { useFirebase, isLoaded, isEmpty } from "react-redux-firebase"
import { useSelector } from "react-redux"
import { Loading, AppContext } from "components"
import OTPScreen from "./OTP"
import FrontPageScreen from "./FrontPage"
import StartSessionScreen from "./StartSession"
import ChatScreen from "./Chat"
import SeekerLoungeScreen from "./SeekerLounge"
import WaitingPoolScreen from "./WaitingPool"
import TOS from "./TOS"

const Stack = createStackNavigator()

export default function NavigationStack() {
  const auth = useSelector((state) => state.firebase.auth)

  let [showLoverlay, setShowLoverlay] = useState(true)
  let [showRoverlay, setShowRoverlay] = useState(true)

  if (!isLoaded(auth)) return <Loading />

  return (
    <AppContext.Provider
      value={{ showLoverlay, setShowLoverlay, showRoverlay, setShowRoverlay }}
    >
      <NavigationContainer>
        <Stack.Navigator>
          {isEmpty(auth) ? (
            <>
              <Stack.Screen
                name="LoginScreen"
                component={OTPScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="TOSScreen"
                component={TOS}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="FrontPageScreen"
                component={FrontPageScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ChatScreen"
                component={ChatScreen}
                options={{ headerShown: false, headerLeft: null }}
              />
              <Stack.Screen
                name="StartSessionScreen"
                component={StartSessionScreen}
                options={{ title: "", headerBackTitle: "" }}
              />
              <Stack.Screen
                name="WaitingPoolScreen"
                component={WaitingPoolScreen}
                options={{ title: "", headerBackTitle: "" }}
              />
              <Stack.Screen
                name="SeekerLoungeScreen"
                component={SeekerLoungeScreen}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  )
}
