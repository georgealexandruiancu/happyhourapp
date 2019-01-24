import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, ImageBackground, 
    TextInput, TouchableHighlight, NavigatorIOS, Button, AsyncStorage } from 'react-native';  

    const t = require('tcomb-form-native');
    const Form = t.form.Form

    const newUser = t.struct({
        prenume: t.String,
        nume: t.String,
        data_nastere: t.Date,
        email: t.String,
        parola:  t.String
      })
      
      const options = {
        fields: {
            prenume:{
                autoCapitalize:"none",
                autoCorrect: false
            },
            nume: {
                autoCapitalize:"none",
                autoCorrect: false
            },
          email: {
            autoCapitalize: 'none',
            autoCorrect: false
          },
          data_nastere:{
              mode: 'date'
          },
          parola: {
            autoCapitalize: 'none',
            password: true,
            autoCorrect: false
          }
        }
      }

      

    class Register extends React.Component{
        constructor(props ){
            super(props );
             this.state = {prenume: "", nume: "", email: "", data_nastere: "", parola: ""};
        }

        componentWillUnmount() {
            this.setState = {
              value: {
                prenume: "",
                nume: "",
                email: '',
                data_nastere:"",
                parola:""
                
              }
            }
          }
        

        _onChange = (value) => {
            this.setState({
              value
            })
          }

          _handleAdd = () => {
            const value = this.refs.form.getValue();
            // If the form is valid...
            if (value) {
              fetch('https://radiant-beyond-44987.herokuapp.com/users/addUser', {
                method: 'POST',
                headers: {
                  "Accept": "application/json",
                  "Content-Type": "application/json"
                },
                body : JSON.stringify({
                    "prenume" : value.prenume,
                "nume": value.nume,
                "email": value.email,
                "data_nastere": value.data_nastere,
                
                "parola": value.parola,
                
                })
            }).then((response) => response.json()).then((res) => {
                if(res.success === true){
                     this.setState(
                         {
                         prenume: "",
                         nume:"",
                         email:"",
                         data_nastere:"",
                         parola: ""
                     });
                }else{
                    alert("it's from here");
                    alert(res.message);
                }
            })
        .done();}
        
    
         else {
              // Form validation error
              alert('Please fix the errors listed and try again.')
            }
        }
    

        render(){
            return(
            <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>

                    <ImageBackground style={styles.container} source={require("../img/download.jpg")}>
                    <Text style={styles.header}>Register</Text>

                    
                    
                    <Form
          ref='form'
          type={newUser}
          options={options}
          value={this.state.value}
          onChange={this._onChange}
        />
        <TouchableHighlight style={styles.button} onPress={()=>{
                        this._handleAdd();
                        this.props.navigation.navigate('Formular');

        }}>
        <Text style={styles.btntext}  >Login</Text>
</TouchableHighlight>

                    </ImageBackground>

            </KeyboardAvoidingView>
        )}
    }
        
    export default Register;
    const styles= StyleSheet.create({
        wrapper:{
        
                flex: 1
              
        },
        container: {
            flex: 1,
            width:null,
            alignSelf:"stretch",
            alignItems: 'center',
            justifyContent: 'center',
          },
          btntext:{
            color:"#fff",
            fontSize:18
        },
        button:{
            alignSelf:"stretch",
            marginTop: 20,
            backgroundColor:"rgba(0,0,0,0.7)",
            alignItems:"center",
            padding:10
          
        }
    });