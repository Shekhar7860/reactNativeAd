/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';
import Users from './screens/Users';
import Add from './screens/Add'
import Welcome from './screens/Welcome'
import Edit from './screens/Edit'
import Info from './screens/Info'
import PdfScreen from './screens/PdfScreen';
const AppNavigator = StackNavigator({
    Welcome: { screen: Welcome
  },
    ScreenOne: { screen: Users},
    ScreenInfo: {screen: Info},
    ScreenTwo: { screen: Add},
    ScreenThree: {screen: Edit},
    Pdf: {screen: PdfScreen}
}, { headerMode: 'none' })

export default class App extends Component {
  componentDidMount() {
    console.disableYellowBox = true;
    SplashScreen.hide()
  }
  render() {
    return (
      <AppNavigator />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
