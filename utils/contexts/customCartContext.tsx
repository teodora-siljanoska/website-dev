/* eslint-disable @typescript-eslint/no-empty-function */
import { CustomVpsInterface } from '@pages/vps/types';
import { createContext } from 'react';

interface CustomCartContextData {
  customCartItems: CustomVpsInterface[];
  setCustomCartItems: (cartItems: CustomVpsInterface[]) => void;
}

const CustomCartContext = createContext<CustomCartContextData>({
  customCartItems: [],
  setCustomCartItems: () => {},
});

export default CustomCartContext;
