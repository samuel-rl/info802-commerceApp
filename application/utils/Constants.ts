import {Dimensions, StatusBar} from 'react-native';

const EXPLORE_BUTTON_SIZE = {
  size: 120,
  margin: 30,
};

const HOME_COLLECTION_DIMENSIONS = {
  title: {
    width: 0.35,
  },
  image: {
    width: 0.65,
  },
  marginTop: 20,
};

const IMAGE_FLATLIST = {
  width: 620,
  height: 930,
};

const COLLECTION_DETAILS_DIMENSIONS = {
  images: {
    height: 0.5,
  },
  details: {
    height: 0.35,
  },
  price: {
    height: 0.15,
  },
  marginTop: 10,
};

const ITEM_CART_DIMENSION = {
  height: 200,
  marginHorizontal: 20,
};

const LIST_COLLECTION_DIMENSION = {
  title: {
    width: 0.35,
  },
  image: {
    width: 0.65,
  },
  height: 0.5,
  margin: 30,
};

const SOAP_URL =
  'https://info802-serveur-soap.herokuapp.com/pricecalculator?wsdl';

const {PI} = Math;

const {height, width} = Dimensions.get('window');
const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 0;

const bottomNavBarHeight = Dimensions.get('screen').height - height;

const clientID = 'usmbtest1';
const apikey = 'pYsate24cXdSrHD0xPPwyHLODW2m1Sy9eeCYn0jiUaogrbmwGw';

export {
  EXPLORE_BUTTON_SIZE,
  HOME_COLLECTION_DIMENSIONS,
  PI,
  height,
  width,
  statusBarHeight,
  bottomNavBarHeight,
  IMAGE_FLATLIST,
  COLLECTION_DETAILS_DIMENSIONS,
  ITEM_CART_DIMENSION,
  clientID,
  apikey,
  SOAP_URL,
  LIST_COLLECTION_DIMENSION,
};
