import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Svg, {G, Circle} from 'react-native-svg';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {Collection} from '../utils/Type';

export interface RoundedButtonProps {
  radius: number;
  strokeWidth: number;
}

const RoundedButton = ({radius, strokeWidth}: RoundedButtonProps) => {
  const halfCircle = radius + strokeWidth;
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('NewArrivals');
      }}>
      <Svg
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
        <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            cx="50%"
            cy="50%"
            stroke="#e0e0e0"
            strokeWidth={strokeWidth}
            r={radius}
            fill="transparent"
          />
          <View style={styles.roundedButtonContent}>
            <Text style={styles.roundedButtonText}>Explore</Text>
            <AntDesign name={'arrowright'} color={'black'} size={20} />
          </View>
        </G>
      </Svg>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  roundedButtonContent: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundedButtonText: {
    fontFamily: 'KeplerStdMedium',
    fontSize: 21,
    marginVertical: 3,
  },
});

export default RoundedButton;
