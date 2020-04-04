import React from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Button, Text} from 'react-native-paper';
import LottieView from 'lottie-react-native';
import {bootUp, showSnackbar} from '../../utils';

const dataFetchError = props => {
  const {appState} = props;

  return (
    <View style={styles.root}>
      <View style={styles.topContent}>
        <LottieView
          source={require('../../assets/animations/2147-virus-cell.json')}
          autoPlay
          style={{
            height: '90%',
            width: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 'auto',
            marginBottom: 'auto',
          }}
        />
      </View>
      <View style={styles.bottomContent}>
        <View style={styles.bottomContent_textBox}>
          <Text style={{...styles.bottomContent_text, ...styles.bottomContent_text_main}}>Somethings Not Right</Text>
          <Text style={{...styles.bottomContent_text, ...styles.bottomContent_text_alt}}>Sorry, We're having some technical issues (as you can see). Try to refresh the page. Sometime works :)</Text>
        </View>
        <Button
          contentStyle={{height: 50}}
          icon={'refresh'}
          onPress={appState.dataFetchError.retryAction || (() => showSnackbar('Retry action not provided'))}
          mode="contained"
          style={{...styles.bottomContent_button, borderColor: '#35C4A8', backgroundColor: '#35C4A8'}}>
          Retry
        </Button>
        <Button contentStyle={{height: 50}} color="#8B8B8B" icon={'home'} onPress={bootUp} style={{...styles.bottomContent_button, borderColor: '#DADADA'}}>
          Go Home
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: '100%',
    padding: 20,
  },
  topContent: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '50%',
  },
  bottomContent: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '50%',
    marginBottom: 20,
  },
  bottomContent_textBox: {
    paddingHorizontal: 40,
    marginVertical: 20,
  },
  bottomContent_text: {
    textAlign: 'center',
  },
  bottomContent_text_main: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bottomContent_text_alt: {
    color: '#8B8B8B',
  },
  bottomContent_button: {
    borderWidth: 2,
    borderRadius: 30,
    width: '80%',
    margin: 10,
  },
});

const mapStateToProps = state => ({
  appState: state.appReducer,
});

export default connect(mapStateToProps, null)(dataFetchError);
