import { Card, Divider, List, ListItem, SearchBar } from 'react-native-elements';
import {Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View} from 'react-native'

import React from 'react'
import firebase from 'react-native-firebase';

const AdRequest = firebase.admob.AdRequest;

const advert = firebase.admob().interstitial('ca-app-pub-3550043356338169/3833572689')
const request = new AdRequest();
request.addKeyword('foobar');
const Info = ({navigation}) => {
const goBack = () => {
navigation.goBack()
}


const openPdf = () => {
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
navigation.navigate('Pdf')
}
return( <View style={styles.mainContainer}>
               <View style={styles.toolbar}>
                    <TouchableOpacity onPress={() => goBack()}>
                    <Image style={{width:30,marginLeft:5,  height:30}}source={require('../images/back.png')}></Image>
                    </TouchableOpacity>
                    <Text style={styles.toolbarTitle}>Info</Text>
                    <TouchableOpacity style={styles.toolbarButton}>
                    {/* <Image style={{width:30,marginLeft:5,  height:30}} source={require('../images/share.png')}></Image> */}
                    </TouchableOpacity>
                </View>
                <View style={styles.content}>
                <Text style={{marginTop : 20, fontWeight : '800'}}>Get Information About Modicare Products </Text>
                <TouchableHighlight style={{...styles.fullWidthButton, marginTop : 20}} onPress={() => openPdf()}>
                            <Text style={styles.fullWidthButtonText}>Open Product Catalogue</Text>
                            </TouchableHighlight></View>
                </View>)
}


export default Info;

const styles = StyleSheet.create({
    toolbar:{
        backgroundColor:'#81c04d',
        paddingTop:20,
        paddingBottom:10,
        flexDirection:'row'    //Step 1
    },
    toolbarButton:{
        width: 50,            //Step 2
        color:'#fff',
        textAlign:'center'
    },
    toolbarTitle:{
        color:'#fff',
        textAlign:'center',
        fontWeight:'bold',
        flex:1,
        fontSize:20                //Step 3
    },
    mainContainer:{
      flex:1                  //Step 1
  },
  content:{
      backgroundColor:'#ebeef0',
      flex:1,
      alignItems : 'center'               //Step 2
  },
  messageBox:{
    alignItems : 'center'
  },
  messageBoxBodyText:{
    margin:10,
    fontSize:18
  },
  messageBoxBodyText2:{
    margin:10,
    fontSize:18,
    fontWeight : 'bold'
  },
  topText:{
    fontSize:25,
    marginTop : 10,
    fontWeight : 'bold'
  },
  topText2:{
    fontSize:20,
    marginTop : 10,
    marginLeft:10
  },
  inputsContainer: {
    flex: 1,
    alignItems : 'center'
  },
  fullWidthButton: {
    backgroundColor: 'blue',
    height:50,
    width:'80%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fullWidthButtonText: {
    fontSize:24,
    color: 'white',
    textAlign : 'center'
  },
  footer:{
    position:'absolute',
    bottom : 10,
    width : '100%'
  }
  });