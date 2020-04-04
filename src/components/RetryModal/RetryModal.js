import React from 'react';
import {Modal, View, Text, StyleSheet, Button} from 'react-native';

const retryModal = props => {
  const {message, retry} = props;
  return (
    <View style={styles.root}>
      <Modal animated={true} transparent>
        <View style={styles.content}>
          <Text>{message || 'Something went wrong!'}</Text>
          <Button title="Retry" onPress={retry} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    // backgroundColor: 'pink',
    // height: '100%',
  },
  content: {
    // borderWidth: 15,
    // borderColor: 'red',
    height: '50%',
    marginTop: 'auto',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default retryModal;
