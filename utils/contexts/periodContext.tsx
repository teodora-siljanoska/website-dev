/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';
interface PeriodContextData {
  period: string;
  setPeriod: (setPeriod: string) => void;
}

const PeriodContext = createContext<PeriodContextData>({
  period: '',
  setPeriod: () => {},
});

export default PeriodContext;
