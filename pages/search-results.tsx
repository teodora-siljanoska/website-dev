import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import SearchBar from '@layout/Header/Searchbar';
import Link from 'next/link';
import Layout from '@layout/Layout/Layout';
import axios from 'axios';
import { ApiResponse, Params } from './[[...slug]]';
import { FooterEntity, HeaderEntity, Maybe } from '@utils/types';
import { GET_FOOTER, GET_HEADER } from '@utils/queries';
import client from '@utils/apollo-client';
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

const SearchResults = ({ headerData, footerData }: any) => {
  const router = useRouter();
  const [results, setResults] = useState([]);

  const { keyWord } = router.query;

  useEffect(() => {
    if (keyWord) {
      const fetchData = async () => {
        const url = `/api/search?keyWord=${keyWord}`;

        const res = await axios.get(url);

        //console.log(res.data);

        setResults(res.data.index.results);

        // Push the search term to the data layer
        const win = window as any;
        win.dataLayer = win.dataLayer || [];
        win.dataLayer.push({
          event: 'search_executed',
          searchTerm: keyWord,
        });
      };
      fetchData();
    }
  }, [keyWord]);

  return (
    (<Layout
      header={headerData}
      footer={footerData}
      showLoginWindow={false}
      setShowLoginWindow={() => null}
    >
      <div className="my-[100px] grid gap-[40px] smallest:mx-[20px] md:mx-[40px] xl:mx-[175px]">
        <div className="mb-[100px] flex flex-col items-center gap-[30px]">
          <h1 className=" justify-self-center font-['Mont-book'] text-purple smallest:text-[28px] md:text-[36px]">
            Hey, we can help out!
          </h1>
          <SearchBar kWord={keyWord as string} />
        </div>
        <span className="grid gap-[25px]">
          {results.map((item: any) => {
            //console.log('item' + item.indexUid, item);
            return item.hits.map((hit: any) => {
              const routeTo = `/${hit.slug}`;
              return (<>
                <Link
                  href={routeTo}
                  className="glow-form box-border rounded-lg px-[23px] py-[17px]	"
                >
                  <div className="flex justify-between  text-[16px] ">
                    <h4 className=" text-liliac font-['Mont-book']">
                      {hit.title}
                    </h4>
                    <h4 className="text-darkTeal font-['Mont-regular'] smallest:hidden md:block">
                      Visit page
                    </h4>
                  </div>
                  {hit.pageBlocks[0].__component.includes('hero') ? (
                    <div>
                      <h4 className="font-['Mont-bold'] text-[20px] uppercase text-purple">
                        {hit.pageBlocks[0].title.replace(/\*\*/g, '')}
                      </h4>
                      <h4
                        className={`text-galacticBlue text-[14px] hover:decoration-1 ${hit.pageBlocks[0].description ? ' mt-[14px]' : ''
                          }  font-['Mont-light'] text-darkGrey`}
                      >
                        {hit.pageBlocks[0].description}
                      </h4>
                    </div>
                  ) : null}
                  <h4 className="text-end text-darkTeal smallest:flex md:hidden">
                    Visit page
                  </h4>
                </Link>
              </>);
            });
          })}
        </span>
      </div>
    </Layout>)
  );
};

export default SearchResults;
