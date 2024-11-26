import Head from 'next/head';
import FooterBlock from '@layout/Footer/FooterBlock';
import HeaderBlock from '@layout/Header/HeaderBlock';
import { FooterEntity, HeaderEntity } from '@utils/types';
import { log } from 'console';

interface P {
  children: any | any[];
  showLoginWindow: boolean;
  setShowLoginWindow: React.Dispatch<React.SetStateAction<boolean>>;
  header?: HeaderEntity | undefined;
  footer?: FooterEntity | undefined;
}

const Layout = ({
  children,
  showLoginWindow,
  setShowLoginWindow,
  header,
  footer,
}: P) => {

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>
          {children?.props?.singlePageData?.attributes?.seo?.metaTitle ?? ''}
        </title>
        <meta
          name="description"
          content={
            children?.props?.singlePageData?.attributes?.seo?.metaDescription ??
            ''
          }
        />
        
        <link rel="apple-touch-icon" sizes="180x180" href="https://static.layershift.com/logos/layershift/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="https://static.layershift.com/logos/layershift/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="https://static.layershift.com/logos/layershift/favicon/favicon-16x16.png" />
        <link rel="manifest" href="https://static.layershift.com/logos/layershift/favicon/site.webmanifest" />
        <link rel="mask-icon" href="https://static.layershift.com/logos/layershift/favicon/safari-pinned-tab.svg" color="#552b71" />
        <link rel="shortcut icon" href="https://static.layershift.com/logos/layershift/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#603cba" />
        <meta name="msapplication-config" content="https://static.layershift.com/logos/layershift/favicon/browserconfig.xml" />
        <meta name="theme-color" content="#ffffff" />
        {children?.props?.singlePageData?.attributes?.seo?.meta?.map(
          (item: any, index: number) => (
            <meta
              key={index}
              {...(item?.name && { name: item?.name })}
              {...(item?.property && { property: item?.property })}
              {...(item?.content && { content: item?.content })}
            />
          )
        )}

      </Head>
      <main>
        <HeaderBlock
          showLoginWindow={showLoginWindow}
          setShowLoginWindow={setShowLoginWindow}
          currentSlug={''}
          header={header}
        />
        {children}
        <FooterBlock footer={footer} header={header} />
      </main>
    </>
  );
};

export default Layout;
