import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {MenuProvider} from 'react-native-popup-menu';

import {bootUp} from './src/utils';

import BottomTab from './src/components/BottomTab/BottomTab';
import AppBootAnimation from './src/components/AnimatedComponents/AppBootAnimation/AppBootAnimation';
import DataFetchingAnimation from './src/components/AnimatedComponents/DataFetchingAnimation/DataFetchingAnimation';
import DataFetchError from './src/components/DataFetchError/DataFetchError';
import UpdateNeeded from './src/components/UpdateNeeded/UpdateNeeded';
import Snackbar from './src/components/Snackbar/Snackbar';
import TestComponent from './src/components/TestComponent/TestComponent';
import IntroAlert from './src/components/IntroAlert/IntroAlert';
import colors from './src/constants/colors';

const app = (props) => {
  const [hasIntroPassed, passIntro] = useState(false);
  useEffect(() => {
    bootUp();
  }, []);

  const mainContent = hasIntroPassed ? (
    <>
      {props.appState.applicationUpdate.hasAppUpdate ? (
        <UpdateNeeded />
      ) : (
        <>
          <StatusBar barStyle="default" backgroundColor={colors.primaryGrayish} />
          <BottomTab />
        </>
      )}
    </>
  ) : (
    <IntroAlert clicked={() => passIntro(true)} />
  );

  return (
    <>
      <MenuProvider>
        {props.appState.isManifestLoading ? <AppBootAnimation /> : props.appState.isManifestLoaded ? mainContent : null}
        {props.appState.isFetchingData ? <DataFetchingAnimation /> : null}
        {props.appState.dataFetchError.isError ? <DataFetchError /> : null}
        {/* <Snackbar /> */}
      </MenuProvider>
    </>
  );
};

const mapStateToProps = (state) => ({
  appState: state.appReducer,
});

export default connect(mapStateToProps, null)(app);
