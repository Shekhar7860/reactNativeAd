import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image, TouchableHighlight} from 'react-native'
import {  Card, Divider, SearchBar, List, ListItem  } from 'react-native-elements';
const Info = ({navigation}) => {
const goBack = () => {
navigation.goBack()
}


const openPdf = () => {
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
                <Text>Info </Text>
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