/* eslint-disable @typescript-eslint/no-empty-function */
import { CustomVpsInterface } from '@pages/vps/types';
import { createContext } from 'react';
interface CartContextData {
  cartItems: CustomVpsInterface[];
  setCartItems: (cartItems: CustomVpsInterface[]) => void;
}

const CartContext = createContext<CartContextData>({
  cartItems: [],
  setCartItems: () => {},
});

export default CartContext;
