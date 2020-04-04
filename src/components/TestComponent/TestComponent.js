import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const testComponent = props => (
  <View style={styles.testComponent} onTouchStart={props.something}>
    {/* <AnimateNumber value={100} /> */}
  </View>
);

const styles = StyleSheet.create({
  testComponent: {
    backgroundColor: 'pink',
    padding: 20,
    // justifyContent: 'center',
  },
});

export default testComponent;
