import { AppContext, Loading } from "components";
import React, { useState } from "react";
import { useSelector } from "react-redux"
import { useFirebase, isLoaded, isEmpty } from "react-redux-firebase"

import { NavigationContainer } from "@react-navigation/native";
import OTPScreen from "./OTPScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { firebase } from "../firebase/config";

const Stack = createStackNavigator();

const title = "Raah";
export default function NavigationStack() {
  const auth = useSelector((state) => state.firebase.auth);
  const profile = useSelector((state) => state.firebase.profile);
  let [showLoverlay, setShowLoverlay] = useState(true);
  let [showRoverlay, setShowRoverlay] = useState(true);
  if (!isLoaded(auth) || !isLoaded(profile)) return <Loading />

  // if (isLoaded(auth) && isLoaded(profile) && profile.banned) return <Banned />
  return (
    <AppContext.Provider
      value={{ showLoverlay, setShowLoverlay, showRoverlay, setShowRoverlay }}
    >
      <NavigationContainer>
        <Stack.Navigator>
          <>
            <Stack.Screen
              name="LoginScreen"
              component={OTPScreen}
              options={{ headerShown: false, title }}
            />
          </>
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}
