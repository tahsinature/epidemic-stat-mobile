import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import stringDB from '../../storage/stringDB';
import colors from '../../constants/colors';

const introAlert = (props) => {
  const {clicked} = props;
  const [isShowing, toggleShow] = useState(false);

  useEffect(() => {
    stringDB
      .read()
      .then(() => {
        if (stringDB.data.appSettings.tourCompleted) {
          clicked();
        } else toggleShow(true);
      })
      .catch((err) => {
        // alert(err.message);
      });
  }, []);

  const understandingHandler = () => {
    stringDB.data.appSettings.tourCompleted = true;
    stringDB.write().then(() => {
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
        confirmButtonColor={colors.primaryGrayish}
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
