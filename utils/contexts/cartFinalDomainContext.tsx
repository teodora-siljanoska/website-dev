/* eslint-disable @typescript-eslint/no-empty-function */
import { DomainInterface } from '@blocks/DomainsNameBlock/DomainsNameBlock';
import { DomainFinalInterface } from '@blocks/DomainsNameBlock/testingModal';
import { createContext } from 'react';
interface CartDomainFinalContextData {
  domainFinalCart: DomainFinalInterface[];
  setDomainFinalCartItems: (domainFinalCart: DomainFinalInterface[]) => void;
}

const CartDomainFinalContext = createContext<CartDomainFinalContextData>({
  domainFinalCart: [],
  setDomainFinalCartItems: () => {},
});

export default CartDomainFinalContext;
