import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

const loadingAnimation = props => {
  return (
    <View style={styles.root}>
      <LottieView
        source={require('../../../assets/animations/18043-stay-safe-stay-home.json')}
        autoPlay
        loop
        style={{
          height: '50%',
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 'auto',
          marginBottom: 'auto',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});

export default loadingAnimation;
