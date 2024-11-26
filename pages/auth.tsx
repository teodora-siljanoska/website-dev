import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { CreateEstimateOrOrder, CreateOrderRequest } from '@utils/cart';
import { ProductPrice } from '@utils/types';
import { create } from 'domain';
import * as Sentry from "@sentry/nextjs";

const Auth = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const code = router.query?.code as string;
      const state = router.query?.state as string;
      const userState = router.query?.userState as string;

      const decodedState = decodeURIComponent(state);
      const decodedURI = Buffer.from(decodedState, 'base64').toString();
      const logState = JSON.parse(decodedURI);

      const sku = logState.data;

      if (code && userState === 'Authenticated') {
        const apiEndpoint =
          process.env.NEXT_PUBLIC_STRAPI_URI ?? 'http://localhost:1337';

        // FIXME: redirectUrl dynamic
        const redirectUrl = encodeURIComponent(
          `${process.env.NEXT_PUBLIC_REDIRECT_URL}`
        );

        (async () => {
          const res = await fetch(
            `${apiEndpoint}/api/authorize?code=${code}&redirect_uri=${redirectUrl}`
          );

          if (res.ok) {
            //console.log('ok');
            try {
              const tokenData = await res.json();
              //console.log('tokenData', tokenData);

              sessionStorage.setItem(
                'layershift_fa_access_token',
                tokenData.access_token
              );
              localStorage.setItem(
                'layershift_fa_refresh_token',
                tokenData.refresh_token
              );
              localStorage.setItem('layershift_user_is_logged_in', 'true');

              const accessToken = sessionStorage.getItem(
                'layershift_fa_access_token'
              );

              // const total = sku?.reduce((agg: any, item: any) => {
              //   agg += item?.price ?? 0 * item.quantity
              //   return agg;
              // }, 0);

              let cartItems = null;
              let estimate = true;

              if (sku) {
                cartItems = [{ sku, quantity: 1 }];
                estimate = false;
              }

              await CreateEstimateOrOrder({
                cartItems,
                accessToken,
                estimate,
              } as CreateOrderRequest);

              router.push(`/${logState.page}`);
            } catch (error) {
              // FIXME: handle error
              Sentry.captureException(error);
            }
          } else {
            // FIXME: handle error
            const body = await res.text();
            console.log('error', body);
            router.push('/login');
          }
        })();
      } else {
        // "AuthenticatedNotRegistered"
      }
    }
  }, [router]);

  return <>Loading...</>;
};

export default Auth;
