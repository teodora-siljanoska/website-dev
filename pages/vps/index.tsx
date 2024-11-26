/* eslint-disable  @typescript-eslint/no-non-null-assertion */
import React, {
  useState,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';
import type { GetServerSidePropsContext, NextPage } from 'next';
import {
  GET_FOOTER,
  GET_HEADER,
  GET_VPS_CONFIGURATO,
  LOCATIONS_QUERY,
  VM_ADDONS_QUERY,
  VM_PORDUCTS_QUERY,
} from '@utils/queries';
import { useLazyQuery } from '@apollo/client';
import LocationSelector, { LocationRequest } from './locationSelector';
import { LocationContext } from '@utils/contexts/locationContext';
import SmallLeftTitle from '@components/SmallLeftTitle';
import { CurrencyContext } from '@utils/contexts/currencyContext';
import Title from '@components/Title';
import Image from 'next/legacy/image';
import KeyFeaturesBlockTest from '@blocks/KeyFeaturesBlockTest/KeyFeaturesBlockTest';
import vmselector from './assets/vm-selector.png';
import serverLicencing from './assets/server-licencing.png';
import email from './assets/email.png';
import backup from './assets/backup.png';
import security from './assets/security.png';
import SVG from 'react-inlinesvg';
import arrow from '../../src/components/assets/arrowGreen.svg';
import Layout from '@layout/Layout/Layout';
import { useRouter } from 'next/router';
import LoginContext from '@utils/contexts/loginContext';
import CartContext from '@utils/contexts/cartContext';
import EditVPSContext from '@utils/contexts/editVPSContext';
import AddToCartPopUp from '@components/AddToCartPopUp';
import locationPurple from './assets/locationPurple.svg';
import webPro from './assets/webPro.svg';
import webEsen from './assets/webEsen.svg';
import securityList from './assets/security.svg';
import fixConfigurator from './assets/fixConfigurator.svg';
import ls from './assets/ls.svg';
import arrowfull from './assets/arrowfull.svg';
import { useMediaQuery } from 'react-responsive';
import ReactMarkdown from 'react-markdown';
import HeroBlock from '@blocks/HeroBlock/HeroBlock';
import PeriodContext from '@utils/contexts/periodContext';
import {
  Enum_Componentpageblockshero_Size,
  Maybe,
  VpsConfiguratorEntity,
} from '@utils/types';
import BlockedAddonPopUp from '@components/BlockedAddonPopUp';
import {
  AddonLimitType,
  CustomVpsAddonInterface,
  CustomVpsInterface,
  CustomVpsNumericalAddonInterface,
  EditVpsInterface,
  FooterInterface,
  HomeProps,
  IDropDownGroup,
  OrderItem,
  ProductInterface,
  ProductPriceInterface,
  ProductResponseInterface,
  TimePeriods,
  VPSConfiguratorInterface,
  VmPlanInterface,
} from './types';
import { HeaderInterface } from '@layout/Header/HeaderBlock';
import * as Sentry from '@sentry/nextjs';

const EUCountries = process.env.NEXT_PUBLIC_EUCOUNTRIES;
const UKCountries = process.env.NEXT_PUBLIC_UKCOUNTRIES;
const CHICountries = process.env.NEXT_PUBLIC_VMCHICOUNTRIES;
const SINCountries = process.env.NEXT_PUBLIC_VMSINCOUNTRIES;

let currency = '';

const SetCurrencyByCountry = (country: any) => {
  const {
    selectedCurrency,
    currencySymbol,
    setSelectedCurrency,
    setCurrencySymbol,
  } = useContext(CurrencyContext);
  useEffect(() => {
    const customCurrency = localStorage.getItem('SELECTED_CUSTOM');
    if (!customCurrency) {
      if (UKCountries?.includes(country)) {
        // Set 'GBP' directly in localStorage
        localStorage.setItem('SELECTED_CURRENCY', 'GBP');
        setSelectedCurrency('GBP');
        setCurrencySymbol('£');
        currency = 'GBP';
      } else if (EUCountries?.includes(country)) {
        // Set 'EUR' directly in localStorage
        localStorage.setItem('SELECTED_CURRENCY', 'EUR');
        setSelectedCurrency('EUR');
        setCurrencySymbol('€');
        currency = 'EUR';
      } else if (
        CHICountries?.includes(country) ||
        SINCountries?.includes(country)
      ) {
        // Set 'USD' directly in localStorage as a default
        localStorage.setItem('SELECTED_CURRENCY', 'USD');
        setSelectedCurrency('USD');
        setCurrencySymbol('$');
        currency = 'USD';
      }
    }
  }, [country]); // Use country as a dependency instead of currency
};

const SetVmByCountry = (country: any) => {
  const { selectedLocation, setSelectedLocation, setSkuLocation, skuLocation } =
    useContext(LocationContext);

  useEffect(() => {
    if (CHICountries?.includes(country)) {
      localStorage.setItem('SELECTED_LOCATION', 'Chicago');
      setSelectedLocation('Chicago');
      setSkuLocation('CHI-1');
    } else if (SINCountries?.includes(country)) {
      localStorage.setItem('SELECTED_LOCATION', 'Singapore');
      setSelectedLocation('Singapore');
      setSkuLocation('SIN-1');
    } else if (
      UKCountries?.includes(country) ||
      EUCountries?.includes(country)
    ) {
      localStorage.setItem('SELECTED_LOCATION', 'Manchester');
      setSelectedLocation('Manchester');
      setSkuLocation('MAN-1');
    } else {
      localStorage.setItem('SELECTED_LOCATION', 'Manchester');
      setSelectedLocation('Manchester');
      setSkuLocation('MAN-1');
    }
  }, [country]); // Use country as a dependency
};

const Home: NextPage<HomeProps> = ({ }: HomeProps) => {
  const [countryNew, setCountryNew] = useState<any>('');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/edge-geo');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCountryNew(data.country);
      } catch (error) {
        Sentry.captureException(error);
        console.error('Error fetching data:', error);
        return null;
      }
    }
    fetchData();
  }, []);

  SetVmByCountry(countryNew);
  SetCurrencyByCountry(countryNew);
  const isBigScreen = useMediaQuery({
    minWidth: 1430,
  });
  const isBetweenTabletAndDesktop = useMediaQuery({
    minWidth: 1024,
    maxWidth: 1429,
  });
  const isBetween = useMediaQuery({
    query: '(minWidth: 1024,maxWidth: 1429)',
  });
  const isTablet = useMediaQuery({ maxWidth: 1023, minWidth: 640 });
  const isHorizontalPhone = useMediaQuery({ maxWidth: 735 });
  const isSmallMedia = useMediaQuery({ maxWidth: 639 });
  const [showFirstDropdown, setShowFirstDropdown] = useState<boolean>(false);
  const [showSecondDropdown, setShowSecondDropdown] = useState<boolean>(false);
  const [showThirdDropdown, setShowThirdDropdown] = useState<boolean>(false);
  const [showFourthDropdown, setShowFourthDropdown] = useState<boolean>(false);
  const [showFifthDropdown, setShowFifthDropdown] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [requirementsArray, setRequirementsArray] = useState<any[]>([]);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowFirstDropdown(false);
        setShowSecondDropdown(false);
        setShowThirdDropdown(false);
        setShowFourthDropdown(false);
        setShowFifthDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);
  const orderItems: OrderItem[] = [];
  const { selectedLocation, skuLocation } = useContext(LocationContext);
  const { selectedCurrency, currencySymbol } = useContext(CurrencyContext);
  const { cartItems, setCartItems } = useContext(CartContext);
  const { editVPSItems } = useContext(EditVPSContext);

  const { period } = useContext(PeriodContext);

  const [TimePeriod, setTimePeriod] = useState<TimePeriods>(
    period === 'Yearly' ? TimePeriods.Yearly : TimePeriods.Monthly
  );
  useEffect(() => {
    setTimePeriod(
      period === 'Yearly' ? TimePeriods.Yearly : TimePeriods.Monthly
    );
    setBillingPeriod(period === 'Yearly' ? 'yearly' : 'monthly');
  }, [period]);

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

  // const [customVps, setCustomVps] = useState<CustomVpsInterface>();
  const [
    loadProducts,
    {
      loading: productsLoading,
      data: productsData,
      refetch: loadProductsRefetch,
    },
  ] = useLazyQuery<ProductResponseInterface>(VM_PORDUCTS_QUERY);

  const [
    loadAddons,
    { loading: addonsLoading, data: addonsData, refetch: loadAddonsRefetch },
  ] = useLazyQuery<ProductResponseInterface>(VM_ADDONS_QUERY);

  const [
    loadVPS,
    { loading: vpsLoading, data: vpsData, refetch: loadVpsRefetch },
  ] = useLazyQuery<VPSConfiguratorInterface>(GET_VPS_CONFIGURATO);

  const getProducts = async () => {
    //TUKA SMENi
    await loadProducts({
      variables: {
        location: skuLocation,
        currency: selectedCurrency,
      },
      context: {
        token: process.env.NEXT_PUBLIC_STRAPI_API_KEY
          ? `Bearer ${String(process.env.NEXT_PUBLIC_STRAPI_API_KEY)}`
          : '',
      },
    });

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
    await loadVPS({
      variables: {
        location: skuLocation,
        currency: selectedCurrency,
      },
      context: {
        token: process.env.NEXT_PUBLIC_STRAPI_API_KEY
          ? `Bearer ${String(process.env.NEXT_PUBLIC_STRAPI_API_KEY)}`
          : '',
      },
    });

    loadProductsRefetch();
    loadAddonsRefetch();
    loadVpsRefetch();
  };

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

  useEffect(() => {
    console.log("Updated VM Plan:", selectedVmPlan);
  }, [selectedVmPlan]);

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
  const getFullNumericalAddon = (sku: string, amount: number) => {
    const fullObject = addonsData?.products.data.find(
      (item) => item.attributes.sku === sku
    );
    if (fullObject) {
      return {
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
        amountSelected: amount,
        selectedCurrency: selectedCurrency,
        max: fullObject.attributes.metadata?.max ?? Infinity,
        min: fullObject.attributes.metadata?.min ?? 1,
        increment: fullObject.attributes.metadata?.increment ?? 1,
        monthlyPrice:
          getBothPricesOfProduct(
            fullObject.attributes.productPrices.data,
            TimePeriods.Monthly,
            amount
          ) ?? 0,
        yearlyPrice:
          getBothPricesOfProduct(
            fullObject.attributes.productPrices.data,
            TimePeriods.Yearly,
            amount
          ) ?? 0,
      };
    }
  };
  const getFullProduct = (sku: string) => {
    const fullObject = addonsData?.products.data.find(
      (item) => item.attributes.sku === sku
    );

    if (fullObject) {
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
      };
    }
  };
  useEffect(() => {
    const newArray: CustomVpsAddonInterface[] = [];
    const newNumArray: CustomVpsNumericalAddonInterface[] = [];

    const storedData: string | null = localStorage.getItem(
      'SELECTED_EDIT_ITEMS'
    );
    const storedArray: EditVpsInterface[] | null = storedData
      ? JSON.parse(storedData)
      : null;

    const vpsArray: EditVpsInterface[] = [];

    vpsData?.vpsConfigurator.data.attributes?.defaultProducts?.data.map(
      (item) => {
        item.attributes?.sku.includes('ram') ||
          item.attributes?.sku.includes('vcpu') ||
          item.attributes?.sku.includes('disk')
          ? vpsArray.push({
            groupSelection: item.attributes.sku,
            amount:
              item.attributes.sku === 'ram'
                ? vpsData.vpsConfigurator.data.attributes?.defaultRam ?? 10
                : item.attributes.sku === 'vcpu'
                  ? vpsData.vpsConfigurator.data.attributes?.defaultCpu ?? 2
                  : item.attributes.sku === 'disk'
                    ? vpsData.vpsConfigurator.data.attributes?.defaultStorage ??
                    50
                    : 1,
          })
          : vpsArray.push({ groupSelection: item.attributes?.sku ?? '' });
      }
    );

    editVPSItems.map((item) => {
      if (item.amount) {
        const fullNumAddon = getFullNumericalAddon(
          item.groupSelection,
          item.amount
        );
        if (fullNumAddon) {
          newNumArray.push(fullNumAddon);
        }
      } else if (!item.amount) {
        const fullProduct = getFullProduct(item.groupSelection);
        if (fullProduct) {
          newArray.push(fullProduct);
        }
        // onChangeAddonHandler(item.groupSelection);
      }
    });

    if (editVPSItems === null || editVPSItems?.length === 0) {
      editVPSItems.push(...vpsArray);
    }
    if (storedArray === null || storedArray?.length === 0) {
      storedArray?.push(...vpsArray);
    }

    if (storedArray !== null && storedArray.length === editVPSItems.length) {
      const missingGroups = [
        'server-upgrades',
        'website-security',
        'server-licensing',
        'email-security',
        'ls-backup',
      ];
      const invisibleGroup = 'invisible-data';
      const missingGroupsArray = missingGroups.filter(
        (group) => !newArray.some((addon) => addon.group === group)
      );

      missingGroupsArray.map((g) => {
        const slectiveAddons: ProductInterface[] = [];

        addonsData?.products.data.map(
          (item) =>
            item.attributes.metadata?.group === g && slectiveAddons.push(item)
        );

        slectiveAddons.sort((a, b) => {
          const sortingA = a.attributes.metadata?.sorting || 0;
          const sortingB = b.attributes.metadata?.sorting || 0;
          return sortingA - sortingB;
        });

        slectiveAddons[0] &&
          newArray.push({
            sku: slectiveAddons[0].attributes.sku,
            selectedCurrency: selectedCurrency,
            skuMonthly:
              getBothSkuOfProduct(
                slectiveAddons[0].attributes.productPrices.data,
                TimePeriods.Monthly,
                undefined
              ) ?? slectiveAddons[0].attributes.sku,
            skuYearly:
              getBothSkuOfProduct(
                slectiveAddons[0].attributes.productPrices.data,
                TimePeriods.Yearly,
                undefined
              ) ?? slectiveAddons[0].attributes.sku,
            title: slectiveAddons[0].attributes.title,
            description: slectiveAddons[0].attributes.description,
            monthlyPrice:
              getBothPricesOfProduct(
                slectiveAddons[0].attributes.productPrices.data,
                TimePeriods.Monthly,
                undefined
              ) ?? 0,
            yearlyPrice:
              getBothPricesOfProduct(
                slectiveAddons[0].attributes.productPrices.data,
                TimePeriods.Yearly,
                undefined
              ) ?? 0,
            group: slectiveAddons[0].attributes.metadata?.group,
          });
      });

      const invisibleGroupArray = addonsData?.products.data.filter(
        (item) => item.attributes.metadata?.group === invisibleGroup
      );

      invisibleGroupArray?.forEach((invisibleItem) => {
        const existingItem = newArray.find(
          (addon) => addon.sku === invisibleItem.attributes.sku
        );
        if (!existingItem) {
          newArray.push({
            sku: invisibleItem.attributes.sku,
            selectedCurrency: selectedCurrency,
            skuMonthly:
              getBothSkuOfProduct(
                invisibleItem.attributes.productPrices.data,
                TimePeriods.Monthly,
                undefined
              ) ?? invisibleItem.attributes.sku,
            skuYearly:
              getBothSkuOfProduct(
                invisibleItem.attributes.productPrices.data,
                TimePeriods.Yearly,
                undefined
              ) ?? invisibleItem.attributes.sku,
            title: invisibleItem.attributes.title,
            description: invisibleItem.attributes.description,
            monthlyPrice:
              getBothPricesOfProduct(
                invisibleItem.attributes.productPrices.data,
                TimePeriods.Monthly,
                undefined
              ) ?? 0,
            yearlyPrice:
              getBothPricesOfProduct(
                invisibleItem.attributes.productPrices.data,
                TimePeriods.Yearly,
                undefined
              ) ?? 0,
            group: invisibleItem.attributes.metadata?.group,
          });
        }
      });

      const numGroupArray = addonsData?.products.data.filter((item) =>
        ['ram', 'vcpu', 'disk'].includes(item.attributes.sku)
      );
      numGroupArray?.forEach((numItem) => {
        const existingItem = newNumArray.find(
          (addon) => addon.sku === numItem.attributes.sku
        );
        if (!existingItem) {
          newNumArray.push({
            sku: numItem.attributes.sku,
            amountSelected: numItem.attributes.metadata?.min ?? 0,
            increment: numItem.attributes.metadata?.increment ?? 1,
            max: numItem.attributes.metadata?.max ?? 1,
            min: numItem.attributes.metadata?.min ?? 100,
            monthlyPrice:
              getBothPricesOfProduct(
                numItem.attributes.productPrices.data,
                TimePeriods.Monthly,
                numItem.attributes.metadata?.min ?? 1
              ) ?? 0,
            yearlyPrice:
              getBothPricesOfProduct(
                numItem.attributes.productPrices.data,
                TimePeriods.Yearly,
                numItem.attributes.metadata?.min ?? 1
              ) ?? 0,
            selectedCurrency: selectedCurrency,
            skuMonthly:
              getBothSkuOfProduct(
                numItem.attributes.productPrices.data,
                TimePeriods.Monthly,
                1
              ) ?? numItem.attributes.sku,
            skuYearly:
              getBothSkuOfProduct(
                numItem.attributes.productPrices.data,
                TimePeriods.Yearly,
                1
              ) ?? numItem.attributes.sku,
            title: numItem.attributes.title,
          });
        }
      });
    }

    setSelectedAddons([...newArray]);
    setSelectedNumericalAddons([...newNumArray]);
  }, [
    numericalAddOns,
    selectedCurrency,
    addonsData,
    vpsData?.vpsConfigurator.data.attributes?.defaultProducts,
    vpsData?.vpsConfigurator.data.attributes?.defaultCpu,
    vpsData?.vpsConfigurator.data.attributes?.defaultRam,
    vpsData?.vpsConfigurator.data.attributes?.defaultStorage,
  ]);

  const handleAddOtherAddOns = useCallback(
    (addOn: ProductInterface) => {
      setOtherAddons([...otherAddons, addOn]);
    },
    [otherAddons]
  );

  useEffect(() => {
    getProducts();
  }, [selectedCurrency, skuLocation]);

  useEffect(() => {
    const fullObject = productsData?.products.data.find(
      (item) => selectedVmPlan?.title === item.attributes.title
    );

    if (fullObject) {
      handleChangeVm(fullObject);
    }
  }, [
    selectedCurrency,
    skuLocation,
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
      const fullObject = numericalAddOns.find(
        (object) => object.attributes.sku === addon.sku
      );
      if (fullObject) {
        handleNumericalAddonsCurrencyChange(fullObject, index);
      }
    });
  }, [addonsData?.products, selectedCurrency]);

  useEffect(() => {
    if (productsData) {
      const defaultVm = productsData.products.data.find(
        (product) => product.attributes.metadata?.configurator === true
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
    const tempNumericalAddons = [];
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
        tempNumericalAddons.push(temp);
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
    setNumericalAddOns(tempNumericalAddons);
  }, [
    addonsData,
    dropDownGroups,
    otherAddons,
    handleAddGroup,
    handleAddOtherAddOns,
  ]);

  const onChangeAddonHandler = (selectedValue: string, group: string) => {
    const slectiveAddons: ProductInterface[] = [];

    addonsData?.products.data.map(
      (item) =>
        item.attributes.metadata?.group === group && slectiveAddons.push(item)
    );
    const fullObject = slectiveAddons.find(
      (item) => item.attributes.sku === selectedValue
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
          limitter: fullObject?.attributes?.metadata?.group ?? '',
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
        ...newArray,
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
  };

  const onClickAddToCart = (newVPS: CustomVpsInterface) => {
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

    setCartItems([...start, newVPS]);
    localStorage.setItem(
      'SELECTED_CART_ITEMS',
      JSON.stringify([...start, newVPS])
    );
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
    if (
      !selection[0]?.attributes.tiers ||
      selection[0]?.attributes.tiers?.length === 0
    ) {
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

  const ram = selectedNumericalAddons.map((addon) =>
    addon.sku == 'ram' ? addon.amountSelected : ''
  );

  const storage = selectedNumericalAddons.map((addon) =>
    addon.sku == 'disk' ? addon.amountSelected : ''
  );

  const vCPU = selectedNumericalAddons.map((addon) =>
    addon.sku == 'vcpu' ? addon.amountSelected : ''
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
  const [loadLocation, { loading: locationLoading, data: locationData }] =
    useLazyQuery<LocationRequest>(LOCATIONS_QUERY);
  const getLocation = useCallback(async () => {
    await loadLocation({
      variables: { location: selectedLocation, currency: selectedCurrency },
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

  function findPriceForDropdown(option: ProductInterface) {
    const item = addonsData?.products.data.find(
      (addon) => addon.attributes.title === option.attributes.title
    );
    const price = item?.attributes.productPrices.data.map((p) =>
      TimePeriod === 'Monthly'
        ? p.attributes.period == 'month' && p.attributes.price?.toFixed(2)
        : p.attributes.period == 'year' && p.attributes.price?.toFixed(2)
    );
    return price;
  }
  const calculateGradient = (
    value: number,
    min: number,
    max: number,
    index: number
  ) => {
    const percentage = ((value - min) / (max - min)) * 100;
    let color1, color2;

    // Define colors based on the index
    switch (index) {
      case 0:
        color1 = '#552b71'; // Purple shade
        color2 = '#9c8c98'; // Light gray
        break;
      case 1:
        color1 = '#009d98'; // Teal
        color2 = '#b2d8d8'; // Light teal
        break;
      case 2:
        color1 = '#d94567'; // Rose
        color2 = '#e9c3cf'; // Light rose
        break;
      default:
        color1 = 'purple';
        color2 = 'gray';
    }

    return `linear-gradient(to right, ${color1} 0%, ${color1} ${percentage}%, ${color2} ${percentage}%, ${color2} 100%)`;
  };

  useEffect(() => {
    if (addonsData && addonsData.products && addonsData.products.data) {
      const reqArray = addonsData.products.data.reduce(
        (accumulator: any, item) => {
          if (item.attributes?.metadata?.requirements) {
            item.attributes.metadata.requirements.forEach((req) => {
              accumulator.push(
                req.relationalOperator
                  ? {
                    original: item.attributes.sku,
                    sku: req.sku,
                    quantity: req.quantity,
                    relationalOperator: req.relationalOperator,
                    message: req.message,
                  }
                  : {
                    original: item.attributes.sku,
                    sku: req.sku,
                    message: req.message,
                  }
              );
            });
          }
          return accumulator;
        },
        []
      );

      const filteredReqArray = reqArray.filter(
        (req: any) =>
          selectedAddons.some(
            (addonSelected) => addonSelected.sku === req.original
          ) ||
          selectedNumericalAddons.some((numericalAddonSelected) => {
            if (numericalAddonSelected.sku === req.original) {
              switch (req.relationalOperator) {
                case '>=':
                  return numericalAddonSelected.amountSelected >= req.quantity;
                case '<=':
                  return numericalAddonSelected.amountSelected <= req.quantity;
                case '>':
                  return numericalAddonSelected.amountSelected > req.quantity;
                case '<':
                  return numericalAddonSelected.amountSelected < req.quantity;
                case '===':
                  return numericalAddonSelected.amountSelected === req.quantity;
                default:
                  return false;
              }
            }
            return false;
          })
      );

      setRequirementsArray(filteredReqArray);
    }
  }, [addonsData, selectedAddons, selectedNumericalAddons]);
  const [isBlockedAddonVisible, setIsBlockedAddonVisible] = useState(false);
  const [blockedAddonMessage, setBlockedAddonMessage] = useState<string[]>([]);
  const [blockedAddonTitle, setBlockedAddonTitle] = useState<string>('');

  const onClickBlockAddon = (title: string, object: any[]) => {
    const messages: string[] = [];
    object.map((req) => messages.push(req.message));

    setBlockedAddonTitle(title);
    setBlockedAddonMessage(messages);
    setIsBlockedAddonVisible(true);
  };

  const compareValues = (value1: number, value2: number, operator: string) => {
    switch (operator) {
      case '>=':
        return value1 >= value2;
      case '<=':
        return value1 <= value2;
      case '>':
        return value1 > value2;
      case '<':
        return value1 < value2;
      case '===':
        return value1 === value2;
      default:
        return false;
    }
  };
  const [loadHeader, { data: headerStrapiData }] =
    useLazyQuery<HeaderInterface>(GET_HEADER);

  const getHeader = useCallback(async () => {
    await loadHeader({
      variables: {},
      context: {
        token: process.env.NEXT_PUBLIC_STRAPI_API_KEY
          ? `Bearer ${String(process.env.NEXT_PUBLIC_STRAPI_API_KEY)}`
          : '',
      },
    });
  }, [loadHeader]);
  useEffect(() => {
    void getHeader();
  }, [getHeader]);

  const [loadFooter, { data: footerData }] =
    useLazyQuery<FooterInterface>(GET_FOOTER);

  const getFooter = useCallback(async () => {
    await loadFooter({
      variables: {},
      context: {
        token: process.env.NEXT_PUBLIC_STRAPI_API_KEY
          ? `Bearer ${String(process.env.NEXT_PUBLIC_STRAPI_API_KEY)}`
          : '',
      },
    });
  }, [loadFooter]);
  useEffect(() => {
    void getFooter();
  }, [getFooter]);

  return (
    <>
      <Layout
        header={headerStrapiData?.header.data}
        footer={footerData?.footer.data}
        showLoginWindow={showLoginWindow}
        setShowLoginWindow={setShowLoginWindow}
      >
        <div className="">
          <HeroBlock
            id=""
            title={vpsData?.vpsConfigurator.data.attributes?.vpsHero?.title}
            description={
              vpsData?.vpsConfigurator.data.attributes?.vpsHero?.description
            }
            size={
              vpsData?.vpsConfigurator.data.attributes?.vpsHero?.size ??
              ('large' as Maybe<Enum_Componentpageblockshero_Size>)
            }
            secondTitleVps={
              vpsData?.vpsConfigurator.data.attributes?.vpsHero?.secondTitleVps
            }
            heroImage={
              vpsData?.vpsConfigurator.data.attributes?.vpsHero?.heroImage
            }
            smallTitle={
              vpsData?.vpsConfigurator.data.attributes?.vpsHero?.smallTitle
            }
          />
          <div className="container mx-auto my-5 text-left font-[Mont-regular] text-xs text-[#696969] prose-a:underline prose-strong:font-[Mont-bold] sm:text-sm">
            <ReactMarkdown>
              {vpsData?.vpsConfigurator.data.attributes?.breadcrumbVPS ?? ''}
            </ReactMarkdown>
          </div>
          <div className="h-20"></div>
          <Title
            cta={vpsData?.vpsConfigurator.data.attributes?.mainTitle ?? ''}
            alignment="center"
            fontSize="Small"
          />
          <KeyFeaturesBlockTest
            id=""
            checkListItemProps={
              vpsData?.vpsConfigurator.data.attributes?.keyFeaturesVps
                ?.checkListItemProps
            }
          />
        </div>
        <div className="relative">
          <div className="container mx-auto flex flex-row">
            <div className="mb-16 flex w-full flex-row gap-x-20 justify-center">
              <div className="flex flex-col gap-5 xl:basis-2/3 ">
                <SmallLeftTitle
                  cta={
                    vpsData?.vpsConfigurator.data.attributes?.titleLocation ??
                    ''
                  }
                />
                <div>
                  <LocationSelector
                    title={
                      vpsData?.vpsConfigurator.data.attributes
                        ?.locationBoxText ?? ''
                    }
                  />
                </div>
                <div className="h-20"></div>
                <SmallLeftTitle
                  cta={
                    vpsData?.vpsConfigurator.data.attributes?.resourcesTitle ??
                    ''
                  }
                />
                <div className="flex flex-col gap-10">
                  {selectedNumericalAddons.length > 0 ? (
                    selectedNumericalAddons.map((addon, index) => {
                      let min = addon.min;
                      let max = addon.max;

                      addonLimit?.forEach((oneLimit) => {
                        if (oneLimit?.group === addon.sku) {
                          if (oneLimit?.limitType === 'min') {
                            min = oneLimit.limit as number;
                            if (addon.amountSelected < min) {
                              addon.amountSelected = min;
                            }
                          }

                          if (oneLimit?.limitType === 'max') {
                            max = oneLimit.limit as number;
                            if (addon.amountSelected > max) {
                              addon.amountSelected = max;
                            }
                          }
                        }
                      });
                      return (
                        <div key={addon.sku}>
                          <div className="my-3 flex justify-between">
                            <div className="font-['Mont-regular'] text-[22px] text-darkGrey">
                              {addon.sku.includes('ram') &&
                                vpsData?.vpsConfigurator.data.attributes
                                  ?.vpsResources?.ramText?.titleResources}
                              {addon.sku.includes('cpu') &&
                                vpsData?.vpsConfigurator.data.attributes
                                  ?.vpsResources?.vcpu?.titleResources}
                              {addon.sku.includes('disk') &&
                                vpsData?.vpsConfigurator.data.attributes
                                  ?.vpsResources?.storage?.titleResources}{' '}
                            </div>
                            <div
                              className={`color-selected-slider-${index} font-['Mont-semibold'] text-[22px]`}
                            >
                              {addon.amountSelected}{' '}
                              {addon.title == 'vCPU cores' ? 'Cores' : 'GB'}
                            </div>
                          </div>
                          <div className="range-wrap">
                            <div
                              className="range-value z-0 w-full text-sm"
                              id="rangeV"
                            >
                              <span
                                className={` ${index == 0 && 'border-purple'} ${index == 1 && 'border-darkTeal'
                                  } ${index == 2 && 'border-pink'
                                  } h-[28px] w-[46px] rounded-[3px] border-[5px] bg-white text-center text-darkGrey`}
                                style={{
                                  left: (() => {
                                    const thumbWidth = 20; // Adjust this value based on your design
                                    const range = addon.max - addon.min;
                                    let leftPosition =
                                      ((addon.amountSelected - addon.min) /
                                        range) *
                                      100;

                                    if (leftPosition <= 15) {
                                      leftPosition += 1;
                                    } else if (
                                      leftPosition >= 15 &&
                                      leftPosition < 30
                                    ) {
                                      leftPosition += 0;
                                    } else if (
                                      leftPosition >= 30 &&
                                      leftPosition < 50
                                    ) {
                                      leftPosition -= 1;
                                    } else if (
                                      leftPosition >= 50 &&
                                      leftPosition < 80
                                    ) {
                                      leftPosition -= 2;
                                    } else if (leftPosition > 80) {
                                      leftPosition -= 3.5;
                                    } else {
                                      leftPosition -= 1;
                                    }

                                    return `calc(${leftPosition}% - ${thumbWidth / 2
                                      }px)`;
                                  })(),
                                  position: 'absolute',
                                  zIndex: 0,
                                }}
                              >
                                {addon.amountSelected}
                              </span>
                            </div>
                            <input
                              className={`custom-slider-${index} w-full cursor-pointer rounded-lg`}
                              id={`range-${index}`}
                              type="range"
                              min={addon.min}
                              max={addon.max}
                              value={addon.amountSelected}
                              step={addon.increment}
                              style={{
                                background: calculateGradient(
                                  addon.amountSelected,
                                  addon.min,
                                  addon.max,
                                  index
                                ),
                              }}
                              onChange={(e) => {
                                const matchingReq = requirementsArray.find(
                                  (req) => req.sku === addon.sku
                                );

                                if (!matchingReq) {
                                  onClickHandleNumericalAddonAmountChange(
                                    addon,
                                    Number(e.target.value)
                                  );
                                } else {
                                  const comparisonResult = compareValues(
                                    Number(e.target.value),
                                    matchingReq.quantity,
                                    matchingReq.relationalOperator
                                  );
                                  if (comparisonResult) {
                                    onClickBlockAddon(addon.title, [
                                      matchingReq,
                                    ]);
                                  } else {
                                    onClickHandleNumericalAddonAmountChange(
                                      addon,
                                      Number(e.target.value)
                                    );
                                  }
                                }
                              }}
                            />
                          </div>

                          <div className="font-['Mont-book'] text-base text-darkGrey">
                            {addon.sku.includes('ram') &&
                              vpsData?.vpsConfigurator.data.attributes
                                ?.vpsResources?.ramText?.descriptionRes}
                            {addon.sku.includes('cpu') &&
                              vpsData?.vpsConfigurator.data.attributes
                                ?.vpsResources?.vcpu?.descriptionRes}
                            {addon.sku.includes('disk') &&
                              vpsData?.vpsConfigurator.data.attributes
                                ?.vpsResources?.storage?.descriptionRes}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center text-purple">loading...</div>
                  )}
                </div>
                <div className="h-20" />
                <div className="flex flex-col gap-12">
                  <SmallLeftTitle
                    cta={
                      vpsData?.vpsConfigurator.data.attributes?.serverTitle ??
                      ''
                    }
                  />
                  {(productsLoading || addonsLoading || vpsLoading) && (
                    <div className="text-center text-purple">loading...</div>
                  )}

                  <div>
                    <div className="mx-5 flex  items-center rounded-lg border border-white bg-white shadow-custom">
                      <div className="hidden h-full basis-1/2 py-11 px-10 text-center font-['Mont-regular'] text-xl md:block lg:hidden xlSpecial:block xl:px-20 text-darkGrey">
                        {vpsData?.vpsConfigurator.data.attributes
                          ?.firstBoxText ?? ''}{' '}
                      </div>
                      <div className="hidden h-28 border-r-2 border-lightGrey md:block lg:hidden xlSpecial:block"></div>
                      <div className="basis-full sm:basis-full  md:basis-1/2 lg:basis-full xlSpecial:basis-1/2 w-full self-center ">
                        <div className="flex  w-full flex-col  items-center gap-6 py-[18px] px-5">
                          <div className="flex h-full items-center">
                            <Image
                              alt="image"
                              src={serverLicencing.src}
                              height={48}
                              width={48}
                            />
                          </div>
                          <div className="block h-full text-center font-['Mont-regular'] text-lg md:hidden lg:block xlSpecial:hidden xl:px-20 text-darkGrey">
                            {vpsData?.vpsConfigurator.data.attributes
                              ?.firstBoxText ?? ''}
                          </div>
                          <div className="w-full">
                            {selectedVmPlan ? (
                              <>
                                {dropDownGroups.length > 0
                                  ? dropDownGroups.map((group) => {
                                    let availableOptions: any =
                                      group.options.map(
                                        (o) => o.attributes.sku
                                      );
                                    const findLimiter = addonLimit?.find(
                                      (x) => x.group === group.groupName
                                    );
                                    if (findLimiter) {
                                      availableOptions = findLimiter.limit;
                                    }

                                    if (
                                      selectedAddons &&
                                      selectedAddons.length > 0
                                    ) {
                                      const groupSelections =
                                        selectedAddons.filter(
                                          (item) =>
                                            item.group === group.groupName
                                        );
                                      if (
                                        groupSelections.length > 0 &&
                                        !availableOptions.includes(
                                          groupSelections[0].sku
                                        )
                                      ) {
                                        // onClickAddOnDelete(group.groupName);
                                      }
                                    }

                                    return (
                                      group.groupName ===
                                      'server-licensing' && (
                                        <div key={group.groupName}>
                                          <div
                                            className={` ${group.groupName ===
                                                'server-licensing'
                                                ? 'grid grid-cols-1  '
                                                : 'grid grid-cols-1'
                                              }  w-full p-5 text-center text-[18px] text-darkGrey sm:text-[26px]`}
                                          >
                                            <div className="test">
                                              <div className="relative flex rounded bg-white text-center text-base">
                                                <button
                                                  className="z-30 inline-flex w-full items-center justify-between gap-2 self-center rounded-lg border-2 border-white bg-white px-4 text-center font-['Mont-regular'] text-base text-purple focus:border-2 focus:border-purple"
                                                  type="button"
                                                  onClick={() =>
                                                    setShowFirstDropdown(
                                                      !showFirstDropdown
                                                    )
                                                  }
                                                >
                                                  <span className="text-left">
                                                    {selectedAddons
                                                      .filter(
                                                        (item) =>
                                                          item.group ===
                                                          'server-licensing' &&
                                                          item.title
                                                      )
                                                      .map(
                                                        (item) => item.title
                                                      )}
                                                  </span>
                                                  <span>
                                                    <Image
                                                      className={`${showFirstDropdown &&
                                                        'rotate-180 duration-500'
                                                        }`}
                                                      alt="image"
                                                      src={arrowfull.src}
                                                      height={10}
                                                      width={10}
                                                    />
                                                  </span>
                                                </button>

                                                {showFirstDropdown && (
                                                  <div
                                                    ref={dropdownRef}
                                                    className=" absolute z-50 mt-9 flex w-full flex-col rounded-lg bg-white shadow-custom"
                                                  >
                                                    <ul>
                                                      {group.options
                                                        .slice()
                                                        .sort((a, b) => {
                                                          return (
                                                            (a.attributes
                                                              .metadata
                                                              ?.sorting ||
                                                              0) -
                                                            (b.attributes
                                                              .metadata
                                                              ?.sorting || 0)
                                                          );
                                                        })
                                                        .map(
                                                          (option, index) => (
                                                            <li
                                                              key={
                                                                option
                                                                  .attributes
                                                                  .title
                                                              }
                                                              onClick={() => {
                                                                !requirementsArray.find(
                                                                  (req) =>
                                                                    req.sku ===
                                                                    option
                                                                      .attributes
                                                                      .sku
                                                                )
                                                                  ? onChangeAddonHandler(
                                                                    option
                                                                      .attributes
                                                                      .sku,
                                                                    'server-licensing'
                                                                  )
                                                                  : onClickBlockAddon(
                                                                    option
                                                                      .attributes
                                                                      .title,
                                                                    requirementsArray.filter(
                                                                      (
                                                                        req
                                                                      ) =>
                                                                        req.sku ===
                                                                        option
                                                                          .attributes
                                                                          .sku
                                                                    )
                                                                  );
                                                                setShowFirstDropdown(
                                                                  !showFirstDropdown
                                                                );
                                                              }}
                                                              className={` flex justify-between p-2 text-left   ${index !==
                                                                group
                                                                  .options
                                                                  .length -
                                                                1 &&
                                                                'border-b-[1px] border-lightGrey'
                                                                } ${selectedAddons
                                                                  .filter(
                                                                    (item) =>
                                                                      item.group ===
                                                                      'server-licensing' &&
                                                                      item.title
                                                                  )
                                                                  .map(
                                                                    (item) =>
                                                                      item.title
                                                                  )
                                                                  .includes(
                                                                    option
                                                                      .attributes
                                                                      .title
                                                                  ) &&
                                                                'bg-liliac/10'
                                                                }
                                                                ${requirementsArray.find(
                                                                  (req) =>
                                                                    req.sku ===
                                                                    option
                                                                      .attributes
                                                                      .sku
                                                                )
                                                                  ? 'disable bg-lightGrey/50 hover:bg-lightGrey/70'
                                                                  : 'cursor-pointer hover:bg-liliac/20'
                                                                }`}
                                                            >
                                                              <div className="">
                                                                <section
                                                                  className={`text-base ${requirementsArray.find(
                                                                    (req) =>
                                                                      req.sku ===
                                                                      option
                                                                        .attributes
                                                                        .sku
                                                                  )
                                                                      ? 'font-["Mont-regular"] text-darkGrey '
                                                                      : 'font-["Mont-bold"] text-purple '
                                                                    }`}
                                                                >
                                                                  {
                                                                    option
                                                                      .attributes
                                                                      .title
                                                                  }
                                                                </section>
                                                                <section className="font-['Mont-regular'] text-sm text-darkGrey prose-ul:ml-5 prose-ul:list-disc">
                                                                  <ReactMarkdown>
                                                                    {
                                                                      option
                                                                        .attributes
                                                                        .description
                                                                    }
                                                                  </ReactMarkdown>
                                                                </section>
                                                              </div>
                                                              <section
                                                                className={`${requirementsArray.find(
                                                                  (req) =>
                                                                    req.sku ===
                                                                    option
                                                                      .attributes
                                                                      .sku
                                                                )
                                                                    ? 'font-["Mont-regular"] text-darkGrey '
                                                                    : 'font-["Mont-bold"] text-darkTeal '
                                                                  }  text-sm   `}
                                                              >
                                                                {
                                                                  currencySymbol
                                                                }
                                                                {findPriceForDropdown(
                                                                  option
                                                                )}
                                                              </section>
                                                            </li>
                                                          )
                                                        )}
                                                    </ul>
                                                  </div>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      )
                                    );
                                  })
                                  : ''}
                              </>
                            ) : (
                              ''
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {productsData && addonsData && (
                    <div className="mx-5 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-1 xlSpecial:grid-cols-2 ">
                      {selectedVmPlan ? (
                        <>
                          {dropDownGroups.length > 0 ? (
                            <>
                              {dropDownGroups
                                .filter(
                                  (group) =>
                                    group.groupName === 'server-upgrades' ||
                                    group.groupName === 'email-security'
                                )
                                .map((group) => (
                                  <div
                                    className="flex w-full  flex-col items-center rounded-lg border border-white bg-white shadow-custom"
                                    key={group.groupName}
                                  >
                                    <div
                                      className={`w-full ${group.groupName === 'server-licensing'
                                          ? 'grid grid-cols-1  '
                                          : 'grid grid-cols-1'
                                        }  w-full p-5 text-center text-[18px]  text-darkGrey sm:text-[26px]`}
                                    >
                                      <div className="">
                                        <div className="flex basis-1/2 flex-col text-center">
                                          <div>
                                            <Image
                                              src={
                                                group.groupName ==
                                                  'email-security' ||
                                                  'server-upgrades'
                                                  ? vmselector.src
                                                  : group.groupName ==
                                                    'server-licensing'
                                                    ? serverLicencing.src
                                                    : group.groupName ==
                                                      'email-security'
                                                      ? email.src
                                                      : group.groupName ==
                                                        'ls-backup'
                                                        ? backup.src
                                                        : vmselector.src
                                              }
                                              alt="image"
                                              height={50}
                                              width={50}
                                            />
                                          </div>
                                          <div className="mt-8 mb-4 font-['Mont-regular'] text-lg text-darkGrey">
                                            {group.groupName ===
                                              'email-security'
                                              ? `${vpsData?.vpsConfigurator.data.attributes?.thirdBoxText}`
                                              : group.groupName ===
                                                'server-upgrades'
                                                ? `${vpsData?.vpsConfigurator.data.attributes?.secondBoxTitle}`
                                                : 'error'}
                                          </div>
                                        </div>
                                        <div className="relative  mx-3 flex rounded bg-white text-center text-base 2xl:mx-10">
                                          <button
                                            className="z-30 inline-flex w-full items-center justify-between gap-2 self-center rounded-lg border-2 border-white bg-white px-4 text-center font-['Mont-regular'] text-base text-purple focus:border-2 focus:border-purple"
                                            type="button"
                                            onClick={() =>
                                              group.groupName ===
                                                'server-upgrades'
                                                ? setShowThirdDropdown(
                                                  !showThirdDropdown
                                                )
                                                : setShowSecondDropdown(
                                                  !showSecondDropdown
                                                )
                                            }
                                          >
                                            <span className="text-left">
                                              {selectedAddons
                                                .filter(
                                                  (item) =>
                                                    item.group ===
                                                    group.groupName &&
                                                    item.title
                                                )
                                                .map((item) => item.title)}
                                            </span>
                                            <span>
                                              <Image
                                                className={`${group.groupName ===
                                                  'server-upgrades' &&
                                                  showThirdDropdown &&
                                                  'rotate-180 duration-500'
                                                  }
                                              ${group.groupName ===
                                                  'email-security' &&
                                                  showSecondDropdown &&
                                                  'rotate-180 duration-500'
                                                  }`}
                                                alt="image"
                                                src={arrowfull.src}
                                                height={10}
                                                width={10}
                                              />
                                            </span>
                                          </button>

                                          {showSecondDropdown &&
                                            group.groupName ===
                                            'email-security' && (
                                              <div
                                                ref={dropdownRef}
                                                className="absolute z-50 mt-9 flex w-full flex-col rounded-lg bg-white shadow-custom"
                                              >
                                                <ul>
                                                  {group.options
                                                    .slice()
                                                    .sort((a, b) => {
                                                      return (
                                                        (a.attributes.metadata
                                                          ?.sorting || 0) -
                                                        (b.attributes.metadata
                                                          ?.sorting || 0)
                                                      );
                                                    })
                                                    .map((option, index) => (
                                                      <li
                                                        key={
                                                          option.attributes
                                                            .title
                                                        }
                                                        onClick={() => {
                                                          !requirementsArray.find(
                                                            (req) =>
                                                              req.sku ===
                                                              option.attributes
                                                                .sku
                                                          )
                                                            ? onChangeAddonHandler(
                                                              option
                                                                .attributes
                                                                .sku,
                                                              'email-security'
                                                            )
                                                            : onClickBlockAddon(
                                                              option
                                                                .attributes
                                                                .title,
                                                              requirementsArray.filter(
                                                                (req) =>
                                                                  req.sku ===
                                                                  option
                                                                    .attributes
                                                                    .sku
                                                              )
                                                            );
                                                          group.groupName ===
                                                            'email-security' &&
                                                            setShowSecondDropdown(
                                                              !showSecondDropdown
                                                            );
                                                        }}
                                                        className={` flex  justify-between p-2  text-left   ${index !==
                                                          group.options
                                                            .length -
                                                          1 &&
                                                          'border-b-[1px] border-lightGrey '
                                                          } ${selectedAddons
                                                            .filter(
                                                              (item) =>
                                                                item.group ===
                                                                'email-security' &&
                                                                item.title
                                                            )
                                                            .map(
                                                              (item) =>
                                                                item.title
                                                            )
                                                            .includes(
                                                              option.attributes
                                                                .title
                                                            ) && 'bg-liliac/10'
                                                          }
                                                        ${requirementsArray.find(
                                                            (req) =>
                                                              req.sku ===
                                                              option.attributes
                                                                .sku
                                                          )
                                                            ? 'disable bg-lightGrey/50 hover:bg-lightGrey/70'
                                                            : 'cursor-pointer hover:bg-liliac/20'
                                                          }
                                                        `}
                                                      >
                                                        <div className="">
                                                          <section
                                                            className={`text-base ${requirementsArray.find(
                                                              (req) =>
                                                                req.sku ===
                                                                option
                                                                  .attributes
                                                                  .sku
                                                            )
                                                                ? 'font-["Mont-regular"] text-darkGrey '
                                                                : 'font-["Mont-bold"] text-purple '
                                                              }`}
                                                          >
                                                            {
                                                              option.attributes
                                                                .title
                                                            }
                                                          </section>
                                                          <section className="font-['Mont-regular'] text-sm text-darkGrey prose-ul:ml-5 prose-ul:list-disc">
                                                            <ReactMarkdown>
                                                              {
                                                                option
                                                                  .attributes
                                                                  .description
                                                              }
                                                            </ReactMarkdown>
                                                          </section>
                                                        </div>
                                                        <section
                                                          className={`${requirementsArray.find(
                                                            (req) =>
                                                              req.sku ===
                                                              option
                                                                .attributes
                                                                .sku
                                                          )
                                                              ? 'font-["Mont-regular"] text-darkGrey '
                                                              : 'font-["Mont-bold"] text-darkTeal '
                                                            }  text-sm   `}
                                                        >
                                                          {currencySymbol}
                                                          {findPriceForDropdown(
                                                            option
                                                          )}
                                                        </section>
                                                      </li>
                                                    ))}
                                                </ul>
                                              </div>
                                            )}
                                          {showThirdDropdown &&
                                            group.groupName ===
                                            'server-upgrades' && (
                                              <div
                                                ref={dropdownRef}
                                                className="absolute z-50 mt-9 flex w-full flex-col rounded-lg bg-white shadow-custom"
                                              >
                                                <ul>
                                                  {group.options
                                                    .slice()
                                                    .sort((a, b) => {
                                                      return (
                                                        (a.attributes.metadata
                                                          ?.sorting || 0) -
                                                        (b.attributes.metadata
                                                          ?.sorting || 0)
                                                      );
                                                    })
                                                    .map((option, index) => (
                                                      <li
                                                        key={
                                                          option.attributes
                                                            .title
                                                        }
                                                        onClick={() => {
                                                          !requirementsArray.find(
                                                            (req) =>
                                                              req.sku ===
                                                              option.attributes
                                                                .sku
                                                          )
                                                            ? onChangeAddonHandler(
                                                              option
                                                                .attributes
                                                                .sku,
                                                              'server-upgrades'
                                                            )
                                                            : onClickBlockAddon(
                                                              option
                                                                .attributes
                                                                .title,
                                                              requirementsArray.filter(
                                                                (req) =>
                                                                  req.sku ===
                                                                  option
                                                                    .attributes
                                                                    .sku
                                                              )
                                                            );
                                                          group.groupName ===
                                                            'server-upgrades' &&
                                                            setShowThirdDropdown(
                                                              !showThirdDropdown
                                                            );
                                                        }}
                                                        className={`  flex  justify-between p-2  text-left   ${index !==
                                                          group.options
                                                            .length -
                                                          1 &&
                                                          'border-b-[1px] border-lightGrey'
                                                          } 
                                                        ${selectedAddons
                                                            .filter(
                                                              (item) =>
                                                                item.group ===
                                                                'server-upgrades' &&
                                                                item.title
                                                            )
                                                            .map(
                                                              (item) =>
                                                                item.title
                                                            )
                                                            .includes(
                                                              option.attributes
                                                                .title
                                                            ) && 'bg-liliac/10'
                                                          }
                                                        ${requirementsArray.find(
                                                            (req) =>
                                                              req.sku ===
                                                              option.attributes
                                                                .sku
                                                          )
                                                            ? 'disable bg-lightGrey/50 hover:bg-lightGrey/70'
                                                            : 'cursor-pointer hover:bg-liliac/20'
                                                          }
                                                        `}
                                                      >
                                                        <div className="">
                                                          <section
                                                            className={`text-base ${requirementsArray.find(
                                                              (req) =>
                                                                req.sku ===
                                                                option
                                                                  .attributes
                                                                  .sku
                                                            )
                                                                ? 'font-["Mont-regular"] text-darkGrey '
                                                                : 'font-["Mont-bold"] text-purple '
                                                              }`}
                                                          >
                                                            {
                                                              option.attributes
                                                                .title
                                                            }
                                                          </section>
                                                          <section className="font-['Mont-regular'] text-sm text-darkGrey prose-ul:ml-5 prose-ul:list-disc">
                                                            <ReactMarkdown>
                                                              {
                                                                option
                                                                  .attributes
                                                                  .description
                                                              }
                                                            </ReactMarkdown>
                                                          </section>
                                                        </div>
                                                        <section
                                                          className={`${requirementsArray.find(
                                                            (req) =>
                                                              req.sku ===
                                                              option
                                                                .attributes
                                                                .sku
                                                          )
                                                              ? 'font-["Mont-regular"] text-darkGrey '
                                                              : 'font-["Mont-bold"] text-darkTeal '
                                                            }  text-sm   `}
                                                        >
                                                          {currencySymbol}
                                                          {findPriceForDropdown(
                                                            option
                                                          )}
                                                        </section>
                                                      </li>
                                                    ))}
                                                </ul>
                                              </div>
                                            )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              <div
                                style={
                                  isHorizontalPhone
                                    ? { gridColumn: 'span 1' }
                                    : isBetweenTabletAndDesktop
                                      ? { gridColumn: 'span 1' }
                                      : { gridColumn: 'span 2' }
                                }
                                className="mt-5"
                              >
                                <SmallLeftTitle
                                  cta={
                                    vpsData?.vpsConfigurator.data.attributes
                                      ?.advancedTitle ?? ''
                                  }
                                />{' '}
                              </div>
                              {dropDownGroups
                                .filter(
                                  (group) =>
                                    group.groupName === 'ls-backup' ||
                                    group.groupName === 'website-security'
                                )
                                .map((group) => (
                                  <div
                                    className="flex w-full  flex-col items-center rounded-lg border border-white bg-white shadow-custom"
                                    key={group.groupName}
                                  >
                                    <div
                                      className={`w-full ${group.groupName === 'server-licensing'
                                          ? 'grid grid-cols-1  '
                                          : 'grid grid-cols-1'
                                        }  w-full p-5 text-center text-[18px] text-darkGrey sm:text-[26px]`}
                                    >
                                      <div>
                                        <div className="flex basis-1/2 flex-col text-center">
                                          <div>
                                            <Image
                                              src={
                                                group.groupName ==
                                                  'email-security'
                                                  ? security.src
                                                  : group.groupName ==
                                                    'server-licensing'
                                                    ? serverLicencing.src
                                                    : group.groupName ==
                                                      'website-security'
                                                      ? security.src
                                                      : group.groupName ==
                                                        'ls-backup'
                                                        ? backup.src
                                                        : vmselector.src
                                              }
                                              alt="image"
                                              height={50}
                                              width={50}
                                            />
                                          </div>
                                          <label className="mt-8 mb-4 font-['Mont-regular'] text-lg text-darkGrey">
                                            {group.groupName === 'ls-backup'
                                              ? `${vpsData?.vpsConfigurator.data.attributes?.fourthBoxTile}`
                                              : group.groupName ===
                                                'website-security'
                                                ? `${vpsData?.vpsConfigurator.data.attributes?.fiftBoxTitle}`
                                                : 'error'}
                                          </label>
                                        </div>
                                        <div className="relative mx-3 flex rounded bg-white text-center text-base 2xl:mx-10">
                                          <button
                                            className="z-30 inline-flex w-full items-center justify-between gap-2 self-center rounded-lg border-2 border-white bg-white px-4 text-center font-['Mont-regular'] text-base text-purple focus:border-2 focus:border-purple"
                                            type="button"
                                            onClick={() =>
                                              group.groupName === 'ls-backup'
                                                ? setShowFourthDropdown(
                                                  !showFourthDropdown
                                                )
                                                : setShowFifthDropdown(
                                                  !showFifthDropdown
                                                )
                                            }
                                          >
                                            <span className="text-left">
                                              {selectedAddons
                                                .filter(
                                                  (item) =>
                                                    item.group ===
                                                    group.groupName &&
                                                    item.title
                                                )
                                                .map((item) => item.title)}
                                            </span>
                                            <span>
                                              <Image
                                                className={`${group.groupName ===
                                                  'ls-backup' &&
                                                  showFourthDropdown &&
                                                  'rotate-180 duration-500'
                                                  } ${group.groupName !=
                                                  'ls-backup' &&
                                                  showFifthDropdown &&
                                                  'rotate-180 duration-500'
                                                  }`}
                                                alt="image"
                                                src={arrowfull.src}
                                                height={10}
                                                width={10}
                                              />
                                            </span>
                                          </button>

                                          {showFourthDropdown &&
                                            group.groupName === 'ls-backup' && (
                                              <div
                                                ref={dropdownRef}
                                                className={`${!isBigScreen &&
                                                  !isBetweenTabletAndDesktop &&
                                                  !isSmallMedia &&
                                                  'scrollbar max-h-56 overflow-y-scroll'
                                                  } absolute z-50 mt-9 flex w-full flex-col rounded-lg  bg-white shadow-custom`}
                                              >
                                                <ul>
                                                  {group.options
                                                    .slice()
                                                    .sort((a, b) => {
                                                      return (
                                                        (a.attributes.metadata
                                                          ?.sorting || 0) -
                                                        (b.attributes.metadata
                                                          ?.sorting || 0)
                                                      );
                                                    })
                                                    .map((option, index) => (
                                                      <li
                                                        key={
                                                          option.attributes
                                                            .title
                                                        }
                                                        onClick={() => {
                                                          !requirementsArray.find(
                                                            (req) =>
                                                              req.sku ===
                                                              option.attributes
                                                                .sku
                                                          )
                                                            ? onChangeAddonHandler(
                                                              option
                                                                .attributes
                                                                .sku,
                                                              'ls-backup'
                                                            )
                                                            : onClickBlockAddon(
                                                              option
                                                                .attributes
                                                                .title,
                                                              requirementsArray.filter(
                                                                (req) =>
                                                                  req.sku ===
                                                                  option
                                                                    .attributes
                                                                    .sku
                                                              )
                                                            );
                                                          group.groupName ===
                                                            'ls-backup' &&
                                                            setShowFourthDropdown(
                                                              !showFourthDropdown
                                                            );
                                                        }}
                                                        className={` flex justify-between p-2  text-left   ${index !==
                                                          group.options
                                                            .length -
                                                          1 &&
                                                          'border-b-[1px] border-lightGrey '
                                                          } ${selectedAddons
                                                            .filter(
                                                              (item) =>
                                                                item.group ===
                                                                'ls-backup' &&
                                                                item.title
                                                            )
                                                            .map(
                                                              (item) =>
                                                                item.title
                                                            )
                                                            .includes(
                                                              option.attributes
                                                                .title
                                                            ) && 'bg-liliac/10'
                                                          }
                                                        ${requirementsArray.find(
                                                            (req) =>
                                                              req.sku ===
                                                              option.attributes
                                                                .sku
                                                          )
                                                            ? 'disable bg-lightGrey/50 hover:bg-lightGrey/70'
                                                            : 'cursor-pointer hover:bg-liliac/20'
                                                          }`}
                                                      >
                                                        <div className="">
                                                          <section
                                                            className={`text-base ${requirementsArray.find(
                                                              (req) =>
                                                                req.sku ===
                                                                option
                                                                  .attributes
                                                                  .sku
                                                            )
                                                                ? 'font-["Mont-regular"] text-darkGrey '
                                                                : 'font-["Mont-bold"] text-purple '
                                                              }`}
                                                          >
                                                            {
                                                              option.attributes
                                                                .title
                                                            }
                                                          </section>
                                                          <section className="font-['Mont-regular'] text-sm text-darkGrey prose-ul:ml-5 prose-ul:list-disc">
                                                            <ReactMarkdown>
                                                              {
                                                                option
                                                                  .attributes
                                                                  .description
                                                              }
                                                            </ReactMarkdown>
                                                          </section>
                                                        </div>
                                                        <section
                                                          className={`${requirementsArray.find(
                                                            (req) =>
                                                              req.sku ===
                                                              option
                                                                .attributes
                                                                .sku
                                                          )
                                                              ? 'font-["Mont-regular"] text-darkGrey '
                                                              : 'font-["Mont-bold"] text-darkTeal '
                                                            }  text-sm   `}
                                                        >
                                                          {currencySymbol}
                                                          {findPriceForDropdown(
                                                            option
                                                          )}{' '}
                                                        </section>
                                                      </li>
                                                    ))}
                                                </ul>
                                              </div>
                                            )}
                                          {showFifthDropdown &&
                                            group.groupName ===
                                            'website-security' && (
                                              <div
                                                ref={dropdownRef}
                                                className="scrollbar absolute z-50 mt-9 flex lg:max-h-72 sm:max-h-56 max-h-72 w-full flex-col overflow-y-scroll rounded-lg bg-white shadow-custom"
                                              >
                                                <ul>
                                                  {group.options
                                                    .slice()
                                                    .sort((a, b) => {
                                                      return (
                                                        (a.attributes.metadata
                                                          ?.sorting || 0) -
                                                        (b.attributes.metadata
                                                          ?.sorting || 0)
                                                      );
                                                    })
                                                    .map((option, index) => (
                                                      <li
                                                        key={
                                                          option.attributes
                                                            .title
                                                        }
                                                        onClick={() => {
                                                          !requirementsArray.find(
                                                            (req) =>
                                                              req.sku ===
                                                              option.attributes
                                                                .sku
                                                          )
                                                            ? onChangeAddonHandler(
                                                              option
                                                                .attributes
                                                                .sku,
                                                              'website-security'
                                                            )
                                                            : onClickBlockAddon(
                                                              option
                                                                .attributes
                                                                .title,
                                                              requirementsArray.filter(
                                                                (req) =>
                                                                  req.sku ===
                                                                  option
                                                                    .attributes
                                                                    .sku
                                                              )
                                                            );
                                                          group.groupName ===
                                                            'website-security' &&
                                                            setShowFifthDropdown(
                                                              !showFifthDropdown
                                                            );
                                                        }}
                                                        className={`  flex justify-between p-2  text-left  ${index !==
                                                          group.options
                                                            .length -
                                                          1 &&
                                                          'border-b-[1px] border-lightGrey'
                                                          } ${selectedAddons
                                                            .filter(
                                                              (item) =>
                                                                item.group ===
                                                                'website-security' &&
                                                                item.title
                                                            )
                                                            .map(
                                                              (item) =>
                                                                item.title
                                                            )
                                                            .includes(
                                                              option.attributes
                                                                .title
                                                            ) && 'bg-liliac/10'
                                                          }
                                                        ${requirementsArray.find(
                                                            (req) =>
                                                              req.sku ===
                                                              option.attributes
                                                                .sku
                                                          )
                                                            ? 'disable bg-lightGrey/50 hover:bg-lightGrey/70'
                                                            : 'cursor-pointer hover:bg-liliac/20'
                                                          }`}
                                                      >
                                                        <div className="">
                                                          <section
                                                            className={`text-base ${requirementsArray.find(
                                                              (req) =>
                                                                req.sku ===
                                                                option
                                                                  .attributes
                                                                  .sku
                                                            )
                                                                ? 'font-["Mont-regular"] text-darkGrey '
                                                                : 'font-["Mont-bold"] text-purple '
                                                              }`}
                                                          >
                                                            {
                                                              option.attributes
                                                                .title
                                                            }
                                                          </section>
                                                          <section className="font-['Mont-regular'] text-sm text-darkGrey prose-ul:ml-5 prose-ul:list-disc">
                                                            <ReactMarkdown>
                                                              {
                                                                option
                                                                  .attributes
                                                                  .description
                                                              }
                                                            </ReactMarkdown>
                                                          </section>
                                                        </div>
                                                        <section
                                                          className={`${requirementsArray.find(
                                                            (req) =>
                                                              req.sku ===
                                                              option
                                                                .attributes
                                                                .sku
                                                          )
                                                              ? 'font-["Mont-regular"] text-darkGrey '
                                                              : 'font-["Mont-bold"] text-darkTeal '
                                                            }  text-sm   `}
                                                        >
                                                          {currencySymbol}
                                                          {findPriceForDropdown(
                                                            option
                                                          )}{' '}
                                                        </section>
                                                      </li>
                                                    ))}
                                                </ul>
                                              </div>
                                            )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                            </>
                          ) : (
                            ''
                          )}
                        </>
                      ) : (
                        ''
                      )}
                    </div>
                  )}
                </div>
              </div>
              {!isTablet && !isSmallMedia && (
                <div className="flex basis-1/2 flex-col items-center xl:basis-1/3">
                  <div className="">
                    <div className="w-full  rounded-t-2xl   bg-purple/10   xl:w-[444px]">
                      <p className="  mb-4 mt-7 pt-10 text-center font-['Mont-semibold'] text-[28px] text-darkGrey">
                        {'Order Summary:'}
                      </p>
                      <div className="mt-8 flex  flex-row justify-center  space-x-16">
                        <div className="items-center">
                          <input
                            id="default-radio-1"
                            readOnly
                            type="radio"
                            value="yearly"
                            name="default-radio"
                            checked={billingPeriod === 'yearly'}
                            className="h-4 w-4 cursor-pointer"
                            onClick={() => {
                              setTimePeriod(TimePeriods.Yearly);
                              setBillingPeriod('yearly');
                            }}
                          />
                          <label
                            htmlFor="default-radio-1"
                            className="ml-2 cursor-pointer font-['Mont-semibold']  text-base text-darkGrey"
                          >
                            {'Annually'}
                          </label>
                          <div className="flex flex-col">
                            <div className=" ml-5 text-4xl font-extrabold text-lightTeal">
                              {currencySymbol} {totalYearlyPrice.toFixed(2)}
                            </div>
                          </div>
                        </div>
                        <div className=" items-center">
                          <input
                            id="default-radio-2"
                            type="radio"
                            readOnly
                            value="monthly"
                            checked={billingPeriod === 'monthly'}
                            name="default-radio"
                            className="h-4 w-4 cursor-pointer  focus:ring-2"
                            onClick={() => {
                              setTimePeriod(TimePeriods.Monthly);
                              setBillingPeriod('monthly');
                            }}
                          />
                          <label
                            htmlFor="default-radio-2"
                            className="ml-2 cursor-pointer font-['Mont-semibold'] text-base text-darkGrey"
                          >
                            {'Monthly'}
                          </label>
                          <div className="flex flex-col ">
                            <div className="ml-5 text-4xl  font-extrabold text-liliac">
                              {currencySymbol} {totalMonthlyPrice.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-5 mb-4 flex justify-center">
                        <div className="mt-3 pl-2">
                          {/* <span onClick={handleSubmit}> */}
                          <span>
                            <button
                              className="font-['Mont-semibold'] justify-center rounded-full  border-2  border-purple  bg-white  px-[42px] py-[12px] text-base  text-purple transition duration-500 hover:border-2   hover:border-purple hover:bg-purple hover:text-white"
                              onClick={() => {
                                onClickAddToCart(data[0]);
                              }}
                            >
                              Add to cart
                            </button>
                          </span>
                          {isSubmitted && <AddToCartPopUp />}
                        </div>
                      </div>
                      <p className="font-'Mont-bold' mt-16 text-center text-[28px] text-darkGrey">
                        {'Order overview:'}
                      </p>
                      <div className="flex  flex-row justify-center p-5">
                        <div className="flex w-[100%]  flex-col space-y-4 text-base">
                          <div className="flex flex-row justify-between px-6">
                            <div className="font-['Mont-book'] text-darkGrey">
                              {selectedVmPlan?.title}
                            </div>
                            <div className="font-['Mont-semibold'] text-purple">
                              {currencySymbol}{' '}
                              {TimePeriod === 'Monthly'
                                ? selectedVmPlan?.monthlyPrice?.toFixed(2)
                                : selectedVmPlan?.yearlyPrice?.toFixed(2)}
                            </div>
                          </div>
                          <div className="flex flex-row justify-between px-6">
                            <div className="flex items-center gap-2 text-base">
                              <Image
                                alt="image"
                                src={locationPurple.src}
                                height={24}
                                width={24}
                              />
                              <div className="font-['Mont-book'] text-darkGrey">
                                Region
                              </div>
                            </div>
                            <div className="font-['Mont-semibold'] text-purple">
                              {/* {selectedLocation} */}
                              {
                                locationData?.locations.data.find(
                                  (element: any) =>
                                    element.attributes.name === selectedLocation
                                )?.attributes.description
                              }
                            </div>
                          </div>
                          <div className="flex flex-col gap-y-5 px-6 py-8 font-['Mont-regular'] text-base text-darkGrey">
                            <div className="flex justify-between">
                              <div>
                                <b className="font-['Mont-semibold']">
                                  Memory:
                                </b>{' '}
                                {ram.join('').toString()} GB
                              </div>
                              <div className="font-['Mont-semibold'] text-purple">
                                {currencySymbol}{' '}
                                {TimePeriod === 'Monthly'
                                  ? selectedNumericalAddons.map(
                                    (item) =>
                                      item.sku.includes('ram') &&
                                      item.monthlyPrice.toFixed(2)
                                  )
                                  : selectedNumericalAddons.map(
                                    (item) =>
                                      item.sku.includes('ram') &&
                                      item.yearlyPrice.toFixed(2)
                                  )}
                              </div>
                            </div>
                            <div className="flex justify-between">
                              <div>
                                <b className="font-['Mont-semibold']">
                                  CPU cores:
                                </b>{' '}
                                {vCPU.join('').toString()}
                              </div>
                              <div className="font-['Mont-semibold'] text-purple">
                                {currencySymbol}{' '}
                                {TimePeriod === 'Monthly'
                                  ? selectedNumericalAddons.map(
                                    (item) =>
                                      item.sku.includes('cpu') &&
                                      item.monthlyPrice.toFixed(2)
                                  )
                                  : selectedNumericalAddons.map(
                                    (item) =>
                                      item.sku.includes('cpu') &&
                                      item.yearlyPrice.toFixed(2)
                                  )}
                              </div>
                            </div>
                            <div className="flex justify-between">
                              <div>
                                <b className="font-['Mont-semibold']">
                                  SSD Storage:
                                </b>{' '}
                                {storage.join('').toString()}GB
                              </div>
                              <div className="font-['Mont-semibold'] text-purple">
                                {currencySymbol}{' '}
                                {TimePeriod === 'Monthly'
                                  ? selectedNumericalAddons.map(
                                    (item) =>
                                      item.sku.includes('disk') &&
                                      item.monthlyPrice.toFixed(2)
                                  )
                                  : selectedNumericalAddons.map(
                                    (item) =>
                                      item.sku.includes('disk') &&
                                      item.yearlyPrice.toFixed(2)
                                  )}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-row justify-between px-6 pb-4">
                            <div className="flex basis-10/12 items-center gap-2 text-base">
                              <Image
                                alt="image"
                                src={webPro.src}
                                height={24}
                                width={27}
                              />
                              <div className="font-['Mont-book'] text-darkGrey">
                                {pleskLicense.toString().split(',').join('')}
                              </div>
                            </div>
                            <div className="basis-2/12 text-right font-['Mont-semibold'] text-purple">
                              {TimePeriod === 'Monthly'
                                ? selectedAddons.map(
                                  (item) =>
                                    item.group?.includes(
                                      'server-licensing'
                                    ) &&
                                    (item.monthlyPrice.toFixed(2) === '0.00'
                                      ? 'Included'
                                      : currencySymbol +
                                      ' ' +
                                      item.monthlyPrice.toFixed(2))
                                )
                                : selectedAddons.map(
                                  (item) =>
                                    item.group?.includes(
                                      'server-licensing'
                                    ) &&
                                    (item.yearlyPrice.toFixed(2) === '0.00'
                                      ? 'Included'
                                      : currencySymbol +
                                      ' ' +
                                      item.yearlyPrice.toFixed(2))
                                )}
                            </div>
                          </div>
                          <div className="flex flex-row justify-between px-6  pb-4">
                            <div className="flex basis-10/12 items-center gap-2 text-base">
                              <Image
                                alt="image"
                                src={webEsen.src}
                                height={24}
                                width={19}
                              />
                              <div className="font-['Mont-book'] text-darkGrey">
                                {emailSecurity.toString().split(',').join('')}
                              </div>
                            </div>
                            <div className="basis-2/12 text-right font-['Mont-semibold'] text-purple">
                              {TimePeriod === 'Monthly'
                                ? selectedAddons.map(
                                  (item) =>
                                    item.group?.includes('email-security') &&
                                    (item.monthlyPrice.toFixed(2) === '0.00'
                                      ? 'Included'
                                      : currencySymbol +
                                      ' ' +
                                      item.monthlyPrice.toFixed(2))
                                )
                                : selectedAddons.map(
                                  (item) =>
                                    item.group?.includes('email-security') &&
                                    (item.yearlyPrice.toFixed(2) === '0.00'
                                      ? 'Included'
                                      : currencySymbol +
                                      ' ' +
                                      item.yearlyPrice.toFixed(2))
                                )}
                            </div>
                          </div>
                          <div className="flex flex-row justify-between px-6  pb-4">
                            <div className="flex basis-10/12 items-center gap-2 text-base">
                              <Image
                                alt="image"
                                src={webEsen.src}
                                height={24}
                                width={19}
                              />
                              <div className="font-['Mont-book'] text-darkGrey">
                                {serverUpgrades.toString().split(',').join('')}
                              </div>
                            </div>
                            <div className="basis-2/12 text-right font-['Mont-semibold'] text-purple">
                              {TimePeriod === 'Monthly'
                                ? selectedAddons.map(
                                  (item) =>
                                    item.group?.includes('server-upgrades') &&
                                    (item.monthlyPrice.toFixed(2) === '0.00'
                                      ? 'Included'
                                      : currencySymbol +
                                      ' ' +
                                      item.monthlyPrice.toFixed(2))
                                )
                                : selectedAddons.map(
                                  (item) =>
                                    item.group?.includes('server-upgrades') &&
                                    (item.yearlyPrice.toFixed(2) === '0.00'
                                      ? 'Included'
                                      : currencySymbol +
                                      ' ' +
                                      item.yearlyPrice.toFixed(2))
                                )}
                            </div>
                          </div>
                          <div className="flex flex-row justify-between px-6  pb-4">
                            <div className="flex basis-10/12 items-center gap-2 text-base">
                              <Image
                                alt="image"
                                src={securityList.src}
                                height={24}
                                width={20}
                              />
                              <div className="font-['Mont-book'] text-darkGrey">
                                {lsBackup.toString().split(',').join('')}
                              </div>
                            </div>
                            <div className="basis-2/12 text-right font-['Mont-semibold'] text-purple">
                              {TimePeriod === 'Monthly'
                                ? selectedAddons.map(
                                  (item) =>
                                    item.group?.includes('ls-backup') &&
                                    (item.monthlyPrice.toFixed(2) === '0.00'
                                      ? 'Included'
                                      : currencySymbol +
                                      ' ' +
                                      item.monthlyPrice.toFixed(2))
                                )
                                : selectedAddons.map(
                                  (item) =>
                                    item.group?.includes('ls-backup') &&
                                    (item.yearlyPrice.toFixed(2) === '0.00'
                                      ? 'Included'
                                      : currencySymbol +
                                      ' ' +
                                      item.yearlyPrice.toFixed(2))
                                )}
                            </div>
                          </div>
                          <div className="flex flex-row justify-between px-6  pb-4">
                            <div className="flex basis-10/12 items-center gap-2 text-base">
                              <Image
                                alt="image"
                                src={ls.src}
                                height={24}
                                width={31}
                              />
                              <div className="font-['Mont-book'] text-darkGrey">
                                {websiteSecurity.toString().split(',').join('')}
                              </div>
                            </div>
                            <div className="basis-2/12 text-right font-['Mont-semibold'] text-purple">
                              {TimePeriod === 'Monthly'
                                ? selectedAddons.map(
                                  (item) =>
                                    item.group?.includes(
                                      'website-security'
                                    ) &&
                                    (item.monthlyPrice.toFixed(2) === '0.00'
                                      ? 'Included'
                                      : currencySymbol +
                                      ' ' +
                                      item.monthlyPrice.toFixed(2))
                                )
                                : selectedAddons.map(
                                  (item) =>
                                    item.group?.includes(
                                      'website-security'
                                    ) &&
                                    (item.yearlyPrice.toFixed(2) === '0.00'
                                      ? 'Included'
                                      : currencySymbol +
                                      ' ' +
                                      item.yearlyPrice.toFixed(2))
                                )}
                            </div>
                          </div>
                          {selectedAddons.map(
                            (selected, idx) =>
                              selected.group === 'invisible-data' && (
                                <div
                                  key={idx}
                                  className="flex flex-row justify-between px-6  pb-4"
                                >
                                  <div className="flex basis-10/12 items-center gap-2 text-base">
                                    <Image
                                      alt="image"
                                      src={ls.src}
                                      height={24}
                                      width={31}
                                    />
                                    <div className="font-['Mont-book'] text-darkGrey">
                                      {selected.title
                                        .toString()
                                        .split(',')
                                        .join('')}
                                    </div>
                                  </div>
                                  <div className="basis-2/12 text-right font-['Mont-semibold'] text-purple">
                                    {TimePeriod === 'Monthly'
                                      ? selected.monthlyPrice === 0
                                        ? 'Included'
                                        : currencySymbol +
                                        ' ' +
                                        selected.monthlyPrice.toFixed(2)
                                      : selected.yearlyPrice === 0
                                        ? 'Included'
                                        : currencySymbol +
                                        ' ' +
                                        selected.yearlyPrice.toFixed(2)}
                                  </div>
                                </div>
                              )
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex h-[72px] w-[444px] flex-row items-center  justify-between rounded-b-2xl bg-lightTeal/10 px-4 text-[12px]">
                      <div>
                        <div className="font-['Mont-regular'] text-base text-darkGrey">
                          {
                            vpsData?.vpsConfigurator.data.attributes?.contactVps
                              ?.titleCont
                          }{' '}
                        </div>
                        <div className="font-['Mont-regular'] text-sm text-darkGrey">
                          {
                            vpsData?.vpsConfigurator.data.attributes?.contactVps
                              ?.DescCont
                          }{' '}
                        </div>
                      </div>
                      <a
                        href={
                          vpsData?.vpsConfigurator.data.attributes?.contactVps
                            ?.linkButtonCont ?? '/contact-us'
                        }
                        className=" flex cursor-pointer flex-row gap-4 font-['Mont-regular'] text-sm text-lightTeal"
                      >
                        {
                          vpsData?.vpsConfigurator.data.attributes?.contactVps
                            ?.buttonContCta
                        }{' '}
                        <SVG src={arrow.src} className="" />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {(isTablet || isSmallMedia) && (
            <div className="fixed bottom-0 z-50  max-h-[90%] w-full overflow-y-scroll">
              <div
                className="sticky rounded-t-[10px] bg-purple"
                onClick={() =>
                  activeModal === false
                    ? setActiveModal(true)
                    : setActiveModal(false)
                }
              >
                <div className="container mx-auto flex flex-col justify-between gap-y-3 pt-5 pb-2 text-white phoneS:pt-7 phoneS:pb-3 sm:flex-row">
                  <div
                    className={`absolute right-5 top-0 z-0 ${activeModal ? 'rotate-180' : ''
                      }`}
                  >
                    <Image
                      alt="image"
                      src={fixConfigurator.src}
                      height={40}
                      width={23}
                    />
                  </div>
                  <p className="text-center font-['Mont-bold'] text-xl phoneS:text-[26px] md:text-left ">
                    {'Order Summary:'}
                  </p>
                  <div className="flex flex-row justify-center space-x-16">
                    <div className="items-center">
                      <input
                        id="default-radio-1"
                        readOnly
                        type="radio"
                        value="yearly"
                        name="default-radio"
                        checked={billingPeriod === 'yearly'}
                        className="h-4 w-4 cursor-pointer"
                        onClick={() => {
                          setTimePeriod(TimePeriods.Yearly);
                          setBillingPeriod('yearly');
                        }}
                      />
                      <label
                        htmlFor="default-radio-1"
                        className="ml-2 cursor-pointer font-['Mont-bold']  text-base"
                      >
                        {'Annually'}
                      </label>
                      <div className="flex flex-col">
                        <div className="ml-5 font-['Mont-black'] text-2xl md:text-4xl">
                          {currencySymbol} {totalYearlyPrice.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <div className="items-center">
                      <input
                        id="default-radio-2"
                        type="radio"
                        readOnly
                        value="monthly"
                        checked={billingPeriod === 'monthly'}
                        name="default-radio"
                        className="h-4 w-4 cursor-pointer  focus:ring-2"
                        onClick={() => {
                          setTimePeriod(TimePeriods.Monthly);
                          setBillingPeriod('monthly');
                        }}
                      />
                      <label
                        htmlFor="default-radio-2"
                        className="ml-2 cursor-pointer font-['Mont-bold'] text-base"
                      >
                        {'Monthly'}
                      </label>
                      <div className="flex flex-col ">
                        <div className="ml-5 font-['Mont-black'] text-2xl md:text-4xl">
                          {currencySymbol} {totalMonthlyPrice.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {activeModal && (
                <div>
                  <div className="flex flex-col overflow-y-scroll bg-lightPurple p-7 md:flex-row md:p-14">
                    <p className="font-'Mont-bold' text-center text-[22px] text-darkGrey md:w-[30%] md:text-left">
                      {'Order overview:'}
                    </p>
                    <div className="w-[100%] justify-center md:w-[70%]">
                      <div className="flex w-[100%]  flex-col space-y-4 text-base">
                        <div className="flex flex-row justify-between px-6">
                          <div className="flex items-center gap-2 text-base">
                            <Image
                              alt="image"
                              src={locationPurple.src}
                              height={24}
                              width={24}
                            />
                            <div className="font-['Mont-book'] text-darkGrey">
                              Region
                            </div>
                          </div>
                          <div className="font-['Mont-bold'] text-purple">
                            {/* {selectedLocation} */}
                            {
                              locationData?.locations.data.find(
                                (element: any) =>
                                  element.attributes.name === selectedLocation
                              )?.attributes.description
                            }
                          </div>
                        </div>
                        <div className="flex flex-col gap-y-5 px-6 py-8 font-['Mont-regular'] text-base text-darkGrey">
                          <div className="flex justify-between">
                            <div>
                              <b className="font-['Mont-semibold']">Memory:</b>{' '}
                              {ram.join('').toString()} GB
                            </div>
                            <div className="font-['Mont-semibold'] text-purple">
                              {currencySymbol}{' '}
                              {TimePeriod === 'Monthly'
                                ? selectedNumericalAddons.map(
                                  (item) =>
                                    item.sku.includes('ram') &&
                                    item.monthlyPrice.toFixed(2)
                                )
                                : selectedNumericalAddons.map(
                                  (item) =>
                                    item.sku.includes('ram') &&
                                    item.yearlyPrice.toFixed(2)
                                )}
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <div>
                              <b className="font-['Mont-semibold']">
                                CPU cores:
                              </b>{' '}
                              {vCPU.join('').toString()}
                            </div>
                            <div className="font-['Mont-semibold'] text-purple">
                              {currencySymbol}{' '}
                              {TimePeriod === 'Monthly'
                                ? selectedNumericalAddons.map(
                                  (item) =>
                                    item.sku.includes('cpu') &&
                                    item.monthlyPrice.toFixed(2)
                                )
                                : selectedNumericalAddons.map(
                                  (item) =>
                                    item.sku.includes('cpu') &&
                                    item.yearlyPrice.toFixed(2)
                                )}
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <div>
                              <b className="font-['Mont-semibold']">
                                SSD Storage:
                              </b>{' '}
                              {storage.join('').toString()}GB
                            </div>
                            <div className="font-['Mont-semibold'] text-purple">
                              {currencySymbol}{' '}
                              {TimePeriod === 'Monthly'
                                ? selectedNumericalAddons.map(
                                  (item) =>
                                    item.sku.includes('disk') &&
                                    item.monthlyPrice.toFixed(2)
                                )
                                : selectedNumericalAddons.map(
                                  (item) =>
                                    item.sku.includes('disk') &&
                                    item.yearlyPrice.toFixed(2)
                                )}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row justify-between px-6 pb-4">
                          <div className="flex basis-8/12 items-center gap-2 text-base">
                            <Image
                              alt="image"
                              src={webPro.src}
                              height={24}
                              width={27}
                            />
                            <div className="font-['Mont-book'] text-darkGrey">
                              {pleskLicense.toString().split(',').join('')}
                            </div>
                          </div>
                          <div className="basis-4/12 text-right font-['Mont-semibold'] text-purple">
                            {TimePeriod === 'Monthly'
                              ? selectedAddons.map(
                                (item) =>
                                  item.group?.includes('server-licensing') &&
                                  (item.monthlyPrice.toFixed(2) === '0.00'
                                    ? 'Included'
                                    : currencySymbol +
                                    ' ' +
                                    item.monthlyPrice.toFixed(2))
                              )
                              : selectedAddons.map(
                                (item) =>
                                  item.group?.includes('server-licensing') &&
                                  (item.yearlyPrice.toFixed(2) === '0.00'
                                    ? 'Included'
                                    : currencySymbol +
                                    ' ' +
                                    item.yearlyPrice.toFixed(2))
                              )}
                          </div>
                        </div>
                        <div className="flex flex-row justify-between px-6  pb-4">
                          <div className="flex basis-8/12 items-center gap-2 text-base">
                            <Image
                              alt="image"
                              src={webEsen.src}
                              height={24}
                              width={19}
                            />
                            <div className="font-['Mont-book'] text-darkGrey">
                              {emailSecurity.toString().split(',').join('')}
                            </div>
                          </div>
                          <div className="basis-4/12 text-right font-['Mont-semibold'] text-purple">
                            {TimePeriod === 'Monthly'
                              ? selectedAddons.map(
                                (item) =>
                                  item.group?.includes('email-security') &&
                                  (item.monthlyPrice.toFixed(2) === '0.00'
                                    ? 'Included'
                                    : currencySymbol +
                                    ' ' +
                                    item.monthlyPrice.toFixed(2))
                              )
                              : selectedAddons.map(
                                (item) =>
                                  item.group?.includes('email-security') &&
                                  (item.yearlyPrice.toFixed(2) === '0.00'
                                    ? 'Included'
                                    : currencySymbol +
                                    ' ' +
                                    item.yearlyPrice.toFixed(2))
                              )}
                          </div>
                        </div>
                        <div className="flex flex-row justify-between px-6  pb-4">
                          <div className="flex basis-8/12 items-center gap-2 text-base">
                            <Image
                              alt="image"
                              src={webEsen.src}
                              height={24}
                              width={19}
                            />
                            <div className="font-['Mont-book'] text-darkGrey">
                              {serverUpgrades.toString().split(',').join('')}
                            </div>
                          </div>
                          <div className="basis-4/12 text-right font-['Mont-semibold'] text-purple">
                            {TimePeriod === 'Monthly'
                              ? selectedAddons.map(
                                (item) =>
                                  item.group?.includes('server-upgrades') &&
                                  (item.monthlyPrice.toFixed(2) === '0.00'
                                    ? 'Included'
                                    : currencySymbol +
                                    ' ' +
                                    item.monthlyPrice.toFixed(2))
                              )
                              : selectedAddons.map(
                                (item) =>
                                  item.group?.includes('server-upgrades') &&
                                  (item.yearlyPrice.toFixed(2) === '0.00'
                                    ? 'Included'
                                    : currencySymbol +
                                    ' ' +
                                    item.yearlyPrice.toFixed(2))
                              )}
                          </div>
                        </div>
                        <div className="flex flex-row justify-between px-6  pb-4">
                          <div className="flex basis-8/12 items-center gap-2 text-base">
                            <Image
                              alt="image"
                              src={securityList.src}
                              height={24}
                              width={20}
                            />
                            <div className="font-['Mont-book'] text-darkGrey">
                              {pleskLicense.toString().split(',').join('')}
                            </div>
                          </div>
                          <div className="basis-4/12 text-right font-['Mont-semibold'] text-purple">
                            {TimePeriod === 'Monthly'
                              ? selectedAddons.map(
                                (item) =>
                                  item.group?.includes('ls-backup') &&
                                  (item.monthlyPrice.toFixed(2) === '0.00'
                                    ? 'Included'
                                    : currencySymbol +
                                    ' ' +
                                    item.monthlyPrice.toFixed(2))
                              )
                              : selectedAddons.map(
                                (item) =>
                                  item.group?.includes('ls-backup') &&
                                  (item.yearlyPrice.toFixed(2) === '0.00'
                                    ? 'Included'
                                    : currencySymbol +
                                    ' ' +
                                    item.yearlyPrice.toFixed(2))
                              )}
                          </div>
                        </div>
                        <div className="flex flex-row justify-between px-6  pb-4">
                          <div className="flex basis-8/12 items-center gap-2 text-base">
                            <Image
                              alt="image"
                              src={ls.src}
                              height={24}
                              width={31}
                            />
                            <div className="font-['Mont-book'] text-darkGrey">
                              {websiteSecurity.toString().split(',').join('')}
                            </div>
                          </div>
                          <div className="basis-4/12 text-right font-['Mont-semibold'] text-purple">
                            {TimePeriod === 'Monthly'
                              ? selectedAddons.map(
                                (item) =>
                                  item.group?.includes('website-security') &&
                                  (item.monthlyPrice.toFixed(2) === '0.00'
                                    ? 'Included'
                                    : currencySymbol +
                                    ' ' +
                                    item.monthlyPrice.toFixed(2))
                              )
                              : selectedAddons.map(
                                (item) =>
                                  item.group?.includes('website-security') &&
                                  (item.yearlyPrice.toFixed(2) === '0.00'
                                    ? 'Included'
                                    : currencySymbol +
                                    ' ' +
                                    item.yearlyPrice.toFixed(2))
                              )}
                          </div>
                        </div>
                        {selectedAddons.map(
                          (selected, idx) =>
                            selected.group === 'invisible-data' && (
                              <div
                                key={idx}
                                className="flex flex-row justify-between px-6  pb-4"
                              >
                                <div className="flex basis-8/12 items-center gap-2  text-base">
                                  <Image
                                    alt="image"
                                    src={ls.src}
                                    height={24}
                                    width={31}
                                  />
                                  <div className="font-['Mont-book'] text-darkGrey">
                                    {selected.title
                                      .toString()
                                      .split(',')
                                      .join('')}
                                  </div>
                                </div>
                                <div className="basis-4/12 text-right  font-['Mont-semibold'] text-purple">
                                  {TimePeriod === 'Monthly'
                                    ? selected.monthlyPrice === 0
                                      ? 'Included'
                                      : currencySymbol +
                                      ' ' +
                                      selected.monthlyPrice.toFixed(2)
                                    : selected.yearlyPrice === 0
                                      ? 'Included'
                                      : currencySymbol +
                                      ' ' +
                                      selected.yearlyPrice.toFixed(2)}
                                </div>
                              </div>
                            )
                        )}
                      </div>
                      <div className="mt-5 mb-4 flex justify-center">
                        <div className="mt-3 pl-2">
                          {/* <span onClick={handleSubmit}> */}
                          <span>
                            <button
                              className="font-['Mont-semibold'] justify-center rounded-full  border-2  border-purple  bg-white  px-[42px] py-[12px] text-base  text-purple transition duration-500 hover:border-2   hover:border-purple hover:bg-purple hover:text-white md:text-lg"
                              onClick={() => {
                                onClickAddToCart(data[0]);
                              }}
                            >
                              Add to cart
                            </button>
                          </span>
                          {isSubmitted && (
                            <p className="absolute pl-2 pt-2 text-xs font-extrabold text-lightTeal ">
                              Added to cart succeesfully!
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between bg-extraLightTeal py-5 px-14">
                    <div className="flex flex-col gap-x-2 md:flex-row md:items-end">
                      <div className="font-['Mont-regular'] text-base text-darkGrey">
                        {
                          vpsData?.vpsConfigurator.data.attributes?.contactVps
                            ?.titleCont
                        }{' '}
                      </div>
                      <div className="font-['Mont-regular'] text-sm text-darkGrey">
                        {
                          vpsData?.vpsConfigurator.data.attributes?.contactVps
                            ?.DescCont
                        }{' '}
                      </div>
                    </div>
                    <a
                      href={
                        vpsData?.vpsConfigurator.data.attributes?.contactVps
                          ?.linkButtonCont ?? '/contact-us'
                      }
                      className=" flex cursor-pointer flex-row gap-4 font-['Mont-regular'] text-sm text-darkTeal"
                    >
                      {
                        vpsData?.vpsConfigurator.data.attributes?.contactVps
                          ?.buttonContCta
                      }
                      <SVG src={arrow.src} className="" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Layout>
      {isBlockedAddonVisible && (
        <BlockedAddonPopUp
          title={blockedAddonTitle}
          messages={blockedAddonMessage}
          onClose={() => setIsBlockedAddonVisible(false)}
        />
      )}
    </>
  );
};
export default Home;
