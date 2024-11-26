import { ComponentPageBlocksSslCards } from '@utils/types';
import React, { useContext, useEffect, useState } from 'react';
//import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import ReactMarkdown from 'react-markdown';
import { CurrencyContext } from '@utils/contexts/currencyContext';
import Button from '@components/Button';
import OrderForm from '@components/OrderForm';
import AddToCartPopUp from '@components/AddToCartPopUp';

function SslCardsBlock({
  contactText,
  firstSSLCard,
  secondSSLCard,
  thirdSLLCard,
  forthSSLCard,
}: ComponentPageBlocksSslCards): JSX.Element {
  const { selectedCurrency, currencySymbol } = useContext(CurrencyContext);
  const [firstSSLCardByCurency, setFirstSSLCardByCurency] = useState<any>();
  const [firstFullSSLCardByCurency, setFirstFullSSLCardByCurency] =
    useState<any>();
  const [secondSSLCardByCurency, setSecondSSLCardByCurency] = useState<any>();
  const [secondFullSSLCardByCurency, setSecondFullSSLCardByCurency] =
    useState<any>();
  const [thirdSSLCardByCurency, setThirdSSLCardByCurency] = useState<any>();
  const [fourthSSLCardByCurency, setFourthSSLCardByCurency] = useState<any>();
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isDomainFormOpen, setIsDomainFormOpen] = useState(false);
  const [isIdFormOpen, setIsIdFormOpen] = useState(false);
  const [selectedCardBuy, setSelectedCardBuy] = useState<any>();

  const openIdFormpopup = () => {
    setIsIdFormOpen(true);
  };

  const openOrderFormPopup = () => {
    setIsOrderFormOpen(true);
  };

  const closeOrderFormPopup = () => {
    setIsOrderFormOpen(false);
  };

  const openOrderFormPopupDomain = (selectedCard: any) => {
    setIsDomainFormOpen(true);
    setSelectedCardBuy(selectedCard);
  };

  const closeOrderFormPopupDomain = () => {
    setIsDomainFormOpen(false);
  };

  useEffect(() => {
    firstSSLCard?.sslproduct?.data?.attributes?.productPrices?.data.map(
      (item) => {
        item.attributes?.currency === selectedCurrency &&
          setFirstSSLCardByCurency(item.attributes.price);
        item.attributes?.currency === selectedCurrency &&
          setFirstFullSSLCardByCurency(item);
      }
    );
    secondSSLCard?.sslproduct?.data?.attributes?.productPrices?.data.map(
      (item) => {
        item.attributes?.currency === selectedCurrency &&
          setSecondSSLCardByCurency(item.attributes.price);
        item.attributes?.currency === selectedCurrency &&
          setSecondFullSSLCardByCurency(item);
      }
    );
    thirdSLLCard?.priceStartFrom.map((item: any) => {
      item.currencySSL === selectedCurrency &&
        setThirdSSLCardByCurency(item.priceSSL);
    });
    forthSSLCard?.priceStartFrom.map((item: any) => {
      item.currencySSL === selectedCurrency &&
        setFourthSSLCardByCurency(item.priceSSL);
    });
  }, [selectedCurrency]);

  return (
    <div className="mx-auto smallest:w-[90%] md:max-w-[1520px]">
      <div className="flex  flex-col gap-[46px] rounded-t-[10px] bg-liliac/10  pt-[65px]">
        <div className="grid gap-[30px] self-center px-[30px]  heroBreakThree:grid-cols-2  2xl:grid-cols-4">
          <div>
            <div>
              <div className="flex !h-full  w-[16rem] flex-col justify-between rounded-2xl bg-white px-6 py-7 shadow-custom xs:w-[19rem]">
                <div>
                  <p className="mb-[5px] min-h-[85px] text-center font-['Mont-bold'] text-2xl text-darkGrey">
                    {firstSSLCard?.titleSSLBuy ?? 'Basic single-domain'}
                  </p>
                  <div className="flex justify-center text-center">
                    <div className="font-['Mont-bold'] text-[38px] leading-[40px] text-darkTeal">
                      {currencySymbol}
                      {firstSSLCardByCurency?.toFixed(2)}
                    </div>
                    <div className="self-end font-['Mont-regular'] text-[14px] text-darkGrey/70">
                      /year
                    </div>
                  </div>
                </div>
                <div className="mb-5 mt-[15px] px-10">
                  <div className="min-h-[130px] text-center font-['Mont-light'] text-sm  text-darkGrey">
                    <ReactMarkdown>
                      {firstSSLCard?.descriptionSSLBuy ?? ''}
                    </ReactMarkdown>
                  </div>
                </div>
                <div className="flex justify-center pt-3">
                  <div>
                    <button
                      className="rounded-full border-2 border-purple bg-purple px-[35px] py-[12px]  font-['Mont-semibold'] text-base  text-white transition  duration-500 hover:border-2 hover:border-purple hover:bg-transparent hover:text-purple lg:px-[66px] lg:py-[13px]"
                      onClick={() =>
                        openOrderFormPopupDomain(firstFullSSLCardByCurency)
                      }
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div className="flex !h-full  w-[16rem] flex-col justify-between rounded-2xl bg-white px-6 py-7 shadow-custom xs:w-[19rem]">
                <div>
                  <p className="mb-[5px] min-h-[85px] text-center font-['Mont-bold'] text-2xl text-darkGrey">
                    {secondSSLCard?.titleSSLBuy ?? 'Wildcard'}
                  </p>
                  <div className="flex justify-center text-center">
                    <div className="font-['Mont-bold'] text-[38px] leading-[40px] text-darkTeal">
                      {currencySymbol}
                      {secondSSLCardByCurency?.toFixed(2)}
                    </div>
                    <div className="self-end font-['Mont-regular'] text-[14px] text-darkGrey/70">
                      /year
                    </div>
                  </div>
                </div>
                <div className="mb-5  mt-[15px] px-10">
                  <div className="min-h-[130px] text-center font-['Mont-book'] text-sm  text-darkGrey">
                    <ReactMarkdown>
                      {secondSSLCard?.descriptionSSLBuy ?? ''}
                    </ReactMarkdown>
                  </div>
                </div>
                <div className="flex justify-center pt-3">
                  <div>
                    <button
                      className="rounded-full border-2 border-purple bg-purple px-[35px] py-[12px]  font-['Mont-semibold'] text-base  text-white transition  duration-500 hover:border-2 hover:border-purple hover:bg-transparent hover:text-purple lg:px-[66px] lg:py-[13px]"
                      onClick={() =>
                        openOrderFormPopupDomain(secondFullSSLCardByCurency)
                      }
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div className="flex !h-full  w-[16rem] flex-col justify-between rounded-2xl bg-white px-6 py-7 shadow-custom xs:w-[19rem]">
                <div>
                  <p className="mb-[5px] min-h-[70px] text-center font-['Mont-bold'] text-2xl text-darkGrey">
                    {thirdSLLCard?.titleSSLOrder ?? 'Basic Multi-domain'}
                  </p>
                  <div className='text-center font-["Mont-bold"] text-sm text-grey'>
                    starting from
                  </div>
                  <div className="flex justify-center text-center">
                    <div className="font-['Mont-bold'] text-[38px] leading-[40px] text-darkTeal">
                      {currencySymbol}
                      {thirdSSLCardByCurency?.toFixed(2)}
                    </div>
                    <div className="self-end font-['Mont-regular'] text-[14px] text-darkGrey/70">
                      /year
                    </div>
                  </div>
                </div>
                <div className="mb-5 mt-[15px] px-10">
                  <div className="min-h-[130px] text-center font-['Mont-book'] text-sm  text-darkGrey">
                    <ReactMarkdown>
                      {thirdSLLCard?.descriptionSSLOrder ?? ''}
                    </ReactMarkdown>
                  </div>
                </div>
                <div className="flex justify-center pt-3">
                  <div>
                    <button
                      className="rounded-full border-2 border-purple bg-purple px-[35px] py-[12px]  font-['Mont-semibold'] text-base  text-white transition  duration-500 hover:border-2 hover:border-purple hover:bg-transparent hover:text-purple lg:px-[66px] lg:py-[13px]"
                      onClick={openIdFormpopup}
                    >
                      Quote
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div className="flex !h-full  w-[16rem] flex-col justify-between rounded-2xl bg-white px-6 py-7 shadow-custom xs:w-[19rem]">
                <div>
                  <p className="mb-[5px] min-h-[70px] text-center font-['Mont-bold'] text-2xl text-darkGrey">
                    {forthSSLCard?.titleSSLOrder ??
                      'Identity Validation (OV / EV)'}
                  </p>
                  <div className='text-center font-["Mont-bold"] text-sm text-grey'>
                    starting from
                  </div>
                  <div className="flex justify-center text-center">
                    <div className="font-['Mont-bold'] text-[38px] leading-[40px] text-darkTeal">
                      {currencySymbol}
                      {fourthSSLCardByCurency?.toFixed(2)}
                    </div>
                    <div className="self-end font-['Mont-regular'] text-[14px] text-darkGrey/70">
                      /year
                    </div>
                  </div>
                </div>
                <div className="mb-5  mt-[15px] px-10">
                  <div className="min-h-[130px] text-center font-['Mont-book'] text-sm text-darkGrey">
                    <ReactMarkdown>
                      {forthSSLCard?.descriptionSSLOrder ?? ''}
                    </ReactMarkdown>
                  </div>
                </div>
                <div className="flex justify-center pt-3">
                  <div>
                    <button
                      className="rounded-full border-2 border-purple bg-purple px-[35px] py-[12px]  font-['Mont-semibold'] text-base  text-white transition  duration-500 hover:border-2 hover:border-purple hover:bg-transparent hover:text-purple lg:px-[66px] lg:py-[13px]"
                      onClick={openOrderFormPopup}
                    >
                      Quote
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full rounded-b-2xl bg-purple">
          <div className="mx-auto my-7 flex w-[90%] flex-col items-center justify-between text-center font-['Mont-bold'] text-[28px] text-white prose-strong:font-['Mont-bold'] md:flex-row">
            <div className="whitespace-pre-line">
              <ReactMarkdown>{contactText ?? ''}</ReactMarkdown>
            </div>
            <div>
              <Button color="tertiary" cta="Contact us" link="/contact-us" />
            </div>
          </div>
        </div>
        {}
      </div>

      {isOrderFormOpen && (
        <OrderForm
          formType="ssl"
          emailTo="ssl@layershift.com"
          setIsOrderFormOpen={setIsOrderFormOpen}
          setIsDomainFormOpen={setIsDomainFormOpen}
          setIsIdFormOpen={setIsIdFormOpen}
        />
      )}
      {isDomainFormOpen && (
        <OrderForm
          formType="domain"
          emailTo="ssl@layershift.com"
          selectedSSLCard={selectedCardBuy}
          setIsDomainFormOpen={setIsDomainFormOpen}
          setIsOrderFormOpen={setIsOrderFormOpen}
          setIsSubmitted={setIsSubmitted}
          setIsIdFormOpen={setIsIdFormOpen}
        />
      )}
      {isIdFormOpen && (
        <OrderForm
          formType="identity"
          emailTo="ssl@layershift.com"
          selectedSSLCard={selectedCardBuy}
          setIsDomainFormOpen={setIsDomainFormOpen}
          setIsOrderFormOpen={setIsOrderFormOpen}
          setIsIdFormOpen={setIsIdFormOpen}
          setIsSubmitted={setIsSubmitted}
        />
      )}
      {isSubmitted && <AddToCartPopUp />}
    </div>
  );
}
export default SslCardsBlock;
