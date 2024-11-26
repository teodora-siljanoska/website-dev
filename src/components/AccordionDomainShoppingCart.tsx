import React from 'react';
import { DomainFinalInterface } from '@blocks/DomainsNameBlock/testingModal';

export interface AccordionShoppingItemProps {
  product: DomainFinalInterface;
}

function AccordionDomainShoppingCart({
  product,
}: AccordionShoppingItemProps): JSX.Element {
  function getCurrencySymbol(currency: string) {
    type CurrencySymbols = {
      [key: string]: string;
    };
    const currencySymbols: CurrencySymbols = {
      USD: '$',
      EUR: '€',
      GBP: '£',
    };

    return currencySymbols[currency] || '';
  }
  return (
    <div className="lg:ml-2 w-full">
      <div className="mb-[5px] py-[10px]">
        <div className="">
          <h3 className="font-['Mont-regular'] text-[14px] text-darkGrey lg:text-[18px]">
            <div className="flex w-full">
              <div className="basis-5/12  lg:basis-7/12">
                {product.domain.domainName}
              </div>
              <div className="basis-3/12 lg:basis-2/12">
                {getCurrencySymbol(product.domain.domainSelectedCurrency)}{' '}
                {product.domain.domainPrice.toFixed(2)}
              </div>
              <div className="basis-3/12 lg:basis-2/12">Yearly</div>
              <div className="basis-1/12"> </div>
            </div>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default AccordionDomainShoppingCart;
