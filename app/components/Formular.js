import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, ImageBackground, 
    TextInput, TouchableOpacity, AsyncStorage } from 'react-native';  
import Memberarea from "./Memberarea";


class Formular extends React.Component {
    constructor(props ){
        super(props );
         this.state = {username: "", password: "", id_user: "", isUserLoggedIn: false};
    }
    componentDidMount(){
        var value = AsyncStorage.getItem('username');
        value.then((e) => {
            this.setState({
                id_user: e
            })
        })
        .then(() => {
           if(this.state.id_user!== undefined && this.state.id_user!== null && this.state.id_user!=""){
               this.props.navigation.navigate(('Main'), { user_id: this.state.id_user });
           }
        })
    }
    login(){
    if(this.state.username!="" && this.state.password!=""){
        fetch("https://radiant-beyond-44987.herokuapp.com/users/login", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": this.state.username,
                "parola": this.state.password
            })
        }
        ).then((response) => response.json()).then((res) => {

            if (res.success === true) {
                var username = res.message;
                var login = true;
                AsyncStorage.setItem("username", username);
                this.setState(
                    {
                        id_user: res.message,
                        isUserLoggedIn: login
                    });
            } else {

                alert("Something went wrong!");
            }
        }).then(() => {
            if (this.state.isUserLoggedIn) {
                this.props.navigation.navigate(('Main'), { user_id: this.state.id_user });
            }
        })
            .done();
    }else{
        alert("Te rugam completeaza campurile. Multumim!")
    }
   
  }
    
  
  render() {
    return (
      
      <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
        <ImageBackground style={styles.container} source={require("../img/download.jpg")}>
        
        <Text style={styles.header}>LOGIN</Text>
        <TextInput placeholder="username" onChangeText={(username)=> this.setState({username})} value={this.state.username} 
        placeholderTextColor="#292929" style={styles.TextInput} underlineColorAndroid={"transparent"}>
        </TextInput>
        <TextInput placeholder="password" onChangeText={(password)=> this.setState({password})} value={this.state.password}
        placeholderTextColor="#292929" secureTextEntry={true} style={styles.TextInput} underlineColorAndroid={"transparent"} />
        
                <TouchableOpacity onPress={() => this.login()} 
         style={styles.button} >
        <Text style={styles.btntext} >Login</Text>
        </TouchableOpacity>

        <Text onPress={()=>this.props.navigation.navigate('Register')} style={styles.register}>
        Nu aveti cont? Va puteti crea aici!
        </Text>

        </ImageBackground>
        
        </KeyboardAvoidingView>
    );
  }
}
  
export default Formular;
const styles = StyleSheet.create({
    register:{
        padding: 20,
        fontSize: 14,
        color: "#fff"
    },
    container: {
        flex: 1,
        width:null,
        alignSelf:"stretch",
        alignItems: 'center',
        justifyContent: 'center',
      },
    wrapper:{
        flex: 1
      },
    header:{
        fontSize:38,padding: 20,
    color:"#fff",
    fontWeight:"bold"
    },
  formContainer:{
      alignSelf: "stretch",
      paddingLeft: 20,
      paddingRight:20
  },
  TextInput:{
      alignSelf:"stretch",
      padding:20,
      backgroundColor:"rgba(255,255,255,0.7)",
      marginBottom:20
  },
  button:{
      alignSelf:"stretch",
      marginTop: 20,
      backgroundColor:"rgba(0,0,0,0.7)",
      alignItems:"center",
      padding:20,
    
  },
  btntext:{
      color:"#fff",
      fontSize:18
  }

});
