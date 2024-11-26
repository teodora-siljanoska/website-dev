import {
  ComponentPageBlocksAgencyHostingVps,
  LocationEntity,
} from '@utils/types';
import React, { useContext, useEffect, useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import check from './assets/check.svg';
import cros from './assets/cros.svg';
import StandardFeaturesCheckList from '@components/StandardFeaturesCheckList';
import { CurrencyContext } from '@utils/contexts/currencyContext';
import { LocationContext } from '@utils/contexts/locationContext';
import { CustomVpsInterface } from '@pages/vps/types';
import CartContext from '@utils/contexts/cartContext';
import AddToCartPopUp from '@components/AddToCartPopUp';
import axios from 'axios';
import useSWR from 'swr';

function AgencyHostingVpsBlock({
  titleAgencyHosting,
  standardFeatures,
  contentVPSFirst,
  contentVPSSecond,
  contentVPSThird,
  contentVPSFourth,
}: ComponentPageBlocksAgencyHostingVps): JSX.Element {
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
  const { selectedCurrency, currencySymbol } = useContext(CurrencyContext);
  const [isChecked, setIsChecked] = useState(false);

  const [firstMProduct, setFirstMProduct] = useState<CustomVpsInterface>();
  const [firstYProduct, setFirstYProduct] = useState<CustomVpsInterface>();
  const [secondMProduct, setSecondMProduct] = useState<CustomVpsInterface>();
  const [secondYProduct, setSecondYProduct] = useState<CustomVpsInterface>();
  const [thirdMProduct, setThirdMProduct] = useState<CustomVpsInterface>();
  const [thirdYProduct, setThirdYProduct] = useState<CustomVpsInterface>();
  const [forthMProduct, setForthMProduct] = useState<CustomVpsInterface>();
  const [forthYProduct, setForthYProduct] = useState<CustomVpsInterface>();

  const [firstCardFilteredByLocation, setFirstCardFilteredByLocation] =
    useState<any>();
  const [secondCardFilteredByLocation, setSecondCardFilteredByLocation] =
    useState<any>();
  const [thirdCardFilteredByLocation, setThirdCardFilteredByLocation] =
    useState<any>();
  const [fourthCardFilteredByLocation, setFourthCardFilteredByLocation] =
    useState<any>();
  const [
    firstCardFilteredByCurencyMonthly,
    setFirstCardFilteredByCurencyMonthly,
  ] = useState<any>();
  const [
    firstCardFilteredByCurencyYearly,
    setFirstCardFilteredByCurencyYearly,
  ] = useState<any>();
  const [
    secondCardFilteredByCurencyMonthly,
    setSecondCardFilteredByCurencyMonthly,
  ] = useState<any>();
  const [
    secondCardFilteredByCurencyYearly,
    setSecondCardFilteredByCurencyYearly,
  ] = useState<any>();
  const [
    thirdCardFilteredByCurencyMonthly,
    setThirdCardFilteredByCurencyMonthly,
  ] = useState<any>();
  const [
    thirdCardFilteredByCurencyYearly,
    setThirdCardFilteredByCurencyYearly,
  ] = useState<any>();
  const [
    fourthCardFilteredByCurencyMonthly,
    setFourthCardFilteredByCurencyMonthly,
  ] = useState<any>();
  const [
    fourthCardFilteredByCurencyYearly,
    setFourthCardFilteredByCurencyYearly,
  ] = useState<any>();

  const toggleSwitch = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    contentVPSFirst?.card_products?.data.map((item) => {
      item?.attributes?.sku.includes(skuLocation) &&
        setFirstCardFilteredByLocation(item);
    });

    contentVPSSecond?.card_products?.data.map((item) => {
      item?.attributes?.sku.includes(skuLocation) &&
        setSecondCardFilteredByLocation(item);
    });

    contentVPSThird?.card_products?.data.map((item) => {
      item?.attributes?.sku.includes(skuLocation) &&
        setThirdCardFilteredByLocation(item);
    });

    contentVPSFourth?.card_products?.data.map((item) => {
      item?.attributes?.sku.includes(skuLocation) &&
        setFourthCardFilteredByLocation(item);
    });
  }, [skuLocation, selectedLocation]);

  useEffect(() => {
    firstCardFilteredByLocation?.attributes?.productPrices.data?.map(
      (item: any) => {
        item?.attributes?.currency === selectedCurrency &&
          item.attributes.period === 'month' &&
          setFirstCardFilteredByCurencyMonthly(item);
        item?.attributes?.currency === selectedCurrency &&
          item.attributes.period === 'month' &&
          setFirstMProduct({
            timePeriod: 'Monthly',
            totalPrice: item.attributes.price,
            selectedCurrency: selectedCurrency,
            vmPlan: {
              sku: firstCardFilteredByLocation.attributes.sku,
              skuMonthly: item.attributes.sku,
              skuYearly: (
                firstCardFilteredByLocation?.attributes?.productPrices.data ||
                []
              )
                .filter(
                  (yItem: any) =>
                    yItem?.attributes?.currency === selectedCurrency &&
                    yItem.attributes.period === 'year'
                )
                .map((filteredItem: any) => filteredItem.attributes.sku)[0],
              title: item.attributes.title,
              monthlyPrice: item.attributes.price,
              yearlyPrice: (
                firstCardFilteredByLocation?.attributes?.productPrices.data ||
                []
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
    firstCardFilteredByLocation?.attributes?.productPrices.data?.map(
      (item: any) => {
        item?.attributes?.currency === selectedCurrency &&
          item.attributes.period === 'year' &&
          setFirstCardFilteredByCurencyYearly(item);
        item?.attributes?.currency === selectedCurrency &&
          item.attributes.period === 'year' &&
          setFirstYProduct({
            timePeriod: 'Yearly',
            totalPrice: item.attributes.price,
            selectedCurrency: selectedCurrency,
            vmPlan: {
              sku: firstCardFilteredByLocation.attributes.sku,
              skuMonthly: (
                firstCardFilteredByLocation?.attributes?.productPrices.data ||
                []
              )
                .filter(
                  (yItem: any) =>
                    yItem?.attributes?.currency === selectedCurrency &&
                    yItem.attributes.period === 'month'
                )
                .map((filteredItem: any) => filteredItem.attributes.sku)[0],
              skuYearly: item.attributes.sku,
              title: item.attributes.title,
              monthlyPrice: (
                firstCardFilteredByLocation?.attributes?.productPrices.data ||
                []
              )
                .filter(
                  (yItem: any) =>
                    yItem?.attributes?.currency === selectedCurrency &&
                    yItem.attributes.period === 'month'
                )
                .map((filteredItem: any) => filteredItem.attributes.price)[0],
              yearlyPrice: item.attributes.price,
            },
            addons: [],
            numericalAddons: [],
          });
      }
    );

    secondCardFilteredByLocation?.attributes?.productPrices.data?.map(
      (item: any) => {
        item?.attributes?.currency === selectedCurrency &&
          item.attributes.period === 'month' &&
          setSecondCardFilteredByCurencyMonthly(item);
        item?.attributes?.currency === selectedCurrency &&
          item.attributes.period === 'month' &&
          setSecondMProduct({
            timePeriod: 'Monthly',
            totalPrice: item.attributes.price,
            selectedCurrency: selectedCurrency,
            vmPlan: {
              sku: secondCardFilteredByLocation.attributes.sku,
              skuMonthly: item.attributes.sku,
              skuYearly: (
                secondCardFilteredByLocation?.attributes?.productPrices.data ||
                []
              )
                .filter(
                  (yItem: any) =>
                    yItem?.attributes?.currency === selectedCurrency &&
                    yItem.attributes.period === 'year'
                )
                .map((filteredItem: any) => filteredItem.attributes.sku)[0],
              title: item.attributes.title,
              monthlyPrice: item.attributes.price,
              yearlyPrice: (
                secondCardFilteredByLocation?.attributes?.productPrices.data ||
                []
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
    secondCardFilteredByLocation?.attributes?.productPrices.data?.map(
      (item: any) => {
        item?.attributes?.currency === selectedCurrency &&
          item.attributes.period === 'year' &&
          setSecondCardFilteredByCurencyYearly(item);
        item?.attributes?.currency === selectedCurrency &&
          item.attributes.period === 'year' &&
          setSecondYProduct({
            timePeriod: 'Yearly',
            totalPrice: item.attributes.price,
            selectedCurrency: selectedCurrency,
            vmPlan: {
              sku: secondCardFilteredByLocation.attributes.sku,
              skuMonthly: (
                secondCardFilteredByLocation?.attributes?.productPrices.data ||
                []
              )
                .filter(
                  (yItem: any) =>
                    yItem?.attributes?.currency === selectedCurrency &&
                    yItem.attributes.period === 'month'
                )
                .map((filteredItem: any) => filteredItem.attributes.sku)[0],
              skuYearly: item.attributes.sku,
              title: item.attributes.title,
              monthlyPrice: (
                secondCardFilteredByLocation?.attributes?.productPrices.data ||
                []
              )
                .filter(
                  (yItem: any) =>
                    yItem?.attributes?.currency === selectedCurrency &&
                    yItem.attributes.period === 'month'
                )
                .map((filteredItem: any) => filteredItem.attributes.price)[0],
              yearlyPrice: item.attributes.price,
            },
            addons: [],
            numericalAddons: [],
          });
      }
    );

    thirdCardFilteredByLocation?.attributes?.productPrices.data?.map(
      (item: any) => {
        item?.attributes?.currency === selectedCurrency &&
          item.attributes.period === 'month' &&
          setThirdCardFilteredByCurencyMonthly(item);
        item?.attributes?.currency === selectedCurrency &&
          item.attributes.period === 'month' &&
          setThirdMProduct({
            timePeriod: 'Monthly',
            totalPrice: item.attributes.price,
            selectedCurrency: selectedCurrency,
            vmPlan: {
              sku: thirdCardFilteredByLocation.attributes.sku,
              skuMonthly: item.attributes.sku,
              skuYearly: (
                thirdCardFilteredByLocation?.attributes?.productPrices.data ||
                []
              )
                .filter(
                  (yItem: any) =>
                    yItem?.attributes?.currency === selectedCurrency &&
                    yItem.attributes.period === 'year'
                )
                .map((filteredItem: any) => filteredItem.attributes.sku)[0],
              title: item.attributes.title,
              monthlyPrice: item.attributes.price,
              yearlyPrice: (
                thirdCardFilteredByLocation?.attributes?.productPrices.data ||
                []
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
    thirdCardFilteredByLocation?.attributes?.productPrices.data?.map(
      (item: any) => {
        item?.attributes?.currency === selectedCurrency &&
          item.attributes.period === 'year' &&
          setThirdCardFilteredByCurencyYearly(item);
        item?.attributes?.currency === selectedCurrency &&
          item.attributes.period === 'year' &&
          setThirdYProduct({
            timePeriod: 'Yearly',
            totalPrice: item.attributes.price,
            selectedCurrency: selectedCurrency,
            vmPlan: {
              sku: thirdCardFilteredByLocation.attributes.sku,
              skuMonthly: (
                thirdCardFilteredByLocation?.attributes?.productPrices.data ||
                []
              )
                .filter(
                  (yItem: any) =>
                    yItem?.attributes?.currency === selectedCurrency &&
                    yItem.attributes.period === 'month'
                )
                .map((filteredItem: any) => filteredItem.attributes.sku)[0],
              skuYearly: item.attributes.sku,
              title: item.attributes.title,
              monthlyPrice: (
                thirdCardFilteredByLocation?.attributes?.productPrices.data ||
                []
              )
                .filter(
                  (yItem: any) =>
                    yItem?.attributes?.currency === selectedCurrency &&
                    yItem.attributes.period === 'month'
                )
                .map((filteredItem: any) => filteredItem.attributes.price)[0],
              yearlyPrice: item.attributes.price,
            },
            addons: [],
            numericalAddons: [],
          });
      }
    );

    fourthCardFilteredByLocation?.attributes?.productPrices.data?.map(
      (item: any) => {
        item?.attributes?.currency === selectedCurrency &&
          item.attributes.period === 'month' &&
          setFourthCardFilteredByCurencyMonthly(item);
        item?.attributes?.currency === selectedCurrency &&
          item.attributes.period === 'month' &&
          setForthMProduct({
            timePeriod: 'Monthly',
            totalPrice: item.attributes.price,
            selectedCurrency: selectedCurrency,
            vmPlan: {
              sku: fourthCardFilteredByLocation.attributes.sku,
              skuMonthly: item.attributes.sku,
              skuYearly: (
                fourthCardFilteredByLocation?.attributes?.productPrices.data ||
                []
              )
                .filter(
                  (yItem: any) =>
                    yItem?.attributes?.currency === selectedCurrency &&
                    yItem.attributes.period === 'year'
                )
                .map((filteredItem: any) => filteredItem.attributes.sku)[0],
              title: item.attributes.title,
              monthlyPrice: item.attributes.price,
              yearlyPrice: (
                fourthCardFilteredByLocation?.attributes?.productPrices.data ||
                []
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
    fourthCardFilteredByLocation?.attributes?.productPrices.data?.map(
      (item: any) => {
        item?.attributes?.currency === selectedCurrency &&
          item.attributes.period === 'year' &&
          setFourthCardFilteredByCurencyYearly(item);
        item?.attributes?.currency === selectedCurrency &&
          item.attributes.period === 'year' &&
          setForthYProduct({
            timePeriod: 'Yearly',
            totalPrice: item.attributes.price,
            selectedCurrency: selectedCurrency,
            vmPlan: {
              sku: fourthCardFilteredByLocation.attributes.sku,
              skuMonthly: (
                fourthCardFilteredByLocation?.attributes?.productPrices.data ||
                []
              )
                .filter(
                  (yItem: any) =>
                    yItem?.attributes?.currency === selectedCurrency &&
                    yItem.attributes.period === 'month'
                )
                .map((filteredItem: any) => filteredItem.attributes.sku)[0],
              skuYearly: item.attributes.sku,
              title: item.attributes.title,
              monthlyPrice: (
                fourthCardFilteredByLocation?.attributes?.productPrices.data ||
                []
              )
                .filter(
                  (yItem: any) =>
                    yItem?.attributes?.currency === selectedCurrency &&
                    yItem.attributes.period === 'month'
                )
                .map((filteredItem: any) => filteredItem.attributes.price)[0],
              yearlyPrice: item.attributes.price,
            },
            addons: [],
            numericalAddons: [],
          });
      }
    );
  }, [
    selectedCurrency,
    firstCardFilteredByLocation,
    secondCardFilteredByLocation,
    thirdCardFilteredByLocation,
    fourthCardFilteredByLocation,
  ]);

  const { cartItems, setCartItems } = useContext(CartContext);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

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
  const handleLocationChange = (newLocation: any) => {
    // Call the function to update the selectedLocation
    setSelectedLocation(newLocation);
    localStorage.setItem('SELECTED_LOCATION', newLocation);
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
    <div id="pricingcards" className="relative">
      <div className="container mx-auto smallest:w-[90%]">
        <div className="flex justify-center gap-5 py-5 font-['Mont-book'] text-lg text-darkGrey">
          <div>Monthly</div>
          <div
            className={`toggle-switch ${isChecked ? 'on' : 'off'}`}
            onClick={toggleSwitch}
          >
            <div
              className={`${isChecked && 'on' ? 'slider1' : 'slider'}`}
            ></div>
          </div>
          <div>Annual</div>
        </div>
        <div className=" flex  flex-col gap-[46px] rounded-[10px] bg-liliac/10 px-[30px] pt-[65px] pb-[40px]">
          <div className="text-center font-['Mont-bold'] text-2xl text-darkGrey">
            {titleAgencyHosting}
          </div>

          {standardFeatures && (
            <div className="m-auto grid grid-cols-1 gap-y-[40px] gap-x-[20px] px-0 md:grid-cols-2 lg:w-[80%] lg:grid-cols-3 xl:gap-x-[84px] lg:px-5">
              {standardFeatures?.map((item, index) => (
                <span key={index}>
                  <StandardFeaturesCheckList
                    plansTitle={item?.plansTitle ?? ''}
                    checking={item?.checking ?? 'check'}
                  />
                </span>
              ))}
            </div>
          )}
          <div className="m-auto box-border grid w-full rounded-[10px] bg-white py-[32px] px-[40px] text-center shadow-custom xs:max-w-[19rem] heroBreakThree:max-w-[39.875rem] 2xl:max-w-[81.625rem] ">
            <p className='pb-[16px] font-["Mont-regular"] text-[24px] text-purple'>
              Server location
            </p>
            <div className="flex flex-wrap justify-center gap-x-[84px] gap-y-5">
              {locationsData?.map(
                (locationItem: LocationEntity, index: number) => (
                  <label
                    key={index}
                    className="flex gap-[8px] text-left font-['Mont-regular'] text-base text-darkGrey"
                  >
                    <input
                      type="radio"
                      value={locationItem.attributes?.sku}
                      checked={skuLocation === locationItem.attributes?.sku}
                      onChange={() =>
                        handleLocationChange(locationItem.attributes?.name)
                      }
                    />
                    {locationItem.attributes?.description}
                  </label>
                )
              )}
            </div>
          </div>

          <div
            className={`grid gap-[30px] self-center heroBreakThree:grid-cols-2  ${contentVPSFourth?.titleAgyCard
              ? '2xl:grid-cols-4'
              : '2xl:grid-cols-3'
              }`}
          >
            <div>
              <div>
                <div className="flex !h-full  w-[16rem] flex-col justify-between rounded-t-2xl bg-white px-6 py-7 shadow-custom xs:w-[19rem]">
                  <div>
                    <p className="mb-[5px] text-center font-['Mont-bold'] text-2xl text-darkGrey">
                      {contentVPSFirst?.titleAgyCard ?? 'One'}
                    </p>
                    <div className="flex justify-center text-center">
                      <div className="font-['Mont-bold'] text-[38px] leading-[40px] text-darkTeal">
                        {currencySymbol}
                        {!isChecked
                          ? firstCardFilteredByCurencyMonthly?.attributes.price.toFixed(
                            2
                          )
                          : firstCardFilteredByCurencyYearly?.attributes.price.toFixed(
                            2
                          )}
                      </div>
                      <div className="self-end font-['Mont-regular'] text-[14px] text-darkGrey/70">
                        {!isChecked ? '/month' : '/year'}
                      </div>
                    </div>
                    <div className="mt-[9px]  mb-6 text-center font-['Mont-light'] text-base text-darkGrey">
                      <ReactMarkdown>
                        {contentVPSFirst?.descriptionAgyCard ?? ''}
                      </ReactMarkdown>
                    </div>
                  </div>
                  <div className="mb-5 px-8">
                    <div className="font-['Mont-regular'] text-sm prose-strong:font-['Mont-semibold'] prose-li:flex prose-li:gap-[4px] prose-li:text-darkGrey prose-img:h-[13px] prose-img:w-[13px]">
                      <ReactMarkdown>
                        {contentVPSFirst?.performancesAgyCard?.replace(
                          /(\+|-) /g,
                          (match, sign) => {
                            const imageSrc =
                              sign === '+' ? check.src : cros.src;
                            return `${sign} ![](${imageSrc}) `;
                          }
                        ) ?? ''}
                      </ReactMarkdown>
                    </div>
                  </div>
                  <div className="flex justify-center pt-3">
                    <div>
                      <button
                        className=" rounded-full border-2 border-purple bg-purple px-[35px]  py-[12px] text-base font-['Mont-semibold'] text-white transition  duration-500 hover:border-2 hover:border-purple hover:bg-transparent hover:text-purple lg:px-[66px] lg:py-[13px]"
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
                <div className="flex justify-between rounded-b-2xl bg-darkTeal/10 py-[10px] px-5">
                  <div className="whitespace-pre-line text-darkGrey font-['Mont-regular'] prose-strong:font-['Mont-bold'] prose-strong:text-darkTeal">
                    <ReactMarkdown>
                      {contentVPSFirst?.saveText ?? ''}
                    </ReactMarkdown>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-[#696969] line-through">
                      {currencySymbol}
                      {(12 * (firstCardFilteredByCurencyMonthly?.attributes.price)).toFixed(2)}
                    </div>
                    <div className='font-["Mont-bold"] text-[22px] text-priceRed'>
                      {currencySymbol}
                      {firstCardFilteredByCurencyYearly?.attributes.price.toFixed(
                        2
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div>
                <div className="flex !h-full  w-[16rem] flex-col justify-between rounded-t-2xl bg-white px-6 py-7 shadow-custom xs:w-[19rem]">
                  <div>
                    <p className="mb-[5px] text-center font-['Mont-bold'] text-2xl text-darkGrey">
                      {contentVPSSecond?.titleAgyCard ?? 'Startup'}
                    </p>
                    <div className="flex justify-center text-center">
                      <div className="font-['Mont-bold'] text-[38px] leading-[40px] text-darkTeal">
                        {currencySymbol}
                        {!isChecked
                          ? secondCardFilteredByCurencyMonthly?.attributes.price.toFixed(
                            2
                          )
                          : secondCardFilteredByCurencyYearly?.attributes.price.toFixed(
                            2
                          )}
                      </div>
                      <div className="self-end font-['Mont-regular'] text-[14px] text-darkGrey/70">
                        {!isChecked ? '/month' : '/year'}
                      </div>
                    </div>
                    <div className="mt-[9px]  mb-6 text-center font-['Mont-light'] text-base text-darkGrey">
                      <ReactMarkdown>
                        {contentVPSSecond?.descriptionAgyCard ?? ''}
                      </ReactMarkdown>
                    </div>
                  </div>
                  <div className="mb-5 px-8">
                    <div className="font-['Mont-regular'] text-sm prose-strong:font-['Mont-semibold'] prose-li:flex prose-li:gap-[4px] prose-li:text-darkGrey prose-img:h-[13px] prose-img:w-[13px]">
                      <ReactMarkdown>
                        {contentVPSSecond?.performancesAgyCard?.replace(
                          /(\+|-) /g,
                          (match, sign) => {
                            const imageSrc =
                              sign === '+' ? check.src : cros.src;
                            return `${sign} ![](${imageSrc}) `;
                          }
                        ) ?? ''}
                      </ReactMarkdown>
                    </div>
                  </div>
                  <div className="flex justify-center pt-3">
                    <div>
                      <button
                        className=" rounded-full border-2 border-purple bg-purple px-[35px]  py-[12px] text-base font-['Mont-semibold'] text-white transition  duration-500 hover:border-2 hover:border-purple hover:bg-transparent hover:text-purple lg:px-[66px] lg:py-[13px]"
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
              <div className="flex justify-between rounded-b-2xl bg-darkTeal/10 py-[10px] px-5">
                <div className="whitespace-pre-line text-darkGrey font-['Mont-regular'] prose-strong:font-['Mont-bold'] prose-strong:text-darkTeal">
                  <ReactMarkdown>
                    {contentVPSSecond?.saveText ?? ''}
                  </ReactMarkdown>
                </div>
                <div className="text-right">
                  <div className="text-sm text-[#696969] line-through">
                    {currencySymbol}
                    {(12 * (secondCardFilteredByCurencyMonthly?.attributes.price)).toFixed(2)}
                  </div>
                  <div className='font-["Mont-bold"] text-[22px] text-priceRed'>
                    {currencySymbol}
                    {secondCardFilteredByCurencyYearly?.attributes.price.toFixed(
                      2
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div>
                <div className="flex !h-full  w-[16rem] flex-col justify-between rounded-t-2xl bg-white px-6 py-7 shadow-custom xs:w-[19rem]">
                  <div>
                    <p className="mb-[5px] text-center font-['Mont-bold'] text-2xl text-darkGrey">
                      {contentVPSThird?.titleAgyCard ?? 'Grow'}
                    </p>
                    <div className="flex justify-center text-center">
                      <div className="font-['Mont-bold'] text-[38px] leading-[40px] text-darkTeal">
                        {currencySymbol}
                        {!isChecked
                          ? thirdCardFilteredByCurencyMonthly?.attributes.price.toFixed(
                            2
                          )
                          : thirdCardFilteredByCurencyYearly?.attributes.price.toFixed(
                            2
                          )}
                      </div>
                      <div className="self-end font-['Mont-regular'] text-[14px] text-darkGrey/70">
                        {!isChecked ? '/month' : '/year'}
                      </div>
                    </div>
                    <div className="mt-[9px]  mb-6 text-center font-['Mont-light'] text-base text-darkGrey">
                      <ReactMarkdown>
                        {contentVPSThird?.descriptionAgyCard ?? ''}
                      </ReactMarkdown>
                    </div>
                  </div>
                  <div className="mb-5 px-8">
                    <div className="font-['Mont-regular'] text-sm prose-strong:font-['Mont-semibold'] prose-li:flex prose-li:gap-[4px] prose-li:text-darkGrey prose-img:h-[13px] prose-img:w-[13px]">
                      <ReactMarkdown>
                        {contentVPSThird?.performancesAgyCard?.replace(
                          /(\+|-) /g,
                          (match, sign) => {
                            const imageSrc =
                              sign === '+' ? check.src : cros.src;
                            return `${sign} ![](${imageSrc}) `;
                          }
                        ) ?? ''}
                      </ReactMarkdown>
                    </div>
                  </div>
                  <div className="flex justify-center pt-3">
                    <div>
                      <button
                        className=" rounded-full border-2 border-purple bg-purple px-[35px]  py-[12px] text-base font-['Mont-semibold']  text-white transition  duration-500 hover:border-2 hover:border-purple hover:bg-transparent hover:text-purple lg:px-[66px] lg:py-[13px]"
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
              <div className="flex justify-between rounded-b-2xl bg-darkTeal/10 py-[10px] px-5">
                <div className="whitespace-pre-line text-darkGrey font-['Mont-regular'] prose-strong:font-['Mont-bold'] prose-strong:text-darkTeal">
                  <ReactMarkdown>
                    {contentVPSThird?.saveText ?? ''}
                  </ReactMarkdown>
                </div>
                <div className="text-right">
                  <div className="text-sm text-[#696969] line-through">
                    {currencySymbol}
                    {(12 * (thirdCardFilteredByCurencyMonthly?.attributes.price)).toFixed(2)}
                  </div>
                  <div className='font-["Mont-bold"] text-[22px] text-priceRed'>
                    {currencySymbol}
                    {thirdCardFilteredByCurencyYearly?.attributes.price.toFixed(
                      2
                    )}
                  </div>
                </div>
              </div>
            </div>
            {contentVPSFourth?.titleAgyCard && (
              <div>
                <div>
                  <div className="flex !h-full  w-[16rem] flex-col justify-between rounded-t-2xl bg-white px-6 py-7 shadow-custom xs:w-[19rem]">
                    <div>
                      <p className="mb-[5px] text-center font-['Mont-bold'] text-2xl text-darkGrey">
                        {contentVPSFourth?.titleAgyCard ?? 'Scale'}
                      </p>
                      <div className="flex justify-center text-center">
                        <div className="font-['Mont-bold'] text-[38px] leading-[40px] text-darkTeal">
                          {currencySymbol}
                          {!isChecked
                            ? fourthCardFilteredByCurencyMonthly?.attributes.price.toFixed(
                              2
                            )
                            : fourthCardFilteredByCurencyYearly?.attributes.price.toFixed(
                              2
                            )}
                        </div>
                        <div className="self-end font-['Mont-regular'] text-[14px] text-darkGrey/70">
                          {!isChecked ? '/month' : '/year'}
                        </div>
                      </div>
                      <div className="mt-[9px]  mb-6 text-center font-['Mont-book'] text-base text-darkGrey">
                        <ReactMarkdown>
                          {contentVPSFourth?.descriptionAgyCard ?? ''}
                        </ReactMarkdown>
                      </div>
                    </div>
                    <div className="mb-5 px-8">
                      <div className="font-['Mont-regular'] text-sm prose-strong:font-['Mont-bold'] prose-li:flex prose-li:gap-[4px] prose-li:text-darkGrey prose-img:h-[13px] prose-img:w-[13px]">
                        <ReactMarkdown>
                          {contentVPSFourth?.performancesAgyCard?.replace(
                            /(\+|-) /g,
                            (match, sign) => {
                              const imageSrc =
                                sign === '+' ? check.src : cros.src;
                              return `${sign} ![](${imageSrc}) `;
                            }
                          ) ?? ''}
                        </ReactMarkdown>
                      </div>
                    </div>
                    <div className="flex justify-center pt-3">
                      <div>
                        <button
                          className=" rounded-full border-2 border-purple bg-purple px-[35px]  py-[12px] text-base font-['Mont-semibold'] text-white transition  duration-500 hover:border-2 hover:border-purple hover:bg-transparent hover:text-purple lg:px-[66px] lg:py-[13px]"
                          onClick={() => {
                            onClickAddToCart(
                              !isChecked ? forthMProduct : forthYProduct
                            );
                          }}
                        >
                          Buy
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between rounded-b-2xl bg-darkTeal/10 py-[10px] px-5">
                    <div className="whitespace-pre-line text-darkGrey font-['Mont-regular'] prose-strong:font-['Mont-bold'] prose-strong:text-darkTeal">
                      <ReactMarkdown>
                        {contentVPSFourth?.saveText ?? ''}
                      </ReactMarkdown>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-[#696969] line-through">
                        {currencySymbol}
                        {(12 * (fourthCardFilteredByCurencyMonthly?.attributes.price)).toFixed(2)}
                      </div>
                      <div className='font-["Mont-bold"] text-[22px] text-priceRed'>
                        {currencySymbol}
                        {fourthCardFilteredByCurencyYearly?.attributes.price.toFixed(
                          2
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {isSubmitted && <AddToCartPopUp />}
        </div>
      </div>
    </div>
  );
}
export default AgencyHostingVpsBlock;
