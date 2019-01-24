import React from "react";
import { Alert,  Text, View, FlatList,
    Image, TouchableHighlight, StyleSheet,} from "react-native";
import {Header} from "react-native-elements";

class Cumpara_Abonament extends React.Component{
    constructor(){
        super()
        this.state={
            dataSource:[]
        }
    }

    renderItem = ({item}) =>{
        const {navigation} = this.props;

        return(
            <View>
                <Image style={{width:"70%", height: 300, marginBottom: 10}} source={{uri: item.imagine_abonament}}></Image>
                <Text>{item.nume_abonament}</Text>
                <Text>{item.numar_bauturi}</Text>
                <Text>{item.numar_luni}</Text>
                <TouchableHighlight onPress={()=> {
                    Alert.alert(
                        'Colecteaza',
                        'Esti pe cale sa cumperi abonamentul. Continui?',
                        [
                          {text: 'Da', onPress: () => {

                            fetch("https://radiant-beyond-44987.herokuapp.com/abonament_user/addAbonament_User" , {
                            method: "POST",
                            mode: "cors",
                            headers:{
                                "Accept": "application/json",
                                "Content-Type": "application/json"
                            },
                            body : JSON.stringify({
                                "user_id": navigation.getParam("user_id", "NO-ID"),
                                "tip_abonament": item._id
                            })
                        }).then((response) => response.json()).then((res) => {
                                if(res){
                                    console.log("a mers cica");
                                }else{
                                    alert("it's from here");
                                    alert(res.message);
                                }}).done(); 

                                }
                            },

                          {text: 'Nu', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        ],
                        { cancelable: false }
                      )}}
                 style={{marginTop: 5, width: 35,backgroundColor:"#fbd22c", justifyContent: 'center', alignItems: 'center' }}><Text style={{color:"white", fontSize: 12}} >Cumpara</Text></TouchableHighlight>

            </View>
        )
    }

    renderSeparator = () =>{
        return (
            <View style={{height:1, width:"100%", backgroundColor:"black"}}>

            </View>
        );
    }

    componentDidMount(){
        const {navigation} = this.props;
        console.log(navigation.getParam("user_id", "NO-ID"));
        const url = "https://radiant-beyond-44987.herokuapp.com/abonamente";
        console.log(url);
        fetch(url)
        .then((response)=>response.json())
        .then( result => this.setState(
            {dataSource: result }))
        .catch((error) => {
            console.log(error);
        });   
        
    }

    render(){
        const {navigation} = this.props;
        console.log(this.state.dataSource)
        return(
            <View style={styles.container}>
            <Header
            leftComponent={{icon: 'md-arrow-round-back', type: "ionicon", color: '#fff', size: 36, marginBottom: 40,
            onPress: () => this.props.navigation.navigate(('User'), {user_id: navigation.getParam("user_id", "NO-ID") })} }
            // centerComponent={{ text: 'HAPPY HOUR', style: { color: '#fff' } }}
            centerComponent={<LogoTitle/>}
           backgroundColor="#ee9323"
            
           outerContainerStyles={{height: 85, borderBottomWidth:0, marginBottom: -11, marginTop: 15}} 
           />
            
            <FlatList
                data={this.state.dataSource}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => index}
                ItemSeparatorComponent = {this.renderSeparator} />

            </View>
        )
    }
}

export default Cumpara_Abonament;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ee9323",
      alignSelf: 'stretch' 
    },
    header:{
        fontSize:38,padding: 20,
    color:"#fff",
    fontWeight:"bold"
    }
    
})
class LogoTitle extends React.Component {
    render() {
      return (
        <View style={{ }} >
        <Image
          source={require('../../assets/logo.png')}
          style={{ width: 60, height: 60, bottom: 0}}
        />
        </View>
      );
    }
  }