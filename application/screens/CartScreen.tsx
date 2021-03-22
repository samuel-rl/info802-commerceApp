import {useHeaderHeight} from '@react-navigation/stack';
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {AppContext} from '../utils/AppContext';
import {
  clientID,
  height,
  IMAGE_FLATLIST,
  ITEM_CART_DIMENSION,
  SOAP_URL,
  width,
} from '../utils/Constants';
import {Item} from '../utils/Type';
import SwitchSelector from 'react-native-switch-selector';
const soap = require('soap-everywhere');

const options = [
  {label: 'France', value: 'FR'},
  {label: 'Belgique', value: 'BE'},
  {label: 'Autre', value: 'OT'},
];

const CartScreen = ({navigation}: any) => {
  const {setCart, cart} = useContext(AppContext);
  const headerHeight = useHeaderHeight();
  const [total, setTotal] = useState<number>(0);
  const cartSorted = useRef<any>([]);
  const modalizeRef = useRef<Modalize>(null);
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [address, setAdress] = useState<string>('');
  const [country, setCountry] = useState<string>('FR');
  const [delivery, setDelivery] = useState<number | null>(null);
  const [loadPayement, setLoadPayement] = useState<boolean>(false);

  useEffect(() => {
    const tot = cart.reduce((a, b) => a + (b.price || 0), 0);
    setTotal(tot);
    const map = cart.reduce(
      (acc, e) => acc.set(e, (acc.get(e) || 0) + 1),
      new Map(),
    );
    cartSorted.current = [...map.entries()];
    var args = {weight: cart.length, country: country};
    soap.createClient(SOAP_URL, function (err: any, client: any) {
      if (err) {
        throw err;
      }
      client.calculatePrice(args, function (_: any, result: any) {
        setDelivery(result.frais);
      });
    });
  }, [cart, country]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={header.touchable}
          onPress={() => {
            if (cart.length > 0) {
              modalizeRef.current?.open();
            }
          }}>
          <Text style={header.text}>Buy</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, cart]);

  const deleteItem = (item: Item) => {
    let alreadyDelete = false;
    let newCart: Item[] = [];
    for (var i = 0; i < cart.length; ++i) {
      if (cart[i].name === item.name && alreadyDelete === false) {
        alreadyDelete = true;
      } else {
        newCart.push(cart[i]);
      }
    }
    setCart(newCart);
  };

  const addItem = (item: Item) => {
    setCart([...cart, item]);
  };

  const buyCart = async () => {
    setLoadPayement(true);
    const userId = await createUser();
    const res = await pay(userId);
    setLoadPayement(false);
    navigation.navigate('Payement', {res});
  };

  const createUser = async () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization:
          'Basic dXNtYnRlc3QxOnBZc2F0ZTI0Y1hkU3JIRDB4UFB3eUhMT0RXMm0xU3k5ZWVDWW4wamlVYW9ncmJtd0d3',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        FirstName: firstname,
        LastName: lastname,
        Birthday: 258443002,
        Nationality: country,
        CountryOfResidence: country,
        Email: email,
      }),
    };
    try {
      const fetchResponse = await fetch(
        'https://api.sandbox.mangopay.com/v2.01/' + clientID + '/users/natural',
        requestOptions,
      );
      const data = await fetchResponse.json();
      return data.Id;
    } catch (e) {
      return e;
    }
  };

  const pay = async (userId: number) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization:
          'Basic dXNtYnRlc3QxOnBZc2F0ZTI0Y1hkU3JIRDB4UFB3eUhMT0RXMm0xU3k5ZWVDWW4wamlVYW9ncmJtd0d3',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        AuthorId: userId,
        DebitedFunds: {
          Currency: 'EUR',
          Amount: delivery ? (+delivery + total) * 100 : total * 100,
        },
        Fees: {
          Currency: 'EUR',
          Amount: 0,
        },
        ReturnURL: 'https://info802-serveur-soap.herokuapp.com/payementSuccess',
        CardType: 'CB_VISA_MASTERCARD',
        CreditedWalletId: 104316783,
        Culture: 'FR',
      }),
    };
    try {
      const fetchResponse = await fetch(
        'https://api.sandbox.mangopay.com/v2.01/' +
          clientID +
          '/payins/card/web',
        requestOptions,
      );
      const data = await fetchResponse.json();
      return data;
    } catch (e) {
      return e;
    }
  };

  return (
    <View style={[styles.container, {marginTop: headerHeight}]}>
      {cart.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty</Text>
      ) : null}
      <ScrollView>
        {cartSorted.current.map((itemSort: any, index: number) => {
          return (
            <View key={index} style={styles.containerItem}>
              <Image
                source={{uri: itemSort[0].image}}
                style={styles.imageItem}
              />
              <View style={styles.itemDetailsContainer}>
                <Text style={styles.title}>{itemSort[0].name}</Text>
                <Text style={styles.price}>
                  ${itemSort[0].price * itemSort[1]}
                </Text>
                <View style={styles.minusPlus}>
                  <TouchableOpacity
                    onPress={() => {
                      deleteItem(itemSort[0]);
                    }}
                    style={[styles.buttonChange, styles.buttonChangeMinus]}>
                    <Text style={styles.buttonChangeTextMinus}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.numberItem}>{itemSort[1]}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      addItem(itemSort[0]);
                    }}
                    style={[styles.buttonChange, styles.buttonChangePlus]}>
                    <Text style={styles.buttonChangeTextPlus}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
      <Modalize
        closeAnimationConfig={{timing: {duration: 400}}}
        openAnimationConfig={{timing: {duration: 400}}}
        ref={modalizeRef}
        modalHeight={height - 100}
        onClosed={() => setCountry(options[0].value)}>
        <ScrollView style={stylesModalize.container}>
          <SwitchSelector
            options={options}
            initial={0}
            textColor={'#07080c'}
            selectedColor={'#fff'}
            buttonColor={'#07080c'}
            textStyle={stylesModalize.textSwitch}
            onPress={(value) => setCountry(value.toString())}
          />
          <View style={stylesModalize.containerInput}>
            <TextInput
              placeholder="Firstname"
              style={stylesModalize.input}
              value={firstname}
              onChangeText={(value) => {
                setFirstname(value);
              }}
            />
            <TextInput
              placeholder="Lastname"
              style={stylesModalize.input}
              value={lastname}
              onChangeText={(value) => {
                setLastname(value);
              }}
            />
            <TextInput
              placeholder="Mail"
              style={stylesModalize.input}
              value={email}
              onChangeText={(value) => {
                setEmail(value);
              }}
            />
            <TextInput
              placeholder="Address"
              style={stylesModalize.input}
              value={address}
              onChangeText={(value) => {
                setAdress(value);
              }}
            />
          </View>
          <View style={stylesModalize.textRow}>
            <Text style={stylesModalize.text}>Subtotal</Text>
            <Text style={stylesModalize.number}>${total}</Text>
          </View>
          <View style={stylesModalize.textRow}>
            <Text style={stylesModalize.text}>Delivery & handling</Text>
            {delivery === null ? (
              <ActivityIndicator size={'large'} color="#000" />
            ) : (
              <Text style={stylesModalize.number}>${delivery}</Text>
            )}
          </View>
          <View style={stylesModalize.priceSeparator} />
          <View style={stylesModalize.textRow}>
            <Text style={stylesModalize.text}>SubTotal</Text>
            <Text style={stylesModalize.number}>
              ${delivery ? +delivery + total : total}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => buyCart()}
            activeOpacity={1}
            style={stylesModalize.buttonCheckout}>
            {loadPayement ? (
              <ActivityIndicator size={'small'} color="#fff" />
            ) : (
              <Text style={stylesModalize.textCheckout}>Checkout</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </Modalize>
    </View>
  );
};

const stylesModalize = StyleSheet.create({
  container: {
    margin: 30,
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  text: {
    fontSize: 20,
    fontFamily: 'KeplerStdMedium',
    color: '#cbcbcb',
  },
  number: {
    fontSize: 20,
    fontFamily: 'KeplerStdBold',
    color: '#242526',
  },
  priceSeparator: {
    marginVertical: 10,
    width: width,
    height: 1,
    backgroundColor: '#d7d7d7',
  },
  buttonCheckout: {
    marginTop: 20,
    backgroundColor: '#07080c',
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 15,
  },
  textCheckout: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'KeplerStdRegular',
  },
  textSwitch: {
    fontFamily: 'KeplerStdRegular',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#07080c',
    paddingVertical: 0,
    marginVertical: 10,
  },
  containerInput: {
    marginVertical: 30,
  },
});

const header = StyleSheet.create({
  touchable: {
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    fontFamily: 'KeplerStdMedium',
    padding: 12,
    marginTop: 2,
  },
});

const styles = StyleSheet.create({
  emptyText: {
    fontFamily: 'KeplerStdLight',
    height: '100%',
    textAlignVertical: 'center',
    fontSize: 25,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerItem: {
    height: ITEM_CART_DIMENSION.height,
    marginHorizontal: ITEM_CART_DIMENSION.marginHorizontal,
    marginVertical: 10,
    flexDirection: 'row',
  },
  imageItem: {
    height: ITEM_CART_DIMENSION.height,
    width: (IMAGE_FLATLIST.width / IMAGE_FLATLIST.height) * width * 0.6,
  },
  itemDetailsContainer: {
    height: '80%',
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    marginLeft: 10,
  },
  title: {
    fontSize: 28,
    fontFamily: 'KeplerStdLight',
  },
  price: {
    fontSize: 28,
    fontFamily: 'KeplerStdSemibold',
  },
  minusPlus: {
    flexDirection: 'row',
  },
  buttonChange: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonChangeMinus: {
    backgroundColor: '#dcdcdc',
  },
  buttonChangePlus: {
    backgroundColor: '#151c26',
  },
  numberItem: {
    height: 25,
    fontWeight: 'bold',
    fontSize: 20,
    textAlignVertical: 'center',
    marginHorizontal: 19,
  },
  buttonChangeTextMinus: {
    color: 'grey',
  },
  buttonChangeTextPlus: {
    color: '#fff',
  },
});

export default CartScreen;
