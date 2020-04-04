import React, {useEffect} from 'react';
import {Alert, BackHandler} from 'react-native';

const exitApp = props => {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      Alert.alert('Confirm exit', 'Do you want to quit the app?', [
        {text: 'CANCEL', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => BackHandler.exitApp(),
        },
      ]);
      return true;
    });
  });

  return <></>;
};

export default exitApp;
