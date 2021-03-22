import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';

const HeaderButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('AllCollection')}
      style={styles.container}>
      <View style={styles.dotContainer}>
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
      <View style={styles.dotContainer}>
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 35,
    height: 22,
    width: 22,
    justifyContent: 'space-between',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dot: {
    backgroundColor: '#000',
    width: 5,
    height: 5,
    borderRadius: 2,
  },
});

export default HeaderButton;
