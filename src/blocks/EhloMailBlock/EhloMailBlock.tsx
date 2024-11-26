import { ComponentPageBlocksEhloMail, ProductPriceEntity } from '@utils/types';
import React, { useContext, useEffect, useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import check from './assets/check.svg';
import { CurrencyContext } from '@utils/contexts/currencyContext';
import {
  CustomVpsInterface,
  CustomVpsNumericalAddonInterface,
  TimePeriods,
  VmPlanInterface,
} from '@pages/vps/types';
import CartContext from '@utils/contexts/cartContext';
import AddToCartPopUp from '@components/AddToCartPopUp';
import { LocationContext } from '@utils/contexts/locationContext';
import cros from './assets/cros.svg';

function EhloMailBlock({
  ehloFirstCard,
  ehloSecondCard,
  ehloThirdCard,
}: ComponentPageBlocksEhloMail): JSX.Element {
  const { selectedCurrency, currencySymbol } = useContext(CurrencyContext);
  const [isChecked, setIsChecked] = useState(false);

  const [liteData, setLiteData] = useState<number>(1);
  const [standardData, setStandardData] = useState<number>(1);
  const [professionalData, setProfessionalData] = useState<number>(1);

  const [firstCardByCurencyMonthly, setFirstCardByCurencyMonthly] =
    useState<any>();
  const [firstCardByCurencyYearly, setFirstCardByCurencyYearly] =
    useState<any>();
  const [secondCardByCurencyMonthly, setSecondCardByCurencyMonthly] =
    useState<any>();
  const [secondCardByCurencyYearly, setSecondCardByCurencyYearly] =
    useState<any>();
  const [thirdCardByCurencyMonthly, setThirdCardByCurencyMonthly] =
    useState<any>();
  const [thirdCardByCurencyYearly, setThirdCardByCurencyYearly] =
    useState<any>();
  const toggleSwitch = () => {
    setIsChecked(!isChecked);
  };
  const { skuLocation } = useContext(LocationContext);
  const [firstMProduct, setFirstMProduct] = useState<CustomVpsInterface>();
  const [firstYProduct, setFirstYProduct] = useState<CustomVpsInterface>();
  const [secondMProduct, setSecondMProduct] = useState<CustomVpsInterface>();
  const [secondYProduct, setSecondYProduct] = useState<CustomVpsInterface>();
  const [thirdMProduct, setThirdMProduct] = useState<CustomVpsInterface>();
  const [thirdYProduct, setThirdYProduct] = useState<CustomVpsInterface>();
  const [adonMF, setAdonMF] = useState<CustomVpsNumericalAddonInterface>();
  const [adonYF, setAdonYF] = useState<CustomVpsNumericalAddonInterface>();
  const [adonMS, setAdonMS] = useState<CustomVpsNumericalAddonInterface>();
  const [adonYS, setAdonYS] = useState<CustomVpsNumericalAddonInterface>();
  const [adonMT, setAdonMT] = useState<CustomVpsNumericalAddonInterface>();
  const [adonYT, setAdonYT] = useState<CustomVpsNumericalAddonInterface>();
  const [vmMF, setVmMF] = useState<VmPlanInterface>();
  const [vmYF, setVmYF] = useState<VmPlanInterface>();
  const [vmMS, setVmMS] = useState<VmPlanInterface>();
  const [vmYS, setVmYS] = useState<VmPlanInterface>();
  const [vmMT, setVmMT] = useState<VmPlanInterface>();
  const [vmYT, setVmYT] = useState<VmPlanInterface>();

  useEffect(() => {
    adonMF &&
      vmMF &&
      setFirstMProduct({
        vmPlan: vmMF,
        timePeriod: 'Monthly',
        totalPrice: firstCardByCurencyMonthly + vmMF.monthlyPrice,
        selectedCurrency: selectedCurrency,
        addons: [],
        numericalAddons: [adonMF],
      });
    adonYF &&
      vmYF &&
      setFirstYProduct({
        vmPlan: vmYF,
        timePeriod: 'Yearly',
        totalPrice: firstCardByCurencyYearly + vmYF.yearlyPrice,
        selectedCurrency: selectedCurrency,
        addons: [],
        numericalAddons: [adonYF],
      });
    adonMS &&
      vmMS &&
      setSecondMProduct({
        vmPlan: vmMS,
        timePeriod: 'Monthly',
        totalPrice: secondCardByCurencyMonthly + vmMS.monthlyPrice,
        selectedCurrency: selectedCurrency,
        addons: [],
        numericalAddons: [adonMS],
      });
    adonYS &&
      vmYS &&
      setSecondYProduct({
        vmPlan: vmYS,
        timePeriod: 'Yearly',
        totalPrice: secondCardByCurencyYearly + vmYS.yearlyPrice,
        selectedCurrency: selectedCurrency,
        addons: [],
        numericalAddons: [adonYS],
      });
    adonMT &&
      vmMT &&
      setThirdMProduct({
        vmPlan: vmMT,
        timePeriod: 'Monthly',
        totalPrice: thirdCardByCurencyMonthly + vmMT.monthlyPrice,
        selectedCurrency: selectedCurrency,
        addons: [],
        numericalAddons: [adonMT],
      });
    adonYT &&
      vmYT &&
      setThirdYProduct({
        vmPlan: vmYT,
        timePeriod: 'Yearly',
        totalPrice: thirdCardByCurencyYearly + vmYT.yearlyPrice,
        selectedCurrency: selectedCurrency,
        addons: [],
        numericalAddons: [adonYT],
      });
  }, [
    firstCardByCurencyMonthly,
    firstCardByCurencyYearly,
    secondCardByCurencyMonthly,
    secondCardByCurencyYearly,
    thirdCardByCurencyMonthly,
    thirdCardByCurencyYearly,
    adonMF,
    vmMF,
    adonYF,
    vmYF,
    adonMS,
    vmMS,
    adonYS,
    vmYS,
    adonMT,
    vmMT,
    adonYT,
    vmYT,
  ]);

  const getBothSkuOfProduct = (
    selection: ProductPriceEntity[] | undefined,
    timePeriod: TimePeriods
  ) => {
    const selected = selection?.find(
      (item) =>
        item.attributes?.sku.includes(timePeriod) &&
        item.attributes.currency === selectedCurrency
    );
    return selected?.attributes?.sku;
  };
  const getBothPricesOfProduct = (
    selection: ProductPriceEntity[] | undefined,
    timePeriod: TimePeriods
  ) => {
    if (
      !selection ||
      !selection[0]?.attributes?.tiers ||
      selection[0]?.attributes.tiers?.length === 0
    ) {
      const selected = selection?.find(
        (item) =>
          item.attributes?.sku.includes(timePeriod) &&
          item.attributes.currency === selectedCurrency
      );
      return selected?.attributes?.price !== null
        ? selected?.attributes?.price
        : 0;
    }
  };
  setFirstCardByCurencyMonthly;
  //console.log();

  useEffect(() => {
    //first card price monthly
    ehloFirstCard?.ehlo_products?.data.map((item) => {
      item.attributes?.productType === 'addon' &&
        item.attributes?.productPrices?.data?.map((itemPrice) => {
          itemPrice.attributes?.currency === selectedCurrency &&
            itemPrice.attributes.period === 'month' &&
            itemPrice.attributes.tiers.map(
              (tier: any) =>
                tier.starting_unit <= liteData &&
                (tier.ending_unit >= liteData || !tier.ending_unit) &&
                setFirstCardByCurencyMonthly(tier.price * liteData)
            );

          itemPrice.attributes?.currency === selectedCurrency &&
            itemPrice.attributes.period === 'month' &&
            setAdonMF({
              sku: item.attributes?.sku || '',
              title: item.attributes?.title || '',
              amountSelected: liteData,
              min: 0,
              max: 100,
              increment: 1,
              selectedCurrency: selectedCurrency,
              skuMonthly: itemPrice.attributes.sku,
              skuYearly: (item.attributes?.productPrices?.data || [])
                .filter(
                  (yItem: any) =>
                    yItem?.attributes?.currency === selectedCurrency &&
                    yItem.attributes.period === 'year'
                )
                .map((filteredItem: any) => filteredItem.attributes.sku)[0],
              monthlyPrice: itemPrice.attributes.tiers
                .map(
                  (tier: any) =>
                    tier.starting_unit <= liteData &&
                    (tier.ending_unit >= liteData || !tier.ending_unit) &&
                    tier.price * liteData
                )
                .filter((price: any) => typeof price === 'number')
                .reduce((total: number, price: number) => total + price, 0),
              yearlyPrice: 0,
            });
        });

      item.attributes?.productType === 'plan' &&
        setVmMF({
          sku: item.attributes.sku,
          title: item.attributes.title,
          skuMonthly: getBothSkuOfProduct(
            item.attributes.productPrices?.data,
            TimePeriods.Monthly
          ),
          skuYearly: getBothSkuOfProduct(
            item.attributes.productPrices?.data,
            TimePeriods.Yearly
          ),
          monthlyPrice: getBothPricesOfProduct(
            item.attributes.productPrices?.data,
            TimePeriods.Monthly
          ),
          yearlyPrice: getBothPricesOfProduct(
            item.attributes.productPrices?.data,
            TimePeriods.Yearly
          ),
        });
    });

    //first card price yearly
    ehloFirstCard?.ehlo_products?.data.map((item) => {
      item.attributes?.productType === 'addon' &&
        item.attributes?.productPrices?.data?.map((itemPrice) => {
          itemPrice.attributes?.currency === selectedCurrency &&
            itemPrice.attributes.period === 'year' &&
            itemPrice.attributes.tiers.map(
              (tier: any) =>
                tier.starting_unit <= liteData &&
                (tier.ending_unit >= liteData || !tier.ending_unit) &&
                setFirstCardByCurencyYearly(tier.price * liteData)
            );
          itemPrice.attributes?.currency === selectedCurrency &&
            itemPrice.attributes.period === 'year' &&
            setAdonYF({
              sku: item.attributes?.sku || '',
              title: item.attributes?.title || '',
              amountSelected: liteData,
              min: 0,
              max: 100,
              increment: 1,
              selectedCurrency: selectedCurrency,
              skuMonthly: (item.attributes?.productPrices?.data || [])
                .filter(
                  (yItem: any) =>
                    yItem?.attributes?.currency === selectedCurrency &&
                    yItem.attributes.period === 'month'
                )
                .map((filteredItem: any) => filteredItem.attributes.sku)[0],
              skuYearly: itemPrice.attributes.sku,
              monthlyPrice: 0,
              yearlyPrice: itemPrice.attributes.tiers
                .map(
                  (tier: any) =>
                    tier.starting_unit <= liteData &&
                    (tier.ending_unit >= liteData || !tier.ending_unit) &&
                    tier.price * liteData
                )
                .filter((price: any) => typeof price === 'number')
                .reduce((total: number, price: number) => total + price, 0),
            });
        });
      item.attributes?.productType === 'plan' &&
        setVmYF({
          sku: item.attributes.sku,
          title: item.attributes.title,
          skuMonthly: getBothSkuOfProduct(
            item.attributes.productPrices?.data,
            TimePeriods.Monthly
          ),
          skuYearly: getBothSkuOfProduct(
            item.attributes.productPrices?.data,
            TimePeriods.Yearly
          ),
          monthlyPrice: getBothPricesOfProduct(
            item.attributes.productPrices?.data,
            TimePeriods.Monthly
          ),
          yearlyPrice: getBothPricesOfProduct(
            item.attributes.productPrices?.data,
            TimePeriods.Yearly
          ),
        });
    });

    //second card price monthly
    ehloSecondCard?.ehlo_products?.data.map((item) => {
      item.attributes?.productType === 'addon' &&
        item.attributes?.productPrices?.data?.map((itemPrice) => {
          itemPrice.attributes?.currency === selectedCurrency &&
            itemPrice.attributes.period === 'month' &&
            itemPrice.attributes.tiers.map(
              (tier: any) =>
                tier.starting_unit <= standardData &&
                (tier.ending_unit >= standardData || !tier.ending_unit) &&
                setSecondCardByCurencyMonthly(tier.price * standardData)
            );
          itemPrice.attributes?.currency === selectedCurrency &&
            itemPrice.attributes.period === 'month' &&
            setAdonMS({
              sku: item.attributes?.sku || '',
              title: item.attributes?.title || '',
              amountSelected: standardData,
              min: 0,
              max: 100,
              increment: 1,
              selectedCurrency: selectedCurrency,
              skuMonthly: itemPrice.attributes.sku,
              skuYearly: (item.attributes?.productPrices?.data || [])
                .filter(
                  (yItem: any) =>
                    yItem?.attributes?.currency === selectedCurrency &&
                    yItem.attributes.period === 'year'
                )
                .map((filteredItem: any) => filteredItem.attributes.sku)[0],
              monthlyPrice: itemPrice.attributes.tiers
                .map(
                  (tier: any) =>
                    tier.starting_unit <= standardData &&
                    (tier.ending_unit >= standardData || !tier.ending_unit) &&
                    tier.price * standardData
                )
                .filter((price: any) => typeof price === 'number')
                .reduce((total: number, price: number) => total + price, 0),
              yearlyPrice: 0,
            });
        });
      item.attributes?.productType === 'plan' &&
        setVmMS({
          sku: item.attributes.sku,
          title: item.attributes.title,
          skuMonthly: getBothSkuOfProduct(
            item.attributes.productPrices?.data,
            TimePeriods.Monthly
          ),
          skuYearly: getBothSkuOfProduct(
            item.attributes.productPrices?.data,
            TimePeriods.Yearly
          ),
          monthlyPrice: getBothPricesOfProduct(
            item.attributes.productPrices?.data,
            TimePeriods.Monthly
          ),
          yearlyPrice: getBothPricesOfProduct(
            item.attributes.productPrices?.data,
            TimePeriods.Yearly
          ),
        });
    });
    //second card price yearly
    ehloSecondCard?.ehlo_products?.data.map((item) => {
      item.attributes?.productType === 'addon' &&
        item.attributes?.productPrices?.data?.map((itemPrice) => {
          itemPrice.attributes?.currency === selectedCurrency &&
            itemPrice.attributes.period === 'year' &&
            itemPrice.attributes.tiers.map(
              (tier: any) =>
                tier.starting_unit <= standardData &&
                (tier.ending_unit >= standardData || !tier.ending_unit) &&
                setSecondCardByCurencyYearly(tier.price * standardData)
            );
          itemPrice.attributes?.currency === selectedCurrency &&
            itemPrice.attributes.period === 'year' &&
            setAdonYS({
              sku: item.attributes?.sku || '',
              title: item.attributes?.title || '',
              amountSelected: standardData,
              min: 0,
              max: 100,
              increment: 1,
              selectedCurrency: selectedCurrency,
              skuMonthly: (item.attributes?.productPrices?.data || [])
                .filter(
                  (yItem: any) =>
                    yItem?.attributes?.currency === selectedCurrency &&
                    yItem.attributes.period === 'month'
                )
                .map((filteredItem: any) => filteredItem.attributes.sku)[0],
              skuYearly: itemPrice.attributes.sku,
              monthlyPrice: 0,
              yearlyPrice: itemPrice.attributes.tiers
                .map(
                  (tier: any) =>
                    tier.starting_unit <= standardData &&
                    (tier.ending_unit >= standardData || !tier.ending_unit) &&
                    tier.price * standardData
                )
                .filter((price: any) => typeof price === 'number')
                .reduce((total: number, price: number) => total + price, 0),
            });
        });
      item.attributes?.productType === 'plan' &&
        setVmYS({
          sku: item.attributes.sku,
          title: item.attributes.title,
          skuMonthly: getBothSkuOfProduct(
            item.attributes.productPrices?.data,
            TimePeriods.Monthly
          ),
          skuYearly: getBothSkuOfProduct(
            item.attributes.productPrices?.data,
            TimePeriods.Yearly
          ),
          monthlyPrice: getBothPricesOfProduct(
            item.attributes.productPrices?.data,
            TimePeriods.Monthly
          ),
          yearlyPrice: getBothPricesOfProduct(
            item.attributes.productPrices?.data,
            TimePeriods.Yearly
          ),
        });
    });

    //third card price monthly
    ehloThirdCard?.ehlo_products?.data.map((item) => {
      item.attributes?.productType === 'addon' &&
        item.attributes?.productPrices?.data?.map((itemPrice) => {
          itemPrice.attributes?.currency === selectedCurrency &&
            itemPrice.attributes.period === 'month' &&
            itemPrice.attributes.tiers.map(
              (tier: any) =>
                tier.starting_unit <= professionalData &&
                (tier.ending_unit >= professionalData || !tier.ending_unit) &&
                setThirdCardByCurencyMonthly(tier.price * professionalData)
            );
          itemPrice.attributes?.currency === selectedCurrency &&
            itemPrice.attributes.period === 'month' &&
            setAdonMT({
              sku: item.attributes?.sku || '',
              title: item.attributes?.title || '',
              amountSelected: professionalData,
              min: 0,
              max: 100,
              increment: 1,
              selectedCurrency: selectedCurrency,
              skuMonthly: itemPrice.attributes.sku,
              skuYearly: (item.attributes?.productPrices?.data || [])
                .filter(
                  (yItem: any) =>
                    yItem?.attributes?.currency === selectedCurrency &&
                    yItem.attributes.period === 'year'
                )
                .map((filteredItem: any) => filteredItem.attributes.sku)[0],
              monthlyPrice: itemPrice.attributes.tiers
                .map(
                  (tier: any) =>
                    tier.starting_unit <= professionalData &&
                    (tier.ending_unit >= professionalData ||
                      !tier.ending_unit) &&
                    tier.price * professionalData
                )
                .filter((price: any) => typeof price === 'number')
                .reduce((total: number, price: number) => total + price, 0),
              yearlyPrice: 0,
            });
        });
      item.attributes?.productType === 'plan' &&
        setVmMT({
          sku: item.attributes.sku,
          title: item.attributes.title,
          skuMonthly: getBothSkuOfProduct(
            item.attributes.productPrices?.data,
            TimePeriods.Monthly
          ),
          skuYearly: getBothSkuOfProduct(
            item.attributes.productPrices?.data,
            TimePeriods.Yearly
          ),
          monthlyPrice: getBothPricesOfProduct(
            item.attributes.productPrices?.data,
            TimePeriods.Monthly
          ),
          yearlyPrice: getBothPricesOfProduct(
            item.attributes.productPrices?.data,
            TimePeriods.Yearly
          ),
        });
    });
    //third card price yearly
    ehloThirdCard?.ehlo_products?.data.map((item) => {
      item.attributes?.productType === 'addon' &&
        item.attributes?.productPrices?.data?.map((itemPrice) => {
          itemPrice.attributes?.currency === selectedCurrency &&
            itemPrice.attributes.period === 'year' &&
            itemPrice.attributes.tiers.map(
              (tier: any) =>
                tier.starting_unit <= professionalData &&
                (tier.ending_unit >= professionalData || !tier.ending_unit) &&
                setThirdCardByCurencyYearly(tier.price * professionalData)
            );
          itemPrice.attributes?.currency === selectedCurrency &&
            itemPrice.attributes.period === 'year' &&
            setAdonYT({
              sku: item.attributes?.sku || '',
              title: item.attributes?.title || '',
              amountSelected: professionalData,
              min: 0,
              max: 100,
              increment: 1,
              selectedCurrency: selectedCurrency,
              skuMonthly: (item.attributes?.productPrices?.data || [])
                .filter(
                  (yItem: any) =>
                    yItem?.attributes?.currency === selectedCurrency &&
                    yItem.attributes.period === 'month'
                )
                .map((filteredItem: any) => filteredItem.attributes.sku)[0],
              skuYearly: itemPrice.attributes.sku,
              monthlyPrice: 0,
              yearlyPrice: itemPrice.attributes.tiers
                .map(
                  (tier: any) =>
                    tier.starting_unit <= professionalData &&
                    (tier.ending_unit >= professionalData ||
                      !tier.ending_unit) &&
                    tier.price * professionalData
                )
                .filter((price: any) => typeof price === 'number')
                .reduce((total: number, price: number) => total + price, 0),
            });
        });
      item.attributes?.productType === 'plan' &&
        setVmYT({
          sku: item.attributes.sku,
          title: item.attributes.title,
          skuMonthly: getBothSkuOfProduct(
            item.attributes.productPrices?.data,
            TimePeriods.Monthly
          ),
          skuYearly: getBothSkuOfProduct(
            item.attributes.productPrices?.data,
            TimePeriods.Yearly
          ),
          monthlyPrice: getBothPricesOfProduct(
            item.attributes.productPrices?.data,
            TimePeriods.Monthly
          ),
          yearlyPrice: getBothPricesOfProduct(
            item.attributes.productPrices?.data,
            TimePeriods.Yearly
          ),
        });
    });
  }, [selectedCurrency, liteData, professionalData, standardData]);

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
    <div className="mx-auto w-[90%] max-w-[1100px] md:w-[90%] xlSpecial:w-[77%] ">
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
        <div className="flex flex-wrap justify-center gap-[30px] self-center">
          <div>
            <div>
              <div className="flex !h-full  xs:w-[19rem] w-[16rem] flex-col justify-between rounded-t-2xl bg-white px-9 py-7 shadow-custom">
                <div>
                  <p className="mb-[5px] text-center font-['Mont-bold'] text-2xl text-darkGrey">
                    {ehloFirstCard?.titleEhloBox ?? 'Lite'}
                  </p>
                  <div className="flex justify-center text-center">
                    <div className="font-['Mont-bold'] text-[38px] leading-[40px] text-darkTeal">
                      {currencySymbol}
                      {!isChecked
                        ? (
                          firstCardByCurencyMonthly + vmMF?.monthlyPrice
                        )?.toFixed(2)
                        : (
                          firstCardByCurencyYearly + vmYF?.yearlyPrice
                        )?.toFixed(2)}
                    </div>
                    <div className="self-end font-['Mont-regular'] text-[14px] text-darkGrey/70">
                      {!isChecked ? '/month' : '/year'}
                    </div>
                  </div>
                  <div className="mt-[9px]  mb-6 text-center font-['Mont-light'] text-base text-darkGrey">
                    <ReactMarkdown>
                      {ehloFirstCard?.descriptionEhloBox ?? ''}
                    </ReactMarkdown>
                  </div>
                </div>
                <div className="mb-5 min-h-[144px]">
                  <div className="h-full font-['Mont-book'] text-sm prose-strong:font-['Mont-semibold'] prose-li:flex prose-li:gap-[4px] prose-li:text-darkGrey prose-img:h-[13px] prose-img:w-[13px]">
                    <ReactMarkdown>
                      {ehloFirstCard?.performancesEhloBox?.replace(
                        /(\+|-) /g,
                        (match, sign) => {
                          const imageSrc = sign === '+' ? check.src : cros.src;
                          return `${sign} ![](${imageSrc}) `;
                        }
                      ) ?? ''}
                    </ReactMarkdown>
                  </div>
                </div>
                <div className="font-['Mont-book'] text-base text-black">
                  How many mailboxes?
                  <input
                    type="number"
                    id="lite"
                    name="lite"
                    value={liteData}
                    onChange={(e) => {
                      const newValue = Number(e.target.value);
                      if (newValue >= 1 && newValue <= 100) {
                        setLiteData(newValue);
                      } else if (newValue < 1) {
                        setLiteData(1);
                      } else {
                        setLiteData(100);
                      }
                    }}
                    placeholder="1 user"
                    min="1"
                    max="100"
                    className="mt-2 w-full rounded-xl border-[1px] border-lightGrey bg-white py-3 pl-6 pr-3 text-base md:mb-0"
                  />
                </div>
                <div className="flex justify-center pt-3">
                  <div>
                    <button
                      className=" rounded-full border-2 font-['Mont-semibold'] border-purple bg-purple px-[35px]  py-[12px] text-base  text-white transition  duration-500 hover:border-2 hover:border-purple hover:bg-transparent hover:text-purple lg:px-[66px] lg:py-[13px]"
                      onClick={() => {
                        onClickAddToCart(
                          !isChecked ? firstMProduct : firstYProduct
                        );
                      }}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex justify-between rounded-b-2xl bg-darkTeal/10 py-[10px] px-5">
                <div className="whitespace-pre-line text-darkGrey font-['Mont-regular'] prose-strong:font-['Mont-bold'] prose-strong:text-darkTeal">
                  <ReactMarkdown>
                    {ehloFirstCard?.saveTextEhlo ?? ''}
                  </ReactMarkdown>
                </div>
                <div className="text-right">
                  <div className="text-sm text-[#696969] line-through">
                    {currencySymbol}
                    {(12 * (firstCardByCurencyMonthly + vmMF?.monthlyPrice)).toFixed(2)}
                  </div>
                  <div className='font-["Mont-bold"] text-[22px] text-pink'>
                    {currencySymbol}
                    {(firstCardByCurencyYearly + vmYF?.yearlyPrice)?.toFixed(2)}
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
                    {ehloSecondCard?.titleEhloBox ?? 'Startup'}
                  </p>
                  <div className="flex justify-center text-center">
                    <div className="font-['Mont-bold'] text-[38px] leading-[40px] text-darkTeal">
                      {currencySymbol}
                      {!isChecked
                        ? (
                          secondCardByCurencyMonthly + vmMS?.monthlyPrice
                        ).toFixed(2)
                        : (
                          secondCardByCurencyYearly + vmYS?.yearlyPrice
                        ).toFixed(2)}
                    </div>
                    <div className="self-end font-['Mont-regular'] text-[14px] text-darkGrey/70">
                      {!isChecked ? '/month' : '/year'}
                    </div>
                  </div>
                  <div className="mt-[9px]  mb-6 text-center font-['Mont-light'] text-base text-darkGrey">
                    <ReactMarkdown>
                      {ehloSecondCard?.descriptionEhloBox ?? ''}
                    </ReactMarkdown>
                  </div>
                </div>
                <div className="mb-5 min-h-[144px]">
                  <div className="font-['Mont-book'] text-sm prose-strong:font-['Mont-semibold'] prose-li:flex prose-li:gap-[4px] prose-li:text-darkGrey prose-img:h-[13px] prose-img:w-[13px]">
                    <ReactMarkdown>
                      {ehloSecondCard?.performancesEhloBox?.replace(
                        /(\+|-) /g,
                        (match, sign) => {
                          const imageSrc = sign === '+' ? check.src : cros.src;
                          return `${sign} ![](${imageSrc}) `;
                        }
                      ) ?? ''}
                    </ReactMarkdown>
                  </div>
                </div>
                <div className="font-['Mont-book'] text-base text-black">
                  How many mailboxes?
                  <input
                    type="number"
                    id="standard"
                    name="standard"
                    value={standardData}
                    min="1"
                    max="100"
                    onChange={(e) => {
                      const newValue = Number(e.target.value);
                      if (newValue >= 1 && newValue <= 100) {
                        setStandardData(newValue);
                      } else if (newValue < 1) {
                        setStandardData(1);
                      } else {
                        setStandardData(100);
                      }
                    }}
                    placeholder="1 user"
                    className="mt-2 w-full rounded-xl border-[1px] border-lightGrey bg-white py-3 pl-6 pr-3 text-base md:mb-0"
                  />
                </div>
                <div className="flex justify-center pt-3">
                  <div>
                    <button
                      className=" rounded-full border-2 font-['Mont-semibold'] border-purple bg-purple px-[35px]  py-[12px] text-base text-white transition  duration-500 hover:border-2 hover:border-purple hover:bg-transparent hover:text-purple lg:px-[66px] lg:py-[13px]"
                      onClick={() => {
                        onClickAddToCart(
                          !isChecked ? secondMProduct : secondYProduct
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
              <div className="whitespace-pre-line text-darkGrey font-['Mont-regular'] prose-strong:font-['Mont-bold'] prose-strong:text-darkTeal">
                <ReactMarkdown>
                  {ehloSecondCard?.saveTextEhlo ?? ''}
                </ReactMarkdown>
              </div>
              <div className="text-right">
                <div className="text-sm text-[#696969] line-through">
                  {currencySymbol}
                  {(12 * (secondCardByCurencyMonthly + vmMF?.monthlyPrice)).toFixed(2)}
                </div>
                <div className='font-["Mont-bold"] text-[22px] text-pink'>
                  {currencySymbol}
                  {(secondCardByCurencyYearly + vmYS?.yearlyPrice).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div className="flex !h-full  xs:w-[19rem] w-[16rem] flex-col justify-between rounded-t-2xl bg-white px-9 py-7 shadow-custom">
                <div>
                  <p className="mb-[5px] text-center font-['Mont-bold'] text-2xl text-darkGrey">
                    {ehloThirdCard?.titleEhloBox ?? 'Grow'}
                  </p>
                  <div className="flex justify-center text-center">
                    <div className="font-['Mont-bold'] text-[38px] leading-[40px] text-darkTeal">
                      {currencySymbol}
                      {!isChecked
                        ? (
                          thirdCardByCurencyMonthly + vmMT?.monthlyPrice
                        ).toFixed(2)
                        : (
                          thirdCardByCurencyYearly + vmYT?.yearlyPrice
                        ).toFixed(2)}
                    </div>
                    <div className="self-end font-['Mont-regular'] text-[14px] text-darkGrey/70">
                      {!isChecked ? '/month' : '/year'}
                    </div>
                  </div>
                  <div className="mt-[9px]  mb-6 text-center font-['Mont-light'] text-base text-darkGrey">
                    <ReactMarkdown>
                      {ehloThirdCard?.descriptionEhloBox ?? ''}
                    </ReactMarkdown>
                  </div>
                </div>
                <div className="mb-5 min-h-[144px]">
                  <div className="font-['Mont-book'] text-sm prose-strong:font-['Mont-semibold'] prose-li:flex prose-li:gap-[4px] prose-li:text-darkGrey prose-img:h-[13px] prose-img:w-[13px]">
                    <ReactMarkdown>
                      {ehloThirdCard?.performancesEhloBox?.replace(
                        /(\+|-) /g,
                        (match, sign) => {
                          const imageSrc = sign === '+' ? check.src : cros.src;
                          return `${sign} ![](${imageSrc}) `;
                        }
                      ) ?? ''}
                    </ReactMarkdown>
                  </div>
                </div>
                <div className="font-['Mont-book'] text-base text-black">
                  How many mailboxes?
                  <input
                    type="number"
                    id="professional"
                    name="professional"
                    value={professionalData}
                    onChange={(e) => {
                      const newValue = Number(e.target.value);
                      if (newValue >= 1 && newValue <= 100) {
                        setProfessionalData(newValue);
                      } else if (newValue < 1) {
                        setProfessionalData(1);
                      } else {
                        setProfessionalData(100);
                      }
                    }}
                    placeholder="1 user"
                    className="mt-2 w-full rounded-xl border-[1px] border-lightGrey bg-white py-3 pl-6 pr-3 text-base md:mb-0"
                  />
                </div>
                <div className="flex justify-center pt-3">
                  <div>
                    <button
                      className=" rounded-full border-2 border-purple font-['Mont-semibold'] bg-purple px-[35px]  py-[12px] text-base  text-white transition  duration-500 hover:border-2 hover:border-purple hover:bg-transparent hover:text-purple lg:px-[66px] lg:py-[13px]"
                      onClick={() => {
                        onClickAddToCart(
                          !isChecked ? thirdMProduct : thirdYProduct
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
              <div className="whitespace-pre-line text-darkGrey font-['Mont-regular'] prose-strong:font-['Mont-bold'] prose-strong:text-darkTeal">
                <ReactMarkdown>
                  {ehloThirdCard?.saveTextEhlo ?? ''}
                </ReactMarkdown>
              </div>
              <div className="text-right">
                <div className="text-sm text-[#696969] line-through">
                  {currencySymbol}
                  {(12 * (thirdCardByCurencyMonthly + vmMF?.monthlyPrice)).toFixed(2)}
                </div>
                <div className='font-["Mont-bold"] text-[22px] text-pink'>
                  {currencySymbol}
                  {(thirdCardByCurencyYearly + vmYT?.yearlyPrice).toFixed(2)}
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
export default EhloMailBlock;
