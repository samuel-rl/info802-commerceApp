import {gql, useQuery} from '@apollo/client';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {
  bottomNavBarHeight,
  EXPLORE_BUTTON_SIZE,
  height,
  HOME_COLLECTION_DIMENSIONS,
  statusBarHeight,
  width,
} from '../utils/Constants';
import {useHeaderHeight} from '@react-navigation/stack';
import RoundedButton from '../components/RoundedButton';
import {CollectionData} from '../utils/Type';
import {useNavigation} from '@react-navigation/native';

const GET_HOME_COLLECTION = gql`
  query getHomeCollection {
    getHomeCollection {
      image
      name
      items {
        description
        image
        name
        price
      }
    }
  }
`;

const HomeScreen = () => {
  const {loading, data} = useQuery<CollectionData>(GET_HOME_COLLECTION);
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation();

  return (
    <>
      {loading ? (
        <View style={[styles.containerLoader, {marginTop: headerHeight}]}>
          <ActivityIndicator size={'large'} color="#000" />
        </View>
      ) : (
        <View style={[styles.container, {marginTop: headerHeight}]}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              navigation.navigate('Collection', data?.getHomeCollection);
            }}>
            <View
              style={[
                styles.containerHome,
                {
                  height:
                    height -
                    headerHeight +
                    statusBarHeight -
                    HOME_COLLECTION_DIMENSIONS.marginTop -
                    (EXPLORE_BUTTON_SIZE.size + EXPLORE_BUTTON_SIZE.margin * 2),
                },
              ]}>
              <View style={styles.titleCollection}>
                <View style={styles.titlePosition}>
                  <Text style={styles.title}>
                    {data?.getHomeCollection.name}
                  </Text>
                </View>
              </View>
              <View style={styles.imageCollectionContainer}>
                <Image
                  style={styles.imageCollection}
                  source={{
                    uri: data?.getHomeCollection.image,
                  }}
                  resizeMode="cover"
                />
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.containerExplore}>
            <View style={styles.explorePart}>
              <Text style={styles.arrivalsText}>New Arrivals</Text>
            </View>
            <View style={styles.explorePart}>
              <RoundedButton
                radius={EXPLORE_BUTTON_SIZE.size / 2}
                strokeWidth={2}
              />
            </View>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  containerLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f3f3f3',
  },
  containerHome: {
    backgroundColor: '#f3f3f3',
    flexDirection: 'row',
    marginTop: HOME_COLLECTION_DIMENSIONS.marginTop,
  },
  titleCollection: {
    width: width * HOME_COLLECTION_DIMENSIONS.title.width,
  },
  titlePosition: {
    position: 'absolute',
    width:
      height -
      statusBarHeight -
      HOME_COLLECTION_DIMENSIONS.marginTop -
      (EXPLORE_BUTTON_SIZE.size + EXPLORE_BUTTON_SIZE.margin * 2),
    transform: [{rotate: '-90deg'}],
    left: -(width * HOME_COLLECTION_DIMENSIONS.title.width) - 50,
    bottom:
      EXPLORE_BUTTON_SIZE.size +
      EXPLORE_BUTTON_SIZE.margin * 2 +
      bottomNavBarHeight -
      20,
  },
  title: {
    fontSize: 50,
    fontFamily: 'KeplerStdRegular',
  },
  imageCollectionContainer: {
    width: width * HOME_COLLECTION_DIMENSIONS.image.width,
  },
  imageCollection: {
    width: '100%',
    height: '100%',
  },
  containerExplore: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    height: EXPLORE_BUTTON_SIZE.size + EXPLORE_BUTTON_SIZE.margin * 2,
  },
  explorePart: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  arrivalsText: {
    fontSize: 38,
    lineHeight: 45,
    fontFamily: 'KeplerStdLight',
    marginLeft: EXPLORE_BUTTON_SIZE.margin * 1.2,
  },
});

export default HomeScreen;
