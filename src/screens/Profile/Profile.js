import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {material, materialColors} from 'react-native-typography';

function profileScreen() {
  return (
    <View style={styles.root}>
      <View style={styles.topContainer}>
        <LottieView style={{height: '80%', alignItems: 'center', justifyContent: 'center'}} autoPlay loop source={require('../../assets/animations/11045-buildin-a-web-page.json')} />
      </View>
      <View style={styles.bottomContainer}>
        <Text style={{...material.body2, color: materialColors.blackTertiary}}>Profile functionality coming soon...!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topContainer: {
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default profileScreen;
