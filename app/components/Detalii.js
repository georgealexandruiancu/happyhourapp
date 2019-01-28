import React from "react";
import {ScrollView, Alert, YellowBox, Text, View, FlatList, ImageBackground, ActivityIndicator,
    Image, TouchableOpacity, TouchableHighlight, ToastAndroid, StyleSheet, AsyncStorage, Dimensions, Platform} from "react-native";
    import EvilIcons from "react-native-vector-icons/EvilIcons";
    import FontAwesome from "react-native-vector-icons/FontAwesome";
import Carousel from 'react-native-snap-carousel';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import {Header} from "react-native-elements";
import PopupDialog, { DialogButton, DialogContent } from 'react-native-popup-dialog';
import { TextInput } from "react-native-gesture-handler";




class Detalii extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            hasData : false,
            itemSource: [],
            itemId: null,
            isLoading: true,
            dataSource:[],
            activeSections: [],
            visible: false,
            fontLoaded: false,
            collapsed:false,
            bauturaNume: "",
            bauturaImagine: "",
            twoFactorVerify: false,
            textVerify: '',
        };
        
    }
    
    
    

    renderItem = ({item}) =>{
        const width = Dimensions.get("window").width;
        const {navigation} = this.props;
        var numeBar = item.nume;
        return(
        <View style={{flex:1, flexDirection: 'column',  marginBottom: 1,
        backgroundColor: "#ee9323", justifyContent: 'center', alignItems: 'center'}} >
            <Image style={{ alignSelf: 'stretch', height:300, }} 
                source={{uri: item.imagine}} />
                 
                     <Text style={{fontSize: 30, fontWeight:"bold" ,color: "#fff"}}>
                         {item.nume}
                     </Text>
                     <Text style={{color: "#fff",fontSize:19, marginBottom:4}}> 
                     <EvilIcons name = "location" size={19}/> 

                         {item.locatie}
                     </Text>
                     
                     <Collapse isCollapsed={this.state.collapsed} 
	                onToggle={(isCollapsed)=>this.setState({collapsed:isCollapsed})}>>
                    <CollapseHeader>
                    <TouchableHighlight onPress={()=>this.setState({collapsed:!this.state.collapsed})} 
                    style={{backgroundColor:"#fbd22c", padding: 2, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{color:"white"}}>Mai multe detalii</Text>
                    </TouchableHighlight>
                     </CollapseHeader>
                    <CollapseBody>
                    <Text style={{color:"white", marginLeft: 15, marginRight: 8}}>Cea mai buna si nebuna cafenea si restaurant si bar din tot Bucurestiul</Text>
                    <Text style={{color:"white", marginBottom: 2, marginLeft: 15, marginRight: 8}}>Oferim de asemenea si concerte in fiecare sambata dupa amiaza a fiecarei seri de marti seara intr-o duminica iernatica de vara.</Text>
                    <View style={{flexDirection: "row", justifyContent:"space-between",alignItems: 'center',
                    marginLeft: 100, marginRight: 100}}>
                        <View><Text style={{color:"white"}}>Luni</Text></View><View/><View><Text style={{color:"white"}}>09-22</Text></View>
                    </View>
                    <View style={{flexDirection: "row", justifyContent:"space-between",alignItems: 'center',
                    marginLeft: 100, marginRight: 100}}>
                        <View><Text style={{color:"white"}}>Marti</Text></View><View/><View><Text style={{color:"white"}}>09-22</Text></View>
                    </View>
                    <View style={{flexDirection: "row", justifyContent:"space-between",alignItems: 'center',
                    marginLeft: 100, marginRight: 100}}>
                        <View><Text style={{color:"white"}}>Miercuri</Text></View><View/><View><Text style={{color:"white"}}>09-22</Text></View>
                    </View>
                    <View style={{flexDirection: "row", justifyContent:"space-between",alignItems: 'center',
                    marginLeft: 100, marginRight: 100}}>
                        <View><Text style={{color:"white"}}>Joi</Text></View><View/><View><Text style={{color:"white"}}>09-22</Text></View>
                    </View>
                    <View style={{flexDirection: "row", justifyContent:"space-between",alignItems: 'center',
                    marginLeft: 100, marginRight: 100}}>
                        <View><Text style={{color:"white"}}>Vineri</Text></View><View/><View><Text style={{color:"white"}}>09-22</Text></View>
                    </View>
                    <View style={{flexDirection: "row", justifyContent:"space-between",alignItems: 'center',
                    marginLeft: 100, marginRight: 100}}>
                        <View><Text style={{color:"white"}}>Sambata</Text></View><View/><View><Text style={{color:"white"}}>09-22</Text></View>
                    </View>
                    <View style={{flexDirection: "row", justifyContent:"space-between",alignItems: 'center',
                    marginLeft: 100, marginRight: 100}}>
                        <View><Text style={{color:"white"}}>Duminica</Text></View><View/><View><Text style={{color:"white"}}>09-22</Text></View>
                    </View>
                    
                    </CollapseBody>
                 </Collapse>

            <Text style={{fontSize: 25, marginTop:7, marginBottom:5, fontWeight:"bold", color: "#fff"}}>Bauturi oferite</Text>

            <Carousel sliderWidth={width}
            itemWidth={width}
              
              data={this.state.dataSource}
              renderItem={({item})=>( <View style={styles.slideContainer}>
              
            <Image style={{ width: 150, height:150, marginBottom: 4, borderWidth: 2, borderColor: "#fbd22c" }} 
                source={{uri: item.imagine}} />
                <Text style={{fontSize: 18, color:"white"}}>{ item.nume }</Text>
                <TouchableOpacity onPress={()=> {
                    Alert.alert(
                        'Colecteaza',
                        'Esti pe cale sa colectezi bautura. Continui?',
                        [
                          {text: 'Da', onPress: () => {

                            fetch("https://radiant-beyond-44987.herokuapp.com/users/"+navigation.getParam("user_id", "NO-ID"))
                            .then((response)=>response.json())
                            .then(result =>{
                                if(result.bautura_zi == false){
                                
                                    fetch("https://radiant-beyond-44987.herokuapp.com/bautura_comandata/addComanda" , {
                            method: "POST",
                            mode: "cors",
                            headers:{
                                "Accept": "application/json",
                                "Content-Type": "application/json"
                            },
                            body : JSON.stringify({
                                "id_bautura": item._id,
                                "id_user": navigation.getParam("user_id", "NO-ID"),
                                "imagine_bautura": item.imagine,
                                "nume_bautura": item.nume,
                                "locatie_bautura": numeBar
                            })
                        }).then((response) => response.json()).then((res) => {
                                if(res){
                                    console.log("a mers cica");
                                }else{
                                    alert("it's from here");
                                    alert(res.message);
                                }}).done();
                        this.setState({bauturaNume: item.nume, bauturaImagine: item.imagine, twoFactorVerify: true})  

                                }else{alert("Asteapta pana maine")}
                            })

                          

                            } 
                        },

                          {text: 'Nu', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        ],
                        { cancelable: false }
                      )}}
                style={{width: 112, height: 38,flexDirection:"row", alignItems:"center", 
                backgroundColor:"#fbd22c", justifyContent: 'center',marginTop: 7, marginBottom: 15}}>
                <Text style={{fontSize: 15, color:"white"}}>Primeste<FontAwesome  name="glass" color={"white"} size={16}></FontAwesome></Text>
                </TouchableOpacity>
            </View>)}
            
            />
        </View>        
        );
    }

        componentDidMount(){
            const {navigation} = this.props;
            console.log(navigation.getParam("user_id","NO-ID"));
            const url = "https://radiant-beyond-44987.herokuapp.com/venue/"+navigation.getParam("itemDetalii", "NO-ID")._id+"/bautura";
            console.log(url);
                fetch(url)
                .then((response)=>response.json())
                .then( result => this.setState(
                    {dataSource: result }))
                .catch((error) => {
                    console.log("nu merge fetchul");
                });
              
        }
        
        
          _renderHeader = section => {
            return (
              <View style={{justifyContent: 'center',
              alignItems: 'center'}}>
                <Text style={{fontSize: 19,color:"#fff"}}>{section.title}</Text>
              </View>
            );
          };
        
          _renderContent = section => {
            return (
              <View style={{justifyContent: 'center',
              alignItems: 'center'}}>
                <Text style={{color:"#fff", justifyContent: 'center',
              alignItems: 'center'}}>{section.content}</Text>
              </View>
            );
          };
        
          _updateSections = activeSections => {
            this.setState({ activeSections });
          };
        
    

        render(){
            const {navigation} = this.props;
            var dataDetalii = [];
            console.log(navigation.getParam("itemDetalii", "NO-ID"));
            dataDetalii.push(navigation.getParam("itemDetalii", "NO-ID"));
            var Bauturi = navigation.getParam("itemDetalii", "NO-ID").bauturi;
            console.log(Bauturi);
            console.log(this.state.dataSource);
            
            return(
            <View style={styles.container}>
                    <Header
                        leftComponent={{
                            style: {
                                paddingBottom: 15,
                                marginBottom: 15,
                            },
                            icon: 'md-arrow-round-back', type: "ionicon", color: '#ffcd00', size: 24,
                            onPress: () => this.props.navigation.navigate(('Main'))
                        }}
                        centerComponent={<LogoTitle />}
                       
                        backgroundColor="#fff"
                        leftContainerStyle={{ bottom: 100 }}
                        outerContainerStyles={{ height: 50, borderBottomWidth: 0, marginBottom: 0, marginTop: 0 }}
                        containerStyle={{ height: 20 }}
                    >
                    </Header>
       

            <FlatList
                    data={dataDetalii}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index} >
            </FlatList>
    <PopupDialog dialogStyle={{ backgroundColor: "#fbd22c", }} width={300} visible={this.state.twoFactorVerify} onTouchOutside={() => { this.setState({ visible: false }); }}>
        <DialogContent style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={(textVerify) => this.setState({ textVerify })}
                                value={this.state.textVerify}
                            />
            <TouchableHighlight style={{ marginTop: 5, width: 35, backgroundColor: "#ee9323", justifyContent: 'center', alignItems: 'center' }} onPress={() => { if(this.state.textVerify === "cod"){
                this.setState({ visible: true, twoFactorVerify: false });
                 }else{
                    alert("Codul tau de verificare nu este valid. Reincearca")
                    this.setState({twoFactorVerify: false, visible: false})
                 }
             }}><Text style={{ color: "white", fontSize: 12 }} >Verifica</Text></TouchableHighlight>
        </DialogContent>
    </PopupDialog>

    <PopupDialog dialogStyle={{backgroundColor:"#fbd22c",}} width={300} visible={this.state.visible} onTouchOutside={() => {this.setState({ visible: false });}}>
    <DialogContent style={{justifyContent: 'center', alignItems: 'center'}}>
    <Image style={{ width: 150, height:150, marginBottom: 4, marginTop: 10 }} 
                source={{uri: this.state.bauturaImagine}} />
                <Text style={{marginTop: 5, fontSize: 18, color:"white"}}>Felicitari! Ati primit din partea casei: { this.state.bauturaNume }</Text>
      <Text style={{marginTop: 10, color:"white"}}>VA RUGAM ASTEPTATI CA OSPATARUL SA VERIFICE SI SA VA ADUCA COMANDA :).</Text>
                            <TouchableHighlight style={{ marginTop: 5, width: 35, backgroundColor: "#ee9323", justifyContent: 'center', alignItems: 'center' }} onPress={() => { this.setState({ visible: false }); }}><Text style={{color:"white", fontSize: 12}} >OK</Text></TouchableHighlight>
    </DialogContent>
  </PopupDialog>
  </View>
        
      )
    }
}
        
export default Detalii;



const styles =  StyleSheet.create({
    modal:{
        height: 300,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center'
    },
    header:{
        fontSize: 38,
        padding: 7
    },
    container: {
        alignSelf: 'stretch',
        flex: 1,
        backgroundColor: "#ee9323",
      
    },

    slideContainer: {
        alignSelf: 'stretch',

    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
    }
    
});

class LogoTitle extends React.Component {
    render() {
        return (
            <View style={{}} >
                <Image
                    source={require('../../assets/logoTestHeader.png')}
                    style={{ width: 60, height: 40, top: 10 }}
                />
            </View>
        );
    }
}
