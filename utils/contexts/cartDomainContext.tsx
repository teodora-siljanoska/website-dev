/* eslint-disable @typescript-eslint/no-empty-function */
import { DomainInterface } from '@blocks/DomainsNameBlock/DomainsNameBlock';
import { createContext } from 'react';
interface CartDomainContextData {
  domainCart: DomainInterface[];
  setDomainCartItems: (domainCart: DomainInterface[]) => void;
}

const CartDomainContext = createContext<CartDomainContextData>({
  domainCart: [],
  setDomainCartItems: () => {},
});

export default CartDomainContext;
