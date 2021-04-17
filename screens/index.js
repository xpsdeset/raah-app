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
import Banned from "./Banned"

const Stack = createStackNavigator()

const title = "Raah"

export default function NavigationStack() {
  const auth = useSelector((state) => state.firebase.auth)
  const profile = useSelector((state) => state.firebase.profile)

  let [showLoverlay, setShowLoverlay] = useState(true)
  let [showRoverlay, setShowRoverlay] = useState(true)

  if (!isLoaded(auth) || !isLoaded(profile)) return <Loading />

  if (isLoaded(auth) && isLoaded(profile) && profile.banned) return <Banned />

  return (
    <AppContext.Provider
      value={{ showLoverlay, setShowLoverlay, showRoverlay, setShowRoverlay }}
    >
      <NavigationContainer>
        <Stack.Navigator initialRouteName="WaitingPoolScreen">
          {isEmpty(auth) ? (
            <>
              <Stack.Screen
                name="LoginScreen"
                component={OTPScreen}
                options={{ headerShown: false, title }}
              />
            </>
          ) : !profile.tos ? (
            <Stack.Screen
              name="TOSScreen"
              component={TOS}
              options={{ headerShown: false }}
            />
          ) : (
            <>
              <Stack.Screen
                name="FrontPageScreen"
                component={FrontPageScreen}
                options={{ headerShown: false, title }}
              />
              <Stack.Screen
                name="ChatScreen"
                component={ChatScreen}
                options={{ headerShown: false, headerLeft: null, title }}
              />
              <Stack.Screen
                name="StartSessionScreen"
                component={StartSessionScreen}
                options={{ headerBackTitle: "", title }}
              />
              <Stack.Screen
                name="WaitingPoolScreen"
                component={WaitingPoolScreen}
                options={{ headerBackTitle: "", title }}
              />
              <Stack.Screen
                name="SeekerLoungeScreen"
                component={SeekerLoungeScreen}
                options={{ headerShown: false, title }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  )
}
