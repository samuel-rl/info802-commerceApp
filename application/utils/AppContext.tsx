import React, {createContext, useState} from 'react';
import {Item} from './Type';

type CartContextType = {
  cart: Item[];
  setCart: (cart: Item[]) => void;
};

export const AppContext = createContext<CartContextType>({
  cart: [],
  setCart: () => {},
});

interface AppProviderTest {
  children: React.ReactNode;
}

const AppProvider = ({children}: AppProviderTest) => {
  const [cart, setCart] = useState<Item[]>([]);
  return (
    <AppContext.Provider value={{cart, setCart}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
