import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {material} from 'react-native-typography';
import {Avatar, Text} from 'react-native-paper';
import PropTypes from 'prop-types';

const singleCountry = (props) => {
  const {country, backgroundColor, clicked} = props;
  return (
    <TouchableOpacity style={{...styles.root, backgroundColor}} onPress={clicked}>
      {country.flag ? (
        <Avatar.Image source={{uri: country.flag}} size={hp(4)} style={{marginRight: wp(5)}} />
      ) : (
        <Avatar.Text label={country.alpha2Code || country[0].toUpperCase()} size={hp(4)} style={{marginRight: wp(5)}} />
      )}
      <Text style={{...material.titleObject}}>{country.name || country}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: wp(8),
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

singleCountry.propTypes = {
  country: PropTypes.object.isRequired,
  clicked: PropTypes.func,
  backgroundColor: PropTypes.string.isRequired,
};

export default singleCountry;
