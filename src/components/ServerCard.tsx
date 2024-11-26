import React, { useCallback, useContext, useEffect, useState } from 'react';
import CheckListItem, { P as CheckListItemsProps } from './CheckListItem';
import ReactMarkdown from 'react-markdown';
import {
  CustomVpsAddonInterface,
  CustomVpsInterface,
  CustomVpsNumericalAddonInterface,
  IDropDownGroup,
  ProductInterface,
  ProductPriceInterface,
  ProductResponseInterface,
  TimePeriods,
  VmPlanInterface,
  EditVpsInterface,
} from '@pages/vps/types';
import { LocationContext } from '@utils/contexts/locationContext';
import EditVPSContext from '@utils/contexts/editVPSContext';
import { CurrencyContext } from '@utils/contexts/currencyContext';
import CartContext from '@utils/contexts/cartContext';
import { useLazyQuery } from '@apollo/client';
import { VM_ADDONS_QUERY, VM_PORDUCTS_QUERY } from '@utils/queries';

interface P {
  title: string;
  monthPrice: number;
  valuta: 'dollar' | 'euro' | 'pound';
  annualPrice: number;
  description: string;
  ctaFirstButton: string;
  linkFirstButton: string;
  ctaSecondButton: string;
  linkSecondButton: string;
  checklistItems: CheckListItemsProps[];
  cartValue: CustomVpsInterface;
}

type AddonLimitType = {
  limitter?: string;
  group: string;
  limitType: string;
  limit: string | number;
};

function ServerCard({
  title,
  monthPrice,
  annualPrice,
  valuta,
  description,
  ctaFirstButton,
  linkFirstButton,
  checklistItems,
  ctaSecondButton,
  linkSecondButton,
  cartValue,
}: P): JSX.Element {
  const { selectedLocation, setSelectedLocation } = useContext(LocationContext);
  const { editVPSItems, setEditVPSItems } = useContext(EditVPSContext);
  const { selectedCurrency, currencySymbol } = useContext(CurrencyContext);
  const { cartItems, setCartItems } = useContext(CartContext);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const [TimePeriod, setTimePeriod] = useState<TimePeriods>(
    TimePeriods.Monthly
  );
  const [numericalAddOns, setNumericalAddOns] = useState<ProductInterface[]>(
    []
  );

  const [dropDownGroups, setDropDownGroups] = useState<IDropDownGroup[]>([]);
  const [addonLimit, setAddonLimit] = useState<AddonLimitType[]>();
  const [otherAddons, setOtherAddons] = useState<ProductInterface[]>([]);
  const [selectedVmPlan, setSelectedVmPlan] = useState<VmPlanInterface>();
  const [selectedAddons, setSelectedAddons] = useState<
    CustomVpsAddonInterface[]
  >([]);
  const [selectedNumericalAddons, setSelectedNumericalAddons] = useState<
    CustomVpsNumericalAddonInterface[]
  >([]);

  const [totalMonthlyPrice, setTotalMonthlyPrice] = useState<number>(0);
  const [totalYearlyPrice, setTotalYearlyPrice] = useState<number>(0);

  const [accessToken, setAccessToken] = useState<string>('');
  const [refreshToken, setRefreshToken] = useState<string>('');

  const [loadProducts, { loading: productsLoading, data: productsData }] =
    useLazyQuery<ProductResponseInterface>(VM_PORDUCTS_QUERY);
  const [loadAddons, { loading: addonsLoading, data: addonsData }] =
    useLazyQuery<ProductResponseInterface>(VM_ADDONS_QUERY);
  const getProducts = useCallback(async () => {
    await loadProducts({
      variables: {
        location: selectedLocation,
        currency: selectedCurrency,
      },
      context: {
        token: process.env.NEXT_PUBLIC_STRAPI_API_KEY
          ? `Bearer ${String(process.env.NEXT_PUBLIC_STRAPI_API_KEY)}`
          : '',
      },
    });
  }, [selectedLocation, selectedCurrency, loadProducts]);

  const getAddons = useCallback(async () => {
    await loadAddons({
      variables: {
        currency: selectedCurrency,
      },
      context: {
        token: process.env.NEXT_PUBLIC_STRAPI_API_KEY
          ? `Bearer ${String(process.env.NEXT_PUBLIC_STRAPI_API_KEY)}`
          : '',
      },
    });
  }, [selectedCurrency, loadAddons]);

  const handleChangeVm = useCallback((fullObject: ProductInterface) => {
    setSelectedVmPlan({
      ...{
        title: fullObject.attributes.title,
        sku: fullObject.attributes.sku,
        skuMonthly:
          getBothSkuOfProduct(
            fullObject.attributes.productPrices.data,
            TimePeriods.Monthly,
            undefined
          ) ?? fullObject.attributes.sku,
        skuYearly:
          getBothSkuOfProduct(
            fullObject.attributes.productPrices.data,
            TimePeriods.Yearly,
            undefined
          ) ?? fullObject.attributes.sku,
        monthlyPrice:
          getBothPricesOfProduct(
            fullObject.attributes.productPrices.data,
            TimePeriods.Monthly,
            undefined
          ) ?? 0,
        yearlyPrice:
          getBothPricesOfProduct(
            fullObject.attributes.productPrices.data,
            TimePeriods.Yearly,
            undefined
          ) ?? 0,
      },
    });
  }, []);

  const handleAddOnsCurrencyChange = useCallback(
    (fullObject: ProductInterface, indexOfObject: number) => {
      const newArray = selectedAddons;

      newArray[indexOfObject] = {
        sku: fullObject.attributes.sku,
        skuMonthly:
          getBothSkuOfProduct(
            fullObject.attributes.productPrices.data,
            TimePeriods.Monthly,
            undefined
          ) ?? fullObject.attributes.sku,
        skuYearly:
          getBothSkuOfProduct(
            fullObject.attributes.productPrices.data,
            TimePeriods.Yearly,
            undefined
          ) ?? fullObject.attributes.sku,
        title: fullObject.attributes.title,
        description: fullObject.attributes.description,
        selectedCurrency: selectedCurrency,
        group: fullObject.attributes.metadata?.group ?? 'unknown',
        monthlyPrice:
          getBothPricesOfProduct(
            fullObject.attributes.productPrices.data,
            TimePeriods.Monthly,
            undefined
          ) ?? 0,
        yearlyPrice:
          getBothPricesOfProduct(
            fullObject.attributes.productPrices.data,
            TimePeriods.Yearly,
            undefined
          ) ?? 0,
      };
    },
    [selectedCurrency, selectedAddons]
  );

  useEffect(() => {
    setAccessToken(
      sessionStorage.getItem('layershift_fa_access_token') ??
        'ACCESS TOKEN ERROR'
    );
    setRefreshToken(
      localStorage.getItem('layershift_fa_refresh_token') ??
        'REFRESH TOKEN ERROR'
    );
  }, []);

  const handleAddOtherAddOns = useCallback(
    (addOn: ProductInterface) => {
      setOtherAddons([...otherAddons, addOn]);
    },
    [otherAddons]
  );

  useEffect(() => {
    void getProducts();
  }, [getProducts, selectedCurrency, selectedLocation]);

  useEffect(() => {
    void getAddons();
  }, [getAddons, selectedCurrency]);

  useEffect(() => {
    const fullObject = productsData?.products.data.find(
      (item) => selectedVmPlan?.title === item.attributes.title
    );

    if (fullObject) {
      handleChangeVm(fullObject);
    }
  }, [
    selectedCurrency,
    handleChangeVm,
    productsData?.products,
    selectedVmPlan?.title,
  ]);

  useEffect(() => {
    selectedAddons.map((addon, index) => {
      const fullObject = addonsData?.products.data.find(
        (object) => object.attributes.sku === addon.sku
      );

      if (fullObject) {
        handleAddOnsCurrencyChange(fullObject, index);
      }
    });
  }, [
    addonsData?.products,
    selectedAddons,
    selectedCurrency,
    handleAddOnsCurrencyChange,
  ]);
  // const handleNumericalAddonsCurrencyChange = useCallback(
  //   (originalObject: ProductInterface, objectIndex: number) => {
  //     const newArray = selectedNumericalAddons.map((object, index) => {
  //       if (index !== objectIndex) {
  //         return object;
  //       } else {
  //         return {
  //           ...object,
  //           skuMonthly:
  //             getBothSkuOfProduct(
  //               originalObject.attributes.productPrices.data,
  //               TimePeriods.Monthly,
  //               object.amountSelected
  //             ) ?? object.sku,
  //           skuYearly:
  //             getBothSkuOfProduct(
  //               originalObject.attributes.productPrices.data,
  //               TimePeriods.Yearly,
  //               object.amountSelected
  //             ) ?? object.sku,
  //           selectedCurrency: selectedCurrency,
  //           monthlyPrice:
  //             getBothPricesOfProduct(
  //               originalObject.attributes.productPrices.data,
  //               TimePeriods.Monthly,
  //               object.amountSelected
  //             ) ?? 1,
  //           yearlyPrice:
  //             getBothPricesOfProduct(
  //               originalObject.attributes.productPrices.data,
  //               TimePeriods.Yearly,
  //               object.amountSelected
  //             ) ?? 1,
  //         };
  //       }
  //     });

  //     setSelectedNumericalAddons([...newArray]);
  //   },
  //   [selectedCurrency, selectedNumericalAddons, cartValue]
  // );

  useEffect(() => {
    if (productsData) {
      const defaultVm = productsData.products.data.find((product) =>
        product.attributes.title.includes('VM')
      );

      if (defaultVm) {
        setSelectedVmPlan({
          ...{
            title: defaultVm.attributes.title,
            sku: defaultVm.attributes.sku,
            skuMonthly:
              getBothSkuOfProduct(
                defaultVm.attributes.productPrices.data,
                TimePeriods.Monthly,
                undefined
              ) ?? defaultVm.attributes.sku,
            skuYearly:
              getBothSkuOfProduct(
                defaultVm.attributes.productPrices.data,
                TimePeriods.Monthly,
                undefined
              ) ?? defaultVm.attributes.sku,
            monthlyPrice:
              getBothPricesOfProduct(
                defaultVm.attributes.productPrices.data,
                TimePeriods.Monthly,
                undefined
              ) ?? 0,
            yearlyPrice:
              getBothPricesOfProduct(
                defaultVm.attributes.productPrices.data,
                TimePeriods.Yearly,
                undefined
              ) ?? 0,
          },
        });
      }
    }
  }, [productsData]);

  const handleAddGroup = useCallback(
    (group: IDropDownGroup) => {
      setDropDownGroups([...dropDownGroups, group]);
    },
    [dropDownGroups]
  );

  useEffect(() => {
    for (const product in addonsData?.products.data) {
      if (
        addonsData?.products.data[Number(product)].attributes.metadata?.group
      ) {
        const temp = addonsData.products.data[Number(product)];
        if (
          dropDownGroups.find(
            (group) => group.groupName === temp.attributes.metadata?.group
          )
        ) {
          const foundGroup = dropDownGroups.find(
            (group) => group.groupName === temp.attributes.metadata?.group
          );
          if (
            !foundGroup?.options.find(
              (option) => option.attributes.sku === temp.attributes.sku
            )
          ) {
            const updatedGroup = foundGroup;
            updatedGroup?.options.push(temp);
            const indexOfUpdatedGroup = dropDownGroups.indexOf(foundGroup!);
            const updatedArray = dropDownGroups;
            updatedArray[indexOfUpdatedGroup] = updatedGroup!;
          }
        } else {
          const newGroup = {
            options: [temp],
            groupName: temp.attributes.metadata?.group,
          };
          handleAddGroup(newGroup as IDropDownGroup);
        }
      } else if (
        addonsData?.products.data[Number(product)].attributes.metadata
          ?.increment ||
        addonsData?.products.data[Number(product)].attributes.metadata?.min ||
        addonsData?.products.data[Number(product)].attributes.metadata?.max
      ) {
        const temp = addonsData.products.data[Number(product)];
        if (
          !numericalAddOns.find(
            (addon) => addon.attributes.sku === temp.attributes.sku
          )
        ) {
          setNumericalAddOns([...numericalAddOns, temp]);
        }
      } else if (
        addonsData?.products.data[Number(product)].attributes.metadata === null
      ) {
        const temp = addonsData.products.data[Number(product)];
        if (
          !otherAddons.find(
            (addon) => addon.attributes.sku === temp.attributes.sku
          )
        ) {
          handleAddOtherAddOns(temp);
        }
      }
    }
  }, [
    addonsData,
    numericalAddOns,
    selectedCurrency,
    dropDownGroups,
    otherAddons,
    handleAddGroup,
    handleAddOtherAddOns,
  ]);

  //tuka
  let arrayAddons: CustomVpsAddonInterface[];

  useEffect(() => {
    arrayAddons = [];
    for (const fullObject of addonsData?.products.data || []) {
      for (const productCardAddons of cartValue?.addons ?? []) {
        if (productCardAddons.sku === fullObject.attributes.sku) {
          if (
            selectedAddons.filter(
              (item) => fullObject.attributes.sku === item.sku
            ).length < 1
          ) {
            arrayAddons.push({
              sku: fullObject.attributes.sku,
              skuMonthly:
                getBothSkuOfProduct(
                  fullObject.attributes.productPrices.data,
                  TimePeriods.Monthly,
                  1
                ) ?? fullObject.attributes.sku,
              skuYearly:
                getBothSkuOfProduct(
                  fullObject.attributes.productPrices.data,
                  TimePeriods.Yearly,
                  1
                ) ?? fullObject.attributes.sku,
              title: fullObject.attributes.title,
              description: fullObject.attributes.description,
              selectedCurrency: selectedCurrency,
              monthlyPrice:
                getBothPricesOfProduct(
                  fullObject.attributes.productPrices.data,
                  TimePeriods.Monthly,
                  1
                ) ?? 0,
              yearlyPrice:
                getBothPricesOfProduct(
                  fullObject.attributes.productPrices.data,
                  TimePeriods.Yearly,
                  1
                ) ?? 0,
            });
          }
        }
      }
    } // eslint-disable-next-line react-hooks/exhaustive-deps
    setSelectedAddons([...arrayAddons]);
  }, [addonsData, cartValue, selectedCurrency, selectedLocation]);

  let arrayNumAddons: CustomVpsNumericalAddonInterface[];
  useEffect(() => {
    arrayNumAddons = [];
    for (const fullObject of addonsData?.products.data || []) {
      for (const productCard of cartValue.numericalAddons ?? []) {
        if (
          JSON.stringify(productCard.sku) ===
          JSON.stringify(fullObject.attributes.sku)
        ) {
          if (
            selectedNumericalAddons.filter(
              (item) =>
                JSON.stringify(fullObject.attributes.sku) ===
                JSON.stringify(item.sku)
            ).length < 1
          ) {
            arrayNumAddons.push({
              sku: fullObject.attributes.sku,
              skuMonthly:
                getBothSkuOfProduct(
                  fullObject.attributes.productPrices.data,
                  TimePeriods.Monthly,
                  1
                ) ?? fullObject.attributes.sku,
              skuYearly:
                getBothSkuOfProduct(
                  fullObject.attributes.productPrices.data,
                  TimePeriods.Yearly,
                  1
                ) ?? fullObject.attributes.sku,
              title: fullObject.attributes.title,
              amountSelected: productCard.amountSelected ?? 1,
              selectedCurrency: selectedCurrency,
              max: fullObject.attributes.metadata?.max ?? Infinity,
              min: fullObject.attributes.metadata?.min ?? 1,
              increment: fullObject.attributes.metadata?.increment ?? 1,
              monthlyPrice:
                getBothPricesOfProduct(
                  fullObject.attributes.productPrices.data,
                  TimePeriods.Monthly,
                  productCard.amountSelected
                ) ?? 0,
              yearlyPrice:
                getBothPricesOfProduct(
                  fullObject.attributes.productPrices.data,
                  TimePeriods.Yearly,
                  productCard.amountSelected
                ) ?? 0,
            });
          }
        }
      }
    }
    setSelectedNumericalAddons([...arrayNumAddons]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addonsData?.products, cartValue, selectedCurrency, selectedLocation]);
  // console.log('SElektedNUMERICALADONS', selectedNumericalAddons);

  // useEffect(() => {
  //   selectedNumericalAddons.map((addon, index) => {
  //     const fullObject = addonsData?.products.data.find(
  //       (object) => object.attributes.sku === addon.sku
  //     );
  //     if (addon.selectedCurrency !== selectedCurrency && fullObject) {
  //       handleNumericalAddonsCurrencyChange(fullObject, index);
  //     }
  //   });
  // }, [
  //   addonsData?.products,
  //   selectedCurrency,
  //   selectedNumericalAddons,
  //   handleNumericalAddonsCurrencyChange,
  // ]);
  const onChangeVmHandler = (selectedValue: string) => {
    const fullObject = productsData?.products.data.find(
      (item) => selectedValue === item.attributes.title
    );
    if (fullObject) {
      setSelectedVmPlan({
        ...{
          title: selectedValue,
          sku: fullObject.attributes.sku,
          skuMonthly:
            getBothSkuOfProduct(
              fullObject.attributes.productPrices.data,
              TimePeriods.Monthly,
              undefined
            ) ?? fullObject.attributes.sku,
          skuYearly:
            getBothSkuOfProduct(
              fullObject.attributes.productPrices.data,
              TimePeriods.Yearly,
              undefined
            ) ?? fullObject.attributes.sku,
          monthlyPrice:
            getBothPricesOfProduct(
              fullObject.attributes.productPrices.data,
              TimePeriods.Monthly,
              undefined
            ) ?? 0,
          yearlyPrice:
            getBothPricesOfProduct(
              fullObject.attributes.productPrices.data,
              TimePeriods.Yearly,
              undefined
            ) ?? 0,
        },
      });
    }
  };

  const getBothSkuOfProduct = (
    selection: ProductPriceInterface[],
    timePeriod: TimePeriods,
    selectedAmount: number | undefined
  ) => {
    const selected = selection.find((item) =>
      item.attributes.sku.includes(timePeriod)
    );
    return selected?.attributes.sku;
  };

  const getBothPricesOfProduct = (
    selection: ProductPriceInterface[],
    timePeriod: TimePeriods,
    selectedAmount: number | undefined
  ) => {
    if (!selection[0]?.attributes.tiers) {
      const selected = selection.find((item) =>
        item.attributes.sku.includes(timePeriod)
      );
      return selected?.attributes.price;
    }
    const selected = selection.find((item) =>
      item.attributes.sku.includes(timePeriod)
    );
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

  // console.log(selectedNumericalAddons, 'ova se selected numerical');
  // console.log(selectedAddons, 'ova se selected addons');
  // console.log(selectedVmPlan, 'selected vm plan');

  const ram = selectedNumericalAddons.map((addon) =>
    addon.title == 'RAM (GB)' ? addon.amountSelected : ''
  );

  const storage = selectedNumericalAddons.map((addon) =>
    addon.title == 'Storage (Flash-based) (GB)' ? addon.amountSelected : ''
  );

  const vCPU = selectedNumericalAddons.map((addon) =>
    addon.title == 'vCPU cores' ? addon.amountSelected : ''
  );

  const pleskLicense = dropDownGroups.map((group) =>
    group.groupName === 'server-licensing'
      ? selectedAddons.map((addons) =>
          addons.group === 'server-licensing' ? addons.title : ''
        )
      : ''
  );

  const emailSecurity = dropDownGroups.map((group) =>
    group.groupName === 'email-security'
      ? selectedAddons.map((addons) =>
          addons.group === 'email-security' ? addons.title : ''
        )
      : ''
  );

  const lsBackup = dropDownGroups.map((group) =>
    group.groupName === 'ls-backup'
      ? selectedAddons.map((addons) =>
          addons.group === 'ls-backup' ? addons.title : ''
        )
      : ''
  );

  const websiteSecurity = dropDownGroups.map((group) =>
    group.groupName === 'website-security'
      ? selectedAddons.map((addons) =>
          addons.group === 'website-security' ? addons.title : ''
        )
      : ''
  );

  const serverUpgrades = dropDownGroups.map((group) =>
    group.groupName === 'server-upgrades'
      ? selectedAddons.map((addons) =>
          addons.group === 'server-upgrades' ? addons.title : ''
        )
      : ''
  );

  const [billingPeriod, setBillingPeriod] = useState<
    'monthly' | 'yearly' | 'Every 3 years'
  >('monthly');

  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    let totalPrice = 0;

    if (TimePeriod === 'Monthly') {
      totalPrice = totalMonthlyPrice;
    } else {
      totalPrice = totalYearlyPrice;
    }

    setTotalPrice(totalPrice);
  }, [TimePeriod, totalMonthlyPrice, totalYearlyPrice]);

  const data: CustomVpsInterface[] = [
    {
      timePeriod: TimePeriod,
      totalPrice: totalPrice,
      selectedCurrency: selectedCurrency,
      vmPlan: {
        title: selectedVmPlan?.title,
        sku: selectedVmPlan?.sku,
        skuMonthly: selectedVmPlan?.skuMonthly,
        skuYearly: selectedVmPlan?.skuYearly,
        monthlyPrice: selectedVmPlan?.monthlyPrice,
        yearlyPrice: selectedVmPlan?.yearlyPrice,
      },
      addons: selectedAddons,
      numericalAddons: selectedNumericalAddons,
    },
  ];

  const onClickEditItem = (editVPS: CustomVpsInterface) => {
    const addonsEdit: EditVpsInterface[] = [];
    const numAddonsEdit: EditVpsInterface[] = [];

    editVPS.addons.map((item) => {
      addonsEdit.push({ groupSelection: item.title });
    });
    editVPS.numericalAddons.map((item) => {
      numAddonsEdit.push({
        groupSelection: item.title,
        amount: item.amountSelected,
      });
    });
    setEditVPSItems([...addonsEdit, ...numAddonsEdit]);
    localStorage.setItem(
      'SELECTED_EDIT_ITEMS',
      JSON.stringify([...addonsEdit, ...numAddonsEdit])
    );
  };

  const [cardProduct, setCardProduct] = useState<CustomVpsInterface>();
  const proba = cardProduct;
  useEffect(() => {
    setCardProduct({
      addons: selectedAddons,
      numericalAddons: selectedNumericalAddons,
      selectedCurrency: selectedCurrency,
      timePeriod: 'Monthly',
      vmPlan: selectedVmPlan,
      totalPrice: totalMonthlyPrice,
    });
  }, [
    selectedAddons,
    selectedCurrency,
    selectedLocation,
    selectedNumericalAddons,
    selectedVmPlan,
  ]);

  useEffect(() => {
    let total = 0;

    selectedNumericalAddons.map((item) => (total = total + item.monthlyPrice));
    selectedAddons.map((itemAddon) => (total = total + itemAddon.monthlyPrice));
    total = total + (selectedVmPlan?.monthlyPrice ?? 0);

    setTotalMonthlyPrice(total);
  }, [selectedNumericalAddons, selectedAddons, selectedVmPlan, cardProduct]);

  useEffect(() => {
    let total = 0;

    selectedNumericalAddons.map((item) => (total = total + item.yearlyPrice));
    selectedAddons.map((itemAddon) => (total = total + itemAddon.yearlyPrice));
    total = total + (selectedVmPlan?.yearlyPrice ?? 0);

    setTotalYearlyPrice(total);
  }, [selectedNumericalAddons, selectedAddons, selectedVmPlan, cardProduct]);

  const onClickAddToCart = (newVPS: CustomVpsInterface | undefined) => {
    let m = 0;
    newVPS?.numericalAddons.map((item) => (m = m + item.monthlyPrice));
    newVPS?.addons.map((itemAddon) => (m = m + itemAddon.monthlyPrice));
    m = m + (selectedVmPlan?.monthlyPrice ?? 0);

    setCartItems([
      ...cartItems,
      {
        addons: newVPS?.addons ?? [],
        numericalAddons: newVPS?.numericalAddons || [],
        selectedCurrency: newVPS?.selectedCurrency || '',
        timePeriod: newVPS?.timePeriod || 'Monthly',
        totalPrice: m,
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
          totalPrice: m,
          vmPlan: newVPS?.vmPlan,
        },
      ])
    );
    console.log('Added to cart succeesfully');
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };
  // console.log("OOOOOOOF",cardProduct);

  return (
    <div className="flex flex-col items-center">
      <div className="flex !h-full  xs:w-[19rem] w-[16rem] flex-col justify-between rounded-2xl bg-white px-6 py-7 shadow-custom">
        <div>
          <p className="mb-[5px] text-center font-['Mont-bold'] text-3xl text-darkGrey">
            {title}
          </p>
          <div className="flex justify-center text-center">
            <div className="font-['Mont-bold'] text-5xl text-darkTeal">
              {currencySymbol} {totalMonthlyPrice.toFixed(2)}
            </div>
            <div className="self-end text-lg text-darkGrey/70">/month</div>
          </div>
          <div className="flex justify-center text-center">
            <div className="font-['Mont-bold'] text-2xl text-darkGrey">
              {currencySymbol} {totalYearlyPrice.toFixed(2)}
            </div>
            <div className="self-center pt-2 text-base text-darkGrey/70">
              /12 months
            </div>
          </div>
          <div className="mt-[9px]  mb-6 text-center text-base text-darkGrey">
            <ReactMarkdown>{description}</ReactMarkdown>
          </div>
        </div>
        <div className="mb-5 px-6">
          {checklistItems.map((item: CheckListItemsProps, index: number) => (
            <CheckListItem
              key={index}
              cta={item.cta}
              checking={item.checking}
              size={'packageCard'}
              description={''}
              ctaButton={''}
              linkButton={''}
            />
          ))}
        </div>
        <div className="mb-4 flex justify-between pt-3">
          <div className="flex items-center text-center text-lg font-['Mont-semibold'] text-liliac">
            <button
              type="button"
              onClick={() => {
                onClickEditItem(cartValue);
              }}
            >
              <a className="py-[10px] px-[15px]" href={linkFirstButton}>
                {ctaFirstButton}
              </a>
            </button>
          </div>
          <div>
            <button
              className=" rounded-full border-2 border-purple bg-purple px-[35px]  py-[12px] text-base font-['Mont-regular'] text-white transition  duration-500 hover:border-2 hover:border-purple hover:bg-transparent hover:text-purple md:text-lg lg:px-[40px] lg:py-[13px]"
              onClick={() => {
                // console.log('FAKING',cardProduct, {});

                onClickAddToCart(proba);
              }}
            >
              {ctaSecondButton}
            </button>

            {/* <Button
              cta={ctaSecondButton}
              link={linkSecondButton}
              color={'primary'}
            /> */}
          </div>
        </div>
        <div className="flex h-2 justify-end">
          {isSubmitted && (
            <p className="text-xs font-extrabold text-lightTeal ">
              Added to cart succeesfully!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ServerCard;
