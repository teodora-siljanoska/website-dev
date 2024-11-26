import client from '../utils/apollo-client';
import { GET_ALL_PAGES, GET_FOOTER, GET_HEADER } from '../utils/queries';
import {
  FooterEntity,
  HeaderEntity,
  Maybe,
  PageEntity,
  Query,
} from '../utils/types';
import Blocks from '@utilityComponents/Blocks';
import Layout from '@layout/Layout/Layout';
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { ParsedUrlQuery } from 'querystring';
import { GetServerSidePropsContext, NextApiRequest } from 'next';
import { CurrencyContext } from '@utils/contexts/currencyContext';
import { NextRequest } from 'next/server';
import { LocationContext } from '@utils/contexts/locationContext';
import * as Sentry from "@sentry/nextjs";
export interface Params {
  params: { slug: Array<string> };
  query: ParsedUrlQuery;
  req: { req: NextApiRequest };
}

export interface P {
  pageData: PageEntity[];
  headerData: HeaderEntity;
  footerData: FooterEntity;
}

export interface ApiResponse {
  data: Query;
}
interface ApiHeader {
  data: any;
}

interface IndexProps {
  city: string;
  region: string;
  country: string;
}

type ExtendedP = P & IndexProps;

const EUCountries = process.env.NEXT_PUBLIC_EUCOUNTRIES;
const UKCountries = process.env.NEXT_PUBLIC_UKCOUNTRIES;
const CHICountries = process.env.NEXT_PUBLIC_VMCHICOUNTRIES;
const SINCountries = process.env.NEXT_PUBLIC_VMSINCOUNTRIES;

export async function getStaticPaths() {
  const { data }: ApiResponse = (await client.query({
    query: GET_ALL_PAGES,
  })) as ApiResponse;

  const allPages = data.pages?.data;

  // Check if 'home' slug exists in the data
  const homeSlugExists = allPages?.some(
    (page) => page.attributes?.slug === 'home'
  );

  // Generate paths based on the existing pages
  const paths =
    allPages?.map((page) => ({
      params: {
        slug: [page.attributes?.slug || 'home'],
      },
    })) || [];

  // // Add paths for '/' and '/home' if they are not already present
  // if (!paths.some((path) => path.params?.slug?.[0] === 'home')) {
  //   paths.push({ params: { slug: ['home'] } });
  // }

  if (!paths.some((path) => !path.params?.slug?.[0])) {
    paths.push({ params: { slug: [''] } });
  }

  return {
    paths,
    fallback: 'blocking', // false or 'blocking'
  };
}

export async function getStaticProps({ params, query, req }: Params) {
  let pageData: PageEntity[] | undefined;
  let headerData: Maybe<HeaderEntity> | undefined;
  let footerData: Maybe<FooterEntity> | undefined;

  try {
    const res = (await client.query({
      query: GET_ALL_PAGES,
      fetchPolicy: 'network-only',
    })) as ApiResponse;

    // Check if params is empty, if it is, assign '/' to pageSlug, otherwise assign all parts of params.slug to pageSlug delimited by '/'
    const pageSlug =
      !params?.slug || params.slug.length === 0 ? 'home' : params.slug.join('/');

    // Filter the data based on the condition that the page's slug matches the pageSlug value
    pageData = res.data.pages?.data.filter(
      (page) => page.attributes?.slug === pageSlug
    );

    const headerResponse = (await client.query({
      query: GET_HEADER,
      fetchPolicy: 'network-only',
    })) as ApiResponse;

    headerData = headerResponse.data.header?.data;

    const footerResponse = (await client.query({
      query: GET_FOOTER,
      fetchPolicy: 'network-only',
    })) as ApiResponse;

    footerData = footerResponse.data.footer?.data;

    // If pageData is empty, return notFound: true to render a 404 page
    if (!pageData || pageData.length === 0) {
      return {
        notFound: true,
      };
    }
  } catch (e) {
    Sentry.captureException(e);
    pageData = [{ id: '13', attributes: { slug: '' } }];
  }

  return {
    props: {
      pageData,
      headerData,
      footerData,
    },
    revalidate: 10,
  };
}

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
        localStorage.setItem('GEOIP_COUNTRY', country);
        setSelectedCurrency('GBP');
        setCurrencySymbol('£');
        currency = 'GBP';
      } else if (EUCountries?.includes(country)) {
        // Set 'EUR' directly in localStorage
        localStorage.setItem('SELECTED_CURRENCY', 'EUR');
        localStorage.setItem('GEOIP_COUNTRY', country);
        setSelectedCurrency('EUR');
        setCurrencySymbol('€');
        currency = 'EUR';
      } else if (
        CHICountries?.includes(country) ||
        SINCountries?.includes(country)
      ) {
        // Set 'USD' directly in localStorage as a default
        localStorage.setItem('SELECTED_CURRENCY', 'USD');
        localStorage.setItem('GEOIP_COUNTRY', country);
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

function Page({ pageData, headerData, footerData }: ExtendedP) {
  const singlePageData = pageData[0];
  const [showLoginWindow, setShowLoginWindow] = useState(false);

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

  return (
    <>
      {/* <CookieConsent /> */}
      <Layout
        setShowLoginWindow={setShowLoginWindow}
        showLoginWindow={showLoginWindow}
        header={headerData}
        footer={footerData}
      >
        <Blocks singlePageData={singlePageData} />
      </Layout>
    </>
  );
}

export default Page;
