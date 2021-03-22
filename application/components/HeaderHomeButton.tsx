import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const HeaderHomeButton = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <AntDesign name={'close'} size={32} color={'black'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 35,
    height: 32,
    width: 32,
  },
});

export default HeaderHomeButton;
