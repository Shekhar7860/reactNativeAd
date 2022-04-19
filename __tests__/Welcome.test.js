import React from 'react';
import Welcome from '../screens/Welcome'
import renderer from 'react-test-renderer';

// Note: test renderer must be required after react-native.


it('renders correctly', () => {
  renderer.create(<Welcome />);
});