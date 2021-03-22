/* eslint-disable react-native/no-inline-styles */
import {useHeaderHeight} from '@react-navigation/stack';
import React, {useContext, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {AppContext} from '../utils/AppContext';
import {
  width,
  COLLECTION_DETAILS_DIMENSIONS,
  height,
  IMAGE_FLATLIST,
} from '../utils/Constants';
import {Collection, Item} from '../utils/Type';

const CollectionScreen = ({route}: any) => {
  const collection: Collection = route.params;
  const headerHeight = useHeaderHeight();
  const ref = useRef<FlatList>(null);
  const [itemDisplay, setItemDisplay] = useState<number>(0);
  const [canBuy, setCanBuy] = useState<boolean>(true);
  const {setCart, cart} = useContext(AppContext);

  const buyItem = () => {
    if (canBuy) {
      setCart([...cart, collection.items[itemDisplay]]);
    }
  };

  return (
    <View style={[styles.container, {marginTop: headerHeight}]}>
      <FlatList
        onMomentumScrollEnd={(event) => {
          const xOffset = event.nativeEvent.contentOffset.x;
          const value = xOffset / width;
          setItemDisplay(Math.floor(value));
          setCanBuy(true);
        }}
        ref={ref}
        data={collection.items}
        keyExtractor={(item: Item) => item.name}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        onMomentumScrollBegin={() => setCanBuy(false)}
        renderItem={({item}) => {
          return (
            <View style={styles.containerImage}>
              <Image
                source={{uri: item.image}}
                style={styles.image}
                resizeMode={'stretch'}
              />
            </View>
          );
        }}
      />
      <View style={styles.containerDetails}>
        <View style={styles.dots}>
          {collection.items.map((item: Item, index: number) => {
            return (
              <View
                style={[
                  styles.dot,
                  {
                    backgroundColor:
                      itemDisplay === index ? '#676f7c' : '#c5c9cc',
                  },
                ]}
                key={item.name}
              />
            );
          })}
        </View>
        <Text style={styles.title}>
          {collection?.items[itemDisplay].name
            ? collection.items[itemDisplay].name
            : '?'}
        </Text>
        <Text style={styles.description}>
          {collection?.items[itemDisplay].description
            ? collection.items[itemDisplay].description
            : '?'}
        </Text>
      </View>
      <View style={styles.containerPrice}>
        <View style={styles.price}>
          <Text style={styles.dollarSign}>$</Text>
          <Text style={styles.priceText}>
            {collection?.items[itemDisplay].price
              ? collection.items[itemDisplay].price
              : '?'}
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.buttonPrice}
          onPress={() => buyItem()}>
          <Text style={styles.buttonPriceText}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  containerImage: {
    width: width,
    height:
      height * COLLECTION_DETAILS_DIMENSIONS.images.height -
      COLLECTION_DETAILS_DIMENSIONS.marginTop,
    alignItems: 'center',
  },
  image: {
    width: (width * IMAGE_FLATLIST.width) / IMAGE_FLATLIST.height,
    height: '100%',
  },
  containerDetails: {
    height:
      height * COLLECTION_DETAILS_DIMENSIONS.details.height -
      COLLECTION_DETAILS_DIMENSIONS.marginTop,
    marginHorizontal: 25,
    marginTop: 10,
    flexDirection: 'column',
  },
  dots: {
    flexDirection: 'row',
  },
  dot: {
    height: 5,
    width: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  title: {
    fontSize: 40,
    fontFamily: 'KeplerStdLight',
    color: '#2f3032',
    marginTop: 25,
  },
  description: {
    fontSize: 18,
    fontFamily: 'KeplerStdLight',
    color: '#84858a',
  },
  containerPrice: {
    width: width,
    height:
      height * COLLECTION_DETAILS_DIMENSIONS.price.height -
      COLLECTION_DETAILS_DIMENSIONS.marginTop,
    backgroundColor: '#65717f',
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%',
    paddingLeft: '8%',
  },
  dollarSign: {
    color: '#fff',
    marginRight: 3,
    marginTop: 17,
    fontFamily: 'KeplerStdLight',
    fontSize: 18,
  },
  priceText: {
    color: '#fff',
    fontSize: 50,
    fontFamily: 'KeplerStdLight',
  },
  buttonPrice: {
    backgroundColor: '#dcd9d2',
    height: 60,
    width: '50%',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPriceText: {
    fontSize: 19,
    fontFamily: 'KeplerStdLight',
  },
});

export default CollectionScreen;
