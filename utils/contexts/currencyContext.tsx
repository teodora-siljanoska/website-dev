/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';

interface CurrencyContextData {
  selectedCurrency: string;
  currencySymbol: string;
  setSelectedCurrency: (selectedCurrency: string) => void;
  setCurrencySymbol: (currencySymbol: string) => void;
}
export const CurrencyContext = createContext<CurrencyContextData>({
  selectedCurrency: '',
  currencySymbol: '',
  setSelectedCurrency: () => {},
  setCurrencySymbol: () => {},
});
