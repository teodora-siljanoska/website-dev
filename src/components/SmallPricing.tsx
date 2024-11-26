import React, { useCallback, useContext, useEffect, useState } from 'react';
import CheckListItem, { P as CheckListItemsProps } from './CheckListItem';
import { VM_ADDONS_QUERY, VM_PORDUCTS_QUERY } from '@utils/queries';
import {
  CustomVpsAddonInterface,
  CustomWordInterface,
  CustomVpsNumericalAddonInterface,
  IDropDownGroup,
  OrderItem,
  ProductInterface,
  ProductPriceInterface,
  ProductResponseInterface,
  TimePeriods,
  VmPlanInterface,
} from '@pages/vps/types';
import { useLazyQuery } from '@apollo/client';
import { LocationContext } from '@utils/contexts/locationContext';
import { CurrencyContext } from '@utils/contexts/currencyContext';
import { useRouter } from 'next/router';
import LoginContext from '@utils/contexts/loginContext';
import CartContext from '@utils/contexts/cartContext';
import EditVPSContext from '@utils/contexts/editVPSContext';
import CartWordPresContext from '@utils/contexts/cartWordPresContext';

export interface P {
  title: string;
  price: number;
  value: 'dollar' | 'euro' | 'pound';
  checklistItems: CheckListItemsProps[];
  ctaButton: string;
  linkButton: string;
}
type AddonLimitType = {
  limitter?: string | null;
  group: string;
  limitType: string;
  limit: string | number;
};

function SmallPricing({
  title,
  price,
  value,
  checklistItems,
  ctaButton,
  linkButton,
}: P): JSX.Element {
  const orderItems: OrderItem[] = [];
  const { selectedLocation } = useContext(LocationContext);
  const { selectedCurrency, currencySymbol } = useContext(CurrencyContext);
  const { cartItems, setCartItems } = useContext(CartContext);
  const { cartWordPresItems, setCartWordPresItems } =
    useContext(CartWordPresContext);

  const { editVPSItems, setEditVPSItems } = useContext(EditVPSContext);

  const [TimePeriod, setTimePeriod] = useState<TimePeriods>(
    TimePeriods.Monthly
  );
  const [dropDownGroups, setDropDownGroups] = useState<IDropDownGroup[]>([]);
  const [numericalAddOns, setNumericalAddOns] = useState<ProductInterface[]>(
    []
  );
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const [addonLimit, setAddonLimit] = useState<AddonLimitType[]>();
  const router = useRouter();
  const { user } = useContext(LoginContext);
  const [isAlertVisible, setIsAlertVisible] = React.useState(false);
  const [showLoginWindow, setShowLoginWindow] = useState<boolean>(false);

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

  useEffect(() => {
    let total = 0;

    selectedNumericalAddons.map((item) => (total = total + item.monthlyPrice));
    selectedAddons.map((itemAddon) => (total = total + itemAddon.monthlyPrice));
    total = total + (selectedVmPlan?.monthlyPrice ?? 0);

    setTotalMonthlyPrice(total);
  }, [selectedNumericalAddons, selectedAddons, selectedVmPlan]);

  useEffect(() => {
    let total = 0;

    selectedNumericalAddons.map((item) => (total = total + item.yearlyPrice));
    selectedAddons.map((itemAddon) => (total = total + itemAddon.yearlyPrice));
    total = total + (selectedVmPlan?.yearlyPrice ?? 0);

    setTotalYearlyPrice(total);
  }, [selectedNumericalAddons, selectedAddons, selectedVmPlan]);

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
  const handleNumericalAddonsCurrencyChange = useCallback(
    (originalObject: ProductInterface, objectIndex: number) => {
      const newArray = selectedNumericalAddons.map((object, index) => {
        if (index !== objectIndex) {
          return object;
        } else {
          return {
            ...object,
            skuMonthly:
              getBothSkuOfProduct(
                originalObject.attributes.productPrices.data,
                TimePeriods.Monthly,
                object.amountSelected
              ) ?? object.sku,
            skuYearly:
              getBothSkuOfProduct(
                originalObject.attributes.productPrices.data,
                TimePeriods.Yearly,
                object.amountSelected
              ) ?? object.sku,
            selectedCurrency: selectedCurrency,
            monthlyPrice:
              getBothPricesOfProduct(
                originalObject.attributes.productPrices.data,
                TimePeriods.Monthly,
                object.amountSelected
              ) ?? 1,
            yearlyPrice:
              getBothPricesOfProduct(
                originalObject.attributes.productPrices.data,
                TimePeriods.Yearly,
                object.amountSelected
              ) ?? 1,
          };
        }
      });

      setSelectedNumericalAddons([...newArray]);
    },
    [selectedCurrency, selectedNumericalAddons]
  );
  const [accessToken, setAccessToken] = useState<string>('');
  const [refreshToken, setRefreshToken] = useState<string>('');

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
  useEffect(() => {
    dropDownGroups.map((group) => {
      switch (group.groupName) {
        case 'server-upgrades':
          onChangeAddonHandler('CloudLinux Solo');
          break;
        case 'website-security':
          onChangeAddonHandler('ImunifyAV');
          break;

        case 'server-licensing':
          onChangeAddonHandler('Plesk Web Admin Edition');
          break;

        case 'email-security':
          onChangeAddonHandler('Plesk Email Security Pro');
          break;

        case 'ls-backup':
          onChangeAddonHandler('Backup Silver');
          break;
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropDownGroups]);

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

  useEffect(() => {
    selectedNumericalAddons.map((addon, index) => {
      const fullObject = addonsData?.products.data.find(
        (object) => object.attributes.sku === addon.sku
      );
      if (addon.selectedCurrency !== selectedCurrency && fullObject) {
        handleNumericalAddonsCurrencyChange(fullObject, index);
      }
    });
  }, [
    addonsData?.products,
    selectedCurrency,
    selectedNumericalAddons,
    handleNumericalAddonsCurrencyChange,
  ]);

  useEffect(() => {
    if (productsData) {
      const defaultVm = productsData.products.data.find((product) =>
        product.attributes.title.includes('Scale')
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
    dropDownGroups,
    otherAddons,
    handleAddGroup,
    handleAddOtherAddOns,
  ]);

  useEffect(() => {
    for (const fullObject of numericalAddOns) {
      if (
        selectedNumericalAddons.filter(
          (item) => fullObject.attributes.sku === item.sku
        ).length < 1
      ) {
        setSelectedNumericalAddons([
          ...selectedNumericalAddons,
          {
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
            amountSelected: fullObject.attributes.metadata?.min ?? 1,
            selectedCurrency: selectedCurrency,
            max: fullObject.attributes.metadata?.max ?? Infinity,
            min: fullObject.attributes.metadata?.min ?? 1,
            increment: fullObject.attributes.metadata?.increment ?? 1,
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
          },
        ]);
      }
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numericalAddOns]);

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

  const onChangeAddonHandler = (selectedValue: string) => {
    const fullObject = addonsData?.products.data.find(
      (item) => selectedValue === item.attributes.title
    );
    const requires = fullObject?.attributes?.metadata?.requires as any;

    const limmitedAddonGroup = '';
    if (requires && fullObject?.attributes?.metadata?.group) {
      const group = Object.keys(requires)[0].toString();

      const groupValue = requires[group];
      const requiresKeys = Object.keys(requires);
      const limiters: AddonLimitType[] = [];

      requiresKeys.forEach((requireKey) => {
        let limitType = '';
        let limit = '';
        if (requireKey === 'ram') {
          const variation = Object.keys(requires.ram)[0].toString();
          limit = requires.ram[variation];
          limitType = variation;
        } else {
          limit = requires[requireKey];
        }

        limiters.push({
          limitter: fullObject?.attributes?.metadata?.group,
          group: requireKey,
          limitType,
          limit,
        });
      });
      setAddonLimit(limiters);
    }

    const newArray: CustomVpsAddonInterface[] = selectedAddons.filter(
      (a) => a.group !== limmitedAddonGroup
    );
    const oldValue = selectedAddons.find(
      (item) => fullObject?.attributes.metadata?.group === item.group
    );
    if (oldValue && fullObject && fullObject.attributes.metadata?.group) {
      const newArray = selectedAddons.map((item) => {
        if (item.group === fullObject.attributes.metadata?.group) {
          return {
            title: fullObject.attributes.title,
            description: fullObject.attributes.description,
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
            group: fullObject.attributes.metadata?.group,
            selectedCurrency: selectedCurrency,
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
        } else {
          return item;
        }
      });
      setSelectedAddons([...newArray]);
    } else if (
      !oldValue &&
      fullObject &&
      fullObject.attributes.metadata?.group
    ) {
      setSelectedAddons([
        ...selectedAddons,
        {
          title: fullObject.attributes.title,
          description: fullObject.attributes.description,
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
          group: fullObject.attributes.metadata.group,
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
          selectedCurrency: selectedCurrency,
        },
      ]);
    }
    // console.log(selectedAddons);
  };

  const onClickAddToCart = (selectProduct: string) => {
    if (selectProduct === 'Solo') {
      selectProduct = 'One';
    }

    if (productsData) {
      const defaultVm = productsData.products.data.find((product) =>
        product.attributes.title.includes(selectProduct)
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

    const newVPS: CustomWordInterface = {
      timePeriod: 'Monthly',
      selectedCurrency: selectedCurrency,
      totalPrice: selectedVmPlan?.monthlyPrice ?? 0,
      vmPlan: selectedVmPlan,
    };

    setCartWordPresItems([...cartWordPresItems, newVPS]);
    localStorage.setItem(
      'SELECTED_CART_WORD_PRES_ITEMS',
      JSON.stringify([...cartWordPresItems, newVPS])
    );
    //console.log('Added to cart succeesfully');
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  const onClickAddToCartYearly = (selectProduct: string) => {
    if (selectProduct === 'Solo') {
      selectProduct = 'One';
    }
    if (productsData) {
      const defaultVm = productsData.products.data.find((product) =>
        product.attributes.title.includes(selectProduct)
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

    const newVPS: CustomWordInterface = {
      timePeriod: 'Yearly',
      selectedCurrency: selectedCurrency,
      totalPrice: selectedVmPlan?.yearlyPrice ?? 0,
      vmPlan: selectedVmPlan,
    };

    setCartWordPresItems([...cartWordPresItems, newVPS]);
    localStorage.setItem(
      'SELECTED_CART_WORD_PRES_ITEMS',
      JSON.stringify([...cartWordPresItems, newVPS])
    );
    //console.log('Added to cart succeesfully');
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  const onClickAddOnDelete = (group: string) => {
    setSelectedAddons((current) =>
      current.filter((addOn) => addOn.group !== group)
    );
    const findLimiter = addonLimit?.findIndex((x) => x.limitter === group);
    if (findLimiter) {
      setAddonLimit(undefined);
    }
  };

  const onClickHandleNumericalAddonAmountChange = (
    fullObject: CustomVpsNumericalAddonInterface,
    amount: number
  ) => {
    const originalObject = numericalAddOns.find(
      (object) => object.attributes.sku === fullObject.sku
    );
    if (originalObject) {
      const newArray = selectedNumericalAddons.map((numericalAddon) => {
        if (numericalAddon.sku !== fullObject.sku) {
          return numericalAddon;
        } else {
          return {
            ...numericalAddon,
            amountSelected: amount,
            skuMonthly:
              getBothSkuOfProduct(
                originalObject.attributes.productPrices.data,
                TimePeriods.Monthly,
                amount
              ) ?? numericalAddon.sku,
            skuYearly:
              getBothSkuOfProduct(
                originalObject.attributes.productPrices.data,
                TimePeriods.Yearly,
                amount
              ) ?? numericalAddon.sku,
            monthlyPrice:
              getBothPricesOfProduct(
                originalObject.attributes.productPrices.data,
                TimePeriods.Monthly,
                amount
              ) ?? 1,
            yearlyPrice:
              getBothPricesOfProduct(
                originalObject.attributes.productPrices.data,
                TimePeriods.Yearly,
                amount
              ) ?? 1,
          };
        }
      });
      setSelectedNumericalAddons([...newArray]);
    }
  };

  const getPriceOfProduct = (selection: ProductPriceInterface[]) => {
    const selected = selection.find((item) =>
      item.attributes.sku.includes(TimePeriod)
    );
    if (selected?.attributes.price !== undefined) {
      return selected.attributes.price;
    }
    return 0;
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

  useEffect(() => {
    if (productsData) {
      let test = title;
      if (title === 'Solo') {
        test = 'One';
      }
      const defaultVm = productsData.products.data.find((product) =>
        product.attributes.title.includes(test)
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
  }, [productsData, selectedCurrency, selectedLocation]);

  return (
    <div className="flex flex-col items-center">
      {productsLoading && <div>loading</div>}
      <div className="flex  w-[16rem] flex-col items-center rounded-2xl bg-white py-7 px-3 shadow-custom xs:w-[19rem]">
        <div className="text-center font-['Mont-bold'] text-[26px] text-darkGrey">
          {title}
        </div>
        <div className="font-['Mont-bold'] text-[55px] text-darkTeal">
          {currencySymbol} {selectedVmPlan?.monthlyPrice}
        </div>
        <div className="font-['Mont-bold'] text-[25px] text-liliac">
          {currencySymbol} {selectedVmPlan?.yearlyPrice}
        </div>
        <div className="min-h-[120px] pt-8 pb-9">
          {checklistItems.map((item: CheckListItemsProps, index: number) => (
            <div key={index}>
              {' '}
              <CheckListItem
                key={index}
                cta={item.cta}
                checking={item.checking}
                size={'card'}
                description=""
                ctaButton={''}
                linkButton={''}
              />
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            className="rounded-full border-2 border-purple bg-purple px-[35px]  py-[12px] text-base font-['Mont-regular'] text-white transition  duration-500 hover:border-2 hover:border-purple hover:bg-transparent hover:text-purple md:text-lg lg:px-[20px] lg:py-[13px]"
            onClick={() => {
              onClickAddToCart(title);
            }}
          >
            Monthly
          </button>
          <button
            className="rounded-full border-2 border-purple bg-purple px-[25px]  py-[10px] text-base font-['Mont-regular'] text-white transition  duration-500 hover:border-2 hover:border-purple hover:bg-transparent hover:text-purple md:text-lg lg:px-[40px] lg:py-[10px]"
            onClick={() => {
              onClickAddToCartYearly(title);
            }}
          >
            Yearly
          </button>
          {/* <Button cta={ctaButton} link={linkButton} color={'primary'} /> */}
        </div>
      </div>
    </div>
  );
}
export default SmallPricing;
