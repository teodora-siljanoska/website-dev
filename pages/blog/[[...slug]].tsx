import client from '../../utils/apollo-client';
import { GET_ALL_BLOGS, GET_FOOTER, GET_HEADER } from '../../utils/queries';
import {
  Query,
  BlogEntity,
  HeaderEntity,
  FooterEntity,
  Maybe,
} from '../../utils/types';
import BlogBlocks from '../../src/utilityComponents/BlogBlocks';
import Layout from '@layout/Layout/Layout';
import { useState } from 'react';
import * as Sentry from "@sentry/nextjs";

interface Params {
  params: { slug: string };
}

interface P {
  blogData: BlogEntity[];
  headerData: HeaderEntity;
  footerData: FooterEntity;
}

interface ApiResponse {
  data: Query;
}

export async function getStaticPaths() {
  const { data }: ApiResponse = (await client.query({
    query: GET_ALL_BLOGS,
  })) as ApiResponse;

  const allBlogs = data.blogs?.data;

  const paths = allBlogs?.map((page) => {
    return {
      params: { slug: [page.attributes?.slug] },
    };
  });

  return {
    paths,
    fallback: false, // false or 'blocking'
  };
}

export async function getStaticProps({ params }: Params) {
  let blogData: BlogEntity[] | undefined;
  let headerData: Maybe<HeaderEntity> | undefined;
  let footerData: Maybe<FooterEntity> | undefined;
  try {
    const res = (await client.query({
      query: GET_ALL_BLOGS,
      fetchPolicy: 'network-only',
    })) as ApiResponse;

    blogData = res.data.blogs?.data.filter(
      (page) => page.attributes?.slug === params.slug[0]
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
  } catch (e) {
    Sentry.captureException(e);
    blogData = [];
  }

  return {
    props: {
      blogData,
    },
  };
}

function Blog({ blogData, headerData, footerData }: P) {
  const singlePageData = blogData[0];
  const [showLoginWindow, setShowLoginWindow] = useState(false);
  return (
    <>
      <Layout
        setShowLoginWindow={setShowLoginWindow}
        showLoginWindow={showLoginWindow}
        header={headerData}
        footer={footerData}
      >
        <BlogBlocks singleBlogData={singlePageData} />
      </Layout>
    </>
  );
}

export default Blog;
