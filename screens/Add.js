import {Platform, StyleSheet, Text, View, Alert, StatusBar, TouchableOpacity,  Image, ScrollView,   PermissionsAndroid,  TouchableHighlight, Button} from 'react-native';
import React, { Component } from 'react';
import { db } from './config';
import Permissions from 'react-native-permissions'
import firebase from 'react-native-firebase';
import DateTimePicker from 'react-native-modal-datetime-picker'
import Moment from 'moment';
const Banner = firebase.admob.Banner;
const AdRequest = firebase.admob.AdRequest;
const advert = firebase.admob().interstitial('ca-app-pub-8707066328646930/3387680787')
const request = new AdRequest();
request.addKeyword('foobar');


export default class Add extends Component {
  constructor(props){
    super(props);
    this.state = {
      imageURL : "",
      user: [],
    view:'add',
    filePath: {},
    userImage : "",
    isDateTimePickerVisible: false,
    isDateTimePickerVisible2: false,
    startDateText : '',
    endDateText : '',
    name : '',
    benefits: '',
    dp: '',
    mrp: ''
    };
   
 }
  handleSubmit () {
   // use that ref to get the form value
   console.log(this._form.getValue(), this.state.imageURL, 'userImage' )
   if(this._form.getValue())
   {
    console.log(this._form.getValue());
    if(this.state.user == " ")
    {
      console.log('this one')
  
      let uid = Math.floor(Math.random()*100) + 1;
    db.ref('/users').push({
      "id":uid,
      "email": this._form.getValue().email,
      "name": this._form.getValue().name,
      "profile":this._form.getValue().profile,
      "age":this._form.getValue().age,
      "DateOfJoining":this.state.startDateText,
      "DateOfBirth":this.state.endDateText,
      "photo" : this.state.imageURL
    });
    
   
  }
  else {
 db.ref('/users').push({
  "id":this.state.user.id,
  "email": this._form.getValue().email,
  "name": this._form.getValue().name,
  "password":this._form.getValue().profile,
  "DateOfJoining":this.state.startDateText,
  "DateOfBirth":this.state.endDateText,
  "age":this._form.getValue().age,
  "photo" : this.state.imageURL
});
  }
    this.props.navigation.navigate('ScreenOne', {userdata:this._form.getValue()});
}
else
{
Alert.alert("please fill all details")
}
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log("date1", date);
    var newDate = Moment(date).format('DD-MM-YYYY');
    this.setState({ startDateText:newDate})
    this._hideDateTimePicker();
  };

  _showDateTimePicker2 = () => this.setState({ isDateTimePickerVisible2: true });

  _hideDateTimePicker2 = () => this.setState({ isDateTimePickerVisible2: false });

  _handleDatePicked2 = (date) => {
    var newDate = Moment(date).format('DD-MM-YYYY');
    this.setState({ endDateText:newDate})
    this._hideDateTimePicker2();
  };
 selectPhoto  ()  {
   

  
    ImagePicker.showImagePicker({title: "", maxWidth: 800, maxHeight: 600}, res => {
      if (res.didCancel) {
        console.log("User cancelled!");
      } else if (res.error) {
        console.log("Error", res.error);
      } else {
        console.log(res);
        const value = this._form.getValue(); // use that ref to get the form value
        console.log(value);
        this.setState({  filePath: res});
        this.uploadImage(res.uri)
      }
    });


    
  }
  
  

 
  uploadImage(uri, mime = 'application/octet-stream') {
    const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob
    return new Promise((resolve, reject) => {
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
      let uploadBlob = null
      let uid = Math.random().toString(36).substring(7);
      const imageRef = firebase.storage().ref('images').child(uid)

      fs.readFile(uploadUri, 'base64')
        .then((data) => {
          return Blob.build(data, { type: `${mime};BASE64` })
        })
        .then((blob) => {
          uploadBlob = blob
          return imageRef.put(blob, { contentType: mime })
        })
        .then(() => {
          uploadBlob.close()
          console.log(imageRef.getDownloadURL(), 'downloadUrl')
         imageRef.getDownloadURL().then((url) => {
          console.log('uri22', url);
          this.setState({imageURL : url})

        })
        })
        .then((url) => {
          console.log('uri', uri)
        })
        .catch((error) => {
          console.log(error, 'err')
      })
    })
  }


  goBack = () => {
    this.props.navigation.navigate('ScreenOne')
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
    const {state} = this.props.navigation;
   console.log(state.params);
    if(state.params)
    {
   this.setState({user:state.params.user});
   this.setState({startDateText:state.params.user.DateOfJoining});
   this.setState({endDateText:state.params.user.DateOfBirth});
   this.setState({userImage : state.params.user.photo})
      this.setState({name : state.params.user.name})
         this.setState({benefits  : state.params.user.email})
       this.setState({mrp  : state.params.user.DateOfBirth})
        this.setState({dp  : state.params.user.DateOfJoining})
    }
    else{
      this.setState({user:" "});
    }
      
  }

  
  static navigationOptions = {
    title: 'Product'
  }
  render() {
    const defaultImg =
    'https://satishrao.in/wp-content/uploads/2016/06/dummy-profile-pic-male.jpg'
    console.log(this.state)
    return (
      <View style={{flex:1}}>
      <View style={styles.toolbar}>
      <TouchableOpacity onPress={() => this.goBack()}>
                    <Image style={{width:30, marginLeft:5, height:30}}source={require('../images/back.png')}></Image>
                    </TouchableOpacity>
                    <Text style={styles.toolbarTitle}>{this.state.name}</Text>
                    <Text style={styles.toolbarButton}></Text>
                </View>
      
      <View style={styles.container}>
        
 <Banner
       style={{alignSelf:'center',marginLeft:20, marginTop:10}}
    size={"LARGE_BANNER"}
  unitId={"ca-app-pub-8707066328646930/4480797848"}
  request={request.build()}
  onAdLoaded={() => {
    console.log('Advert loaded');
  }} />
       
       <Text style={{alignSelf:'center', fontSize :20}}> {this.state.name} </Text>
          <Image
            source={{ uri: this.state.filePath.uri ? this.state.filePath.uri : this.state.userImage }}
            style={{ width: 200, height: 200, alignSelf:'center', marginTop:2 }}
          />
          <View style={{flex: 1}}>
         <ScrollView>
              <Text style={{marginTop:5}}> Benefits </Text>
          <Text> {this.state.benefits} </Text>
            <Text style={{marginTop:5}}> MRP Price </Text>
          <Text> {this.state.mrp} </Text>
            <Text style={{marginTop:5}}> DP Price </Text>
          <Text> {this.state.dp} </Text>
         
          </ScrollView>
           </View>

        
    </View>
    </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 0,
    padding: 20,
    backgroundColor: '#ffffff',
    flex:1
  },
  textFont : {
    fontSize : 17
  },
  postprojectinput: {
    marginBottom:10,
    height: 40,
    borderColor: '#AEA9A8',
    borderWidth: 1,
    padding:5,
    width:'100%',
    fontSize : 17,
    marginTop:10
    },
    dateTextColor :{
      color : '#AEA9A8',
      padding :4,
      fontSize : 17
    },
     footer : {
    position : 'absolute',
    bottom : 20,
    alignItems:'center'
  },
  toolbarTitle:{
    color:'#fff',
    textAlign:'center',
    fontWeight:'bold',
    flex:1,
    fontSize:20                //Step 3
},
  toolbar:{
    backgroundColor:'#81c04d',
    paddingBottom:10,
    flexDirection:'row' ,
    paddingTop:20   //Step 1
}
});