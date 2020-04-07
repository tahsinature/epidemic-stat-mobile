import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {material, materialColors} from 'react-native-typography';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Accordion from 'react-native-collapsible/Accordion';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';

import colors from '../../constants/colors';
import {loadStat} from '../../utils';

import SingleCountry from '../../components/SingleCountry/SingleCountry';
import stringDB from '../../storage/stringDB';

function bookmarkScreen(props) {
  const {homeState, appState} = props;
  const [state, setState] = useState({
    activeSections: [],
    bookmarkedCountries: [],
  });

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      const bookmarkedCountries = stringDB.data.bookmarkedCountries
        .map((name) => appState.supportedCountries.find((ele) => ele.name === name))
        .sort((a, b) => {
          if (a.name < b.name) return -1;
          else if (a.name < b.name) return 1;
          else return 0;
        });
      setState({...state, bookmarkedCountries});
    });
    return () => {
      props.navigation.removeListener('focus');
    };
  });

  const renderContent = (country) => {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          <Text style={{height: 40}}>content</Text>
          <Text style={{height: 40}}>content</Text>
        </View>
        <View>
          <Text style={{height: 40}}>content</Text>
          <Text style={{height: 40}}>content</Text>
        </View>
        <View>
          <Text style={{height: 40}}>content</Text>
          <Text style={{height: 40}}>content</Text>
        </View>
      </View>
    );
  };

  const renderHeader = (country, index) => {
    const clickHandler = () => {
      if (homeState.selectedCountry !== country.name) loadStat(country.name);
      props.navigation.navigate('Home');
      // setState({activeSections: state.activeSections.includes(index) ? [] : [index]});
    };

    return (
      <View style={styles.singleCountry}>
        <SingleCountry country={country} backgroundColor={index % 2 === 0 ? colors.countryList.even : colors.countryList.odd} clicked={clickHandler} />
      </View>
    );
  };

  const notFound = (
    <View style={{height: '100%', justifyContent: 'space-evenly'}}>
      <View style={{/* backgroundColor: 'red', */ height: '30%', width: '100%', alignItems: 'center'}}>
        <LottieView
          source={require('../../assets/animations/15301-red-bookmark.json')}
          autoPlay
          loop
          style={{
            height: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 'auto',
            marginBottom: 'auto',
          }}
        />
      </View>
      <View style={{/* backgroundColor: 'pink', */ width: '100%', height: '30%'}}>
        <Text style={{textAlign: 'center', ...material.headline, color: 'gray'}}>No bookmarked country found</Text>
      </View>
    </View>
  );

  const found = (
    <ScrollView>
      <Accordion activeSections={state.activeSections} sections={state.bookmarkedCountries} renderHeader={renderHeader} renderContent={renderContent} duration={400} onChange={() => {}} />
      {/* <Text>End of Result</Text> */}
    </ScrollView>
  );
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Your Saved Countries</Text>
      </View>
      <View style={styles.content}>{state.bookmarkedCountries.length ? found : notFound}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  header: {height: '10%', backgroundColor: colors.primaryGrayish, justifyContent: 'center', width: wp(100)},
  headerText: {textAlign: 'center', ...material.titleWhite},
  content: {height: '90%', width: wp(100)},
  bottomContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  singleCountry: {
    height: hp(7),
    width: wp(100),
  },
});

const mapStateToProps = (state) => ({
  homeState: state.homeReducer,
  appState: state.appReducer,
});

export default connect(mapStateToProps, null)(bookmarkScreen);
