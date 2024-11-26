import React, { useState } from 'react';
import type { NextPage } from 'next';
import ShoppingCartBlock from '@blocks/ShoppingCartBlock/ShoppingCartBlock';
import { FooterEntity, HeaderEntity, Maybe } from '@utils/types';
import client from '@utils/apollo-client';
import { GET_FOOTER, GET_HEADER } from '@utils/queries';
import { ApiResponse, Params } from '@pages/[[...slug]]';
import * as Sentry from "@sentry/nextjs";

export async function getStaticProps({ params, query }: Params) {
  let headerData: Maybe<HeaderEntity> | undefined;
  let footerData: Maybe<FooterEntity> | undefined;

  try {
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
  } catch (e) {
    Sentry.captureException(e);
  }

  return {
    props: {
      headerData,
      footerData,
    },
    revalidate: 10,
  };
}

function Home({ headerData, footerData }: any) {
  const [showLoginWindow, setShowLoginWindow] = useState<boolean>(false);

  return <ShoppingCartBlock headerData={headerData} footerData={footerData} title="Review & Checkout" />;
};

export default Home;
