import React from 'react';
import { View, StyleSheet } from 'react-native';

const Divider = ({ style, inset = 0 }) => (
  <View style={[styles.divider, { marginLeft: inset }, style]} />
);

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: '#f3f4f6',
  },
});

export default Divider;
