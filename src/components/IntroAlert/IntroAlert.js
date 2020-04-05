import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';

const introAlert = (props) => {
  const {clicked} = props;
  const [isShowing, toggleShow] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('isWelcomeNoteUnderstood').then((isWelcomeNoteUnderstood) => {
      isWelcomeNoteUnderstood = isWelcomeNoteUnderstood === 'true';
      if (isWelcomeNoteUnderstood) clicked();
      else toggleShow(true);
    });
  }, []);

  const understandingHandler = () => {
    AsyncStorage.setItem('isWelcomeNoteUnderstood', 'true').then(() => {
      clicked();
    });
  };

  return (
    <View style={styles.container}>
      <AwesomeAlert
        style={{justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}
        show={isShowing}
        showProgress={false}
        title="Welcome"
        message="This application is right now showing statistics for current epedemic Covid19 only."
        showConfirmButton={true}
        confirmText="Understood"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        confirmButtonColor="#DD6B55"
        onConfirmPressed={understandingHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  button: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: '#AEDEF4',
  },
  text: {
    color: '#fff',
    fontSize: 15,
  },
});

export default introAlert;
