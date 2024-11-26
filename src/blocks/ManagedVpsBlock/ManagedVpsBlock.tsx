import { ComponentPageBlocksManagedVps, LocationEntity } from '@utils/types';
import React, { useContext, useEffect, useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import check from './assets/check.svg';
import cros from './assets/cros.svg';
import StandardFeaturesCheckList from '@components/StandardFeaturesCheckList';
import { CurrencyContext } from '@utils/contexts/currencyContext';
import { LocationContext } from '@utils/contexts/locationContext';
import {
  CustomVpsAddonInterface,
  CustomVpsInterface,
  CustomVpsNumericalAddonInterface,
  ProductPriceInterface,
  VmPlanInterface,
  EditVpsInterface,
} from '@pages/vps/types';
import AddToCartPopUp from '@components/AddToCartPopUp';
import EditVPSContext from '@utils/contexts/editVPSContext';
import PeriodContext from '@utils/contexts/periodContext';
import axios from 'axios';
import useSWR from 'swr';
import Button from '@components/Button';

function ManagedVpsBlock({
  vpsCheck,
  vpsFirstCard,
  vpsSecondCard,
  vpsThirdCard,
  defaultBox,
}: ComponentPageBlocksManagedVps): JSX.Element {
  const { selectedCurrency, currencySymbol } = useContext(CurrencyContext);
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const toggleSwitch = () => {
    setIsChecked(!isChecked);
  };

  const { editVPSItems, setEditVPSItems } = useContext(EditVPSContext);
  const { period, setPeriod } = useContext(PeriodContext);

  const { selectedLocation, setSelectedLocation, skuLocation, setSkuLocation } =
    useContext(LocationContext);
  const { data: locationsData, error: locationsDataError } = useSWR(
    'locations',
    async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URI}/api/locations`
      );

      return response.data.data;
    }
  );

  useEffect(() => {
    const findSku = locationsData?.find(
      (item: LocationEntity) => item.attributes?.name === selectedLocation
    );
    setSkuLocation(findSku?.attributes.sku ?? '');
  }, [selectedLocation, locationsData, setSkuLocation]);

  function calculateVpsCardPrice(
    vpsCard: any,
    selectedCurrency: string,
    period: string
  ) {
    let totalItems = 0;
    let total = 0;

    vpsCard?.vps_products?.data?.forEach((item: any) => {
      item.attributes?.productPrices?.data?.forEach((itemPrice: any) => {
        if (
          itemPrice.attributes?.currency === selectedCurrency &&
          itemPrice.attributes.period === period
        ) {
          if (
            item.attributes.productType === 'plan' &&
            item.attributes.sku.includes(skuLocation)
          ) {
            const price = itemPrice?.attributes?.price || 0;
            totalItems += price;
          } else {
            const sku = itemPrice.attributes.sku;
            let liteDataMultiplier = 1;
            if (sku.includes('ram')) {
              liteDataMultiplier = vpsCard.numberOfRam;
            } else if (sku.includes('vcpu')) {
              liteDataMultiplier = vpsCard.numberOfCpu;
            } else if (sku.includes('disk')) {
              liteDataMultiplier = vpsCard.numberOfStorage;
            }

            if (
              liteDataMultiplier &&
              itemPrice.attributes.tiers &&
              !itemPrice.attributes.price
            ) {
              if (
                itemPrice.attributes.tiers[0]?.ending_unit &&
                liteDataMultiplier > itemPrice.attributes.tiers[0].ending_unit
              ) {
                total +=
                  itemPrice.attributes.tiers[0].price *
                  itemPrice.attributes.tiers[0].ending_unit +
                  itemPrice.attributes.tiers[1].price *
                  (liteDataMultiplier -
                    itemPrice.attributes.tiers[0].ending_unit);
              } else if (
                itemPrice.attributes.tiers[0]?.ending_unit &&
                liteDataMultiplier <= itemPrice.attributes.tiers[0].ending_unit
              ) {
                total +=
                  itemPrice.attributes.tiers[0].price * liteDataMultiplier;
              }
            } else if (
              itemPrice.attributes.price &&
              item.attributes.productType === 'addon'
            ) {
              total += itemPrice.attributes.price;
            }
          }
        }
      });
    });

    return total + totalItems;
  }

  const firstCardMonthlyPrice = calculateVpsCardPrice(
    vpsFirstCard,
    selectedCurrency,
    'month'
  );

  const firstCardYearlyPrice = calculateVpsCardPrice(
    vpsFirstCard,
    selectedCurrency,
    'year'
  );

  const secondCardMonthlyPrice = calculateVpsCardPrice(
    vpsSecondCard,
    selectedCurrency,
    'month'
  );

  const secondCardYearlyPrice = calculateVpsCardPrice(
    vpsSecondCard,
    selectedCurrency,
    'year'
  );

  const thirdCardMonthlyPrice = calculateVpsCardPrice(
    vpsThirdCard,
    selectedCurrency,
    'month'
  );

  const thirdCardYearlyPrice = calculateVpsCardPrice(
    vpsThirdCard,
    selectedCurrency,
    'year'
  );

  const getPricesNumAddon = (
    selection: ProductPriceInterface,
    selectedAmount: number | undefined
  ) => {
    const selected = selection;
    if (
      selectedAmount &&
      selected?.attributes.tiers &&
      selected.attributes.tiers[0]?.ending_unit &&
      selectedAmount > selected.attributes.tiers[0].ending_unit
    ) {
      return (
        selected.attributes.tiers[0].price *
        selected.attributes.tiers[0].ending_unit +
        selected.attributes.tiers[1].price *
        (selectedAmount - selected.attributes.tiers[0].ending_unit)
      );
    } else if (
      selectedAmount &&
      selected?.attributes.tiers &&
      selected.attributes.tiers[0]?.ending_unit &&
      selectedAmount <= selected.attributes.tiers[0].ending_unit
    ) {
      return selected.attributes.tiers[0].price * selectedAmount;
    }
  };

  function createVPSProduct(
    card: any,
    period: 'Monthly' | 'Yearly',
    totalPrice: number
  ): CustomVpsInterface {
    let vm: VmPlanInterface | undefined;
    const addons: CustomVpsAddonInterface[] = [];
    const numAddons: CustomVpsNumericalAddonInterface[] = [];

    {
      const productsData = card.vps_products
        ? card.vps_products.data
        : card.productsDefault.data;

      productsData.map((item: any) => {
        if (
          item.attributes.productType === 'plan' &&
          item.attributes.sku.includes(skuLocation)
        ) {
          const monthly = item?.attributes.productPrices.data.find(
            (price: any) =>
              price.attributes.sku.includes('Monthly') &&
              price.attributes.currency === selectedCurrency
          );
          const yearly = item?.attributes.productPrices.data.find(
            (price: any) =>
              price.attributes.sku.includes('Yearly') &&
              price.attributes.currency === selectedCurrency
          );
          vm = {
            sku: item.attributes?.sku,
            title: item?.attributes.title,
            skuMonthly: monthly?.attributes.sku,
            skuYearly: yearly?.attributes.sku,
            monthlyPrice: monthly?.attributes.price,
            yearlyPrice: yearly?.attributes.price,
          };
        } else if (item.attributes.productType === 'addon') {
          const monthly = item?.attributes.productPrices.data.find(
            (price: any) =>
              price.attributes.sku.includes('Monthly') &&
              price.attributes.currency === selectedCurrency
          );
          const yearly = item?.attributes.productPrices.data.find(
            (price: any) =>
              price.attributes.sku.includes('Yearly') &&
              price.attributes.currency === selectedCurrency
          );
          if (
            !item.attributes.sku.includes('disk') &&
            !item.attributes.sku.includes('ram') &&
            !item.attributes.sku.includes('vcpu')
          ) {
            addons.push({
              sku: item.attributes.sku,
              title: item?.attributes.title || '',
              description: item.attributes.description || '',
              selectedCurrency: selectedCurrency,
              skuMonthly: monthly?.attributes.sku || '',
              skuYearly: yearly?.attributes.sku || '',
              monthlyPrice: monthly?.attributes.price || 0,
              yearlyPrice: yearly?.attributes.price || 0,
              group: item.attributes.metadata.group,
            });
          } else {
            const monthlyPrice = getPricesNumAddon(
              {
                attributes: {
                  currency: selectedCurrency,
                  sku: monthly?.attributes.sku || '',
                  tiers: monthly?.attributes.tiers,
                  price: monthly?.attributes.price || 0,
                },
              },
              item.attributes.sku.includes('disk')
                ? card.numberOfStorage ?? card.numberOfStorageDefault
                : item.attributes.sku.includes('ram')
                  ? card.numberOfRam ?? card.numberOfRamDefault
                  : item.attributes.sku.includes('vcpu')
                    ? card.numberOfCpu ?? card.numberOfCpuDefaul
                    : ''
            );

            const yearlyPrice = getPricesNumAddon(
              {
                attributes: {
                  currency: selectedCurrency,
                  sku: yearly?.attributes.sku || '',
                  tiers: yearly?.attributes.tiers,
                  price: yearly?.attributes.price || 0,
                },
              },
              item.attributes.sku.includes('disk')
                ? card.numberOfStorage ?? card.numberOfStorageDefault
                : item.attributes.sku.includes('ram')
                  ? card.numberOfRam ?? card.numberOfRamDefault
                  : item.attributes.sku.includes('vcpu')
                    ? card.numberOfCpu ?? card.numberOfCpuDefaul
                    : ''
            );

            numAddons.push({
              sku: item.attributes.sku,
              skuMonthly: monthly?.attributes.sku || '',
              skuYearly: yearly?.attributes.sku || '',
              title: item?.attributes.title || '',
              monthlyPrice: monthlyPrice || 0,
              yearlyPrice: yearlyPrice || 0,
              selectedCurrency: yearly?.attributes.currency || selectedCurrency,
              amountSelected: item.attributes.sku.includes('disk')
                ? card.numberOfStorage ?? card.numberOfStorageDefault
                : item.attributes.sku.includes('ram')
                  ? card.numberOfRam ?? card.numberOfRamDefault
                  : item.attributes.sku.includes('vcpu')
                    ? card.numberOfCpu ?? card.numberOfCpuDefaul
                    : '',
              increment: item?.attributes.metadata?.increment || 0,
              max: item?.attributes.metadata?.max || 0,
              min: item?.attributes.metadata?.min || 0,
            });
          }
        }
      });
    }

    return {
      timePeriod: period,
      totalPrice: totalPrice,
      selectedCurrency: selectedCurrency,
      vmPlan: vm,
      addons: addons,
      numericalAddons: numAddons,
    };
  }

  const onClickEditItem = (
    editVPS: CustomVpsInterface,
    selectedPeriod: string
  ) => {
    const addonsEdit: EditVpsInterface[] = [];
    const numAddonsEdit: EditVpsInterface[] = [];

    editVPS.addons.map((item) => {
      addonsEdit.push({ groupSelection: item.sku });
    });
    editVPS.numericalAddons.map((item) => {
      numAddonsEdit.push({
        groupSelection: item.sku,
        amount: item.amountSelected,
      });
    });

    if (editVPS.vmPlan?.title?.includes('Manchester')) {
      setSelectedLocation('Manchester');
      localStorage.setItem('SELECTED_LOCATION', 'Manchester');
    } else if (editVPS.vmPlan?.title?.includes('Chicago')) {
      setSelectedLocation('Chicago');
      localStorage.setItem('SELECTED_LOCATION', 'Chicago');
    } else if (editVPS.vmPlan?.title?.includes('Singapore')) {
      setSelectedLocation('Singapore');
      localStorage.setItem('SELECTED_LOCATION', 'Singapore');
    }
    setEditVPSItems([...addonsEdit, ...numAddonsEdit]);
    localStorage.setItem(
      'SELECTED_EDIT_ITEMS',
      JSON.stringify([...addonsEdit, ...numAddonsEdit])
    );
    setPeriod(selectedPeriod);
    localStorage.setItem('SELECTED_PERIOD', selectedPeriod);
  };
  function findPricePerLocationAndCurrency(object: any) {
    const newObj = object?.find(
      (item: any) => item?.location.data.attributes.sku === skuLocation
    );
    const filteredPrice = newObj?.pricePerCurrency.find(
      (item: any) => item.currency.data.attributes.code === selectedCurrency
    );

    return (filteredPrice?.pricePC ?? 0).toFixed(2);
  }
  return (
    <div className="container mx-auto smallest:w-[90%]">
      <div className="flex justify-center gap-5 py-5 font-['Mont-book'] text-lg text-darkGrey">
        <div>Monthly</div>
        <div
          className={`toggle-switch ${isChecked ? 'on' : 'off'}`}
          onClick={toggleSwitch}
        >
          <div className={`${isChecked && 'on' ? 'slider1' : 'slider'}`}></div>
        </div>
        <div>Annual</div>
      </div>

      <div className=" flex  flex-col gap-[46px] rounded-t-[10px] bg-liliac/10 px-[30px] py-[68px]">
        {vpsCheck && (
          <div className="m-auto grid gap-y-[40px] gap-x-[20px] px-0 md:grid-cols-3 lg:w-[80%] lg:gap-x-[84px] lg:px-5	">
            {vpsCheck?.map((item, index) => (
              <span key={index}>
                <StandardFeaturesCheckList
                  plansTitle={item?.plansTitle ?? ''}
                  checking={item?.checking ?? 'check'}
                />
              </span>
            ))}
          </div>
        )}
        <div className="flex flex-wrap justify-center gap-[30px] self-center">
          <div>
            <div>
              <div className="flex !h-full xs:w-[19rem] w-[16rem] flex-col justify-between rounded-t-2xl bg-white px-9 py-7 shadow-custom">
                <div>
                  <p className="mb-[5px] text-center font-['Mont-bold'] text-2xl text-darkGrey">
                    {vpsFirstCard?.titleVpsBox ?? 'Lite'}
                  </p>
                  <div className="flex justify-center text-center">
                    <div className="font-['Mont-bold'] text-[38px] leading-[40px] text-darkTeal">
                      {currencySymbol}
                      {!isChecked
                        ? firstCardMonthlyPrice?.toFixed(2)
                        : firstCardYearlyPrice?.toFixed(2)}
                    </div>
                    <div className="self-end font-['Mont-regular'] text-[14px] text-darkGrey/70">
                      {!isChecked ? '/month' : '/year'}
                    </div>
                  </div>
                  <div className="mt-[9px]  mb-6 text-center font-['Mont-light'] text-base text-darkGrey">
                    <ReactMarkdown>
                      {vpsFirstCard?.descriptionVpsBox ?? ''}
                    </ReactMarkdown>
                  </div>
                </div>
                <div className="mb-5 min-h-[100px]">
                  <div className="h-full font-['Mont-regular'] text-sm prose-strong:font-['Mont-semibold'] prose-li:flex prose-li:gap-[4px] prose-li:text-darkGrey prose-img:h-[13px] prose-img:w-[13px]">
                    <ReactMarkdown>
                      {vpsFirstCard?.performancesVpsBox?.replace(
                        /(\+|-) /g,
                        (match, sign) => {
                          const imageSrc = sign === '+' ? check.src : cros.src;
                          return `${sign} ![](${imageSrc}) `;
                        }
                      ) ?? ''}
                    </ReactMarkdown>
                  </div>
                </div>
                <div className="flex justify-center pt-3">
                  <div>
                    <button
                      className="font-['Mont-semibold'] rounded-full border-2 border-purple bg-purple px-[35px]  py-[12px] text-base  text-white transition  duration-500 hover:border-2 hover:border-purple hover:bg-transparent hover:text-purple lg:px-[66px] lg:py-[13px]"
                      onClick={() => {
                        onClickEditItem(
                          createVPSProduct(
                            vpsFirstCard,
                            !isChecked ? 'Monthly' : 'Yearly',
                            !isChecked
                              ? firstCardMonthlyPrice
                              : firstCardYearlyPrice
                          ),
                          !isChecked ? 'Monthly' : 'Yearly'
                        );
                        window.location.href = '/vps';
                      }}
                    >
                      Customise
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex justify-between rounded-b-2xl bg-darkTeal/10 py-[10px] px-5">
                <div className="whitespace-pre-line font-['Mont-regular'] text-darkGrey prose-strong:font-['Mont-bold'] prose-strong:text-darkTeal">
                  <ReactMarkdown>
                    {vpsFirstCard?.saveTextVps ?? ''}
                  </ReactMarkdown>
                </div>
                <div className="text-right">
                  <div className="text-sm text-[#696969] line-through">
                    {currencySymbol}
                    {(12 * (firstCardMonthlyPrice)).toFixed(2)}
                  </div>
                  <div className='font-["Mont-bold"] text-[22px] text-pink'>
                    {currencySymbol}
                    {firstCardYearlyPrice?.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div className="flex !h-full  xs:w-[19rem] w-[16rem] flex-col justify-between rounded-t-2xl bg-white px-9 py-7 shadow-custom">
                <div>
                  <p className="mb-[5px] text-center font-['Mont-bold'] text-2xl text-darkGrey">
                    {vpsSecondCard?.titleVpsBox ?? 'Startup'}
                  </p>
                  <div className="flex justify-center text-center">
                    <div className="font-['Mont-bold'] text-[38px] leading-[40px] text-darkTeal">
                      {currencySymbol}
                      {!isChecked
                        ? secondCardMonthlyPrice?.toFixed(2)
                        : secondCardYearlyPrice?.toFixed(2)}
                    </div>
                    <div className="self-end font-['Mont-regular'] text-[14px] text-darkGrey/70">
                      {!isChecked ? '/month' : '/year'}
                    </div>
                  </div>
                  <div className="mt-[9px]  mb-6 text-center font-['Mont-light'] text-base text-darkGrey">
                    <ReactMarkdown>
                      {vpsSecondCard?.descriptionVpsBox ?? ''}
                    </ReactMarkdown>
                  </div>
                </div>
                <div className="mb-5 min-h-[100px]">
                  <div className="font-['Mont-regular'] text-sm prose-strong:font-['Mont-semibold'] prose-li:flex prose-li:gap-[4px] prose-li:text-darkGrey prose-img:h-[13px] prose-img:w-[13px]">
                    <ReactMarkdown>
                      {vpsSecondCard?.performancesVpsBox?.replace(
                        /(\+|-) /g,
                        (match, sign) => {
                          const imageSrc = sign === '+' ? check.src : cros.src;
                          return `${sign} ![](${imageSrc}) `;
                        }
                      ) ?? ''}
                    </ReactMarkdown>
                  </div>
                </div>
                <div className="flex justify-center pt-3">
                  <div>
                    <button
                      className="font-['Mont-semibold'] rounded-full border-2 border-purple bg-purple px-[35px]  py-[12px] text-base  text-white transition  duration-500 hover:border-2 hover:border-purple hover:bg-transparent hover:text-purple lg:px-[66px] lg:py-[13px]"
                      onClick={() => {
                        onClickEditItem(
                          createVPSProduct(
                            vpsSecondCard,
                            !isChecked ? 'Monthly' : 'Yearly',
                            !isChecked
                              ? secondCardMonthlyPrice
                              : secondCardYearlyPrice
                          ),
                          !isChecked ? 'Monthly' : 'Yearly'
                        );
                        window.location.href = '/vps';
                      }}
                    >
                      Customise
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between rounded-b-2xl bg-darkTeal/10 py-[10px] px-5">
              <div className="whitespace-pre-line font-['Mont-regular'] text-darkGrey prose-strong:font-['Mont-bold'] prose-strong:text-darkTeal">
                <ReactMarkdown>
                  {vpsSecondCard?.saveTextVps ?? ''}
                </ReactMarkdown>
              </div>
              <div className="text-right">
                <div className="text-sm text-[#696969] line-through">
                  {currencySymbol}
                  {(12 * (secondCardMonthlyPrice)).toFixed(2)}
                </div>
                <div className='font-["Mont-bold"] text-[22px] text-pink'>
                  {currencySymbol}
                  {secondCardYearlyPrice?.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div className="flex !h-full  xs:w-[19rem] w-[16rem] flex-col justify-between rounded-t-2xl bg-white px-9 py-7 shadow-custom">
                <div>
                  <p className="mb-[5px] text-center font-['Mont-bold'] text-2xl text-darkGrey">
                    {vpsThirdCard?.titleVpsBox ?? 'Grow'}
                  </p>
                  <div className="flex justify-center text-center">
                    <div className="font-['Mont-bold'] text-[38px] leading-[40px] text-darkTeal">
                      {currencySymbol}
                      {!isChecked
                        ? thirdCardMonthlyPrice?.toFixed(2)
                        : thirdCardYearlyPrice?.toFixed(2)}
                    </div>
                    <div className="self-end font-['Mont-regular'] text-[14px] text-darkGrey/70">
                      {!isChecked ? '/month' : '/year'}
                    </div>
                  </div>
                  <div className="mt-[9px]  mb-6 text-center font-['Mont-light'] text-base text-darkGrey">
                    <ReactMarkdown>
                      {vpsThirdCard?.descriptionVpsBox ?? ''}
                    </ReactMarkdown>
                  </div>
                </div>
                <div className="mb-5 min-h-[100px]">
                  <div className="font-['Mont-regular'] text-sm prose-strong:font-['Mont-semibold'] prose-li:flex prose-li:gap-[4px] prose-li:text-darkGrey prose-img:h-[13px] prose-img:w-[13px]">
                    <ReactMarkdown>
                      {vpsThirdCard?.performancesVpsBox?.replace(
                        /(\+|-) /g,
                        (match, sign) => {
                          const imageSrc = sign === '+' ? check.src : cros.src;
                          return `${sign} ![](${imageSrc}) `;
                        }
                      ) ?? ''}
                    </ReactMarkdown>
                  </div>
                </div>
                <div className="flex justify-center pt-3">
                  <div>
                    <button
                      className="font-['Mont-semibold'] rounded-full border-2 border-purple bg-purple px-[35px]  py-[12px] text-base  text-white transition  duration-500 hover:border-2 hover:border-purple hover:bg-transparent hover:text-purple lg:px-[66px] lg:py-[13px]"
                      onClick={() => {
                        onClickEditItem(
                          createVPSProduct(
                            vpsThirdCard,
                            !isChecked ? 'Monthly' : 'Yearly',
                            !isChecked
                              ? thirdCardMonthlyPrice
                              : thirdCardYearlyPrice
                          ),
                          !isChecked ? 'Monthly' : 'Yearly'
                        );
                        window.location.href = '/vps';
                      }}
                    >
                      Customise
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between rounded-b-2xl bg-darkTeal/10 py-[10px] px-5">
              <div className="whitespace-pre-line font-['Mont-regular'] text-darkGrey prose-strong:font-['Mont-bold'] prose-strong:text-darkTeal">
                <ReactMarkdown>{vpsThirdCard?.saveTextVps ?? ''}</ReactMarkdown>
              </div>
              <div className="text-right">
                <div className="text-sm text-[#696969] line-through">
                  {currencySymbol}
                  {(12 * (thirdCardMonthlyPrice)).toFixed(2)}
                </div>
                <div className='font-["Mont-bold"] text-[22px] text-pink'>
                  {currencySymbol}
                  {thirdCardYearlyPrice?.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>
        {isSubmitted && <AddToCartPopUp />}
      </div>
      <div className="w-full rounded-b-2xl bg-purple ">
        <div className="t mx-auto box-border flex w-[90%] flex-col  items-center justify-between py-[30px] text-white md:flex-row md:items-center">
          <div>
            <p className='font-["Mont-bold"] text-[24px]'>
              {defaultBox?.titleBox}
            </p>
            <p className='mb-[20px] font-["Mont-regular"] text-[24px]'>
              {defaultBox?.subtitleBox}
            </p>
            <div className='font-["Mont-book"] text-[18px]'>
              <ReactMarkdown>{defaultBox?.descriptionBox ?? ''}</ReactMarkdown>
            </div>
          </div>
          <div className="my-3">
            <button
              className=" font-['Mont-semibold'] justify-center whitespace-nowrap rounded-full border-2 border-darkTeal  bg-darkTeal  px-[42px] py-[12px] text-base  text-white transition		 duration-500 hover:border-2   hover:border-lightTeal hover:bg-lightTeal hover:text-white lg:text-lg"
              onClick={() => {
                onClickEditItem(
                  createVPSProduct(
                    defaultBox,
                    !isChecked ? 'Monthly' : 'Yearly',
                    !isChecked ? 1 : 2
                  ),
                  !isChecked ? 'Monthly' : 'Yearly'
                );
                window.location.href = `${defaultBox?.buttonBoxLink}` ?? '/vps';
              }}
            >
              {defaultBox?.buttonBoxCta}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ManagedVpsBlock;
