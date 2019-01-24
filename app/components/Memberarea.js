import React from 'react';
import { StyleSheet, Text,Navigator, View, KeyboardAvoidingView, ImageBackground, TextInput, TouchableOpacity, Button, AsyncStorage} from 'react-native';
import App from "../../App";
class Memberarea extends React.Component {
    constructor(props){
      super(props);
    }
      
    
  
  
    state={
        username: []
    }
  
    // componentDidMount(){
    //     load._loadInitialState().done();
    // }
  
    // _loadInitialState = async()=>{
    //     var value = await AsyncStorage.getItem("username");
    //     if(value !== null) {
    //         this.setState({username: value});
    //     }
  
    // }
  
    render() {
      
        return(
            <View  >
                <Text>Bine ai venit George</Text>
            </View>
        );
    }
  }
  export default Memberarea;