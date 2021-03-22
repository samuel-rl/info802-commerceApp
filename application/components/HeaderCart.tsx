import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {AppContext} from '../utils/AppContext';

export interface HeaderCartProps {}

const HeaderCart = () => {
  const {cart} = useContext(AppContext);
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
      <View style={styles.square}>
        <View style={styles.circleBlack} />
        <View style={styles.circleWhite} />
        <View style={styles.stickBlack} />
        <View style={styles.numberItemContainer}>
          <Text style={styles.numberItem}>{cart.length}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  square: {
    marginHorizontal: 35,
    height: 20,
    width: 24,
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 2,
  },
  circleBlack: {
    position: 'absolute',
    top: -10,
    left: 3,
    width: 14,
    height: 16,
    backgroundColor: '#000',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  circleWhite: {
    position: 'absolute',
    top: -8,
    left: 5,
    width: 10,
    height: 20,
    backgroundColor: '#f3f3f3',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  stickBlack: {
    position: 'absolute',
    width: 10,
    height: 2,
    backgroundColor: '#000',
    top: -2,
    left: 5,
  },
  numberItemContainer: {
    backgroundColor: '#000',
    width: 20,
    height: 20,
    position: 'absolute',
    top: 6,
    left: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberItem: {
    fontSize: 12,
    color: '#fff',
  },
});

export default HeaderCart;
