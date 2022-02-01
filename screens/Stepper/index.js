import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Container, Row } from "components";
import enhancer from "./enhancer";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";

import styles from "./style";
import globalStyles from "components/style";

import images from "components/Images";
import { CheckBox, Input, Button } from "react-native-elements";
import PushNotificationHandler from "services/PushNotificationHandler";
import Swiper from "react-native-swiper";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
const { height, width } = Dimensions.get("window");

const myList = [
  {
    id: 1,
    title: "Introduction 1",
    desc: "Showcase features to new users so that they get to love your app",
    icon: <Entypo name="graduation-cap" size={50} color="white" />,
  },

  {
    id: 2,
    title: "Introduction 2",
    desc: "Welcome your users with a beautiful app walkthrough",
    icon: <FontAwesome name="soundcloud" size={50} color="white" />,
  },

  {
    id: 3,
    title: "Introduction 3",
    desc: "Describe the value proposition of each core feature",
    icon: <FontAwesome name="bell-o" size={50} color="white" />,
  },
];

const stepperScreen = (props) => {
  return (
    <>
      <View style={styles.container}>
        <Swiper
          showsButtons={false}
          autoplay={true}
          loop={false}
          activeDotColor="white"
          activeDotStyle={styles.activeDotStyle}
          containerStyle={styles.swiperContainer}
          dotStyle={styles.swiperDotStyle}
          paginationStyle={styles.swiperPaginationStyle}
        >
          {myList.map((i) => {
            return (
              <View style={styles.slide1} key={i.id}>
                {i.icon}
                <Text style={styles.text}>{i.title}</Text>
                <Text style={styles.textDesc}>{i.desc}</Text>
              </View>
            );
          })}
        </Swiper>
      </View>
      <View style={styles.footerContainer}>
        <TouchableOpacity
          onPress={() => props.onNavigateToFrontScreen()}
          style={styles.footerButtonContainer}
        >
          <Text style={styles.footerButtonTxt}>Understood</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default enhancer(stepperScreen);
