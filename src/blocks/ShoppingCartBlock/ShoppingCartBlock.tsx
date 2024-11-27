import React, { useCallback, useContext, useEffect, useState } from 'react';
import bin from './assets/bin.svg';
import edit from './assets/edit.svg';
import Image from 'next/legacy/image';
import Button from '@components/Button';
import CartContext from '@utils/contexts/cartContext';
import {
  CustomVpsAddonInterface,
  CustomVpsInterface,
  CustomVpsNumericalAddonInterface,
  ProductPriceInterface,
  ProductResponseInterface,
  VmPlanInterface,
  EditVpsInterface,
} from '@pages/vps/types';
import LoginContext from '@utils/contexts/loginContext';
import AccordionShoppingCart from '@components/AccordionShoppingCart';
import CustomCartContext from '@utils/contexts/customCartContext';
import CartDomainContext from '@utils/contexts/cartDomainContext';
import AccordionDomainShoppingCart from '@components/AccordionDomainShoppingCart';
import { DomainInterface } from '@blocks/DomainsNameBlock/DomainsNameBlock';
import EditVPSContext from '@utils/contexts/editVPSContext';
import { LocationContext } from '@utils/contexts/locationContext';
import CartWordPresContext from '@utils/contexts/cartWordPresContext';
import CartDomainFinalContext from '@utils/contexts/cartFinalDomainContext';
import {
  DomainFinalInterface,
  registration_data,
} from '@blocks/DomainsNameBlock/testingModal';
import { CurrencyContext } from '@utils/contexts/currencyContext';
import { ResponseData as DomainData } from '@pages/api/domainSearch';
import Layout from '@layout/Layout/Layout';
import { useLazyQuery } from '@apollo/client';
import { ALL_ADDONS_QUERY, ALL_PORDUCTS_QUERY } from '@utils/queries';
import { DomainTransfer } from '@pages/api/domainTransferSearch';
import EnterEmail from '@components/EnterEmail';
import AboutHeroBlock from '@blocks/AboutHeroBlock/AboutHeroBlock';
import EmptyCart from './EmptyCart';
import certification from './assets/certification.png';
import lock from './assets/lock.svg';
import poweredByStripe from './assets/poweredByStripe.svg';
import visa from './assets/visa.png';
import mc from './assets/mc.png';
import americanE from './assets/americanE.png';
import googlePay from './assets/googlePay.png';
import applePay from './assets/applePay.png';
import { useMediaQuery } from 'react-responsive';
import fixConfigurator from './assets/fixConfigurator.svg';
import animation from '../../../src/components/assets/loader-grey.svg';
import { FooterEntity, HeaderEntity } from '@utils/types';
import * as Sentry from "@sentry/nextjs";

export interface P {
  title: string;
  headerData: HeaderEntity | undefined;
  footerData: FooterEntity | undefined;
}
interface RedirectUrl {
  chargebeeUrl: string;
}
interface Values {
  address: string;
  city: string;
  country: string;
  postCode: string;
  secondAddress: string;
}

export interface DisplayArrayInterface {
  vps: CustomVpsInterface;
  quantity: number;
  totalPrice: number;
}
export interface DisplayArrayDomainInterface {
  domain: DomainInterface;
  totalPrice?: number;
}
interface OrderAddons {
  sku: string;
  quantity: number;
}
export interface domain_name {
  domainName?: string;
}
export interface DomainAllData {
  type?: string;
  domain: domain_name;
  registration_data?: registration_data;
}
export interface OrderArrayInterface {
  sku?: string;
  addons?: OrderAddons[];
  meta?: DomainAllData;
}

function ShoppingCartBlock({ title, headerData, footerData }: P): JSX.Element {
  const isDesktop = useMediaQuery({ minWidth: 1280 });
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const stripeImages = [visa, mc, americanE, googlePay, applePay];
  const { cartItems, setCartItems } = useContext(CartContext);
  const { customCartItems, setCustomCartItems } = useContext(CustomCartContext);
  const { domainCart, setDomainCartItems } = useContext(CartDomainContext);
  const { selectedCurrency, currencySymbol } = useContext(CurrencyContext);

  const [isEmailFormOpen, setIsEmailFormOpen] = useState(false);

  const { domainFinalCart, setDomainFinalCartItems } = useContext(
    CartDomainFinalContext
  );

  const [couponErr, setCouponErr] = useState<string>('');

  const { cartWordPresItems, setCartWordPresItems } =
    useContext(CartWordPresContext);

  const { editVPSItems, setEditVPSItems } = useContext(EditVPSContext);
  const { selectedLocation, setSelectedLocation } = useContext(LocationContext);

  const [subTotal, setSubTotal] = useState<number>();
  const [displayDomainArray, setDisplayDomainArray] = useState<
    DisplayArrayDomainInterface[]
  >([]);

  const [orderItems, setOrderItems] = useState<OrderArrayInterface[]>([]);
  const { user } = useContext(LoginContext);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [accordionStates, setAccordionStates] = useState<boolean[]>(
    cartItems.map(() => true)
  );
  useEffect(() => {
    setAccordionStates(cartItems.map(() => true));
  }, [cartItems]);
  const btnOnClick = (index: number) => {
    setAccordionStates((prevState) =>
      prevState.map((state, i) => (i === index ? !state : state))
    );
  };

  const [domain, setDomain] = useState<DomainData[] | null>(null);
  // const [formInput, setFormInput] = useState<string>('');
  const [domainProba, setDomainProba] = useState<DomainFinalInterface[]>([]);
  const [showLoginWindow, setShowLoginWindow] = useState<boolean>(false);

  const [domainTransfer, setDomainTransfer] = useState<DomainTransfer[] | null>(
    null
  );

  const [couponCode, setCouponCode] = useState<string>('');

  useEffect(() => {
    localStorage.removeItem('COUPON_CODE');
    localStorage.setItem('COUPON_CODE', couponCode);
  }, [couponCode]);

  useEffect(() => {
    sessionStorage.removeItem('layershift_fa_access_token');
    localStorage.removeItem('layershift_user_is_logged_in');
    localStorage.removeItem('layershift_fa_refresh_token');
  }, []);

  useEffect(() => {
    let formInput = '';
    const newDomains: DomainData[] = [];
    const newDomainsTrans: DomainTransfer[] = [];

    const fetchPromises = domainFinalCart.map((item) => {
      formInput = item.domain.domainName ?? '';

      if (item.type === 'transfer') {
        return fetch('/api/domainTransferSearch', {
          method: 'POST',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ search: formInput }),
        })
          .then((response) => response.json())
          .then((response) => {
            newDomainsTrans.push(response as DomainTransfer);
          })
          .catch((err) => Sentry.captureException(err));
      } else if (item.type === 'registration') {
        return fetch('/api/domainSearch', {
          method: 'POST',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ search: formInput }),
        })
          .then((response) => response.json())
          .then((response) => {
            newDomains.push(response as DomainData);
          })
          .catch((err) => Sentry.captureException(err));
      }

      return Promise.resolve();
    });

    Promise.all(fetchPromises).then(() => {
      setDomain(newDomains);
      setDomainTransfer(newDomainsTrans);
    });
  }, [selectedCurrency]);

  useEffect(() => {
    const newDomains: DomainFinalInterface[] = [];

    domainFinalCart.map((item) => {
      domain?.map((d) => {
        if (item.domain.domainName === d.result.domain) {
          d.result.price?.map((price) => {
            if (price.currency === selectedCurrency) {
              newDomains.push({
                domain: {
                  domainPrice: price.register,
                  domainSelectedCurrency: price.currency,
                  domainName: d.result.domain,
                },
                domainInfo: item.domainInfo,
                auth_code: item.auth_code,
                registration_data: item.registration_data,
                type: item.type,
              });
            }
          });
        }
      });
    });
    domainFinalCart.map((item) => {
      domainTransfer?.map((d) => {
        if (item.domain.domainName === d.domain) {
          d.price?.map((price) => {
            if (price.currency === selectedCurrency) {
              newDomains.push({
                domain: {
                  domainPrice: price.transfer,
                  domainSelectedCurrency: price.currency,
                  domainName: d.domain,
                },
                domainInfo: item.domainInfo,
                auth_code: item.auth_code,
                registration_data: item.registration_data,
                type: item.type,
              });
            }
          });
        }
      });
    });
    setDomainProba(newDomains);
  }, [domain, domainTransfer]);

  if (domainProba.length === domainFinalCart.length && domainProba.length > 0) {
    setDomainFinalCartItems(domainProba);
    localStorage.setItem(
      'SELECTED_DOMAIN_FINAL_CART_ITEMS',
      JSON.stringify(domainProba)
    );
  }

  useEffect(() => {
    let price = 0;
    for (const item of cartItems) {
      price = price + item.totalPrice;
    }
    for (const itemD of domainFinalCart) {
      price = price + itemD.domain.domainPrice;
    }
    for (const itemW of cartWordPresItems) {
      price = price + itemW.totalPrice;
    }
    setSubTotal(price);
  }, [cartItems, domainFinalCart, cartWordPresItems]);

  const onClickDeleteItem = (deleteVPS: CustomVpsInterface) => {
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

    const cartItemsDeleted = start;
    cartItemsDeleted.splice(
      cartItemsDeleted.findIndex(
        (item) => JSON.stringify(item) === JSON.stringify(deleteVPS)
      ),
      1
    );
    setCartItems([...cartItemsDeleted]);
    localStorage.setItem(
      'SELECTED_CART_ITEMS',
      JSON.stringify(cartItemsDeleted)
    );
  };
  const onClickEditItem = (editVPS: CustomVpsInterface) => {
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

    const cartItemsDeleted = cartItems;
    cartItemsDeleted.splice(
      cartItemsDeleted.findIndex(
        (item) => JSON.stringify(item) === JSON.stringify(editVPS)
      ),
      1
    );
    setCartItems([...cartItemsDeleted]);
    localStorage.setItem(
      'SELECTED_CART_ITEMS',
      JSON.stringify(cartItemsDeleted)
    );
  };

  const onClickDeleteDomainItem = (deleteDomain: DomainFinalInterface) => {
    const start: DomainFinalInterface[] = [];

    if (localStorage.getItem('SELECTED_DOMAIN_FINAL_CART_ITEMS') === null) {
      localStorage.setItem(
        'SELECTED_DOMAIN_FINAL_CART_ITEMS',
        JSON.stringify(start)
      );
    }
    if (localStorage.getItem('SELECTED_DOMAIN_FINAL_CART_ITEMS') !== null) {
      start.push(
        ...(JSON.parse(
          localStorage.getItem('SELECTED_DOMAIN_FINAL_CART_ITEMS') ?? ''
        ) as DomainFinalInterface[])
      );
    }

    const cartDomainItemsDeleted = start;
    cartDomainItemsDeleted.splice(
      cartDomainItemsDeleted.findIndex(
        (item) => JSON.stringify(item) === JSON.stringify(deleteDomain)
      ),
      1
    );
    setDomainFinalCartItems([...cartDomainItemsDeleted]);
    localStorage.setItem(
      'SELECTED_DOMAIN_FINAL_CART_ITEMS',
      JSON.stringify(cartDomainItemsDeleted)
    );
  };

  useEffect(() => {
    let amount = 0;
    const oi: any = [];

    const cartItems = localStorage.getItem('SELECTED_CART_ITEMS');
    if (cartItems) {
      JSON.parse(cartItems)?.map((item: any) => {
        amount += item.totalPrice;

        const per = item.timePeriod;

        const addons: any = [];

        if (item.addons) {
          item.addons.map((adn: any) => {
            addons.push({
              sku: adn?.[`sku${per}`],
              quantity: 1,
            });
          });
        }

        if (item.numericalAddons) {
          item.numericalAddons.map((adn: any) => {
            addons.push({
              sku: adn?.[`sku${per}`],
              quantity: adn.amountSelected,
            });
          });
        }

        const oItem = {
          sku: item?.vmPlan?.[`sku${per}`],
          addons: addons,
          domain: item?.domain,
        };
        oi.push(oItem);
      });
    }
    setOrderItems(oi);
  }, []);

  const openEmailForm = async () => {
    setCouponErr('');
    setIsLoading(true);
    const apiEndpoint =
      process.env.NEXT_PUBLIC_STRAPI_URI ?? 'http://localhost:1337';

    if (couponCode) {
      await fetch(`${apiEndpoint}/api/check-coupon/${couponCode}`)
        .then((response) => response.json())
        .then((response) => {
          //console.log('response', response);
          if (response.available === true) {
            setIsEmailFormOpen(true);
            setIsLoading(false);
          } else {
            setCouponErr(response.error.message);
            setIsLoading(false);
          }
        });
    } else {
      setIsEmailFormOpen(true);
      setIsLoading(false);
    }
  };

  const closeEmailForm = () => {
    setIsEmailFormOpen(false);
  };

  /* const loginUrl = new URL(
     `${process.env.NEXT_PUBLIC_LOGIN_URL?.toString()}stripe-payment` ?? ''
   );*/
  const loginUrl = new URL(`${process.env.NEXT_PUBLIC_LOGIN_URL?.toString()}stripe-payment`);

  const onClickEmptyCart = () => {
    setCartItems([]);
    setCartWordPresItems([]);
    setDomainCartItems([]);
    setDomainFinalCartItems([]);
    localStorage.setItem('SELECTED_CART_ITEMS', JSON.stringify([]));
    // localStorage.setItem('SELECTED_CART_WORD_PRES_ITEMS', JSON.stringify([]));
    localStorage.setItem('SELECTED_DOMAIN_CART_ITEMS', JSON.stringify([]));
    localStorage.setItem(
      'SELECTED_DOMAIN_FINAL_CART_ITEMS',
      JSON.stringify([])
    );
  };

  const [loadProducts, { loading: productsLoading, data: productsData }] =
    useLazyQuery<ProductResponseInterface>(ALL_PORDUCTS_QUERY);

  const [loadAddons, { loading: addonsLoading, data: addonsData }] =
    useLazyQuery<ProductResponseInterface>(ALL_ADDONS_QUERY);

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
  useEffect(() => {
    void getProducts();
  }, [getProducts, selectedCurrency, selectedLocation]);
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
  useEffect(() => {
    void getAddons();
  }, [getAddons, selectedCurrency]);

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

  useEffect(() => {
    const novArray: CustomVpsInterface[] = [];
    cartItems.map((item: any) => {
      const fullVMObject = productsData?.products.data.find(
        (object) => object.attributes.sku === item.vmPlan?.sku
      );

      const monthlyVM = fullVMObject?.attributes.productPrices.data.find(
        (price) => price.attributes.sku.includes('Monthly')
      );

      const yearlyVM = fullVMObject?.attributes.productPrices.data.find(
        (price) => price.attributes.sku.includes('Yearly')
      );
      const vm: VmPlanInterface = {
        sku: item.vmPlan?.sku,
        title: fullVMObject?.attributes.title || '',
        skuMonthly: monthlyVM?.attributes.sku,
        skuYearly: yearlyVM?.attributes.sku,
        monthlyPrice: monthlyVM?.attributes.price,
        yearlyPrice: yearlyVM?.attributes.price,
        domain: item.domain?.domainName,
      };

      const newAddons: CustomVpsAddonInterface[] = [];
      item.addons.map((itemAddons: any) => {
        const fullObject = addonsData?.products.data.find(
          (object) => object.attributes.sku === itemAddons.sku
        );

        const monthly = fullObject?.attributes.productPrices.data.find(
          (price) => price.attributes.sku.includes('Monthly')
        );

        const yearly = fullObject?.attributes.productPrices.data.find((price) =>
          price.attributes.sku.includes('Yearly')
        );

        newAddons.push({
          sku: itemAddons.sku,
          title: fullObject?.attributes.title || '',
          description: fullObject?.attributes.description ?? '',
          selectedCurrency: monthly?.attributes.currency || selectedCurrency,
          skuMonthly: monthly?.attributes.sku || '',
          skuYearly: yearly?.attributes.sku || '',
          monthlyPrice: monthly?.attributes.price || 0,
          yearlyPrice: yearly?.attributes.price || 0,
          group: itemAddons.group,
        });
      });

      const newNumAddons: CustomVpsNumericalAddonInterface[] = [];
      item.numericalAddons.map((itemNumAddons: any) => {
        const fullObject = addonsData?.products.data.find(
          (object) => object.attributes.sku === itemNumAddons.sku
        );
        const monthly = fullObject?.attributes.productPrices.data.find(
          (price) => price.attributes.sku.includes('Monthly')
        );
        const yearly = fullObject?.attributes.productPrices.data.find((price) =>
          price.attributes.sku.includes('Yearly')
        );

        const monthlyPrice = getPricesNumAddon(
          {
            attributes: {
              currency: selectedCurrency,
              sku: monthly?.attributes.sku || '',
              tiers: monthly?.attributes.tiers,
              price: monthly?.attributes.price || 0,
            },
          },
          itemNumAddons.amountSelected
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
          itemNumAddons.amountSelected
        );

        newNumAddons.push({
          sku: itemNumAddons.sku,
          skuMonthly: monthly?.attributes.sku || '',
          skuYearly: yearly?.attributes.sku || '',
          title: fullObject?.attributes.title || itemNumAddons.title,
          monthlyPrice: monthlyPrice || 0,
          yearlyPrice: yearlyPrice || 0,
          selectedCurrency: yearly?.attributes.currency || selectedCurrency,
          amountSelected: itemNumAddons.amountSelected,
          increment:
            fullObject?.attributes.metadata?.increment ||
            itemNumAddons.increment,
          max: fullObject?.attributes.metadata?.max || itemNumAddons.max,
          min: fullObject?.attributes.metadata?.min || itemNumAddons.min,
        });
      });

      novArray.push({
        domain: item.domain,
        vmPlan: vm,
        addons: newAddons,
        numericalAddons: newNumAddons,
        selectedCurrency: selectedCurrency,
        totalPrice:
          item.timePeriod === 'Monthly'
            ? (vm.monthlyPrice || 0) +
            newAddons.reduce((acc, price) => acc + price.monthlyPrice, 0) +
            newNumAddons.reduce((acc, price) => acc + price.monthlyPrice, 0)
            : (vm.yearlyPrice || 0) +
            newAddons.reduce((acc, price) => acc + price.yearlyPrice, 0) +
            newNumAddons.reduce((acc, price) => acc + price.yearlyPrice, 0),
        timePeriod: item.timePeriod,
      });
    });
    if (
      novArray.length ===
      JSON.parse(localStorage.getItem('SELECTED_CART_ITEMS') ?? '[]').length
    ) {
      setCartItems([...novArray]);
      localStorage.setItem(
        'SELECTED_CART_ITEMS',
        JSON.stringify([...novArray])
      );
    }
  }, [productsData, addonsData, selectedCurrency]);

  return (
    (<Layout
      showLoginWindow={showLoginWindow}
      setShowLoginWindow={setShowLoginWindow}
      header={headerData}
      footer={footerData}
    >
      <AboutHeroBlock title={'SHOPPING **CART**'} id="1" />
      {cartItems.length === 0 && domainFinalCart.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="mx-auto w-[90%] lg:container">
          <div className="mb-20 flex gap-x-16">
            <div className="w-full xl:basis-2/3">
              <div className="mb-2 flex justify-end font-['Mont-regular'] text-base  text-liliac lg:text-xl">
                <button
                  type="button"
                  onClick={() => {
                    onClickEmptyCart();
                  }}
                >
                  Empty cart
                </button>
              </div>
              <div className="mx-auto flex w-full flex-col justify-center">
                <div className="flex ">
                  <div className=" flex basis-11/12 border-b-[1px] border-[#C1C1C1] text-left font-['Mont-regular'] text-xs text-darkGrey lg:text-base">
                    <div className="basis-5/12 lg:basis-7/12">Product name</div>
                    <div className="basis-3/12 lg:basis-2/12">Price</div>
                    <div className="basis-3/12 lg:basis-2/12">Subscription</div>
                    <div className="basis-1/12 "> </div>
                  </div>
                  <div className="basis-1/12 border-b-[1px] border-[#C1C1C1]"></div>
                </div>
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className={` ${index % 2 === 0 ? 'bg-[#f9f9f9]' : 'bg-white'
                      }  flex justify-between `}
                  >
                    <div className="w-full basis-11/12">
                      <AccordionShoppingCart product={item} index={index} />
                    </div>
                    <div className="flex basis-1/12 justify-end gap-2 py-[10px]">
                      {item.numericalAddons.length > 1 && (
                        <div>
                          <button
                            type="button"
                            onClick={() => {
                              onClickEditItem(item);
                            }}
                          >
                            <span className="pr-2">
                              <a href="/vps">
                                <Image src={edit as string} alt="down-arrow" />
                              </a>
                            </span>
                          </button>
                        </div>
                      )}
                      <div>
                        <button
                          type="button"
                          onClick={() => {
                            onClickDeleteItem(item);
                          }}
                        >
                          <span className="pr-2">
                            <Image src={bin as string} alt="down-arrow" />
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {domainFinalCart.map((itemD, index) => (
                  <div
                    key={index}
                    className={` ${cartItems.length % 2 === 1
                      ? index % 2 === 1
                        ? 'bg-[#f9f9f9]'
                        : 'bg-white'
                      : index % 2 === 0
                        ? 'bg-[#f9f9f9]'
                        : 'bg-white'
                      } flex basis-11/12 justify-between `}
                  >
                    <AccordionDomainShoppingCart product={itemD} />
                    <div className="flex basis-1/12 justify-end gap-2 py-[10px]">
                      <div>
                        <button
                          type="button"
                          onClick={() => {
                            onClickDeleteDomainItem(itemD);
                          }}
                        >
                          <span className="pr-2">
                            <Image src={bin as string} alt="down-arrow" />
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {isDesktop && (
              <div className="basis-1/3">
                <div className="">
                  <div className="rounded-[10px] bg-lightPurple py-8 px-5">
                    <div className="border-b-[1px] border-lightGrey pb-8 font-['Mont-bold'] text-[28px] text-liliac">
                      Order Summary
                    </div>
                    <div>
                      <table className="flex-flex-col w-full gap-y-6  font-['Mont-regular'] text-xl text-darkGrey">
                        <tr>
                          <td className="pt-4 font-['Mont-semibold']">
                            Subtotal
                          </td>
                          <td className="pt-4 text-right">
                            {currencySymbol}
                            {subTotal?.toFixed(2)}
                          </td>
                        </tr>
                        <tr className=" border-b-[1px] border-lightGrey font-['Mont-regular'] text-base text-grey">
                          <td className="pb-4 font-['Mont-semibold'] text-xl text-darkGrey">
                            VAT
                          </td>
                          <td className="pb-4 text-right">
                            Calculated at checkout
                          </td>
                        </tr>
                        <tr className="border-b-[1px] border-lightGrey font-['Mont-regular'] text-base text-grey">
                          <td className="py-4 font-['Mont-semibold'] text-[28px] text-darkGrey">
                            Total
                          </td>
                          <td className="py-4 text-right">
                            Calculated at checkout
                          </td>
                        </tr>
                      </table>
                    </div>

                    <div className="flex flex-col gap-y-2 pt-10 pb-16">
                      <div className="font-['Mont-regular'] text-base text-darkGrey underline">
                        Have a promo code?
                      </div>
                      <div>
                        <input
                          placeholder="VGH34ae23%"
                          type="text"
                          className="rounded-[5px] py-[13px] px-[19px] text-base placeholder:text-grey"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                        />
                      </div>
                      {couponErr && (
                        <p className="font-['Mont-regular'] text-base text-[#dc2626]">
                          {couponErr}
                        </p>
                      )}
                    </div>
                    <div className="flex justify-center">
                      {user.isLoggedin ? (
                        <Button
                          color="tertiary"
                          cta="To secure checkout"
                          link="/summary"
                        />
                      ) : (
                        // <Button
                        //   cta="To secure checkout"
                        //   color="quaternary"
                        //   clickHandler={() => openEmailForm()}
                        // />
                        (<button
                          onClick={() => openEmailForm()}
                          className="justify-center rounded-full  border-2  border-darkTeal  bg-white px-[42px] py-[12px]  font-['Mont-semibold'] text-darkTeal transition duration-500   hover:border-2 hover:border-darkTeal hover:bg-darkTeal hover:text-white"
                        >
                          {isLoading ? (
                            <div className="spinner flex gap-2" id="spinner">
                              To secure checkout{' '}
                              <Image
                                className="animate-spin"
                                alt="image"
                                src={animation.src}
                                height={25}
                                width={25}
                                layout="fixed"
                              />
                            </div>
                          ) : (
                            'To secure checkout'
                          )}
                        </button>)
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-center pt-5 pb-12">
                  <Image src={certification} alt="certification" />
                </div>
                <div>
                  <div className="flex items-center justify-between border-b-[1px] border-darkGrey">
                    <div className="flex items-end gap-2">
                      <Image src={lock} alt="lock" width={23} height={23} />{' '}
                      <div className="font-['Mont-regular'] text-[11px] text-darkGrey">
                        Guaranteed{' '}
                        <b className="font-['Mont-bold']">safe & secure</b>{' '}
                        checkout
                      </div>
                    </div>
                    <div>
                      <a href="https://stripe.com/">
                        <Image alt="poweredByStripe" src={poweredByStripe} />
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-between pt-2 pb-20">
                    {stripeImages.map((item, index) => (
                      <Image
                        key={index}
                        alt="stripe"
                        src={item.src}
                        width={item.width}
                        height={item.height}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          {!isDesktop && (
            <div>
              <div className="flex justify-center pt-5 pb-12">
                <Image src={certification} alt="certification" />
              </div>
              <div>
                <div className="flex items-center justify-between border-b-[1px] border-darkGrey">
                  <div className="flex items-end gap-2">
                    <Image src={lock} alt="lock" width={23} height={23} />{' '}
                    <div className="font-['Mont-regular'] text-[11px] text-darkGrey">
                      Guaranteed{' '}
                      <b className="font-['Mont-bold']">safe & secure</b>{' '}
                      checkout
                    </div>
                  </div>
                  <div>
                    <a href="https://stripe.com/">
                      <Image alt="poweredByStripe" src={poweredByStripe} />
                    </a>
                  </div>
                </div>
                <div className="flex justify-between pt-2 pb-20">
                  {stripeImages.map((item, index) => (
                    <Image
                      key={index}
                      alt="stripe"
                      src={item.src}
                      width={item.width}
                      height={item.height}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {isEmailFormOpen && <EnterEmail closeEmailForm={closeEmailForm} />}
        </div>
      )}
      {!isDesktop && (cartItems.length !== 0 || domainFinalCart.length !== 0) && (
        <div className="fixed bottom-0 z-40  max-h-[90%] w-full overflow-y-scroll">
          <div
            className="sticky rounded-t-[10px] bg-purple"
            onClick={() =>
              activeModal === false
                ? setActiveModal(true)
                : setActiveModal(false)
            }
          >
            <div className="p-7 md:p-14 mx-auto flex flex-col justify-between gap-y-3 pt-5 pb-2 text-white phoneS:pt-7 phoneS:pb-3 sm:flex-row">
              <div className="w-full">
                <div className="font-['Mont-bold'] text-[22px] md:text-left ">
                  {'Order Summary:'}
                </div>
                {!activeModal && (
                  <table className="w-full">
                    <tr className=" text-[12px]">
                      <td className="font-['Mont-semibold']">Subtotal:</td>
                      <td className="text-right font-['Mont-regular']">
                        {' '}
                        {currencySymbol}
                        {subTotal?.toFixed(2)}
                      </td>
                    </tr>
                    <tr className=" text-[12px]">
                      <td className="font-['Mont-semibold']">VAT:</td>
                      <td className="text-right font-['Mont-regular'] text-grey">
                        Calculated at checkout
                      </td>
                    </tr>

                    <tr className="text-[18px]">
                      <td className="font-['Mont-semibold']">Total:</td>
                      <td className="text-right font-['Mont-regular'] text-grey">
                        Calculated at checkout
                      </td>
                    </tr>
                  </table>
                )}
              </div>
              <div
                className={`absolute right-5  top-2 z-0 sm:right-10 ${activeModal ? 'rotate-180' : ''
                  }`}
              >
                <Image
                  alt="image"
                  src={fixConfigurator.src}
                  height={40}
                  width={23}
                />
              </div>
            </div>
          </div>
          {activeModal && (
            <div>
              <div className="overflow-y-scroll bg-lightPurple p-7 md:flex-row md:p-14">
                <div className="border-b-[1px] border-lightGrey pb-8 font-['Mont-bold'] text-[28px] text-liliac">
                  Order Summary
                </div>
                <div>
                  <table className="flex-flex-col w-full gap-y-6  font-['Mont-regular'] text-xl text-darkGrey">
                    <tr>
                      <td className="pt-4 font-['Mont-semibold']">Subtotal</td>
                      <td className="pt-4 text-right">
                        {currencySymbol}
                        {subTotal?.toFixed(2)}
                      </td>
                    </tr>
                    <tr className=" border-b-[1px] border-lightGrey font-['Mont-regular'] text-base text-grey">
                      <td className="pb-4 font-['Mont-semibold'] text-xl text-darkGrey ">
                        VAT
                      </td>
                      <td className="pb-4 text-right">
                        Calculated at checkout
                      </td>
                    </tr>
                    <tr className="border-b-[1px] border-lightGrey font-['Mont-regular'] text-base text-grey">
                      <td className="py-4 font-['Mont-semibold'] text-[28px] text-darkGrey">
                        Total
                      </td>
                      <td className="py-4 text-right">
                        Calculated at checkout
                      </td>
                    </tr>
                  </table>
                </div>

                <div className="flex flex-col gap-y-2 pt-10 pb-16">
                  <div className="font-['Mont-regular'] text-base text-darkGrey underline">
                    Have a promo code?
                  </div>
                  <div>
                    <input
                      placeholder="VGH34ae23%"
                      type="text"
                      className="rounded-[5px] py-[13px] px-[19px] text-base placeholder:text-grey"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                  </div>
                  {couponErr && (
                    <p className="font-['Mont-regular'] text-base text-[#dc2626]">
                      {couponErr}
                    </p>
                  )}
                </div>
                <div className="flex justify-center">
                  {user.isLoggedin ? (
                    <Button
                      color="tertiary"
                      cta="To secure checkout"
                      link="/summary"
                    />
                  ) : (
                    // <Button
                    //   cta="To secure checkout"
                    //   color="quaternary"
                    //   clickHandler={() => openEmailForm()}
                    // />
                    (<button
                      onClick={() => openEmailForm()}
                      className="justify-center rounded-full  border-2  border-darkTeal  bg-white px-[42px] py-[12px]  font-['Mont-semibold'] text-darkTeal transition duration-500   hover:border-2 hover:border-darkTeal hover:bg-darkTeal hover:text-white"
                    >
                      {isLoading ? (
                        <div className="spinner flex gap-2" id="spinner">
                          To secure checkout{' '}
                          <Image
                            className="animate-spin"
                            alt="image"
                            src={animation.src}
                            height={25}
                            width={25}
                            layout="fixed"
                          />
                        </div>
                      ) : (
                        'To secure checkout'
                      )}
                    </button>)
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </Layout>)
  );
}
export default ShoppingCartBlock;
