import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';

import CountryPicker from '../../components/CountryPicker/CountryPicker';
import Result from '../../components/Result/Result';
import Snackbar from '../../components/Snackbar/Snackbar';

import {loadStat} from '../../utils';
import ExitApp from '../../components/ExitApp/ExitApp';

const homeScreen = (props) => {
  const {homeState} = props;

  const [countrySelectionMode, toggleCountrySelectionMode] = useState(false);

  useEffect(() => {
    loadStat(homeState.selectedCountry);
    props.navigation.addListener('blur', () => {
      toggleCountrySelectionMode(false);
    });
    return () => {
      props.navigation.removeListener('blur');
    };
  }, []);

  const handleCountrySelected = (name) => {
    if (!name) return; // watch out (is it necessary)
    toggleCountrySelectionMode(false);
    loadStat(name);
  };

  return (
    <View style={styles.root}>
      {countrySelectionMode ? (
        <CountryPicker
          exitCountrySelectionMode={() => toggleCountrySelectionMode(false)}
          isResultLoading={homeState.isResultLoading} // watchout
          countries={props.appState.supportedCountries}
          handleCountrySelected={handleCountrySelected}
          selectedCountry={homeState.selectedCountry} // watchout
        />
      ) : (
        <>
          <Animatable.View style={styles.result} animation="slideInLeft" duration={400}>
            {homeState.result ? (
              <Result
                handleCountrySelectionMode={() => toggleCountrySelectionMode(true)}
                result={{countryName: homeState.result.country, death: homeState.result.death, infected: homeState.result.infected, recovered: homeState.result.recovered}}
              />
            ) : null}
          </Animatable.View>
          <ExitApp />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  result: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    width: '100%',
  },
});

const mapStateToProps = (state) => {
  return {
    appState: state.appReducer,
    homeState: state.homeReducer,
  };
};

export default connect(mapStateToProps, null)(homeScreen);
