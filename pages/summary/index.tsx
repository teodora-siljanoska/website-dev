import React, { useState, useEffect, useContext } from 'react';
import Button from '@components/Button';
import { useRouter } from 'next/router';
import logo from '../register/assets/logo.svg';
import headphones from '../register/assets/hp.svg';
import Image from 'next/image';
import Ribbons from '../register/assets/Ribbons.svg';
import ReactMarkdown from 'react-markdown';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import CheckoutForm from '../api/formStripe';
import AccordionDomainShoppingCart from '@components/AccordionDomainShoppingCart';
import AccordionShoppingCart from '@components/AccordionShoppingCart';
import CartContext from '@utils/contexts/cartContext';
import CartDomainFinalContext from '@utils/contexts/cartFinalDomainContext';
import visa from '../../src/blocks/ShoppingCartBlock/assets/visa.png';
import mc from '../../src/blocks/ShoppingCartBlock/assets/mc.png';
import americanE from '../../src/blocks/ShoppingCartBlock/assets/americanE.png';
import googlePay from '../../src/blocks/ShoppingCartBlock/assets/googlePay.png';
import applePay from '../../src/blocks/ShoppingCartBlock/assets/applePay.png';
import lock from '../../src/blocks/ShoppingCartBlock/assets/lock.svg';
import poweredByStripe from '../../src/blocks/ShoppingCartBlock/assets/poweredByStripe.svg';
import certification from '../../src/blocks/ShoppingCartBlock/assets/certification.png';
import ProcessingPayment from '@components/ProcessingPayment';
import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';
import fixConfigurator from '../../src/blocks/ShoppingCartBlock/assets/fixConfigurator.svg';
import * as Sentry from "@sentry/nextjs";

const stripeToken = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE;
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE?.toString() as string);

//console.log("stripeToken", stripeToken);

const Estimate = () => {
  const isDesktop = useMediaQuery({ minWidth: 1280 });
  const [activeModal, setActiveModal] = useState<boolean>(false);

  const [currency, setCurrency] = useState('usd');
  const { cartItems, setCartItems } = useContext(CartContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { domainFinalCart, setDomainFinalCartItems } = useContext(
    CartDomainFinalContext
  );
  const [clientSecret, setClientSecret] = useState('');
  const [price, setPrice] = useState<any>(0);
  const stripeImages = [visa, mc, americanE, googlePay, applePay];
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('visa');
  const [estimate, setEstimate] = useState();
  const [newPayment, setNewPayment] = useState(false);
  const router = useRouter();
  const { amount } = router.query;

  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [finalDomain, setFinalDomain] = useState<any[]>([]);
  const [coupon, setCoupon] = useState<string>('');

  const [subTotal, setSubTotal] = useState<number>();
  const [taxTotal, setTaxTotal] = useState<number>();
  const [discount, setDiscount] = useState<number>();
  const [total, setTotal] = useState<number>(0);
  const [totalRough, setTotalRough] = useState<number>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('PAYMENT_SOURCES_LIST');
      if (storedData) {
        setEstimate(JSON.parse(storedData));
      }
    }
  }, []);

  useEffect(() => {
    if (price <= 0 || currency === '') {
      return;
    }
    setClientSecret('ww');
  }, [price, currency]);

  const options: StripeElementsOptions = {
    loader: 'always',
    mode: 'payment',
    // clientSecret,
    appearance: {
      theme: 'stripe',
      variables: { colorPrimaryText: '#2C2933' },
    },
    amount: total > 0 ? Math.round(total * 100) : 1000,
    currency,
    // paymentMethodTypes: ['card', 'link'],
    captureMethod: 'manual',
    paymentMethodCreation: 'manual',
    // confirm: true,
  };

  useEffect(() => {
    let subtotal = 0;
    let total = 0;
    let tax = 0;
    let discount = 0;
    if (typeof window !== 'undefined') {
      const storedEstimateList = JSON.parse(
        localStorage.getItem('ESTIMATE_LIST') as string
      );
      const fullStoredEstimateList = JSON.parse(
        localStorage.getItem('ESTIMATE_NEXT_LIST') as string
      );
      if (storedEstimateList) {
        storedEstimateList?.map((item: any) => {
          subtotal += item.invoice_estimate.sub_total / 100;
          total += item.invoice_estimate.total / 100;
          setTotal(total);
          item?.invoice_estimate?.discounts?.forEach((discItem: any) => {
            discount += discItem.amount / 100;
            setDiscount(discount);
          });
          setTotalRough(subtotal);
        });
      }
      if (fullStoredEstimateList) {
        fullStoredEstimateList?.map((item: any) => {
          item.invoice_estimate.taxes?.forEach((taxItem: any) => {
            tax += taxItem.amount / 100;
            setTaxTotal(tax);
          });
        });
      }
    }
  }, []);

  useEffect(() => {
    let amount = 0;
    const oi: any[] = []; // Adjust the type as per your data structure.

    const couponCode = localStorage.getItem('COUPON_CODE');
    if (couponCode) {
      setCoupon(couponCode);
    }

    const selectedCartItems =
      JSON.parse(localStorage.getItem('SELECTED_CART_ITEMS') ?? 'null') || [];
    selectedCartItems.forEach((item: any) => {
      amount += item.totalPrice;

      const per = item.timePeriod;

      const addons: any[] = [];

      if (item.addons) {
        item.addons.forEach((adn: any) => {
          addons.push({
            sku: adn?.[`sku${per}`],
            quantity: 1,
          });
        });
      }

      if (item.numericalAddons) {
        item.numericalAddons.forEach((adn: any) => {
          addons.push({
            sku: adn?.[`sku${per}`],
            quantity: adn.amountSelected,
          });
        });
      }

      const oItem: any = {
        sku: item?.vmPlan?.[`sku${per}`],
        meta: item,
      };

      if (addons.length > 0) {
        oItem['addons'] = addons;
      }
      oi.push(oItem);
    });

    const rawData =
      localStorage.getItem('SELECTED_DOMAIN_FINAL_CART_ITEMS') ?? '';

    let selectedDomainFinalCartItems;
    try {
      selectedDomainFinalCartItems = JSON.parse(rawData) || [];
    } catch (error) {
      Sentry.captureException(error);
      console.error('Error parsing JSON:', error);
      selectedDomainFinalCartItems = [];
    }
    selectedDomainFinalCartItems.forEach((item: any) => {
      amount += item.domain.domainPrice;
      const curr = item.domain.domainSelectedCurrency;
      oi.push({
        sku: `DOMAIN-REG-${curr}-Yearly`,
        meta: item,
      });
    });

    setPrice(amount.toFixed(2));
    setOrderItems(oi);
    setCurrency(
      (localStorage.getItem('SELECTED_CURRENCY') || '').toLowerCase()
    );
  }, []);

  const removeRedirect = () => {
    localStorage.removeItem('ESTIMATE_LIST');
    localStorage.removeItem('ESTIMATE_NEXT_LIST');
    localStorage.removeItem('PAYMENT_SOURCES_LIST');
    localStorage.removeItem('SELECTED_DOMAIN_FINAL_CART_ITEMS');
    localStorage.removeItem('layershift_user_is_logged_in');
    localStorage.removeItem('layershift_fa_refresh_token');
    localStorage.removeItem('COUPON_CODE');

    router.push('/');
  };

  const currencySymbol =
    currency === 'usd'
      ? '$'
      : currency === 'eur'
        ? '€'
        : currency === 'gbp'
          ? '£'
          : ' ';

  useEffect(() => {
    let cartTotal = 0;
    let domainTotal = 0;

    // Calculate total from cartItems
    cartItems.forEach((item) => {
      cartTotal += item.totalPrice;
    });

    // Calculate total from domainFinalCart
    domainFinalCart.forEach((item) => {
      domainTotal += item.domain.domainPrice;
    });

    // Combine both totals
    const combinedTotal = cartTotal + domainTotal;

    // Set the combined total to the state variable
    setSubTotal(combinedTotal);
  }, [cartItems, domainFinalCart]);

  return (
    <>
      <div
        className="box-border grid gap-[215px] pb-[100px]"
        style={{
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          backgroundImage: `url("${Ribbons.src as string}")`,
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="mx-[60px] mt-[30px] grid justify-end gap-[178px]">
          <div className="flex gap-[70px]">
            <div className="flex gap-3">
              <div className="hidden items-center  md:flex">
                <Image
                  src={headphones.src}
                  alt="headphones"
                  layout="fixed"
                  height={26.97}
                  width={27}
                />
              </div>
              <div className="hidden place-self-center text-purple md:flex md:flex-row font-['Mont-regular']">
                +44 (0)161 826 2309
              </div>
            </div>
            <div className="flex ">
              <div
                onClick={removeRedirect}
                className="hidden items-center  md:flex"
              >
                <Link href="/">
                  <Image
                    src={logo.src}
                    alt="logo"
                    layout="fixed"
                    height={57}
                    width={151}
                  />
                </Link>
              </div>
            </div>
          </div>

          <div className="justify-self-center font-['Mont-book'] text-[50px] text-purple prose-strong:font-['Mont-bold']">
            <ReactMarkdown>ORDER **SUMMARY**</ReactMarkdown>
          </div>
        </div>
      </div>
      {orderItems.length > 0 ? (
        <div className="mx-auto flex w-[90%] gap-x-16 pb-36 lg:container xl:pb-0">
          <div className="w-full xl:basis-2/3">
            <div className="mx-auto flex w-full flex-col justify-center border-b-[1px] border-lightGrey">
              <div className="flex border-b-[1px] border-lightGrey text-left font-['Mont-regular'] text-base">
                <div className="basis-5/12 lg:basis-7/12">Product name</div>
                <div className="basis-3/12 lg:basis-2/12">Price</div>
                <div className="basis-3/12 lg:basis-2/12">Subscription</div>
                <div className="basis-1/12"> </div>
              </div>
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className={`${index % 2 === 0 ? 'bg-[#f9f9f9]' : 'bg-white'
                    } flex justify-between `}
                >
                  <div className="w-full">
                    <AccordionShoppingCart index={index} product={item} />
                  </div>
                </div>
              ))}
              {domainFinalCart.map((itemD, index) => (
                <div
                  key={index}
                  className={`${cartItems.length % 2 === 1
                    ? index % 2 === 1
                      ? 'bg-[#f9f9f9]'
                      : 'bg-white'
                    : index % 2 === 0
                      ? 'bg-[#f9f9f9]'
                      : 'bg-white'
                    } flex justify-between  `}
                >
                  <AccordionDomainShoppingCart product={itemD} />
                </div>
              ))}
            </div>
            {isDesktop && (
              <div className="flex flex-col items-end pt-10 font-['Mont-semibold'] text-xl text-darkGrey">
                <div className="flex w-fit flex-col gap-y-3">
                  <div className="flex justify-between">
                    Subtotal{' '}
                    <span>
                      {currencySymbol} {subTotal?.toFixed(2)}
                    </span>
                  </div>
                  {/* {<div>Discount </div>} */}
                  {discount && (
                    <div className="flex justify-between">
                      Discount
                      <span>
                        -{currencySymbol} {discount?.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between ">
                    VAT
                    <span className="text-[#696969]">
                      {taxTotal
                        ? `${currencySymbol} ${taxTotal?.toFixed(2)}`
                        : 'VAT not applicable'}
                    </span>
                  </div>
                  <div className="flex justify-between border-y-[1px] border-lightGrey py-4 text-[28px]">
                    Total{' '}
                    <span>
                      {currencySymbol}{' '}
                      {(
                        (subTotal ?? 0) +
                        (taxTotal ?? 0) -
                        (discount ?? 0)
                      ).toFixed(2)}
                    </span>
                  </div>
                  <div className="text-[20px]">
                    Total due today (pro-rata to 1st):{' '}
                    <span>
                      {currencySymbol} {total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
          {isDesktop && (
            <div className="basis-1/3">
              <div className="payment-stripe">
                <div className="rounded-t-[10px] bg-lightPurple py-8 px-5">
                  <div className="pb-8 text-center font-['Mont-bold'] text-[18px] text-purple">
                    Payment
                  </div>
                  {
                    <Elements stripe={stripePromise} options={options}>
                      <CheckoutForm
                        estimate={estimate}
                        currency={currency}
                        orderItems={orderItems}
                        coupon={coupon}
                      />
                    </Elements>
                  }
                </div>
                <div className="bg-extraLightTeal py-8 px-7 font-['Mont-regular'] text-sm  text-darkGrey">
                  Our services auto-renew and are billed monthly from the 1st of
                  each month, (pro rata for the first period). Domains and SSL
                  certificates renew 45 days in advance.
                </div>
                <div className="rounded-b-[10px] bg-darkTeal py-5 px-7 text-center font-['Mont-regular'] text-base  text-white">
                  If you have any questions contact us for further assistance.
                  <p className="pt-5 text-sm">+44 (0)161 826 2309</p>
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
      ) : (
        <div className="container mx-auto grid justify-items-center	gap-y-16">
          <div className="w-full text-center font-['Mont-bold'] text-2xl	text-purple xl:basis-2/3">
            Your cart is empty, or session has expired. Please go back to the
            home page and start again.
          </div>
          <Button cta="Go back to home page" color="primary" link="/"></Button>
        </div>
      )}
      {!isDesktop && (cartItems.length !== 0 || domainFinalCart.length !== 0) && (
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
              <div className="w-full">
                <div className="font-['Mont-bold'] text-[22px] md:text-left ">
                  {'Order Summary:'}
                </div>
                <table className="w-full">
                  <tr className=" text-[12px]">
                    <td className="font-['Mont-semibold']">Subtotal:</td>
                    <td className="text-right font-['Mont-regular'] ">
                      {' '}
                      {currencySymbol}
                      {subTotal?.toFixed(2)}
                    </td>
                  </tr>
                  <tr className=" text-[12px]">
                    <td className="font-['Mont-semibold']">VAT:</td>
                    <td className="text-right font-['Mont-regular']">
                      {taxTotal
                        ? `${currencySymbol} ${taxTotal?.toFixed(2)}`
                        : 'VAT not applicable'}
                    </td>
                  </tr>

                  <tr className="text-[18px]">
                    <td className="font-['Mont-semibold']">Total:</td>
                    <td className="text-right font-['Mont-regular']">
                      {currencySymbol}{' '}
                      {(
                        (subTotal ?? 0) +
                        (taxTotal ?? 0) -
                        (discount ?? 0)
                      ).toFixed(2)}
                    </td>
                  </tr>
                  <tr className="text-[12px]">
                    <td className="font-['Mont-semibold']">
                      Total due today (pro-rata to 1st):{' '}
                    </td>
                    <td className="text-right font-['Mont-regular']">
                      {currencySymbol} {total.toFixed(2)}
                    </td>
                  </tr>
                </table>
              </div>
              <div
                className={`absolute right-5 top-5 z-0 sm:right-10 ${activeModal ? 'rotate-180' : ''
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
              <div className="overflow-y-scroll bg-lightPurple  md:flex-row xl:p-14">
                <div className="border-lightGrey font-['Mont-bold'] text-[28px] text-liliac">
                  <div className="payment-stripe">
                    <div className="rounded-t-[10px] bg-lightPurple py-8 px-5">
                      <div className="pb-8 text-center font-['Mont-bold'] text-[18px] text-purple">
                        Payment
                      </div>
                      {
                        <Elements stripe={stripePromise} options={options}>
                          <CheckoutForm
                            estimate={estimate}
                            currency={currency}
                            orderItems={orderItems}
                            coupon={coupon}
                          />
                        </Elements>
                      }
                    </div>
                    <div className="bg-extraLightTeal py-8 px-7 font-['Mont-regular'] text-sm  text-darkGrey">
                      Our services auto-renew and are billed monthly from the
                      1st of each month, (pro rata for the first period).
                      Domains and SSL certificates renew 45 days in advance.
                    </div>
                    <div className="bg-darkTeal py-5 px-7 text-center font-['Mont-regular'] text-base  text-white">
                      If you have any questions contact us for further
                      assistance.
                      <p className="pt-5 text-sm">+44 (0)161 826 2309</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Estimate;
