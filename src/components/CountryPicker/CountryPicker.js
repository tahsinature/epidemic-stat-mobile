import React from 'react';
import PickerModal from 'react-native-picker-modal-view';
import {View, StyleSheet} from 'react-native';

const countryPicker = props => {
  const {isResultLoading, countries, onSelect, selectedCountry} = props;

  return (
    <View style={styles.pickerContainer}>
      <PickerModal selectPlaceholderText={selectedCountry} disabled={isResultLoading} items={countries.map(Name => ({Name}))} onSelected={v => onSelect(v.Name)} />
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default countryPicker;
