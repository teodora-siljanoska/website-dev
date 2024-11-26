import React, { useEffect, useState, FormEvent, useRef } from 'react';
import {
  useStripe,
  useElements,
  LinkAuthenticationElement,
  PaymentElement,
} from '@stripe/react-stripe-js';
import { CREATE_ORDER, CONFIRM_ORDER } from '@utils/queries';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import dropdown from '../../src/blocks/ShoppingCartBlock/assets/arrow.svg';
import Image from "next/legacy/image";
import visa from '../../src/components/assets/visa.svg';
import mc from '../../src/components/assets/mc.svg';
import americanE from '../../src/components/assets/americanExpress.svg';
import idk from '../../src/components/assets/idk.svg';
import animation from '../../src/components/assets/animation.svg';
import ProcessingPayment from '@components/ProcessingPayment';
import applePay from '../../src/components/assets/applePay.svg';
import googlePay from '../../src/components/assets/googlePay.svg';
import { ApolloError } from '@apollo/client';
import { createError } from 'micro';
import ErrorForm from '../../src/components/ErrorPop';
import * as Sentry from "@sentry/nextjs";

interface FormProps {
  estimate: any[] | undefined;
  currency: string;
  orderItems: any[]; // Replace 'any' with the actual type of your order items
  coupon?: string;
}

export default function Form({
  estimate,
  currency,
  orderItems,
  coupon,
}: FormProps) {
  const router = useRouter();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [forceRemount, setForceRemount] = useState(false);
  const [isError, setIsError] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [isErrorFormOpen, setIsErrorFormOpen] = useState(false);

  const [accessToken, setAccessToken] = useState<string>('');
  const [refreshToken, setRefreshToken] = useState<string>('');

  const [errorCreate, setErrorCreate] = useState<Error | null>(null);
  const [createOrder, { loading, reset }] = useMutation(CREATE_ORDER, {
    onError: (error) => {
      setIsError(true);
      setErrorCreate(error);
    },
  });

  const [confirmOrder, { loading: loadingConfirm, error: errorConfirm }] =
    useMutation(CONFIRM_ORDER);

  const [values, setValues] = useState<any | null>(null); // Store USER_DATA in component state
  const [total, setTotal] = useState<string | null>(''); // Store ESTIMATE_TOTAL in component state
  const [email, setEmail] = useState<string>(''); // Store USER_EMAIL in component state
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    | {
      payment_source: {
        id: any;
        card: any;
        reference_id: string;
      };
    }
    | undefined
  >();

  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const paramsRef = useRef(params);
  const dataFetchedRef = useRef(false);

  const paymentIntentFromURL = async (payment_intent: any) => {
    setIsLoading(true);
    // If paymentIntent exists in the URL, try to execute confirmOrder
    try {
      const resp = await confirmOrder({
        variables: {
          paymentIntent: {
            id: payment_intent,
          },
          orderItems,
          coupon,
        },
        context: {
          headers: {
            'Content-Type': 'application/json',
            authorization: accessToken,
          },
        },
      }).then((resp) => {
        console.log('resp', resp);
        if (!errorConfirm) {
          // Remove Order Items from localStorage
          sessionStorage.removeItem('ENSCALE');
          localStorage.removeItem('SELECTED_CART_ITEMS');
          // localStorage.removeItem('SELECTED_CART_WORD_PRES_ITEMS');
          localStorage.removeItem('SELECTED_DOMAIN_FINAL_CART_ITEMS');
          localStorage.removeItem('ESTIMATE_LIST');
          localStorage.removeItem('ESTIMATE_NEXT_LIST');
          localStorage.removeItem('SELECTED_CURRENCY');
          localStorage.removeItem('USER_DATA');
          localStorage.removeItem('USER_EMAIL');
          sessionStorage.removeItem('layershift_fa_access_token');
          localStorage.removeItem('ESTIMATE_TOTAL');
          localStorage.removeItem('layershift_fa_refresh_token');
          localStorage.removeItem('layershift_user_is_logged_in');
          localStorage.removeItem('PAYMENT_SOURCES_LIST');
          localStorage.removeItem('ESTIMATE_NEXT_LIST');
          router.push('/thank-you');
        }
      });
    } catch (err: any) {
      setIsLoading(false);

      console.error('Error confirming order:', err);
      console.log('err.message', err.message);
      Sentry.captureException(err);
      if (err.message.includes('insufficient funds.')) {
        setIsError(true);
        setMessage(
          'Your payment has been declined due to insufficient funds. Please check your available balance, use a different payment method, or contact your bank for more information.'
        );
        router.push(`/summary`);
      } else if (err.message.includes('Form error:')) {
        setIsError(true);
        setMessage(
          'Your payment has been declined. Please try again, use a different payment method, or contact your bank for more information.'
        );
        router.push(`/summary`);
      } else {
        setIsErrorFormOpen(true);
      }
    }
  };

  useEffect(() => {
    if (dataFetchedRef.current) {
      return;
    }

    if (paramsRef.current.payment_intent) {
      dataFetchedRef.current = true;
      paymentIntentFromURL(paramsRef.current.payment_intent);
    }
  }, [orderItems, forceRemount]);

  useEffect(() => {
    setAccessToken(
      sessionStorage.getItem('layershift_fa_access_token') ??
      'ACCESS TOKEN ERROR'
    );
    setRefreshToken(
      localStorage.getItem('layershift_fa_refresh_token') ??
      'REFRESH TOKEN ERROR'
    );

    // Retrieve USER_DATA, ESTIMATE_TOTAL, and USER_EMAIL from localStorage
    const userData = localStorage.getItem('USER_DATA');
    const userEmail = localStorage.getItem('USER_EMAIL');

    if (userData) {
      setValues(JSON.parse(userData));
    }
    if (userEmail) {
      setEmail(userEmail);
    }
  }, []);

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

  const handleChange = async (event: any) => {
    if (event.error) {
      console.error(event.error.message);
    }
  };
  const handleSubmit = async (e: FormEvent) => {
    reset();
    setIsError(false);
    setErrorCreate(null);

    e.preventDefault();
    if (!stripe || !elements) {
      console.log('Stripe elements not loaded');
      return;
    }

    await elements.submit();

    setIsLoading(true);

    let paymentMethodId;
    let paymentType;
    let paymentSource;

    if (newPayment) {
      try {
        const { paymentMethod } = await stripe.createPaymentMethod({
          elements,
          params: {
            billing_details: {
              name: values?.firstName + ' ' + values?.lastName,
              email: email,
              address: {
                city: values?.city,
                country: values?.country,
                line1: values?.addressLine1,
                line2: values?.addressLine2,
                postal_code: values?.postCode,
                state: values?.stateCode,
              },
              phone: values?.phone,
            },
          },
        });
        paymentMethodId = paymentMethod?.id;
        paymentType = paymentMethod?.card?.wallet !== null ? 'wallet' : 'card';
      } catch (err) {
        console.error('Error creating payment method:', err);
        console.log('err.message', err);
        Sentry.captureException(err);
        // Handle the error (e.g., display an error message to the user)
        setIsLoading(false);
        return;
      }
    } else if (selectedPaymentMethod !== undefined) {
      paymentSource = selectedPaymentMethod?.payment_source?.id;
      paymentType = selectedPaymentMethod?.payment_source.card.object;
    }

    console.log('paymentMethodId', paymentSource);
    console.log('paymentType', paymentType);

    try {
      const { data, errors } = await createOrder({
        variables: {
          orderItems,
          customer: { ...values, email },
          paymentMethod: paymentMethodId,
          paymentSource,
          paymentType,
          billingDetails: {},
          coupon,
        },
        context: {
          headers: {
            'Content-Type': 'application/json',
            authorization: accessToken,
          },
        },
      });

      setIsLoading(false);

      if (data?.createOrder?.data) {
        const sdk =
          data.createOrder.data.attributes?.paymentIntent?.next_action;
        if (sdk) {
          router.push(sdk.redirect_to_url.url);
          setIsLoading(true);
        } else {
          // Remove Order Items from localStorage
          sessionStorage.removeItem('ENSCALE');
          localStorage.removeItem('SELECTED_CART_ITEMS');
          // localStorage.removeItem('SELECTED_CART_WORD_PRES_ITEMS');
          localStorage.removeItem('SELECTED_DOMAIN_FINAL_CART_ITEMS');
          localStorage.removeItem('ESTIMATE_LIST');
          localStorage.removeItem('ESTIMATE_NEXT_LIST');
          localStorage.removeItem('SELECTED_CURRENCY');
          localStorage.removeItem('USER_DATA');
          localStorage.removeItem('USER_EMAIL');
          sessionStorage.removeItem('layershift_fa_access_token');
          localStorage.removeItem('ESTIMATE_TOTAL');
          localStorage.removeItem('layershift_fa_refresh_token');
          localStorage.removeItem('layershift_user_is_logged_in');
          localStorage.removeItem('PAYMENT_SOURCES_LIST');
          localStorage.removeItem('ESTIMATE_NEXT_LIST');
          router.push('/thank-you');
        }
      } else {
        let errorMessage = '';

        const apolloErrorMessage = errors?.toString() ?? '';
        console.log('apolloErrorMessage', apolloErrorMessage);

        if (
          apolloErrorMessage.includes('Your card was declined.') ||
          apolloErrorMessage.includes(
            'Your card was declined for making repeated attempts too frequently or exceeding its amount limit.'
          ) ||
          apolloErrorMessage.includes(
            'An error occurred while processing your card. Try again in a little bit.'
          )
        ) {
          errorMessage =
            'Your payment has been declined. Please try again, use a different payment method, or contact your bank for more information.';
        } else if (
          apolloErrorMessage.includes("Your card's security code is incorrect.")
        ) {
          errorMessage =
            'Your payment has been declined due to the security code being incorrect. Please try again.';
        } else if (
          apolloErrorMessage.includes('Your card has insufficient funds.')
        ) {
          errorMessage =
            'Your payment has been declined due to insufficient funds. Please check your available balance, use a different payment method, or contact your bank for more information.';
        } else if (
          apolloErrorMessage.includes('cannot be verified against ip address')
        ) {
          errorMessage =
            "We couldn't verify your location, so we couldn't process your payment. Please use a payment method issued in the same country as your billing address.";
        } else if (apolloErrorMessage.includes('Invalid data provided:')) {
          errorMessage =
            "Your card information is invalid. Please try again, or contact us for assistance.";
        } else if (apolloErrorMessage.includes('Form error:')) {
          errorMessage =
            "We're sorry, but we couldn't process your order. Please try again, or contact us for assistance.";          
        }
        else {
          setIsErrorFormOpen(true);
        }


        setMessage(errorMessage);
        setIsLoading(false);
        setIsError(true);
      }
    } catch (err) {
      Sentry.captureException(err);
      console.error('Error creating order:', err);
      setMessage(
        "We're sorry, but we couldn't process your order. Please try again, or contact us for assistance."
      );
      setIsError(true);
      setIsLoading(false);
    }
  };
  console.log('input', selectedPaymentMethod);

  const [newPayment, setNewPayment] = useState(true);
  useEffect(() => {
    if (estimate?.length === 0) {
      setNewPayment(true);
    } else {
      setNewPayment(false);
    }
  }, [estimate]);

  return (<>
    {isLoading && <ProcessingPayment />}
    <form id="payment-form" onSubmit={handleSubmit}>
      {estimate && estimate.length !== 0 && !newPayment && (
        <div className="label-payment w-full">
          <div>Saved payment methods</div>
          {estimate.map((payment: any, idx: number) => (
            <div
              key={idx}
              className="flex w-[100%] items-center justify-between gap-2 rounded-[5px] bg-white py-2 pl-2 pr-6"
            >
              <div className="flex gap-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  id={payment.payment_source.card.brand}
                  value={payment.payment_source.card.brand}
                  checked={selectedPaymentMethod === payment}
                  onChange={() => setSelectedPaymentMethod(payment)}
                />
                <Image
                  src={
                    payment.payment_source.card.brand === 'visa' &&
                      payment.payment_source.type === 'card'
                      ? visa
                      : payment.payment_source.card.brand ===
                        'american_express' &&
                        payment.payment_source.type === 'card'
                        ? americanE
                        : payment.payment_source.card.brand === 'mastercard' &&
                          payment.payment_source.type === 'card'
                          ? mc
                          : payment.payment_source.type === 'google_pay'
                            ? googlePay
                            : payment.payment_source.type === 'apple_pay'
                              ? applePay
                              : idk
                  }
                  alt="logo"
                />{' '}
              </div>
              <div className="flex flex-col items-end justify-end">
                <div className="text-[#777777]">
                  {payment.payment_source.card.masked_number.replace(
                    /(.{4})/g,
                    '$1 '
                  )}
                </div>
                <div className="text-grey">
                  {payment.payment_source.card.brand
                    .split('_')
                    .map(
                      (word: string) =>
                        word.charAt(0).toUpperCase() + word.slice(1)
                    )
                    .join(' ')}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div
        className="mt-9 flex items-center justify-between border-b-[1px] border-liliac/20 font-['Mont-regular']"
        onClick={() =>
          newPayment ? setNewPayment(false) : setNewPayment(true)
        }
      >
        <div>Add new payment method</div>
        <div>
          <Image
            alt="image"
            src={dropdown as string}
            height={15}
            width={15}
            layout="fixed"
            className={`${newPayment && 'rotate-180'} `}
          />
        </div>
      </div>
      {newPayment && (
        <PaymentElement
          className="mt-6"
          id="card-element"
          onChange={handleChange}
        />
      )}
      <div className="pt-6 pb-10 font-['Mont-regular'] text-sm text-grey">
        This will become your default payment method.
      </div>
      <div className="flex  justify-around">
        <a
          href="/shopping-cart"
          className="justify-center font-['Mont-semibold'] px-[42px] py-[12px] text-base  text-purple transition duration-500 hover:text-liliac lg:text-lg"
        >
          Cancel
        </a>
        <button
          type="submit"
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className="font-['Mont-semibold'] justify-center rounded-full border-2 border-darkTeal  bg-darkTeal  px-[42px] py-[12px] text-base  text-white transition		 duration-500 hover:border-2   hover:border-lightTeal hover:bg-lightTeal hover:text-white lg:text-lg"
        >
          <span id="button-text">
            {isLoading ? (
              <div className="spinner flex gap-2" id="spinner">
                Pay now{' '}
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
              'Pay now'
            )}
          </span>
        </button>
        {isErrorFormOpen && (
          <ErrorForm
            message={`Sorry, an error occurred after authorising your payment. Do not retry or you may be charged multiple times. Please contact us for assistance.`}
            emailError={true}
          />
        )}
      </div>
      {isError ? (
        <p className="flex justify-center pt-7 text-center text-[#dc2626] font-['Mont-regular']">
          {message}
        </p>
      ) : null}
    </form>
  </>);
}
