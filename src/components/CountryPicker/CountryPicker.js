import React, {useState, createRef} from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList, Keyboard} from 'react-native';
import {Searchbar, Text, Avatar, IconButton} from 'react-native-paper';
import {material} from 'react-native-typography';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import rgba from 'hex-to-rgba';
import color from 'color';
import * as Animatable from 'react-native-animatable';

import colors from '../../constants/colors';
import SingleCountry from '../SingleCountry/SingleCountry';

const countryPicker = (props) => {
  const {isResultLoading, selectedCountry, countries, handleCountrySelected, exitCountrySelectionMode} = props; // remove unncessary

  const [searchValue, updateSearchValue] = useState('');
  const [currentCountries, filterCountries] = useState(countries);
  const [isSearchBoxFocused, toggleSearchBoxFocus] = useState(false);

  const searchbarRef = createRef(null);

  const filter = (value) => {
    updateSearchValue(value);
    value = value.toLowerCase();
    const newCountries = countries.filter((country) => (country.name ? country.name.toLowerCase().includes(value) : country.toLowerCase().includes(value)));
    filterCountries(newCountries);
  };

  const topBarFontSize = 20;
  const getTopBarIcon = (name, clickHandler) => {
    return <IconButton icon={() => <Icon name={name} color="#fff" size={topBarFontSize} />} color="#fff" onPress={clickHandler} size={topBarFontSize} />;
  };

  const getSingleCountry = (country, backgroundColor) => {
    return (
      <View style={{height: hp(7)}}>
        <SingleCountry country={country} backgroundColor={backgroundColor} clicked={() => handleCountrySelected(country.name || country)} />
      </View>
    );
  };

  return (
    <Animatable.View style={styles.pickerContainer} animation="slideInRight" duration={400}>
      <View style={styles.topContent}>
        <View style={styles.topBar}>
          {getTopBarIcon('md-arrow-back', exitCountrySelectionMode)}
          <Text style={{fontSize: topBarFontSize, color: '#fff', fontWeight: 'bold'}}>Select Country</Text>
          {getTopBarIcon('md-funnel', () => console.log('loading filter/option'))}
        </View>
        <Searchbar
          style={{
            borderRadius: 100,
            backgroundColor: color(colors.primaryGrayish).darken(0.3).hex(),
            color: '#fff',
          }}
          inputStyle={{color: '#fff'}}
          iconColor={'#fff'}
          placeholder={'Search by keyword eg. USA, China...'}
          placeholderTextColor={rgba('#fff', '0.4')}
          value={searchValue}
          onFocus={() => toggleSearchBoxFocus(true)}
          onBlur={() => () => toggleSearchBoxFocus(false)}
          onIconPress={() => Keyboard.dismiss()}
          onChangeText={filter}
          ref={searchbarRef}
          clearButtonMode={'while-editing'}
        />
      </View>
      <View style={styles.bottomContent}>
        <FlatList
          data={currentCountries}
          renderItem={({item, index}) => getSingleCountry(item, index % 2 === 0 ? colors.countryList.even : colors.countryList.odd)}
          keyExtractor={(item) => item.name || item}
        />
      </View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    width: '100%',
    height: '100%',
  },
  topContent: {
    backgroundColor: colors.primaryGrayish,
    width: '100%',
    height: hp(20),
    paddingHorizontal: wp(8),
    justifyContent: 'space-evenly',
  },
  bottomContent: {},
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default countryPicker;
