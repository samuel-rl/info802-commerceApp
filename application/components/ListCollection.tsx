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
import {height, LIST_COLLECTION_DIMENSION, width} from '../utils/Constants';
import {Collection, CollectionDataAll} from '../utils/Type';

const GET_All_COLLECTION = gql`
  query getAllCollection {
    getAllCollection {
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

const ListCollection = () => {
  const {loading, data} = useQuery<CollectionDataAll>(GET_All_COLLECTION);
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
          {data?.getAllCollection.map((collection: Collection) => {
            return (
              <TouchableOpacity
                key={collection.name}
                activeOpacity={0.9}
                onPress={() => {
                  navigation.navigate('Collection', collection);
                }}>
                <View style={styles.containerCollection}>
                  <View style={styles.titleCollection}>
                    <View style={styles.titlePosition}>
                      <Text style={styles.title}>{collection.name}</Text>
                    </View>
                  </View>
                  <View style={styles.imageCollectionContainer}>
                    <Image
                      style={styles.imageCollection}
                      source={{
                        uri: collection.image,
                      }}
                      resizeMode="cover"
                    />
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  containerCollection: {
    backgroundColor: '#f3f3f3',
    flexDirection: 'row',
    marginVertical: LIST_COLLECTION_DIMENSION.margin,
    height: height * LIST_COLLECTION_DIMENSION.height,
  },
  containerLoading: {
    flex: 1,
  },
  titleCollection: {
    width: width * LIST_COLLECTION_DIMENSION.title.width,
  },
  titlePosition: {
    position: 'absolute',
    bottom: (height * LIST_COLLECTION_DIMENSION.height) / 2,
    width: height * LIST_COLLECTION_DIMENSION.height,
    transform: [{rotate: '-90deg'}],
    left: -(width * LIST_COLLECTION_DIMENSION.title.width) + 10,
  },
  title: {
    fontSize: 35,
    fontFamily: 'KeplerStdRegular',
  },
  imageCollectionContainer: {
    width: width * LIST_COLLECTION_DIMENSION.image.width,
  },
  imageCollection: {
    width: '100%',
    height: '100%',
  },
});

export default ListCollection;
