import React, { useCallback } from 'react';
import { useEffect } from 'react';
import { CustomVpsInterface } from '@pages/vps/types';
import { LOCATIONS_QUERY } from '@utils/queries';
import { LocationRequest } from '@pages/vps/locationSelector';
import { useLazyQuery } from '@apollo/client';
import ReactMarkdown from 'react-markdown';

export interface AccordionShoppingItemProps {
  product: CustomVpsInterface;
  index: number;
}

function AccordionShoppingCart({
  product,
  index,
}: AccordionShoppingItemProps): JSX.Element {
  const [loadLocation, { loading: locationLoading, data: locationData }] =
    useLazyQuery<LocationRequest>(LOCATIONS_QUERY);
  const getLocation = useCallback(async () => {
    await loadLocation({
      variables: {},
      context: {
        token: process.env.NEXT_PUBLIC_STRAPI_API_KEY
          ? `Bearer ${String(process.env.NEXT_PUBLIC_STRAPI_API_KEY)}`
          : '',
      },
    });
  }, [loadLocation]);

  useEffect(() => {
    void getLocation();
  }, [getLocation]);
  type CurrencySymbols = {
    [key: string]: string;
  };
  function getCurrencySymbol(currency: string) {
    const currencySymbols: CurrencySymbols = {
      USD: '$',
      EUR: '€',
      GBP: '£',
    };

    return currencySymbols[currency] || '';
  }
  const customNumAddonOrder: any = { vcpu: 1, ram: 2, disk: 3 };

  product.numericalAddons.sort(
    (a, b) => customNumAddonOrder[a.sku] - customNumAddonOrder[b.sku]
  );

  const groupOrder = [
    'server-licensing',
    'server-upgrades',
    'website-security',
    'email-security',
    'invisible-data',
    'ls-backup',
  ];

  product.addons.sort((a, b) => {
    const groupIndexA = groupOrder.indexOf(a.group ?? '');
    const groupIndexB = groupOrder.indexOf(b.group ?? '');

    if (groupIndexA !== groupIndexB) {
      return groupIndexA - groupIndexB;
    }

    return a.title.localeCompare(b.title);
  });

  const foundLocation = locationData?.locations.data.find((item) =>
    product.vmPlan?.sku?.includes(item.attributes.sku)
  );
  const location = foundLocation ? foundLocation.attributes : null;

  return (
    <div className="w-full py-[10px]">
      <div className="flex justify-items-center">
        <div className="w-full font-['Mont-regular'] text-[14px] text-darkGrey lg:text-[18px]">
          <div
            className={` ${
              index % 2 === 0 ? 'bg-[#f9f9f9]' : 'bg-white'
            } flex w-full flex-row text-left`}
          >
            <div className="basis-5/12 pl-[4px] lg:basis-7/12">
              {product.vmPlan?.title}
            </div>
            <div className="basis-3/12 lg:basis-2/12">
              {getCurrencySymbol(product.selectedCurrency)}{' '}
              {product.totalPrice?.toFixed(2)}
            </div>
            <div className="basis-3/12 lg:basis-2/12">{product.timePeriod}</div>
            <div className="basis-1/12"></div>
          </div>
        </div>
      </div>
      <div className="pt-5 text-[11px] font-['Mont-light'] text-darkGrey lg:text-[16px]">
        <div className="ml-[4px] lg:ml-2">
          <div className="w-[90%] border-t-[1px] border-[#C1C1C1] "></div>
          <div className="pt-2 pb-10 duration-1000 font-['Mont-regular']">
            {product.vmPlan?.domain && <div>{product.vmPlan?.domain}</div>}
            {product.vmPlan && location && (
              <div className="flex">
                <div className="basis-5/12">Region: {location.description}</div>
                <div className="basis-2/12"></div>
                <div className="basis-2/12"></div>
                <div className="basis-2/12"></div>

                <div className="basis-1/12"></div>
              </div>
            )}
            {product.numericalAddons?.map((item, index) => (
              <div key={index} className="flex">
                <div className="basis-5/12">
                  {item.title} {item.amountSelected}
                </div>
                {product.timePeriod === 'Monthly' && (
                  <div className="basis-2/12">
                    {/* {getCurrencySymbol(product.selectedCurrency)}{' '}
                        {item.monthlyPrice.toFixed(2)} */}
                  </div>
                )}
                {product.timePeriod === 'Yearly' && (
                  <div className="basis-2/12">
                    {/* {getCurrencySymbol(product.selectedCurrency)}{' '}
                        {item.yearlyPrice.toFixed(2)} */}
                  </div>
                )}
                <div className="basis-2/12"></div>

                <div className="basis-3/12"></div>
              </div>
            ))}
            {product.addons?.map((item, index) => (
              <div key={index} className="flex">
                <div className="basis-5/12">
                  <div>{item.title}</div>
                  <ul className="pl-2 prose-ul:ml-5 prose-ul:list-disc">
                    {item.description && (
                      <li className="">
                        <ReactMarkdown>{`${
                          item.description.startsWith('-') ? '' : '- '
                        }${item.description}`}</ReactMarkdown>
                      </li>
                    )}
                  </ul>
                </div>
                {product.timePeriod === 'Monthly' && (
                  <div className="basis-2/12"></div>
                )}
                {product.timePeriod === 'Yearly' && (
                  <div className="basis-2/12"></div>
                )}
                <div className="basis-3/12"></div>

                <div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccordionShoppingCart;
