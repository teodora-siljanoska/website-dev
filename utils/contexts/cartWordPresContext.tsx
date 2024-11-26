/* eslint-disable @typescript-eslint/no-empty-function */
import { CustomWordInterface } from '@pages/vps/types';
import { createContext } from 'react';
interface CartWordPresContextData {
  cartWordPresItems: CustomWordInterface[];
  setCartWordPresItems: (cartWordPresItems: CustomWordInterface[]) => void;
}

const CartWordPresContext = createContext<CartWordPresContextData>({
  cartWordPresItems: [],
  setCartWordPresItems: () => {},
});

export default CartWordPresContext;
