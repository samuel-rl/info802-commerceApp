import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';
import SwitchSelector from 'react-native-switch-selector';
import ListCollection from '../components/ListCollection';
import ListAllItem from '../components/ListAllItem';

const options = [
  {label: 'Collections', value: 'c'},
  {label: 'All items', value: 't'},
];

const AllCollectionScreen = () => {
  const headerHeight = useHeaderHeight();
  const [choice, setChoice] = useState<string>('c');

  return (
    <View style={[styles.container, {marginTop: headerHeight}]}>
      <SwitchSelector
        style={styles.switch}
        options={options}
        initial={0}
        textColor={'#07080c'}
        selectedColor={'#fff'}
        buttonColor={'#07080c'}
        textStyle={styles.textSwitch}
        onPress={(value) => setChoice(value.toString())}
      />
      {choice === 'c' ? <ListCollection /> : <ListAllItem />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f3f3f3',
  },
  textSwitch: {
    fontFamily: 'KeplerStdRegular',
  },
  switch: {
    marginHorizontal: 30,
    marginVertical: 10,
  },
});

export default AllCollectionScreen;
