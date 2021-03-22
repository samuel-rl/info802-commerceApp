import {gql, useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {useHeaderHeight} from '@react-navigation/stack';
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
import {IMAGE_FLATLIST, width} from '../utils/Constants';
import {ItemDataAll, Item} from '../utils/Type';

const GET_ALL_ITEMS = gql`
  query getAllItem {
    getAllItem {
      description
      image
      name
      price
    }
  }
`;

const ListCollection = () => {
  const {loading, data} = useQuery<ItemDataAll>(GET_ALL_ITEMS);
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  return (
    <>
      {loading ? (
        <View style={[styles.containerLoading, {marginTop: headerHeight}]}>
          <ActivityIndicator size={'large'} color="#000" />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.containerList}>
            <View style={styles.listview}>
              {data?.getAllItem.map((item: Item, index: number) => {
                if (index % 2 === 0) {
                  return (
                    <TouchableOpacity
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
              {data?.getAllItem.map((item: Item, index: number) => {
                if (index % 2 !== 0) {
                  return (
                    <TouchableOpacity
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
      )}
    </>
  );
};

const styles = StyleSheet.create({
  containerLoading: {
    flex: 1,
  },
  image: {
    width: width / 2 - 20,
    height: (IMAGE_FLATLIST.height / IMAGE_FLATLIST.width) * (width / 2 - 20),
  },
  containerList: {
    width: '100%',
    flexDirection: 'row',
  },
  listview: {
    width: '50%',
    alignItems: 'center',
  },
  containerItem: {
    marginVertical: 40,
  },
  title: {
    fontFamily: 'KeplerStdLight',
    textAlign: 'center',
  },
});

export default ListCollection;
