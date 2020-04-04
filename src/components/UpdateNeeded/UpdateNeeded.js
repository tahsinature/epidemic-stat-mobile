import React, {useState} from 'react';
import {View, Text, StyleSheet, Linking} from 'react-native';
import {connect} from 'react-redux';
import LottieView from 'lottie-react-native';
import {Button, Modal, Portal, Provider as PaperProvider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {skipUpdate} from '../../utils';

const updateNeeded = props => {
  const {applicationUpdate} = props;
  const {isAppUpdateRequired, updateLinks} = applicationUpdate;

  const [isUpdateLinksShowing, toggleUpdateLinks] = useState(false);

  const updateInfo = (
    <>
      <View style={styles.animationContainer}>
        <LottieView
          source={require('../../assets/animations/206-update.json')}
          autoPlay
          loop
          style={{
            height: '100%',
            width: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 'auto',
            marginBottom: 'auto',
          }}
        />
      </View>
      <View style={{...styles.contentContainer, marginTop: isAppUpdateRequired ? 50 : 0}}>
        <Text style={styles.updateText}>There is an update available. This update is required to make the app work properly</Text>
        <Button
          contentStyle={{height: 40, backgroundColor: '#4D818A'}}
          color={'#fff'}
          style={{...styles.contentContainer_button}}
          mode="outlined"
          onPress={() => (updateLinks.length > 1 ? toggleUpdateLinks(!isUpdateLinksShowing) : Linking.openURL(updateLinks[0].link))}>
          Update Now
        </Button>
        {isAppUpdateRequired ? null : (
          <Button contentStyle={{height: 40, backgroundColor: '#eee'}} color="#000" style={{...styles.contentContainer_button, borderColor: '#4D818A'}} mode="outlined" onPress={skipUpdate}>
            Skip
          </Button>
        )}
      </View>
    </>
  );

  const linkButton = ({source, link, sourceIcon}) => {
    return (
      <Button
        key={source}
        icon={{uri: sourceIcon}}
        color="#000"
        style={{marginTop: 30, width: '80%', backgroundColor: '#fff'}}
        contentStyle={{height: 50}}
        mode="outlined"
        onPress={() => Linking.openURL(link)}>
        {source}
      </Button>
    );
  };

  const updateLinksDisplay = (
    <PaperProvider>
      <Portal>
        <View style={styles.modalContainer}>
          <Modal contentContainerStyle={{alignItems: 'center'}} dismissable={false} visible={isUpdateLinksShowing}>
            {updateLinks.map(ele => linkButton(ele))}
            <Button
              icon={'refresh'}
              color="#fff"
              style={{marginTop: 30, width: '80%', backgroundColor: 'rgba(232, 228, 240, 0.100)', borderColor: '#fff'}}
              contentStyle={{height: 50}}
              mode="outlined"
              onPress={() => toggleUpdateLinks(false)}>
              Go Back
            </Button>
          </Modal>
        </View>
      </Portal>
    </PaperProvider>
  );

  return <View style={styles.root}>{isUpdateLinksShowing ? updateLinksDisplay : updateInfo}</View>;
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    height: '100%',
  },
  animationContainer: {
    height: '50%',
  },
  contentContainer: {
    height: '50%',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: '10%',
  },
  contentContainer_button: {
    width: '100%',
    margin: 10,
  },
  updateText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 15,
  },
  modalContainer: {
    height: '100%',
  },
});

const mapStateToProps = state => {
  return {
    applicationUpdate: state.appReducer.applicationUpdate,
  };
};

export default connect(mapStateToProps)(updateNeeded);
