import { Dimensions, StyleSheet } from 'react-native'
import React, { Component } from 'react';

import Pdf from 'react-native-pdf';

class PdfScreen extends Component {
  static navigationOptions = {
    title: 'PDF'
  };

  render() {
    const source = require('../document/product.pdf');
    return <Pdf
              source={source}
              style={styles.pdf}
            />;
  }
}


export default PdfScreen;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	pdf: {
		flex: 1,
		width: Dimensions.get('window').width,
	},
});