/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ApolloProvider } from '@apollo/client';
import client from '../utils/apollo-client';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import LoginContext, { User } from '@utils/contexts/loginContext';
import { CurrencyContext } from '@utils/contexts/currencyContext';
import { LocationContext } from '@utils/contexts/locationContext';
import CartContext from '@utils/contexts/cartContext';
import CartDomainContext from '@utils/contexts/cartDomainContext';
import {
  CustomVpsInterface,
  CustomWordInterface,
  EditVpsInterface,
} from './vps/types';
import { DomainInterface } from '@blocks/DomainsNameBlock/DomainsNameBlock';
import { DomainFinalInterface } from '@blocks/DomainsNameBlock/testingModal';
import CartDomainFinalContext from '@utils/contexts/cartFinalDomainContext';
import EditVPSContext from '@utils/contexts/editVPSContext';
import CartWordPresContext from '@utils/contexts/cartWordPresContext';
import PeriodContext from '@utils/contexts/periodContext';
import Script from "next/script";
import * as Sentry from "@sentry/nextjs";

declare global {
  interface Window { _mtm: any; }
}

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User>({
    firstName: '',
    isLoggedin: false,
  });
  const [selectedCurrency, setSelectedCurrency] = useState<string>('GBP');
  const [currencySymbol, setCurrencySymbol] = useState<string>('£');

  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [skuLocation, setSkuLocation] = useState<string>('');

  const [cartItems, setCartItems] = useState<CustomVpsInterface[]>([]);
  const [cartWordPresItems, setCartWordPresItems] = useState<
    CustomWordInterface[]
  >([]);

  const [editVPSItems, setEditVPSItems] = useState<EditVpsInterface[]>([]);
  const [period, setPeriod] = useState<string>('');

  const [domainCart, setDomainCartItems] = useState<DomainInterface[]>([]);
  const [domainFinalCart, setDomainFinalCartItems] = useState<
    DomainFinalInterface[]
  >([]);

  useEffect(() => {
    try {
      const firstName =
        localStorage.getItem('layershift_user_first_name') ?? '';
      const token = localStorage.getItem('layershift_fa_access_token') ?? '';
      const isLoggedin =
        localStorage.getItem('layershift_user_is_logged_in') ?? false;
      setUser({
        firstName: firstName,
        token,
        isLoggedin: isLoggedin === 'true',
      });
    } catch (error) {
      if (typeof window !== 'undefined') {
        window.location.href = '/no-cookies.html';
      }
      Sentry.captureException(error);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('SELECTED_CURRENCY') === null) {
      localStorage.setItem('SELECTED_CURRENCY', selectedCurrency);
    } else if (localStorage.getItem('SELECTED_CURRENCY') !== null) {
      setSelectedCurrency(
        localStorage.getItem('SELECTED_CURRENCY') ?? selectedCurrency
      );
    }
  }, [selectedCurrency]);

  useEffect(() => {
    if (localStorage.getItem('SELECTED_LOCATION') === null) {
      localStorage.setItem('SELECTED_LOCATION', selectedLocation);
    } else if (localStorage.getItem('SELECTED_LOCATION') !== null) {
      setSelectedLocation(
        localStorage.getItem('SELECTED_LOCATION') ?? selectedLocation
      );
    }
  }, [selectedLocation]);

  useEffect(() => {
    if (localStorage.getItem('SELECTED_CART_ITEMS') === null) {
      localStorage.setItem('SELECTED_CART_ITEMS', JSON.stringify(cartItems));
    }
    if (localStorage.getItem('SELECTED_CART_ITEMS') !== null) {
      setCartItems(
        JSON.parse(
          localStorage.getItem('SELECTED_CART_ITEMS') ?? ''
        ) as CustomVpsInterface[]
      );
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (localStorage.getItem('SELECTED_DOMAIN_FINAL_CART_ITEMS') === null) {
      localStorage.setItem(
        'SELECTED_DOMAIN_FINAL_CART_ITEMS',
        JSON.stringify(domainFinalCart)
      );
    }
    if (localStorage.getItem('SELECTED_DOMAIN_FINAL_CART_ITEMS') !== null) {
      setDomainFinalCartItems(
        JSON.parse(
          localStorage.getItem('SELECTED_DOMAIN_FINAL_CART_ITEMS') ?? ''
        ) as DomainFinalInterface[]
      );
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (localStorage.getItem('SELECTED_EDIT_ITEMS') === null) {
      localStorage.setItem('SELECTED_EDIT_ITEMS', JSON.stringify(editVPSItems));
    }
    if (localStorage.getItem('SELECTED_EDIT_ITEMS') !== null) {
      setEditVPSItems(
        JSON.parse(
          localStorage.getItem('SELECTED_EDIT_ITEMS') ?? ''
        ) as EditVpsInterface[]
      );
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (localStorage.getItem('SELECTED_PERIOD') === null) {
      localStorage.setItem('SELECTED_PERIOD', period);
    }
    if (localStorage.getItem('SELECTED_PERIOD') !== null) {
      setPeriod(localStorage.getItem('SELECTED_PERIOD') ?? period);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const useMatomoTracker = () => {
    const router = useRouter();

    useEffect(() => {
      router.events.on('routeChangeComplete', () => {
        window._mtm.push({ 'event': 'mtm.PageView' });
      });
    }, [router.events]);
  };

  useMatomoTracker();

  return (
    <>
      <Script
        strategy='afterInteractive'
        id="matomo"
        dangerouslySetInnerHTML={{
          __html:
            `
            window._mtm = window._mtm || [];
            window._mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
            (function() {
              var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
            g.type='text/javascript'; g.async=true; g.src='https://${process.env.NEXT_PUBLIC_MATOMO_URL}/js/container_${process.env.NEXT_PUBLIC_MATOMO_CONTAINER_ID}.js'; s.parentNode.insertBefore(g,s);
            })();
            `
        }}
      />
      <CurrencyContext.Provider
        value={{
          selectedCurrency,
          currencySymbol,
          setSelectedCurrency,
          setCurrencySymbol,
        }}
      >
        <CartDomainContext.Provider value={{ domainCart, setDomainCartItems }}>
          <CartDomainFinalContext.Provider
            value={{ domainFinalCart, setDomainFinalCartItems }}
          >
            <EditVPSContext.Provider value={{ editVPSItems, setEditVPSItems }}>
              <PeriodContext.Provider value={{ period, setPeriod }}>
                <CartContext.Provider value={{ cartItems, setCartItems }}>
                  <CartWordPresContext.Provider
                    value={{ cartWordPresItems, setCartWordPresItems }}
                  >
                    <LocationContext.Provider
                      value={{
                        selectedLocation,
                        setSelectedLocation,
                        skuLocation,
                        setSkuLocation,
                      }}
                    >
                      <LoginContext.Provider value={{ user, setUser }}>
                        <ApolloProvider client={client}>
                          <Component {...pageProps} />
                        </ApolloProvider>
                      </LoginContext.Provider>
                    </LocationContext.Provider>
                  </CartWordPresContext.Provider>
                </CartContext.Provider>
              </PeriodContext.Provider>
            </EditVPSContext.Provider>
          </CartDomainFinalContext.Provider>
        </CartDomainContext.Provider>
      </CurrencyContext.Provider>
    </>
  );
}
