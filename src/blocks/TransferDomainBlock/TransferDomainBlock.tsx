/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, {
  useState,
  useCallback,
  useEffect,
  KeyboardEventHandler,
  useContext,
} from 'react';
import { useRouter } from 'next/router';
import { CurrencyContext } from '@utils/contexts/currencyContext';
import CartDomainContext from '@utils/contexts/cartDomainContext';
import { DomainTransfer } from '@pages/api/domainTransferSearch';
import animation from './assets/animation.svg';
import Image from 'next/legacy/image';
import { ComponentPageBlocksTransferDomain } from '@utils/types';
import { DomainInterface } from '@blocks/DomainsNameBlock/DomainsNameBlock';
import TestingModal, { DomainFinalInterface } from './testingModal';
import CartDomainFinalContext from '@utils/contexts/cartFinalDomainContext';
import AddToCartPopUp from '@components/AddToCartPopUp';
import ReactMarkdown from 'react-markdown';
import point from './assets/point.svg';
import { ResponseData as DomainData } from '@pages/api/domainSearch';
import * as Sentry from "@sentry/nextjs";

function TransferDomainBlock({
  notSupportedNonUk,
  notSupportedRegUk,
  notSupportedRegNonUk,
  notSupportedUk,
  supportedNonUk,
  supportedUk,
}: ComponentPageBlocksTransferDomain): JSX.Element {
  const router = useRouter();
  const { selectedCurrency, currencySymbol } = useContext(CurrencyContext);
  const [type] = useState<string>('transfer');
  const [formInput, setFormInput] = useState<string>('');
  const [formAuthCode, setFormAuthCode] = useState<string>('');
  const [domainTransfer, setDomainTransfer] = useState<DomainTransfer | null>(
    null
  );
  const searchWord = (router.query.searchData as string) || ('' as string);
  const [isLoading, setIsLoading] = useState(false);
  const { domainFinalCart, setDomainFinalCartItems } = useContext(
    CartDomainFinalContext
  );
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isValidInput, setIsValidInput] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [domainReg, setRegDomain] = useState<DomainData | null>(null);

  useEffect(() => {
    if (searchWord) {
      setFormInput(searchWord);
      void handleSubmit(searchWord);
    }
  }, [searchWord]);

  const handleSubmit = useCallback((formInput: string) => {
    setDomainTransfer(null);
    setIsLoading(true);
    setRegDomain(null);

    void fetch('/api/domainSearch', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ search: formInput }),
    })
      .then((response) => response.json())
      .then((response) => setRegDomain(response as DomainData))
      .catch((err) => Sentry.captureException(err));

    void fetch('/api/domainTransferSearch', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ search: formInput }),
    })
      .then((response) => response.json())
      .then((response) => {
        setDomainTransfer(response as DomainTransfer), setIsLoading(false);
      })
      .catch((err) => Sentry.captureException(err));
  }, []);

  const handleSearchEnter: KeyboardEventHandler = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        handleCheckDomain();
      }
    },
    [handleSubmit, formInput]
  );

  const handleCheckDomain = () => {
    const firstDomainNamePattern = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!firstDomainNamePattern.test(formInput)) {
      setIsValidInput(false);
      setErrorMessage('Please enter a valid domain name');
      return;
    }

    setIsValidInput(true);
    setErrorMessage('');

    void handleSubmit(formInput);
  };
  const [isChecked, setIsChecked] = useState(false);
  const toggleSwitch = () => {
    setIsChecked(!isChecked);
  };

  const onClickAddToCartFinalDomain = (
    domains: DomainInterface[],
    type: string
  ) => {
    let i = 0;
    const proba: DomainFinalInterface[] = [];
    {
      domains.map((item, index) => {
        i = 0;

        if (domainFinalCart.length === 0) {
          proba.push({
            domain: item,
            type: type,
          });
        } else {
          domainFinalCart.map((itemFinal, idx) => {
            if (item.domainName === itemFinal.domain.domainName) {
              i = 1;
            } else {
              if (domainFinalCart.length === idx + 1 && i === 0) {
                proba.push({
                  domain: item,
                  type: type,
                });
              }
            }
          });
        }
      });
    }

    setDomainFinalCartItems([...domainFinalCart, ...proba]);
    localStorage.setItem(
      'SELECTED_DOMAIN_FINAL_CART_ITEMS',
      JSON.stringify([...domainFinalCart, ...proba])
    );
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  const handleSearch = useCallback(
    (searchData: string) => {
      if (searchData !== '') {
        void router.push({
          pathname: '/domains-name-order',
          query: { searchData },
        });
      }
    },
    [router, domainReg?.result.domain]
  );
  //console.log('domainTransfer?.available', domainTransfer);

  return (<>
    <div className="container mx-auto mb-[100px] flex flex-col gap-y-10">
      <div className="my-16 flex flex-col items-center justify-center gap-9 md:flex-row md:gap-3">
        <div className="relative flex flex-col">
          <input
            onChange={(e) => setFormInput(e.target.value)}
            onKeyDown={handleSearchEnter}
            value={formInput.trim()}
            type="text"
            id="search"
            name="search"
            placeholder="domain"
            className={`mb-8 w-[347px] rounded-xl border-2 border-lightGrey bg-white py-3 pl-4 text-base md:mb-0 ${!isValidInput ? 'border-pink' : ''
              }`}
          />
          {!isValidInput && (
            <span className="text-red absolute top-14 right-2 w-[347px] text-right text-[11px] text-[#ff0000]">
              {errorMessage}
            </span>
          )}
        </div>

        <button
          type="submit"
          onClick={handleCheckDomain}
          disabled={isLoading}
          className=" rounded-full border-2 border-purple bg-purple  px-[35px] py-[10px] text-sm text-white transition  duration-500 hover:border-2 hover:border-purple hover:bg-transparent hover:text-purple md:text-lg lg:px-[40px] lg:py-[10px]"
        >
          Check domain
        </button>
      </div>
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-14">
          <Image
            className="animate-spin"
            alt="image"
            src={animation.src}
            height={38}
            width={38}
            layout="fixed"
          />
          <p className="w-[430px] pt-2 text-center text-xl text-liliac">
            Please wait while we fetch some more domains for you...
          </p>
        </div>
      )}

      {domainReg?.result.available === true ? (
        <div>
          <div className="mx-auto my-5 flex w-[90%] flex-col  justify-center gap-y-[40px] rounded-[10px] bg-liliac/10 px-[40px] py-[31px]">
            <div className='z-40 whitespace-pre-line text-center font-["Mont-book"] text-[18px] text-darkGrey prose-h1:font-["Mont-regular"] prose-h1:text-[22px] prose-h2:font-["Mont-book"] prose-h2:text-[18px]'>
              <ReactMarkdown>
                {(!domainReg.result.domain.endsWith(
                  '.uk'
                )
                  ? notSupportedRegNonUk
                    ?.replace(
                      /{domain}/g,
                      domainReg?.result.domain ?? 'ERROR'
                    )
                    .replace(/- /g, `- ![](${point.src}) `) ?? ''
                  : notSupportedRegUk
                    ?.replace(
                      /{domain}/g,
                      domainReg?.result.domain ?? 'ERROR'
                    )
                    .replace(/- /g, `- ![](${point.src}) `)) ?? ''}
              </ReactMarkdown>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                onClick={() => handleSearch(domainReg.result.domain)}
                className=" rounded-full border-2 border-purple bg-purple  px-[35px] py-[10px] text-sm text-white transition  duration-500 hover:border-2 hover:border-purple hover:bg-transparent hover:text-purple md:text-lg lg:px-[40px] lg:py-[10px]"
              >
                Register domain
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {domainTransfer?.available && (
            <div className="mx-auto flex w-[90%] flex-col gap-y-[65px] text-darkGrey">
              <div className="flex gap-x-[150px]">
                <div className=" basis-3/6">
                  <div className="font-['Mont-regular'] text-[20px]">
                    Domain Name
                  </div>
                  <div className="pt-[16px] font-['Mont-regular'] text-[18px]">
                    {domainTransfer.domain}
                  </div>
                </div>
                <div className=" basis-1/6">
                  <div className="font-['Mont-regular'] text-[20px]">
                    Transfer Price
                  </div>
                  <div className="pt-[16px] font-['Mont-regular'] text-[18px]">
                    {currencySymbol}{' '}
                    {domainTransfer.price?.map(
                      (price) =>
                        price.currency === selectedCurrency && price.transfer.toFixed(2)
                    )}
                  </div>
                </div>
                <div className="basis-2/6 font-['Mont-regular']  text-[20px]">
                  <div>Renewal Price</div>
                  <div className="pt-[16px] font-['Mont-regular'] text-[18px]">
                    {currencySymbol}{' '}
                    {domainTransfer.price?.map(
                      (price) =>
                        price.currency === selectedCurrency && price.renew.toFixed(2)
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          {domainTransfer !== null && (
            <div
              className={`${domainTransfer?.available === false
                ? 'items-center'
                : 'items-left'
                } mx-auto my-5 flex w-[90%] flex-col  justify-center gap-y-[40px] rounded-[10px] bg-liliac/10 px-[40px] py-[31px]`}
            >
              {domainTransfer?.message === 'Internal Server Error' ? (
                <div className='font-["Mont-regular"]  text-[22px] text-pink'>
                  Internal Server Error
                </div>
              ) : domainTransfer?.available === false ? (
                <div className='z-40 whitespace-pre-line text-center font-["Mont-book"] text-[18px] text-darkGrey prose-h1:font-["Mont-regular"] prose-h1:text-[22px] prose-h2:font-["Mont-book"] prose-h2:text-[18px]'>
                  <ReactMarkdown>
                    {
                      domainTransfer?.domain?.endsWith('.uk')
                      ? notSupportedUk
                        ?.replace(
                          /{domain}/g,
                          domainTransfer?.domain ?? 'ERROR'
                        )
                        .replace(/- /g, `- ![](${point.src}) `) ?? ''
                      : notSupportedNonUk
                        ?.replace(
                          /{domain}/g,
                          domainTransfer?.domain ?? 'ERROR'
                        )
                        .replace(/- /g, `- ![](${point.src}) `) ?? ''}
                  </ReactMarkdown>
                </div>
              ) : (
                domainTransfer?.available === true && (
                  <div className="text-left font-['Mont-regular'] text-[18px] leading-[30px] text-darkGrey prose-li:flex prose-li:items-center prose-li:gap-[4px]">
                    <ReactMarkdown>
                      {(!domainTransfer.domain.endsWith(
                        '.uk'
                      )
                        ? supportedNonUk?.replace(
                          /- /g,
                          `- ![](${point.src}) `
                        ) ?? ''
                        : supportedUk?.replace(
                          /- /g,
                          `- ![](${point.src}) `
                        )) ?? ''}
                    </ReactMarkdown>
                  </div>
                )
              )}
            </div>
          )}
          {domainTransfer?.available &&
            !domainTransfer.domain.endsWith(
              '.uk'
            ) && (
              <div>
                <TestingModal
                  domains={[domainTransfer.domain]}
                  domainPrice={
                    (domainTransfer.price || []).find(
                      (price) =>
                        price?.currency === selectedCurrency && price.transfer.toFixed(2)
                    )?.transfer || 0
                  }
                  domainSelectedCurrency={selectedCurrency}
                />
              </div>
            )}
        </div>
      )}

      {domainTransfer?.available &&
        domainTransfer.domain.endsWith(
        '.uk'
        ) && (
          <div className="flex justify-center">
            <button
              className="justify-center rounded-full  border-2  border-purple  bg-purple  px-[42px] py-[12px] text-base  text-white transition duration-500 hover:border-2 hover:border-purple hover:bg-white hover:text-purple md:text-lg"
              onClick={(event: any) => (
                onClickAddToCartFinalDomain(
                  [
                    {
                      domainName: domainTransfer.domain,
                      domainPrice:
                        domainTransfer.price?.find(
                          (price) => price.currency === selectedCurrency
                        )?.transfer ?? 0,
                      domainSelectedCurrency: selectedCurrency,
                    },
                  ],
                  type
                ),
                event.preventDefault()
              )}
            >
              Add to cart
            </button>
          </div>
        )}
      {isSubmitted && <AddToCartPopUp />}
    </div>
  </>);
}

export default TransferDomainBlock;
