import React from "react";
import {ScrollView, YellowBox, Text, View, FlatList, ImageBackground, ActivityIndicator, TouchableOpacity, ToastAndroid, StyleSheet, AsyncStorage, TextInput, Image} from "react-native";
import NavBar, { NavButton, NavButtonText, NavGroup, NavTitle } from 'react-native-nav';
import Icon from "react-native-vector-icons/SimpleLineIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {Header, ListItem} from "react-native-elements";
import FullWidthImage from 'react-native-fullwidth-image'

 YellowBox.ignoreWarnings(["Warning: isMounted(...) is deprecated", "Module.RTCImageLoader"]);

   class Main extends React.Component {
     
    constructor(){
        super() 
        this.state ={
            dataSource:[],
            isLoading: true,
            
        }
    }

    
    

    renderItem = ({item}) =>{
        const {navigation} = this.props;
        return(
            
            <TouchableOpacity style={{ 
                flex: 1,
                flexDirection: 'row',
                margin: 20, 
                borderRadius: 20,
                borderWidth: 1,
                borderColor: '#000',
                borderBottomWidth: 0,
                shadowColor: '#000',
                shadowOffset: { width: 10, height: 4 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
                overflow: "hidden",
            }} 
        onPress={()=> {   
            this.props.navigation.navigate(('Detalii'),
            {itemDetalii: item, 
             user_id: navigation.getParam("user_id", "NO-ID") });
    } }>
               
                <Image borderRadius={20} source={{ uri: item.imagine }} style={styles.imgCard}/>
                <View style={styles.overlay} />
                 <View style={{flex:1, position: "absolute", bottom: 0, left: 0, marginLeft: 5, padding: 20}}>

               
                     <Text style={{fontSize: 23, color: "white", marginBottom: 10}}>
                        {item.nume}
                     </Text>
                     
                     
                         
                     <Text style={{fontSize:16, color:"white", marginBottom: 4}}> 
                     <Icon name = "location-pin" size={16}/> 
                         {item.locatie}
                     </Text>
                    
                     
                
                </View>

        </TouchableOpacity>

        
        );
    }
    
        // alert(value);
    

    renderSeparator = () =>{
        // return (
        //     <View style={{height:1, width:"100%", backgroundColor:"black"}}>

        //     </View>
        // );
    }

        componentDidMount(){
            const {navigation} = this.props;
            console.log(navigation.getParam("user_id", "NO-ID"));
            const url = "https://radiant-beyond-44987.herokuapp.com/venue";
            fetch(url)
            .then((response)=>response.json())
            .then( result => this.setState(
                {dataSource: result, isLoading: false }))
            .catch((error) => {
                console.log(error);
            });   
            
        }

    render(){
        const {navigation} = this.props;
        return(
            
            <View style={styles.container} >
                    <Header
                    leftComponent={{
                        style: {
                            paddingBottom: 10,
                            marginBottom: 10,
                        }, 
                        icon: 'user-o', type: "font-awesome", color: '#ffcd00', size: 20,  
                        onPress: () => this.props.navigation.navigate(('User'), {user_id: navigation.getParam("user_id", "NO-ID") } ) }}
                    centerComponent={<LogoTitle/>}
                    rightComponent={{ icon: 'cog', type: 'font-awesome', color: '#ffcd00', size: 22, top: 0 }} 
                    backgroundColor="#fff"
                    leftContainerStyle={{bottom: 100}}
                    outerContainerStyles={{height: 50, borderBottomWidth:0, marginBottom: 0, marginTop: 0}} 
                    containerStyle={{height: 20}}
                    >
                    </Header>
                    <View style={styles.containerSearch}>
                    <TextInput
                        style={styles.inputSearch}
                        placeholder="Search key..."
                    />
                    </View>
               
          
                <FlatList
                
                    data={this.state.dataSource}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index}
                   
                    />
            </View> 
            );
    }
}
export default Main;


class LogoTitle extends React.Component {
    render() {
      return (
        <View style={{ }} >
        <Image
          source={require('../../assets/logoTestHeader.png')}
          style={{ width: 60, height: 40, top: 10}}
        />
        </View>
      );
    }
  }

//   class UserIcon extends React.Component{
//       render(){
//         const {navigation} = this.props;

//           return(
//               <TouchableOpacity style={{marginBottom: 9}} onPress={()=> {   this.props.navigation.navigate(('User'),{user_id: navigation.getParam("user_id", "NO-ID") });
//             } }>
//                   <FontAwesome  name="user-o" color={"white"} size={31}></FontAwesome>
//               </TouchableOpacity>
//           )
//       }
//   }

const styles = StyleSheet.create({
    imgCard:{
        
        width: "100%", height: 254
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    inputSearch:{
        borderBottomColor: "#ffcd00",
        borderBottomWidth: 2,
    },
    containerSearch:{
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 5,
    },  
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignSelf: 'stretch',
    
      
    },
    navBar: {
        height: 80,

    },
    navTitle:{
        textAlign:"center"
    },
    navProfile:{

    },
    navSettings:{

    }
  });