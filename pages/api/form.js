import React, { useEffect, useState } from 'react';
import {
  useStripe,
  useElements,
  LinkAuthenticationElement,
  PaymentElement,
} from '@stripe/react-stripe-js';
import { CREATE_ORDER, CONFIRM_ORDER } from '@utils/queries';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

export default function Form({ currency, orderItems }) {
  const router = useRouter();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');

  const [createOrder, { loading, error }] = useMutation(CREATE_ORDER);
  //const [confirmOrder, { loading, error }] = useMutation(CONFIRM_ORDER);

  const values = JSON.parse(localStorage.getItem('USER_DATA'));
  const total = localStorage.getItem('ESTIMATE_TOTAL');
  const email = localStorage.getItem('USER_EMAIL');

  console.log('userData', values);

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

  console.log('accessToken', accessToken);

  const handleChange = async (event) => {
    // TODO: show error on the form

    if (event.error) {
      console.error(event.error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      console.log('not loaded');
      return;
    }

    await elements.submit();

    setIsLoading(true);
    const { paymentMethod } = await stripe.createPaymentMethod({
      elements,
      params: {
        billing_details: {
          name: values?.firstName + ' ' + values?.lastName,
          email: email,
          address: {
            city: values?.city,
            country: values?.country,
            line1: values?.address_line1,
            line2: values?.address_line2 + ' ' + values?.address_line3,
            postal_code: values?.postCode,
            state: values?.stateCode,
          },
          phone: values?.phone,
        },
      },
    });

    const paymentType = paymentMethod.card?.wallet !== null ? 'wallet' : 'card';

    // TODO: Handle Stripe errors
    // TODO: call GQL createOrder
    const resp = await createOrder({
      variables: {
        orderItems,
        customer: { ...values, email },
        paymentMethod: paymentMethod.id,
        paymentType,
        billingDetails: {},
      },
      context: {
        headers: {
          'Content-Type': 'application/json',
          authorization: accessToken,
        },
      },
    });

    console.log(resp);

    // TODO: Handle response and error
    // if (error.type === 'card_error' || error.type === 'validation_error') {
    //   setMessage(error.message);
    // } else {
    //   setMessage('An unexpected error occured.');
    // }
    setIsLoading(false);

    if (error) {
      setMessage(error.message);
    } else {
      try {
        // Remove Order Items from localStorage
        localStorage.removeItem('SELECTED_CART_ITEMS');
        sessionStorage.removeItem('ENSCALE');
        // localStorage.removeItem('SELECTED_CART_WORD_PRES_ITEMS');
        localStorage.removeItem('SELECTED_DOMAIN_FINAL_CART_ITEMS');
        localStorage.removeItem('ESTIMATE_LIST');
        localStorage.removeItem('SELECTED_CURRENCY');
        localStorage.removeItem('USER_DATA');
        localStorage.removeItem('USER_EMAIL');
        sessionStorage.removeItem('layershift_fa_access_token');
      } finally {
        router.push('/thank-you');
      }
    }
  };
  return (
    <>
      <form
        id="payment-form"
        onSubmit={handleSubmit}
        className="z-1 m-auto w-full rounded-md bg-[#ede6ed] px-16  py-8 lg:w-[200%]"
      >
        <div className="mb-6 font-['Mont-bold'] text-2xl text-[#A660A3]">
          Payment Details
        </div>
        <div className="mb-3">
          Cart Total:
          <input
            id="amount"
            type="text"
            value={total}
            readOnly={true}
            className="shadow-sm
            mt-3
            block
            h-10
            w-[45%]
            rounded-md border-grey pl-4"
            placeholder="Enter Cart Total"
          />
          {currency}
        </div>
        {/* <LinkAuthenticationElement
          id="link-authentication-element"
          onChange={(e) => setEmail(e.value.email)}
        /> */}
        <PaymentElement id="card-element" onChange={handleChange} />
        <div className="mt-10  flex flex-row justify-between">
          <button
            className="elements-style-background
          h-[49px] w-[30%] cursor-pointer rounded-full border-2 border-purple bg-purple text-[18px] text-white duration-300 hover:bg-white hover:text-purple"
            disabled={isLoading || !stripe || !elements}
            id="submit"
          >
            <a href="/thank-you">
              <span id="button-text">
                {isLoading ? (
                  <div className="spinner" id="spinner"></div>
                ) : (
                  'Finish & Pay'
                )}
              </span>
            </a>
          </button>
        </div>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </>
  );
}
