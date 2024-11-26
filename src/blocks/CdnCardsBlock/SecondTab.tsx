import React, { useContext, useEffect, useState } from 'react';
import { Maybe, ComponentPageComponentsCdnCard } from '@utils/types';
import { CurrencyContext } from '@utils/contexts/currencyContext';
import ReactMarkdown from 'react-markdown';
import check from './assets/check.svg';
import cros from './assets/cros.svg';
import CartContext from '@utils/contexts/cartContext';
import AddToCartPopUp from '@components/AddToCartPopUp';
import { CustomVpsInterface } from '@pages/vps/types';

export interface P {
  innerFirstTitle: string;
  firstCDNCard: Maybe<ComponentPageComponentsCdnCard> | undefined;
  secondCDNCard: Maybe<ComponentPageComponentsCdnCard> | undefined;
  thirdCDNCard: Maybe<ComponentPageComponentsCdnCard> | undefined;
}

function SecondTab({
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

  //console.log('firstCDNCardYrl', firstCDNCard);
  //console.log('secondCDNCardYrl', secondCDNCard);
  //console.log('thirdCDNCardYrl', thirdCDNCard);

  //prices that print on cards
  useEffect(() => {
    //first card total price of addon and product

    let totalM = 0;
    let totalYrl = 0;

    firstCDNCard?.cdn_product?.data?.attributes?.productPrices?.data?.forEach(
      (itemPrice) => {
        if (
          itemPrice.attributes?.currency === selectedCurrency &&
          itemPrice.attributes.period === 'month'
        ) {
          const price = itemPrice?.attributes?.price || 0;
          totalM += price;
        }
        if (
          itemPrice.attributes?.currency === selectedCurrency &&
          itemPrice.attributes.period === 'year'
        ) {
          const price = itemPrice?.attributes?.price || 0;
          totalYrl += price;
        }
      }
    );

    let totalItemsM = 0;
    const totalItemsYrl = 0;

    firstCDNCard?.cdn_addon?.data?.attributes?.productPrices?.data?.forEach(
      (itemPrice) => {
        if (
          itemPrice.attributes?.currency === selectedCurrency &&
          itemPrice.attributes.period === 'month'
        ) {
          totalItemsM = itemPrice?.attributes?.price || 0;
        }
        if (
          itemPrice.attributes?.currency === selectedCurrency &&
          itemPrice.attributes.period === 'year'
        ) {
          totalItemsM = itemPrice?.attributes?.price || 0;
        }
      }
    );

    setFirstCDNCardByCurencyMonthly(totalM + totalItemsM);
    setFirstCDNCardByCurencyYearly(totalYrl + totalItemsYrl);

    //second card total price of addon and product

    let totalMTwo = 0;
    let totalYrlTwo = 0;

    secondCDNCard?.cdn_product?.data?.attributes?.productPrices?.data?.forEach(
      (itemPrice) => {
        if (
          itemPrice.attributes?.currency === selectedCurrency &&
          itemPrice.attributes.period === 'month'
        ) {
          const price = itemPrice?.attributes?.price || 0;
          totalMTwo += price;
        }
        if (
          itemPrice.attributes?.currency === selectedCurrency &&
          itemPrice.attributes.period === 'year'
        ) {
          const price = itemPrice?.attributes?.price || 0;
          totalYrlTwo += price;
        }
      }
    );

    let totalItemsMTwo = 0;
    let totalItemsYrlTwo = 0;

    secondCDNCard?.cdn_addon?.data?.attributes?.productPrices?.data?.forEach(
      (itemPrice) => {
        if (
          itemPrice.attributes?.currency === selectedCurrency &&
          itemPrice.attributes.period === 'month'
        ) {
          totalItemsMTwo = itemPrice?.attributes?.price || 0;
        }
        if (
          itemPrice.attributes?.currency === selectedCurrency &&
          itemPrice.attributes.period === 'year'
        ) {
          totalItemsYrlTwo = itemPrice?.attributes?.price || 0;
        }
      }
    );

    setSecondCDNCardByCurencyMonthly(totalMTwo + totalItemsMTwo);
    setSecondCDNCardByCurencyYearly(totalYrlTwo + totalItemsYrlTwo);

    //third card total price of addon and product

    let totalMThree = 0;
    let totalYrlThree = 0;

    thirdCDNCard?.cdn_product?.data?.attributes?.productPrices?.data?.forEach(
      (itemPrice) => {
        if (
          itemPrice.attributes?.currency === selectedCurrency &&
          itemPrice.attributes.period === 'month'
        ) {
          const price = itemPrice?.attributes?.price || 0;
          totalMThree += price;
        }
        if (
          itemPrice.attributes?.currency === selectedCurrency &&
          itemPrice.attributes.period === 'year'
        ) {
          const price = itemPrice?.attributes?.price || 0;
          totalYrlThree += price;
        }
      }
    );

    let totalItemsMThree = 0;
    let totalItemsYrlThree = 0;

    thirdCDNCard?.cdn_addon?.data?.attributes?.productPrices?.data?.forEach(
      (itemPrice) => {
        if (
          itemPrice.attributes?.currency === selectedCurrency &&
          itemPrice.attributes.period === 'month'
        ) {
          totalItemsMThree = itemPrice?.attributes?.price || 0;
        }
        if (
          itemPrice.attributes?.currency === selectedCurrency &&
          itemPrice.attributes.period === 'year'
        ) {
          totalItemsYrlThree = itemPrice?.attributes?.price || 0;
        }
      }
    );

    setThirdCDNCardByCurencyMonthly(totalMThree + totalItemsMThree);
    setThirdCDNCardByCurencyYearly(totalYrlThree + totalItemsYrlThree);
  }, [selectedCurrency]);

  const onClickAddToCart = (
    product: Maybe<ComponentPageComponentsCdnCard> | undefined
  ) => {
    const cartItemsString = localStorage.getItem('SELECTED_CART_ITEMS');
    const cartItems = JSON.parse(cartItemsString || '[]');

    const prodAttr = product?.cdn_product?.data?.attributes;
    const prices = prodAttr?.productPrices?.data;

    if (!prodAttr || !prices) {
      return;
    }

    const timePeriod = isChecked ? 'Yearly' : 'Monthly';
    const periodEnum = isChecked ? 'year' : 'month';

    let totalPrice = 0;

    const addons = [];

    if (product.cdn_addon && product.cdn_addon.data?.attributes) {
      const attr = product.cdn_addon.data?.attributes;

      const addMonthly = attr.productPrices?.data?.find(
        (item) =>
          item.attributes?.currency === selectedCurrency &&
          item.attributes.period === 'month'
      )?.attributes;
      const addYearly = attr.productPrices?.data?.find(
        (item) =>
          item.attributes?.currency === selectedCurrency &&
          item.attributes.period === 'year'
      )?.attributes;

      totalPrice +=
        periodEnum === 'month' ? addMonthly?.price ?? 0 : addYearly?.price ?? 0;

      addons.push({
        selectedCurrency: selectedCurrency,
        title: attr.title,
        sku: attr.sku,
        skuMonthly: addMonthly?.sku,
        skuYearly: addYearly?.sku,
        monthlyPrice: addMonthly?.price,
        yearlyPrice: addYearly?.price,
      });
    }

    const monthly = prices.find(
      (item) =>
        item.attributes?.currency === selectedCurrency &&
        item.attributes.period === 'month'
    )?.attributes;
    const yearly = prices.find(
      (item) =>
        item.attributes?.currency === selectedCurrency &&
        item.attributes.period === 'year'
    )?.attributes;

    totalPrice +=
      periodEnum === 'month' ? monthly?.price ?? 0 : yearly?.price ?? 0;
    cartItems.push({
      vmPlan: {
        sku: prodAttr.sku,
        title: prodAttr.title,
        skuMonthly: monthly?.sku,
        skuYearly: yearly?.sku,
        monthlyPrice: monthly?.price,
        yearlyPrice: yearly?.price,
      },
      timePeriod: timePeriod,
      totalPrice: totalPrice,
      selectedCurrency: selectedCurrency,
      numericalAddons: [],
      addons: addons,
    });

    localStorage.setItem('SELECTED_CART_ITEMS', JSON.stringify(cartItems));
    setIsSubmitted(true);
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
              <div className="flex !h-full  w-[16rem] flex-col justify-between rounded-2xl bg-white px-9 py-7 shadow-custom xs:w-[19rem]">
                <div>
                  <p className="mb-[5px] text-center font-['Mont-bold'] text-2xl text-darkGrey">
                    {firstCDNCard?.titleCDN ?? 'Starter'}
                  </p>
                  <div className="flex justify-center text-center">
                    <div className="font-['Mont-bold'] text-[38px] leading-[40px] text-darkTeal">
                      {currencySymbol}
                      {!isChecked
                        ? firstCDNCardByCurencyMonthly?.toFixed(2)
                        : firstCDNCardByCurencyYearly?.toFixed(2)}
                    </div>
                    <div className="self-end font-['Mont-regular'] text-[14px] text-darkGrey/70">
                      {!isChecked ? '/month' : '/year'}
                    </div>
                  </div>
                  <div className="mt-[9px]  mb-6 min-h-[75px] text-center font-['Mont-book'] text-base text-darkGrey">
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
                      className="rounded-full  border-2 border-purple bg-purple px-[35px] py-[12px]  font-['Mont-semibold'] text-base  text-white transition  duration-500 hover:border-2 hover:border-purple hover:bg-transparent hover:text-purple lg:px-[66px] lg:py-[13px]"
                      onClick={() => onClickAddToCart(firstCDNCard)}
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
              <div className="flex !h-full  w-[16rem] flex-col justify-between rounded-2xl bg-white px-9 py-7 shadow-custom xs:w-[19rem]">
                <div>
                  <p className="mb-[5px] text-center font-['Mont-bold'] text-2xl text-darkGrey">
                    {secondCDNCard?.titleCDN ?? 'Growth'}
                  </p>
                  <div className="flex justify-center text-center">
                    <div className="font-['Mont-bold'] text-[38px] leading-[40px] text-darkTeal">
                      {currencySymbol}
                      {!isChecked
                        ? secondCDNCardByCurencyMonthly?.toFixed(2)
                        : secondCDNCardByCurencyYearly?.toFixed(2)}
                    </div>
                    <div className="self-end font-['Mont-regular'] text-[14px] text-darkGrey/70">
                      {!isChecked ? '/month' : '/year'}
                    </div>
                  </div>
                  <div className="mt-[9px]  mb-6 min-h-[75px] text-center font-['Mont-book'] text-base text-darkGrey">
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
                      className="rounded-full  border-2 border-purple bg-purple px-[35px] py-[12px]  font-['Mont-semibold'] text-base  text-white transition  duration-500 hover:border-2 hover:border-purple hover:bg-transparent hover:text-purple lg:px-[66px] lg:py-[13px]"
                      onClick={() => onClickAddToCart(secondCDNCard)}
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
              <div className="flex !h-full  w-[16rem] flex-col justify-between rounded-2xl bg-white px-9 py-7 shadow-custom xs:w-[19rem]">
                <div>
                  <p className="mb-[5px] text-center font-['Mont-bold'] text-2xl text-darkGrey">
                    {thirdCDNCard?.titleCDN ?? 'Volume'}
                  </p>
                  <div className="flex justify-center text-center">
                    <div className="font-['Mont-bold'] text-[38px] leading-[40px] text-darkTeal">
                      {currencySymbol}
                      {!isChecked
                        ? thirdCDNCardByCurencyMonthly?.toFixed(2)
                        : thirdCDNCardByCurencyYearly?.toFixed(2)}
                    </div>
                    <div className="self-end font-['Mont-regular'] text-[14px] text-darkGrey/70">
                      {!isChecked ? '/month' : '/year'}
                    </div>
                  </div>
                  <div className="mt-[9px]  mb-6 min-h-[75px] text-center font-['Mont-book'] text-base text-darkGrey">
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
                      className="rounded-full  border-2 border-purple bg-purple px-[35px] py-[12px]  font-['Mont-semibold'] text-base  text-white transition  duration-500 hover:border-2 hover:border-purple hover:bg-transparent hover:text-purple lg:px-[66px] lg:py-[13px]"
                      onClick={() => onClickAddToCart(thirdCDNCard)}
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
export default SecondTab;
