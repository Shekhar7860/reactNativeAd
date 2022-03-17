

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