import React, {Component} from "react";
import {ScrollView, YellowBox, Text, View,  ToastAndroid, SafeAreaView, StyleSheet} from "react-native";
import { WebView } from "react-native-gesture-handler";
import {createMaterialTopTabNavigator} from "react-navigation";
import {StackNavigator} from "react-navigation";
YellowBox.ignoreWarnings(["Warning: isMounted(...) is deprecated", "Module.RTCImageLoader"]);
import Formular from "./Formular";
import Register from "./Register";
import Main from "./Main";

class MainNavigator extends React.Component{
  render(){
    return(
      <SafeAreaView style={{flex:1, backgroundColor:"#f2f2f2"}}>

      </SafeAreaView>
    )
  };
}

 const IndexNavigator = createMaterialTopTabNavigator({
    Main: {screen:Main, navigationOptions:{
      tabBarLabel:"Main",
      tabBarIcon:({tintColor})=>(
        <Icon name="ios-home" color={tintColor} size={24}/>
      )
    } },
    Formular: {screen:Formular, navigationOptions:{
      tabBarLabel: "Formular",
      tabBarIcon:({tintColor})=>(
        <Icon name="ios-settings" color={tintColor} size={24}/>
      )
    }},
    
  },
  {
    initialRouteName: "Main",
    shifting: true,
    activeTintColor: "white"
  
    
    });
    export default IndexNavigator;