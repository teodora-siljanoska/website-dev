import React, { useContext, useEffect, useState } from 'react';
import { Maybe, ComponentPageComponentsCdnCard } from '@utils/types';
import { CurrencyContext } from '@utils/contexts/currencyContext';
import ReactMarkdown from 'react-markdown';
import check from './assets/check.svg';
import cros from './assets/cros.svg';
import { CustomVpsInterface } from '@pages/vps/types';
import CartContext from '@utils/contexts/cartContext';
import AddToCartPopUp from '@components/AddToCartPopUp';

export interface P {
  innerFirstTitle: string;
  firstCDNCard: Maybe<ComponentPageComponentsCdnCard> | undefined;
  secondCDNCard: Maybe<ComponentPageComponentsCdnCard> | undefined;
  thirdCDNCard: Maybe<ComponentPageComponentsCdnCard> | undefined;
}

function FirstTab({
  innerFirstTitle,
  firstCDNCard,
  secondCDNCard,
  thirdCDNCard,
}: P): JSX.Element {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const { cartItems, setCartItems } = useContext(CartContext);

  const { selectedCurrency, currencySymbol } = useContext(CurrencyContext);
  const [isChecked, setIsChecked] = useState(false);
  const toggleSwitch = () => {
    setIsChecked(!isChecked);
  };
  const [firstMProduct, setFirstMProduct] = useState<CustomVpsInterface>();
  const [firstYProduct, setFirstYProduct] = useState<CustomVpsInterface>();
  const [secondMProduct, setSecondMProduct] = useState<CustomVpsInterface>();
  const [secondYProduct, setSecondYProduct] = useState<CustomVpsInterface>();
  const [thirdMProduct, setThirdMProduct] = useState<CustomVpsInterface>();
  const [thirdYProduct, setThirdYProduct] = useState<CustomVpsInterface>();

  const [firstCDNCardByCurencyMonthly, setFirstCDNCardByCurencyMonthly] =
    useState<any>();
  const [firstCDNCardByCurencyYearly, setFirstCDNCardByCurencyYearly] =
    useState<any>();
  const [secondCDNCardByCurencyMonthly, setSecondCDNCardByCurencyMonthly] =
    useState<any>();
  const [secondCDNCardByCurencyYearly, setSecondCDNCardByCurencyYearly] =
    useState<any>();
  const [thirdCDNCardByCurencyMonthly, setThirdCDNCardByCurencyMonthly] =
    useState<any>();
  const [thirdCDNCardByCurencyYearly, setThirdCDNCardByCurencyYearly] =
    useState<any>();

  useEffect(() => {
    firstCDNCard?.cdn_product?.data?.attributes?.productPrices?.data.map(
      (item) => {
        item.attributes?.currency === selectedCurrency &&
          item.attributes.period === 'month' &&
          setFirstCDNCardByCurencyMonthly(item.attributes.price);
        item.attributes?.currency === selectedCurrency &&
          item.attributes.period === 'month' &&
          setFirstMProduct({
            timePeriod: 'Monthly',
            totalPrice: item.attributes.price ?? 0,
            selectedCurrency: selectedCurrency,
            vmPlan: {
              sku: firstCDNCard?.cdn_product?.data?.attributes?.sku,
              skuMonthly: item.attributes.sku,
              skuYearly: (
                firstCDNCard?.cdn_product?.data?.attributes?.productPrices
                  ?.data || []
              )
                .filter(
                  (yItem: any) =>
                    yItem?.attributes?.currency === selectedCurrency &&
                    yItem.attributes.period === 'year'
                )
                .map((filteredItem: any) => filteredItem.attributes.sku)[0],
              title: firstCDNCard?.cdn_product?.data?.attributes?.title,
              monthlyPrice: item.attributes.price ?? 0,
              yearlyPrice: (
                firstCDNCard?.cdn_product?.data?.attributes?.productPrices
                  ?.data || []
              )
                .filter(
                  (yItem: any) =>
                    yItem?.attributes?.currency === selectedCurrency &&
                    yItem.attributes.period === 'year'
                )
                .map((filteredItem: any) => filteredItem.attributes.price)[0],
            },
            addons: [],
            numericalAddons: [],
          });
      }
    );
    firstCDNCard?.cdn_product?.data?.attributes?.productPrices?.data.map(
      (item) => {
        item.attributes?.currency === selectedCurrency &&
          item.attributes.period === 'year' &&
          setFirstCDNCardByCurencyYearly(item.attributes.price);
        item?.attributes?.currency === selectedCurrency &&
          item.attributes.period === 'year' &&
          setFirstYProduct({
            timePeriod: 'Yearly',
            totalPrice: item.attributes.price ?? 0,
            selectedCurrency: selectedCurrency,
            vmPlan: {
              sku: firstCDNCard?.cdn_product?.data?.attributes?.sku,
              skuMonthly: (
                firstCDNCard?.cdn_product?.data?.attributes?.productPrices
                  ?.data || []
              )
                .filter(
                  (yItem: any) =>
                    yItem?.attributes?.currency === selectedCurrency &&
                    yItem.attributes.period === 'month'
                )
                .map((filteredItem: any) => filteredItem.attributes.sku)[0],
              skuYearly: item.attributes.sku,
              title: firstCDNCard?.cdn_product?.data?.attributes?.title,
              monthlyPrice: (
                firstCDNCard?.cdn_product?.data?.attributes?.productPrices
                  ?.data || []
              )
                .filter(
                  (yItem: any) =>
                    yItem?.attributes?.currency === selectedCurrency &&
                    yItem.attributes.period === 'month'
                )
                .map((filteredItem: any) => filteredItem.attributes.price)[0],
              yearlyPrice: item.attributes.price ?? 0,
            },
            addons: [],
            numericalAddons: [],
          });
      }
    );

    secondCDNCard?.cdn_product?.data?.attributes?.productPrices?.data.map(
      (item) => {
        item.attributes?.currency === selectedCurrency &&
          item.attributes.period === 'month' &&
          setSecondCDNCardByCurencyMonthly(item.attributes.price);
        item.attributes?.currency === selectedCurrency &&
          item.attributes.period === 'month' &&
          setSecondMProduct({
            timePeriod: 'Monthly',
            totalPrice: item.attributes.price ?? 0,
            selectedCurrency: selectedCurrency,
            vmPlan: {
              sku: secondCDNCard?.cdn_product?.data?.attributes?.sku,
              skuMonthly: item.attributes.sku,
              skuYearly: (
                secondCDNCard?.cdn_product?.data?.attributes?.productPrices
                  ?.data || []
              )
                .filter(
                  (yItem: any) =>
                    yItem?.attributes?.currency === selectedCurrency &&
                    yItem.attributes.period === 'year'
                )
                .map((filteredItem: any) => filteredItem.attributes.sku)[0],
              title: secondCDNCard?.cdn_product?.data?.attributes?.title,
              monthlyPrice: item.attributes.price ?? 0,
              yearlyPrice: (
                secondCDNCard?.cdn_product?.data?.attributes?.productPrices
                  ?.data || []
              )
                .filter(
                  (yItem: any) =>
                    yItem?.attributes?.currency === selectedCurrency &&
                    yItem.attributes.period === 'year'
                )
                .map((filteredItem: any) => filteredItem.attributes.price)[0],
            },
            addons: [],
            numericalAddons: [],
          });
      }
    );
    secondCDNCard?.cdn_product?.data?.attributes?.productPrices?.data.map(
      (item) => {
        item.attributes?.currency === selectedCurrency &&
          item.attributes.period === 'year' &&
          setSecondCDNCardByCurencyYearly(item.attributes.price);
        item?.attributes?.currency === selectedCurrency &&
          item.attributes.period === 'year' &&
          setSecondYProduct({
            timePeriod: 'Yearly',
            totalPrice: item.attributes.price ?? 0,
            selectedCurrency: selectedCurrency,
            vmPlan: {
              sku: secondCDNCard?.cdn_product?.data?.attributes?.sku,
              skuMonthly: (
                secondCDNCard?.cdn_product?.data?.attributes?.productPrices
                  ?.data || []
              )
                .filter(
                  (yItem: any) =>
                    yItem?.attributes?.currency === selectedCurrency &&
                    yItem.attributes.period === 'month'
                )
                .map((filteredItem: any) => filteredItem.attributes.sku)[0],
              skuYearly: item.attributes.sku,
              title: secondCDNCard?.cdn_product?.data?.attributes?.title,
              monthlyPrice: (
                secondCDNCard?.cdn_product?.data?.attributes?.productPrices
                  ?.data || []
              )
                .filter(
                  (yItem: any) =>
                    yItem?.attributes?.currency === selectedCurrency &&
                    yItem.attributes.period === 'month'
                )
                .map((filteredItem: any) => filteredItem.attributes.price)[0],
              yearlyPrice: item.attributes.price ?? 0,
            },
            addons: [],
            numericalAddons: [],
          });
      }
    );

    thirdCDNCard?.cdn_product?.data?.attributes?.productPrices?.data.map(
      (item) => {
        item.attributes?.currency === selectedCurrency &&
          item.attributes.period === 'month' &&
          setThirdCDNCardByCurencyMonthly(item.attributes.price);
        item.attributes?.currency === selectedCurrency &&
          item.attributes.period === 'month' &&
          setThirdMProduct({
            timePeriod: 'Monthly',
            totalPrice: item.attributes.price ?? 0,
            selectedCurrency: selectedCurrency,
            vmPlan: {
              sku: thirdCDNCard?.cdn_product?.data?.attributes?.sku,
              skuMonthly: item.attributes.sku,
              skuYearly: (
                thirdCDNCard?.cdn_product?.data?.attributes?.productPrices
                  ?.data || []
              )
                .filter(
                  (yItem: any) =>
                    yItem?.attributes?.currency === selectedCurrency &&
                    yItem.attributes.period === 'year'
                )
                .map((filteredItem: any) => filteredItem.attributes.sku)[0],
              title: thirdCDNCard?.cdn_product?.data?.attributes?.title,
              monthlyPrice: item.attributes.price ?? 0,
              yearlyPrice: (
                thirdCDNCard?.cdn_product?.data?.attributes?.productPrices
                  ?.data || []
              )
                .filter(
                  (yItem: any) =>
                    yItem?.attributes?.currency === selectedCurrency &&
                    yItem.attributes.period === 'year'
                )
                .map((filteredItem: any) => filteredItem.attributes.price)[0],
            },
            addons: [],
            numericalAddons: [],
          });
      }
    );
    thirdCDNCard?.cdn_product?.data?.attributes?.productPrices?.data.map(
      (item) => {
        item.attributes?.currency === selectedCurrency &&
          item.attributes.period === 'year' &&
          setThirdCDNCardByCurencyYearly(item.attributes.price);
        item?.attributes?.currency === selectedCurrency &&
          item.attributes.period === 'year' &&
          setThirdYProduct({
            timePeriod: 'Yearly',
            totalPrice: item.attributes.price ?? 0,
            selectedCurrency: selectedCurrency,
            vmPlan: {
              sku: thirdCDNCard?.cdn_product?.data?.attributes?.sku,
              skuMonthly: (
                thirdCDNCard?.cdn_product?.data?.attributes?.productPrices
                  ?.data || []
              )
                .filter(
                  (yItem: any) =>
                    yItem?.attributes?.currency === selectedCurrency &&
                    yItem.attributes.period === 'month'
                )
                .map((filteredItem: any) => filteredItem.attributes.sku)[0],
              skuYearly: item.attributes.sku,
              title: thirdCDNCard?.cdn_product?.data?.attributes?.title,
              monthlyPrice: (
                thirdCDNCard?.cdn_product?.data?.attributes?.productPrices
                  ?.data || []
              )
                .filter(
                  (yItem: any) =>
                    yItem?.attributes?.currency === selectedCurrency &&
                    yItem.attributes.period === 'month'
                )
                .map((filteredItem: any) => filteredItem.attributes.price)[0],
              yearlyPrice: item.attributes.price ?? 0,
            },
            addons: [],
            numericalAddons: [],
          });
      }
    );
  }, [selectedCurrency]);

  const onClickAddToCart = (newVPS: CustomVpsInterface | undefined) => {
    const start: CustomVpsInterface[] = [];
    if (localStorage.getItem('SELECTED_CART_ITEMS') === null) {
      localStorage.setItem('SELECTED_CART_ITEMS', JSON.stringify(start));
    }
    if (localStorage.getItem('SELECTED_CART_ITEMS') !== null) {
      start.push(
        ...(JSON.parse(
          localStorage.getItem('SELECTED_CART_ITEMS') ?? ''
        ) as CustomVpsInterface[])
      );
    }
    setCartItems([
      ...start,
      {
        addons: [],
        numericalAddons: [],
        selectedCurrency: newVPS?.selectedCurrency || '',
        timePeriod: newVPS?.timePeriod || 'Monthly',
        totalPrice: newVPS?.totalPrice || 0,
        vmPlan: newVPS?.vmPlan,
      },
    ]);
    localStorage.setItem(
      'SELECTED_CART_ITEMS',
      JSON.stringify([
        ...start,
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
    <div className="pt-[38px] pb-[52px]">
      <div className='text-center font-["Mont-regular"] text-2xl text-darkGrey'>
        {innerFirstTitle}
      </div>
      <div className="flex justify-center gap-5 pt-[31px] pb-[53px] font-['Mont-book'] text-lg text-darkGrey">
        <div>Monthly</div>
        <div
          className={`toggle-switch ${isChecked ? 'on' : 'off'}`}
          onClick={toggleSwitch}
        >
          <div className={`${isChecked && 'on' ? 'slider1' : 'slider'}`}></div>
        </div>
        <div>Annual</div>
      </div>
      <div className="flex  flex-col gap-[46px]">
        <div className="flex flex-wrap justify-center gap-[30px] self-center">
          <div>
            <div>
              <div className="flex !h-full  xs:w-[19rem] w-[16rem] flex-col justify-between rounded-2xl bg-white px-9 py-7 shadow-custom">
                <div>
                  <p className="mb-[5px] text-center font-['Mont-bold'] text-2xl text-darkGrey">
                    {firstCDNCard?.titleCDN ?? 'Starter'}
                  </p>
                  <div className="flex justify-center text-center">
                    <div className="font-['Mont-bold'] text-[38px] leading-[40px] text-darkTeal">
                      {currencySymbol}
                      {!isChecked
                        ? firstCDNCardByCurencyMonthly?.toFixed(2)
                        : firstCDNCardByCurencyYearly.toFixed(2)}
                    </div>
                    <div className="self-end font-['Mont-regular'] text-[14px] text-darkGrey/70">
                      {!isChecked ? '/month' : '/year'}
                    </div>
                  </div>
                  <div className="mt-[9px]  mb-6 text-center font-['Mont-light'] text-base text-darkGrey">
                    <ReactMarkdown>
                      {firstCDNCard?.descriptionCDN ?? ''}
                    </ReactMarkdown>
                  </div>
                </div>
                <div className="mb-5 min-h-[100px]">
                  <div className="h-full font-['Mont-regular'] text-sm prose-strong:font-['Mont-semibold'] prose-li:flex prose-li:gap-[4px] prose-li:text-darkGrey prose-img:h-[13px] prose-img:w-[13px]">
                    <ReactMarkdown>
                      {firstCDNCard?.performancesCDNCard?.replace(
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
                      className="font-['Mont-semibold']  rounded-full border-2 border-purple bg-purple px-[35px]  py-[12px] text-base  text-white transition  duration-500 hover:border-2 hover:border-purple hover:bg-transparent hover:text-purple lg:px-[66px] lg:py-[13px]"
                      onClick={() => {
                        onClickAddToCart(
                          !isChecked ? firstMProduct : firstYProduct
                        );
                      }}
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div className="flex !h-full  xs:w-[19rem] w-[16rem] flex-col justify-between rounded-2xl bg-white px-9 py-7 shadow-custom">
                <div>
                  <p className="mb-[5px] text-center font-['Mont-bold'] text-2xl text-darkGrey">
                    {secondCDNCard?.titleCDN ?? 'Growth'}
                  </p>
                  <div className="flex justify-center text-center">
                    <div className="font-['Mont-bold'] text-[38px] leading-[40px] text-darkTeal">
                      {currencySymbol}
                      {!isChecked
                        ? secondCDNCardByCurencyMonthly?.toFixed(2)
                        : secondCDNCardByCurencyYearly.toFixed(2)}
                    </div>
                    <div className="self-end font-['Mont-regular'] text-[14px] text-darkGrey/70">
                      {!isChecked ? '/month' : '/year'}
                    </div>
                  </div>
                  <div className="mt-[9px]  mb-6 text-center font-['Mont-light'] text-base text-darkGrey">
                    <ReactMarkdown>
                      {secondCDNCard?.descriptionCDN ?? ''}
                    </ReactMarkdown>
                  </div>
                </div>
                <div className="mb-5 min-h-[100px]">
                  <div className="font-['Mont-regular'] text-sm prose-strong:font-['Mont-semibold'] prose-li:flex prose-li:gap-[4px] prose-li:text-darkGrey prose-img:h-[13px] prose-img:w-[13px]">
                    <ReactMarkdown>
                      {secondCDNCard?.performancesCDNCard?.replace(
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
                      className="font-['Mont-semibold']  rounded-full border-2 border-purple bg-purple px-[35px]  py-[12px] text-base  text-white transition  duration-500 hover:border-2 hover:border-purple hover:bg-transparent hover:text-purple lg:px-[66px] lg:py-[13px]"
                      onClick={() => {
                        onClickAddToCart(
                          !isChecked ? secondMProduct : secondYProduct
                        );
                      }}
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div className="flex !h-full  xs:w-[19rem] w-[16rem] flex-col justify-between rounded-2xl bg-white px-9 py-7 shadow-custom">
                <div>
                  <p className="mb-[5px] text-center font-['Mont-bold'] text-2xl text-darkGrey">
                    {thirdCDNCard?.titleCDN ?? 'Volume'}
                  </p>
                  <div className="flex justify-center text-center">
                    <div className="font-['Mont-bold'] text-[38px] leading-[40px] text-darkTeal">
                      {currencySymbol}
                      {!isChecked
                        ? thirdCDNCardByCurencyMonthly?.toFixed(2)
                        : thirdCDNCardByCurencyYearly.toFixed(2)}
                    </div>
                    <div className="self-end font-['Mont-regular'] text-[14px] text-darkGrey/70">
                      {!isChecked ? '/month' : '/year'}
                    </div>
                  </div>
                  <div className="mt-[9px]  mb-6 text-center font-['Mont-light'] text-base text-darkGrey">
                    <ReactMarkdown>
                      {thirdCDNCard?.descriptionCDN ?? ''}
                    </ReactMarkdown>
                  </div>
                </div>
                <div className="mb-5 min-h-[100px]">
                  <div className="font-['Mont-regular'] text-sm prose-strong:font-['Mont-semibold'] prose-li:flex prose-li:gap-[4px] prose-li:text-darkGrey prose-img:h-[13px] prose-img:w-[13px]">
                    <ReactMarkdown>
                      {thirdCDNCard?.performancesCDNCard?.replace(
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
                        onClickAddToCart(
                          !isChecked ? thirdMProduct : thirdYProduct
                        );
                      }}
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isSubmitted && <AddToCartPopUp />}
      </div>
    </div>
  );
}
export default FirstTab;
