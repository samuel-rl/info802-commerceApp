import React, {useContext} from 'react';
import WebView from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';
import {AppContext} from '../utils/AppContext';
import {getUniqueId} from 'react-native-device-info';
import {gql, useMutation} from '@apollo/client';
import {Item} from '../utils/Type';

const ADD_PURCHASE = gql`
  mutation addPurchaseById($data: Purchase!) {
    addPurchaseById(data: $data) {
      price
      name
      image
      description
    }
  }
`;

const WebPayementScreen = ({route}: any) => {
  const link = route.params.res.RedirectURL;
  const navigation = useNavigation();
  const {setCart, cart} = useContext(AppContext);
  const [addPurchaseById] = useMutation(ADD_PURCHASE);

  const onMessageDone = async () => {
    const uniqueId = getUniqueId();
    let newCart: Item[] = [];
    cart.map((item) => {
      delete item.__typename;
      newCart.push(item);
    });
    await addPurchaseById({
      variables: {
        data: {
          uniqueId: uniqueId.toString(),
          items: cart,
        },
      },
    });
    setCart([]);
    navigation.navigate('Home');
  };

  return <WebView source={{uri: link}} onMessage={() => onMessageDone()} />;
};

export default WebPayementScreen;
