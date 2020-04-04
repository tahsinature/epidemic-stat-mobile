import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

import CountryPicker from '../../components/CountryPicker/CountryPicker';
import Result from '../../components/Result/Result';
import Snackbar from '../../components/Snackbar/Snackbar';

import {loadStat} from '../../utils';
import ExitApp from '../../components/ExitApp/ExitApp';

const handleCountrySelected = name => {
  if (!name) return;
  loadStat(name);
};

const homeScreen = props => {
  const {homeState} = props;

  useEffect(() => {
    loadStat(homeState.selectedCountry);
  }, []);

  return (
    <View style={styles.root}>
      <View style={styles.countryPicker}>
        <Text style={styles.countrySelectorTitle}>Select Your Country</Text>
        <CountryPicker isResultLoading={homeState.isResultLoading} countries={props.appState.supportedCountries} onSelect={handleCountrySelected} selectedCountry={homeState.selectedCountry} />
      </View>
      <View style={styles.result}>
        {homeState.result ? (
          <Result result={{countryName: homeState.result.country, death: homeState.result.death, infected: homeState.result.infected, recovered: homeState.result.recovered}} />
        ) : null}
      </View>
      <ExitApp />
      {/* <Snackbar /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  countrySelectorTitle: {
    textAlign: 'center',
    fontSize: 17,
  },
  countryPicker: {
    paddingVertical: 20,
    backgroundColor: '#eee',
    width: '100%',
  },
  result: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    width: '100%',
  },
});

const mapStateToProps = state => {
  return {
    appState: state.appReducer,
    homeState: state.homeReducer,
  };
};

export default connect(mapStateToProps, null)(homeScreen);
