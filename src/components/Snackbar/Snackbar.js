import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Snackbar} from 'react-native-paper';
import {connect} from 'react-redux';
import {hideSnackbar} from '../../utils';

const snackbar = props => {
  const {appState} = props;

  return (
    <View style={styles.container}>
      <Snackbar
        visible={appState.snackBar.show}
        duration={1000}
        onDismiss={hideSnackbar}
        // action={{
        //   label: 'Undo',
        //   onPress: () => {
        //     // Do something
        //   },
        // }}
      >
        {appState.snackBar.msg}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'space-between',
    width: '100%',
  },
});

const mapStateToProps = state => ({
  appState: state.appReducer,
});

export default connect(mapStateToProps, null)(snackbar);
