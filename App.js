import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {connect} from 'react-redux';

import {bootUp} from './src/utils';

import BottomTab from './src/components/BottomTab/BottomTab';
import AppBootAnimation from './src/components/AnimatedComponents/AppBootAnimation/AppBootAnimation';
import DataFetchingAnimation from './src/components/AnimatedComponents/DataFetchingAnimation/DataFetchingAnimation';
import DataFetchError from './src/components/DataFetchError/DataFetchError';
import UpdateNeeded from './src/components/UpdateNeeded/UpdateNeeded';
import Snackbar from './src/components/Snackbar/Snackbar';
import TestComponent from './src/components/TestComponent/TestComponent';

const app = props => {
  useEffect(() => {
    bootUp();
  }, []);

  const mainContent = (
    <>
      {props.appState.applicationUpdate.hasAppUpdate ? (
        <UpdateNeeded />
      ) : (
        <>
          <StatusBar barStyle="default" />
          <BottomTab />
        </>
      )}
    </>
  );

  return (
    <>
      {props.appState.isManifestLoading ? <AppBootAnimation /> : props.appState.isManifestLoaded ? mainContent : null}
      {props.appState.isFetchingData ? <DataFetchingAnimation /> : null}
      {props.appState.dataFetchError.isError ? <DataFetchError /> : null}
      {/* <Snackbar /> */}
    </>
  );
};

const mapStateToProps = state => ({
  appState: state.appReducer,
});

export default connect(mapStateToProps, null)(app);
