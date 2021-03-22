import React from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {gql, useQuery} from '@apollo/client';
import {useHeaderHeight} from '@react-navigation/stack';
import {ItemDataNewArrivals, Item} from '../utils/Type';
import {IMAGE_FLATLIST, width} from '../utils/Constants';
import {useNavigation} from '@react-navigation/native';

const GET_NEW_ARRIVALS = gql`
  query getNewArrivals {
    getNewArrivals {
      description
      image
      name
      price
    }
  }
`;

const NewArrivalsScreen = () => {
  const {loading, data} = useQuery<ItemDataNewArrivals>(GET_NEW_ARRIVALS);
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
          <ScrollView
            style={styles.scrollview}
            showsVerticalScrollIndicator={false}>
            <View style={styles.containerList}>
              <View style={styles.listview}>
                {data?.getNewArrivals.map((item: Item, index: number) => {
                  if (index % 2 === 0) {
                    return (
                      <TouchableOpacity
                        activeOpacity={0.9}
                        key={index}
                        onPress={() => {
                          navigation.navigate('Collection', {
                            name: '',
                            image: '',
                            items: [item],
                          });
                        }}>
                        <View style={styles.containerItem}>
                          <Image
                            source={{uri: item.image}}
                            style={styles.image}
                          />
                          <Text style={styles.title}>{item.name}</Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }
                })}
              </View>
              <View style={styles.listview}>
                {data?.getNewArrivals.map((item: Item, index: number) => {
                  if (index % 2 !== 0) {
                    return (
                      <TouchableOpacity
                        activeOpacity={0.9}
                        key={index}
                        onPress={() => {
                          navigation.navigate('Collection', {
                            name: '',
                            image: '',
                            items: [item],
                          });
                        }}>
                        <View style={styles.containerItem}>
                          <Image
                            source={{uri: item.image}}
                            style={styles.image}
                          />
                          <Text style={styles.title}>{item.name}</Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }
                })}
              </View>
            </View>
          </ScrollView>
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
  },
  containerItem: {
    marginVertical: 40,
  },
  image: {
    width: width / 2 - 20,
    height: (IMAGE_FLATLIST.height / IMAGE_FLATLIST.width) * (width / 2 - 20),
  },
  listview: {
    width: '50%',
    alignItems: 'center',
  },
  containerList: {
    width: '100%',
    flexDirection: 'row',
  },
  scrollview: {
    width: '100%',
  },
  title: {
    fontFamily: 'KeplerStdLight',
    textAlign: 'center',
  },
});

export default NewArrivalsScreen;
