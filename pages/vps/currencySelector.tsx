import React, { useContext, useEffect } from 'react';
import { CurrencyContext } from '@utils/contexts/currencyContext';
import axios from 'axios';
import useSWR from 'swr';
export interface CurrencyData {
  attributes: { code: string; symbol: string; name: string };
}
interface EmptyDataInterface {
  data: CurrencyData[];
}
export interface CurrencyRequest {
  currencies: EmptyDataInterface;
}
const CurrencySelector = () => {
  const {
    selectedCurrency,
    currencySymbol,
    setSelectedCurrency,
    setCurrencySymbol,
  } = useContext(CurrencyContext);
  const {
    data: currenciesData,
    error: currenciesDataError,
    isLoading,
  } = useSWR('currencies', async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_URI}/api/currencies`
    );

    return response.data.data;
  });

  const onChangeHandler = (selected: string) => {
    //console.log('selecetd', selected);

    setSelectedCurrency(selected);
    localStorage.setItem('SELECTED_CURRENCY', selected);
    localStorage.setItem('SELECTED_CUSTOM', 'true');
  };

  useEffect(() => {
    const findSymbol = currenciesData?.find(
      (item: CurrencyData) => item.attributes.code === selectedCurrency
    );
    setCurrencySymbol(findSymbol?.attributes?.symbol ?? '');
  }, [selectedCurrency, currenciesData, setCurrencySymbol]);
  //console.log("selectedCurrency",selectedCurrency);

  return (
    <>
      <div>
        {isLoading && <div className="text-center text-purple">loading...</div>}
        {currenciesData && (
          <div className="flex justify-end">
            <select
              className="flex rounded-lg border-8 border-white bg-white px-5 pt-[2px] font-['Mont-regular'] w-full"
              value={selectedCurrency}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                onChangeHandler(event.target.value)
              }
              style={{ appearance: 'none', textIndent: '0px' }}
            >
              {currenciesData?.map((currency: CurrencyData) => (
                <option
                  className="w-fit"
                  value={currency.attributes.code}
                  key={currency.attributes.code}
                >
                  {currency.attributes.symbol} {currency.attributes.code}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </>
  );
};

export default CurrencySelector;
