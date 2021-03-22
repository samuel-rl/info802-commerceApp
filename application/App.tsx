import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AppProvider from './utils/AppContext';
import {NavigationContainer} from '@react-navigation/native';
import Home from './screens/Home';
import CollectionScreen from './screens/CollectionScreen';
import ApolloClientProvider from './utils/AppoloClient';
import HeaderButton from './components/HeaderButton';
import HeaderCart from './components/HeaderCart';
import {StatusBar} from 'react-native';
import HeaderBackButton from './components/HeaderBackButton';
import CartScreen from './screens/CartScreen';
import WebPayementScreen from './screens/WebPayementScreen';
import HeaderHomeButton from './components/HeaderHomeButton';
import AllCollectionScreen from './screens/AllCollectionScreen';
import NewArrivalsScreen from './screens/NewArrivalsScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <ApolloClientProvider>
      <AppProvider>
        <NavigationContainer>
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="dark-content"
          />
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              title: '',
              headerTransparent: true,
            }}>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerRight: () => <HeaderCart />,
                headerLeft: () => <HeaderButton />,
              }}
            />
            <Stack.Screen
              name="Collection"
              component={CollectionScreen}
              options={{
                headerRight: () => <HeaderCart />,
                headerLeft: () => <HeaderBackButton />,
              }}
            />
            <Stack.Screen
              name="Cart"
              component={CartScreen}
              options={{
                headerLeft: () => <HeaderBackButton />,
              }}
            />
            <Stack.Screen
              name="Payement"
              component={WebPayementScreen}
              options={{
                headerLeft: () => <HeaderHomeButton />,
              }}
            />
            <Stack.Screen
              name="AllCollection"
              component={AllCollectionScreen}
              options={{
                headerRight: () => <HeaderCart />,
                headerLeft: () => <HeaderBackButton />,
              }}
            />
            <Stack.Screen
              name="NewArrivals"
              component={NewArrivalsScreen}
              options={{
                headerRight: () => <HeaderCart />,
                headerLeft: () => <HeaderBackButton />,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AppProvider>
    </ApolloClientProvider>
  );
};

export default App;
