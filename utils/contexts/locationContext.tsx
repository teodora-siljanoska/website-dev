/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';

interface LocationContextData {
  selectedLocation: string;
  skuLocation: string;
  setSelectedLocation: (selectedLocation: string) => void;
  setSkuLocation: (skuLocation: string) => void;
}
export const LocationContext = createContext<LocationContextData>({
  selectedLocation: '',
  setSelectedLocation: () => {},
  skuLocation: '',
  setSkuLocation: () => {},
});
