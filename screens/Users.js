import {Platform, StyleSheet, Text,Image,  View, FlatList,ListView,  Button, StatusBar, TouchableHighlight} from 'react-native';
import React, { Component } from 'react';
import { List, ListItem } from "react-native-elements"
import Icon from "react-native-vector-icons/Ionicons";
import { db } from './config';
import firebase from 'react-native-firebase';
const Banner = firebase.admob.Banner;
const AdRequest = firebase.admob.AdRequest;
const advert = firebase.admob().interstitial('ca-app-pub-8707066328646930/8992858119')
const request = new AdRequest();
request.addKeyword('foobar');
export default class Users extends Component {
  constructor(props){
   super(props)
   const {state} = this.props.navigation;
    console.log(state.params)
    if(state.params)
    {
    console.log(state.params.userdata)
    }
  this.componentDidMount();
}

state = {
  items: [],
  firebaseImage : ""
}
  componentDidMount() {
      advert.loadAd(request.build());

advert.on('onAdLoaded', () => {
  console.log('Advert ready to show.');
});

setTimeout(() => {
  if (advert.isLoaded()) {
    console.log('working')
    advert.show();
  } else {
    console.log('error occured')
  }
}, 1000);
    db.ref('/images').child('army').once('value')
    .then((dataSnapshot) => {
      
   console.log('value', dataSnapshot.val().photo)
    this.setState({firebaseImage: dataSnapshot.val().photo})
      
     });
   
    db.ref('/users').once('value')
    .then((dataSnapshot) => {
      let newdata = dataSnapshot.val();
    //  console.log(dataSnapshot)
    if(dataSnapshot.val())
    {
      let items = Object.values(newdata);
     this.setState({items});
    }
      
     });
  }

  makeRemoteRequest = () => {
   
    
  };

  
  static navigationOptions = function(props) {
    return {
      title: 'Products'
     // headerRight: <View  style={{marginRight: 20, paddingTop:5}}><Icon name="ios-add" size={30} onPress={() => props.navigation.navigate('ScreenTwo')}   /></View>
    }
  };
  editUser = (val) => {
    if(val)
    {
    this.props.navigation.navigate('ScreenTwo', { user: val })
    }
    }

    deleteItem = (val) => {
    console.log(val)
     console.log(this.state.items);
     this.state.items.splice(val, 1);
     db.ref('/users').child(val.id).remove();
     this.componentWillReceiveProps();
    }
      
    
    componentWillReceiveProps(nextProps){
      
      db.ref('/users').once('value')
    .then((dataSnapshot) => {
      let newdata = dataSnapshot.val();
      let items = Object.values(newdata);
     this.setState({items});
      
     });
    }
  render() {
    console.log(this.state.items);
    
    return (
     
      <View style={styles.container} >
     
       {this.state.items !== [] ?
          <FlatList
          data={this.state.items}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) =>
          <View>
          <View style={styles.flatview} >
          <View style={{width:'5%'}}></View>
           <Image
            source={{ uri: item.photo }}
            style={{ width: 100, height: 100, borderRadius : 50 }}
          />
           <View style={{marginTop:5}}>
             <View style={{width:'100%'}}>
            <Text style={styles.name} onPress={() => this.editUser(item)}>{item.name}</Text>
            </View>
            </View>   
          </View>
            <View style={{flexDirection:'row'}} >
            <View style={{width:'30%'}}></View>
            <Text style={styles.email}>Qty : {item.age}</Text>
            <Text> MRP: {item.DateOfBirth} </Text>
             <View style={{width:'30%'}}></View>
            </View>
            <View style={{flexDirection:'row'}}>
             <View style={{width:'30%'}}></View>
            <Text> DP : {item.DateOfJoining} </Text>
             <Text> BV : {item.profile} </Text>
              <View style={{width:'30%'}}></View>
             </View>
              </View>
          }
          keyExtractor={item => item.email}
        />
     : null }  
     <View style={styles.footer}>
       <Banner
       style={{alignSelf:'center',marginLeft:20}}
    size={"LARGE_BANNER"}
  unitId={"ca-app-pub-8707066328646930/7786284317"}
  request={request.build()}
  onAdLoaded={() => {
    console.log('Advert loaded');
  }} />
  </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
    
  },
  h2text: {
    marginTop: 10,
    fontFamily: 'Helvetica',
    fontSize: 36,
    fontWeight: 'bold',
  },
  flatview: {
   
    paddingTop: 30,
    borderRadius: 2,
    flexDirection: 'row'
  },
  name: {
    fontFamily: 'Verdana',
    fontSize: 18,
    width:200,
    flex: 1, flexWrap: 'wrap'
  },
  email: {
    
  },
  button: {
    textAlign: 'right',
    marginTop:  -10,
    alignSelf: 'stretch'
  }
});