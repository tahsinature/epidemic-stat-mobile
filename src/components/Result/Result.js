import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-paper';
import {material, materialColors, human} from 'react-native-typography';
import numeral from 'numeral';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import AwesomeButton from 'react-native-really-awesome-button/src/themes/rick';
import Icon from 'react-native-vector-icons/Ionicons';
import color from 'color';

import {retryHomeResult} from '../../utils';
import colors from '../../constants/colors';
import stringDB from '../../storage/stringDB';

const result = ({result, handleCountrySelectionMode}) => {
  const {countryName, death, infected, recovered} = result;

  const hasAllData = [death, infected, recovered].every((ele) => typeof ele === 'number');

  const [state, setState] = useState({
    isFav: false,
  });

  const digits = [
    {name: 'Death', value: death, color: 'rgba(206, 71, 76, 0.200)'},
    {name: 'Infected', value: infected, color: 'rgba(207, 192, 82, 0.400)'},
    {name: 'Recovered', value: recovered, color: 'rgba(80, 206, 79, 0.400)'},
  ];

  const toggleFav = async () => {
    const arr = stringDB.data.bookmarkedCountries;
    if (state.isFav) {
      arr.splice(arr.indexOf(countryName), 1);
    } else arr.push(countryName);
    await stringDB.write();
    setState({...state, isFav: !state.isFav});
  };

  useEffect(() => {
    stringDB.read().then(() => {
      setState({...state, isFav: stringDB.data.bookmarkedCountries.includes(countryName)});
    });
  }, [countryName]);

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
            marginRight: 3,
            borderTopWidth: 2,
            borderLeftWidth: 2,
            borderBottomWidth: 2,
            borderTopLeftRadius: 100,
            borderBottomLeftRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: color,
            height: '100%',
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
        <TouchableOpacity onPress={handleCountrySelectionMode} style={styles.title_countryBox}>
          <Text size={20} color={colors.primaryGrayish} style={styles.title_country}>
            {countryName}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonBox}>
        <View>
          <AwesomeButton
            backgroundColor={colors.primaryGrayish}
            type="secondary"
            borderColor={color(colors.primaryGrayish).whiten(0.6).hex()}
            backgroundActive={color(colors.primaryGrayish).whiten(1).hex()}
            borderRadius={10}
            disabled
            style={{marginRight: wp(7)}}>
            <View style={{...styles.buttonIconHolder}}>
              <Icon color="#fff" name="md-undo" />
            </View>
          </AwesomeButton>
          {/* <Text style={{...material.button, fontSize: 5}}>Show Previous Day</Text> */}
        </View>

        <View>
          <AwesomeButton
            backgroundColor={colors.primaryGrayish}
            type="secondary"
            onPress={toggleFav}
            borderColor={color(colors.primaryGrayish).whiten(0.6).hex()}
            backgroundActive={color(colors.primaryGrayish).whiten(1).hex()}
            borderRadius={10}>
            <View style={styles.buttonIconHolder}>
              <Icon size={20} color={state.isFav ? '#67cbc3' : '#fff'} name="md-bookmark" />
            </View>
          </AwesomeButton>
          {/* <Text>Add To Bookmark</Text> */}
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
    justifyContent: 'space-evenly',
  },
  titleBox: {
    padding: 20,
    justifyContent: 'flex-end',
    // height: '20%',
    width: '100%',
    paddingVertical: hp(5),
    // backgroundColor: 'blue',
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
    // height: '70%',
    // backgroundColor: 'pink',
    width: '100%',
    paddingVertical: hp(5),
  },
  resultInnerBox: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonBox: {
    flexDirection: 'row',
    // backgroundColor: 'red',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonIconHolder: {
    // backgroundColor: 'pink',
    width: 50,
    // overflow: 'hidden',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default result;
