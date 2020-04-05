import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-paper';
import {material, materialColors, human} from 'react-native-typography';
import numeral from 'numeral';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {retryHomeResult} from '../../utils';
import colors from '../../constants/colors';

const result = ({result}) => {
  const {countryName, death, infected, recovered} = result;

  const hasAllData = [death, infected, recovered].every((ele) => typeof ele === 'number');

  const digits = [
    {name: 'Death', value: death, color: 'rgba(206, 71, 76, 0.200)'},
    {name: 'Infected', value: infected, color: 'rgba(207, 192, 82, 0.400)'},
    {name: 'Recovered', value: recovered, color: 'rgba(80, 206, 79, 0.400)'},
  ];

  const failedView = (
    <>
      <Text>failed to load result</Text>
      <Button mode="outlined" icon="refresh" dark onTouchEnd={retryHomeResult}>
        retry
      </Button>
    </>
  );

  const capsule = (name, value, color) => {
    const formats = ['0,', '0a'];
    const [currentFormat, nextFormat] = useState(formats[0]);

    return (
      <View style={{flexDirection: 'row', alignItems: 'center', height: hp(12.6)}}>
        <View
          style={{
            backgroundColor: 'rgba(116, 147, 178, 0.200)',
            width: 100,
            height: '100%',
            borderColor: color,
            borderLeftWidth: 2,
            borderTopWidth: 2,
            borderBottomWidth: 2,
            borderTopLeftRadius: 100,
            borderBottomLeftRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 3,
            padding: 10,
          }}>
          <Text style={{...material.button, color: materialColors.blackSecondary, textTransform: 'uppercase', fontSize: 12}}>{name}</Text>
        </View>
        <TouchableOpacity
          onPress={() => nextFormat(formats[formats.indexOf(currentFormat) + 1] || formats[0])}
          style={{backgroundColor: colors.primaryGrayish, flexGrow: 1, height: '100%', justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 100, borderBottomRightRadius: 100}}>
          <Text style={{fontFamily: 'monospace', fontSize: 30, color: materialColors.whitePrimary}}>{numeral(value).format(currentFormat)}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const successView = (
    <>
      <View style={styles.titleBox}>
        <Text style={styles.title_text}>Showing the result for:</Text>
        <View style={styles.title_countryBox}>
          <Text style={styles.title_country}>{countryName}</Text>
        </View>
      </View>
      <View style={styles.resultBox}>
        {digits.map((ele) => (
          <View style={{marginVertical: 2}} key={ele.name}>
            {capsule(ele.name, ele.value, ele.color)}
          </View>
        ))}
      </View>
    </>
  );

  return <View style={styles.root}>{hasAllData ? successView : failedView}</View>;
};

const styles = StyleSheet.create({
  root: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '80%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleBox: {
    padding: 20,
    justifyContent: 'center',
    height: '30%',
    // backgroundColor: 'red',
    width: '100%',
  },
  title_text: {
    fontSize: 20,
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: 'PathwayGothicOne-Regular',
    backgroundColor: 'rgba(116, 147, 178, 0.200)',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },
  title_countryBox: {
    backgroundColor: colors.primaryGrayish,
    justifyContent: 'center',
    height: 100,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  title_country: {
    fontFamily: 'Electrolize-Regular',
    fontSize: 30,
    color: materialColors.whitePrimary,
    textAlign: 'center',
  },
  resultBox: {
    justifyContent: 'center',
    height: '70%',
    width: '100%',
  },
  resultInnerBox: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultInnerBox_infected: {
    backgroundColor: 'rgba(255, 255, 0, 0.300)',
  },
  resultInnerBox_death: {
    backgroundColor: 'rgba(255, 0, 0, 0.100)',
  },
  resultInnerBox_recovered: {
    backgroundColor: 'rgba(24, 221, 65, 0.100)',
  },
  resultInnerBox_title: {
    textAlign: 'center',
    backgroundColor: 'red',
    padding: 20,
    borderRadius: 100,
  },
  resultInnerBox_number: {
    fontSize: 30,
    padding: 10,
    textAlign: 'center',
    backgroundColor: 'purple',
    width: '100%',
  },
});

export default result;
