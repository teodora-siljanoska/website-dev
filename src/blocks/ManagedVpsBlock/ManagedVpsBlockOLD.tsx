import { ComponentPageBlocksManagedVps } from '@utils/types';
import React, { useContext, useState } from 'react';
//import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import ReactMarkdown from 'react-markdown';
import check from './assets/check.svg';
import StandardFeaturesCheckList from '@components/StandardFeaturesCheckList';
import { CurrencyContext } from '@utils/contexts/currencyContext';
import {
  CustomVpsAddonInterface,
  CustomVpsInterface,
  CustomVpsNumericalAddonInterface,
  ProductPriceInterface,
  VmPlanInterface,
} from '@pages/vps/types';
import Button from '@components/Button';
import CartContext from '@utils/contexts/cartContext';
import AddToCartPopUp from '@components/AddToCartPopUp';

function ManagedVpsBlock({
  vpsCheck,
  vpsFirstCard,
  vpsSecondCard,
  vpsThirdCard,
}: ComponentPageBlocksManagedVps): JSX.Element {
  const { selectedCurrency, currencySymbol } = useContext(CurrencyContext);
  const [isChecked, setIsChecked] = useState(false);
  const { cartItems, setCartItems } = useContext(CartContext);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const toggleSwitch = () => {
    setIsChecked(!isChecked);
  };

  const vpsFirstCardRam = vpsFirstCard?.numberOfRam;
  const vpsFirstCardCpu = vpsFirstCard?.numberOfCpu;
  const vpsFirstCardStorage = vpsFirstCard?.numberOfStorage;

  const vpsSecondCardRam = vpsSecondCard?.numberOfRam;
  const vpsSecondCardCpu = vpsSecondCard?.numberOfCpu;
  const vpsSecondCardStorage = vpsSecondCard?.numberOfStorage;

  const vpsThirdCardRam = vpsThirdCard?.numberOfRam;
  const vpsThirdCardCpu = vpsThirdCard?.numberOfCpu;
  const vpsThirdCardStorage = vpsThirdCard?.numberOfStorage;

  function calculateVpsCardPrice(
    vpsCard: any,
    selectedCurrency: string,
    period: string,
    vpsCardRam: any,
    vpsCardCpu: any,
    vpsCardStorage: any
  ) {
    let totalItems = 0;
    let total = 0;

    vpsCard?.vps_products?.data?.forEach((item: any) => {
      item.attributes?.productPrices?.data?.forEach((itemPrice: any) => {
        if (
          itemPrice.attributes?.currency === selectedCurrency &&
          itemPrice.attributes.period === period
        ) {
          const price = itemPrice?.attributes?.price || 0;
          totalItems += price;

          const sku = itemPrice.attributes.sku;
          let liteDataMultiplier = 1;

          if (sku.includes('ram')) {
            liteDataMultiplier = vpsCardRam;
          } else if (sku.includes('vcpu')) {
            liteDataMultiplier = vpsCardCpu;
          } else if (sku.includes('disk')) {
            liteDataMultiplier = vpsCardStorage;
          }

          if (liteDataMultiplier && itemPrice.attributes.tiers) {
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
              total += itemPrice.attributes.tiers[0].price * liteDataMultiplier;
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
    'month',
    vpsFirstCardRam,
    vpsFirstCardCpu,
    vpsFirstCardStorage
  );

  const firstCardYearlyPrice = calculateVpsCardPrice(
    vpsFirstCard,
    selectedCurrency,
    'year',
    vpsFirstCardRam,
    vpsFirstCardCpu,
    vpsFirstCardStorage
  );

  const secondCardMonthlyPrice = calculateVpsCardPrice(
    vpsSecondCard,
    selectedCurrency,
    'month',
    vpsSecondCardRam,
    vpsSecondCardCpu,
    vpsSecondCardStorage
  );

  const secondCardYearlyPrice = calculateVpsCardPrice(
    vpsSecondCard,
    selectedCurrency,
    'year',
    vpsSecondCardRam,
    vpsSecondCardCpu,
    vpsSecondCardStorage
  );

  const thirdCardMonthlyPrice = calculateVpsCardPrice(
    vpsThirdCard,
    selectedCurrency,
    'month',
    vpsThirdCardRam,
    vpsThirdCardCpu,
    vpsThirdCardStorage
  );

  const thirdCardYearlyPrice = calculateVpsCardPrice(
    vpsThirdCard,
    selectedCurrency,
    'year',
    vpsThirdCardRam,
    vpsThirdCardCpu,
    vpsThirdCardStorage
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
      card.vps_products.data.map((item: any) => {
        if (item.attributes.productType === 'plan') {
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
              description: item?.attributes.description || '',
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
                ? card.numberOfStorage
                : item.attributes.sku.includes('ram')
                  ? card.numberOfRam
                  : item.attributes.sku.includes('vcpu')
                    ? card.numberOfCpu
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
                ? card.numberOfStorage
                : item.attributes.sku.includes('ram')
                  ? card.numberOfRam
                  : item.attributes.sku.includes('vcpu')
                    ? card.numberOfCpu
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
                ? card.numberOfStorage
                : item.attributes.sku.includes('ram')
                  ? card.numberOfRam
                  : item.attributes.sku.includes('vcpu')
                    ? card.numberOfCpu
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

  createVPSProduct(
    vpsFirstCard,
    !isChecked ? 'Monthly' : 'Yearly',
    !isChecked ? 0 : 1
  );

  const onClickAddToCart = (newVPS: CustomVpsInterface | undefined) => {
    setCartItems([
      ...cartItems,
      {
        addons: newVPS?.addons || [],
        numericalAddons: newVPS?.numericalAddons || [],
        selectedCurrency: newVPS?.selectedCurrency || '',
        timePeriod: newVPS?.timePeriod || 'Monthly',
        totalPrice: newVPS?.totalPrice || 0,
        vmPlan: newVPS?.vmPlan,
      },
    ]);
    localStorage.setItem(
      'SELECTED_CART_ITEMS',
      JSON.stringify([
        ...cartItems,
        {
          addons: newVPS?.addons ?? [],
          numericalAddons: newVPS?.numericalAddons || [],
          selectedCurrency: newVPS?.selectedCurrency || '',
          timePeriod: newVPS?.timePeriod || 'Monthly',
          totalPrice: newVPS?.totalPrice,
          vmPlan: newVPS?.vmPlan,
        },
      ])
    );
    //console.log('Added to cart succeesfully');
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    (<div className="container mx-auto smallest:w-[90%]">
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
      <div className=" flex  flex-col gap-[46px] rounded-[10px] bg-liliac/10 px-[30px] py-[68px]">
        {vpsCheck && (
          <div className="m-auto grid grid-cols-2 gap-y-[40px] gap-x-[20px] px-0 lg:w-[80%] lg:grid-cols-3 lg:gap-x-[84px] lg:px-5	">
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
              <div className="flex !h-full w-[19rem] flex-col justify-between rounded-t-2xl bg-white px-9 py-7 shadow-custom">
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
                  <div className="mt-[9px]  mb-6 text-center font-['Mont-book'] text-base text-darkGrey">
                    <ReactMarkdown>
                      {vpsFirstCard?.descriptionVpsBox ?? ''}
                    </ReactMarkdown>
                  </div>
                </div>
                <div className="mb-5 min-h-[100px]">
                  <div className="h-full font-['Mont-regular'] text-sm prose-strong:font-['Mont-bold'] prose-li:flex prose-li:gap-[4px] prose-li:text-darkGrey prose-img:h-[13px] prose-img:w-[13px]">
                    <ReactMarkdown>
                      {vpsFirstCard?.performancesVpsBox?.replace(
                        /- /g,
                        `- ![](${check.src}) `
                      ) ?? ''}
                    </ReactMarkdown>
                  </div>
                </div>
                <div className="flex justify-center pt-3">
                  <div>
                    <button
                      className=" rounded-full border-2 border-purple bg-purple px-[35px]  py-[12px] text-base  text-white transition  duration-500 hover:border-2 hover:border-purple hover:bg-transparent hover:text-purple lg:px-[66px] lg:py-[13px]"
                      onClick={() => {
                        onClickAddToCart(
                          createVPSProduct(
                            vpsFirstCard,
                            !isChecked ? 'Monthly' : 'Yearly',
                            !isChecked
                              ? firstCardMonthlyPrice
                              : firstCardYearlyPrice
                          )
                        );
                      }}
                    >
                      Add to cart
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
                    {(firstCardMonthlyPrice * 12)?.toFixed(2)}
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
              <div className="flex !h-full w-[19rem] flex-col justify-between rounded-t-2xl bg-white px-9 py-7 shadow-custom">
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
                  <div className="mt-[9px]  mb-6 text-center font-['Mont-book'] text-base text-darkGrey">
                    <ReactMarkdown>
                      {vpsSecondCard?.descriptionVpsBox ?? ''}
                    </ReactMarkdown>
                  </div>
                </div>
                <div className="mb-5 min-h-[100px]">
                  <div className="font-['Mont-regular'] text-sm prose-strong:font-['Mont-bold'] prose-li:flex prose-li:gap-[4px] prose-li:text-darkGrey prose-img:h-[13px] prose-img:w-[13px]">
                    <ReactMarkdown>
                      {vpsSecondCard?.performancesVpsBox?.replace(
                        /- /g,
                        `- ![](${check.src}) `
                      ) ?? ''}
                    </ReactMarkdown>
                  </div>
                </div>
                <div className="flex justify-center pt-3">
                  <div>
                    <button
                      className=" rounded-full border-2 border-purple bg-purple px-[35px]  py-[12px] text-base  text-white transition  duration-500 hover:border-2 hover:border-purple hover:bg-transparent hover:text-purple lg:px-[66px] lg:py-[13px]"
                      onClick={() => {
                        onClickAddToCart(
                          createVPSProduct(
                            vpsSecondCard,
                            !isChecked ? 'Monthly' : 'Yearly',
                            !isChecked
                              ? secondCardMonthlyPrice
                              : secondCardYearlyPrice
                          )
                        );
                      }}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between rounded-b-2xl bg-darkTeal/10 py-[10px] px-5">
              <div className="whitespace-pre-line text-darkGrey prose-strong:text-darkTeal">
                <ReactMarkdown>
                  {vpsSecondCard?.saveTextVps ?? ''}
                </ReactMarkdown>
              </div>
              <div className="text-right">
                <div className="text-sm text-[#696969] line-through">
                  {currencySymbol}
                  {(secondCardMonthlyPrice * 12)?.toFixed(2)}
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
              <div className="flex !h-full w-[19rem] flex-col justify-between rounded-t-2xl bg-white px-9 py-7 shadow-custom">
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
                  <div className="mt-[9px]  mb-6 text-center font-['Mont-book'] text-base text-darkGrey">
                    <ReactMarkdown>
                      {vpsThirdCard?.descriptionVpsBox ?? ''}
                    </ReactMarkdown>
                  </div>
                </div>
                <div className="mb-5 min-h-[100px]">
                  <div className="font-['Mont-regular'] text-sm prose-strong:font-['Mont-bold'] prose-li:flex prose-li:gap-[4px] prose-li:text-darkGrey prose-img:h-[13px] prose-img:w-[13px]">
                    <ReactMarkdown>
                      {vpsThirdCard?.performancesVpsBox?.replace(
                        /- /g,
                        `- ![](${check.src}) `
                      ) ?? ''}
                    </ReactMarkdown>
                  </div>
                </div>
                <div className="flex justify-center pt-3">
                  <div>
                    <button
                      className=" rounded-full border-2 border-purple bg-purple px-[35px]  py-[12px] text-base  text-white transition  duration-500 hover:border-2 hover:border-purple hover:bg-transparent hover:text-purple lg:px-[66px] lg:py-[13px]"
                      onClick={() => {
                        onClickAddToCart(
                          createVPSProduct(
                            vpsThirdCard,
                            !isChecked ? 'Monthly' : 'Yearly',
                            !isChecked
                              ? thirdCardMonthlyPrice
                              : thirdCardYearlyPrice
                          )
                        );
                      }}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between rounded-b-2xl bg-darkTeal/10 py-[10px] px-5">
              <div className="whitespace-pre-line text-darkGrey prose-strong:text-darkTeal">
                <ReactMarkdown>{vpsThirdCard?.saveTextVps ?? ''}</ReactMarkdown>
              </div>
              <div className="text-right">
                <div className="text-sm text-[#696969] line-through">
                  {currencySymbol}
                  {(thirdCardMonthlyPrice * 12)?.toFixed(2)}
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
              Customise Your Own VPS:
            </p>
            <p className='mb-[20px] font-["Mont-light"] text-[24px]'>
              Go Beyond the default plans
            </p>
            <p className='font-["Mont-light"] text-[18px]'>
              Extend beyond 8GB with our configurator and unlock the full
            </p>
            <p className='font-["Mont-light"] text-[18px]'>
              potential: up to 64GB RAM, 2TB SSD, and 32 CPU Cores.
            </p>
          </div>
          <div>
            <Button color="tertiary" cta="Customize plan" link="/vps" />
          </div>
        </div>
      </div>
    </div>)
  );
}
export default ManagedVpsBlock;
