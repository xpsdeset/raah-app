import { StyleSheet } from "react-native";

export default StyleSheet.create({
  logo: { width: 270, height: 310, marginTop: "20%", marginBottom: 50 },
  icon: { height: 25, width: 25, marginRight: 10 },
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#104CB1",
  },
  textDesc: {
    fontSize: 17,
    color: "#ffff",
    paddingHorizontal: 20,
    textAlign: "center",
    // marginTop: 20,
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 20,
  },
  container: { 
    flex: 0.9, 
    backgroundColor: "#104CB1" 
  },
  activeDotStyle:{
    
          width: 15,
          height: 15,
          borderRadius: 7,
          marginRight: 10,
          marginLeft: 10,
        
  },
  swiperContainer:{
    backgroundColor: "#104CB1" 
  },
  swiperDotStyle:{
    width: 15,
    height: 15,
    borderRadius: 7,
    backgroundColor: "transparent",
    borderColor: "white",
    borderWidth: 1,
    marginRight: 10,
    marginLeft: 10,
  },
  swiperPaginationStyle:{
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  footerContainer:{
    flex:0.1,
    backgroundColor:'#104CB1',
    justifyContent:'flex-end'
  },
  footerButtonContainer:{
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
    borderWidth:2,
    padding:10,
    borderColor:'#36DBB1',
    backgroundColor:'#36DBB1',
    alignItems:'center'
  },
  footerButtonTxt:{
    color:"#104CB1"
  }
});
