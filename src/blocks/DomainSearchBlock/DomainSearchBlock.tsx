import React, { useState, useCallback, KeyboardEventHandler } from 'react';
import { useRouter } from 'next/router';
import { ComponentPageBlocksDomainSearch } from '@utils/types';
// import { ResponseData as DomainData } from '@pages/api/domainSearch';
// import Image from 'next/image';
// import animation from './assets/animation.svg';

function DomainSearchBlock({
  title,
  description,
  ctaButton,
}: ComponentPageBlocksDomainSearch): JSX.Element {
  const router = useRouter();
  const [isValidInput, setIsValidInput] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchData, setSearchData] = useState<string>('');

  const handleSearch = useCallback(
    (searchData: string) => {
      if (router.asPath.includes('registration')) {
        if (searchData !== '') {
          void router.push({
            pathname: '/domains-name-order',
            query: { searchData },
          });
        }
      } else if (router.asPath.includes('transfer')) {
        if (searchData !== '') {
          void router.push({
            pathname: '/domain-transfer-results',
            query: { searchData },
          });
        }
      }
    },
    [router, searchData]
  );

  const handleSearchEnter: KeyboardEventHandler = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        handleCheckDomain();
      }
    },
    [router, searchData]
  );
  const handleCheckDomain = () => {
    const firstDomainNamePattern = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const secondDomainNamePattern = /^[a-zA-Z0-9-]+$/;

    if (
      !firstDomainNamePattern.test(searchData) &&
      !secondDomainNamePattern.test(searchData)
    ) {
      setIsValidInput(false);
      setErrorMessage('Please enter a valid domain name');
      return;
    }

    setIsValidInput(true);
    setErrorMessage('');

    void handleSearch(searchData);
  };
  return (
    <>
      <div className="h-full bg-darkTeal  xl:h-[258px]">
        <div className="container mx-auto py-[20px] md:w-[90%] lg:py-[69px] xlSpecial:w-[77%]">
          <div className="flex flex-col justify-between gap-3 lg:flex-row ">
            <div>
              <h3 className="w-full font-['Mont-regular'] text-3xl text-white lg:mt-0   ">
                {title}
              </h3>
              <div className="w-full text-lg font-['Mont-light'] leading-8 text-white ">
                <div>{description}</div>
              </div>
            </div>
            <div className="flex w-full flex-col justify-between  gap-5 lg:w-auto">
              <div className="flex  flex-col  items-start text-darkGrey   lg:flex-row lg:items-center">
                <div className="relative flex  w-full flex-col  md:w-[491px] lg:px-0">
                  <input
                    // onChange={(e) => setFormInput(e.target.value)}
                    onChange={(e) => setSearchData(e.target.value.trim())}
                    onKeyDown={handleSearchEnter}
                    value={searchData.trim()}
                    type="text"
                    id="search"
                    name="search"
                    placeholder="example.com"
                    className={`w-full rounded-xl border-2 border-lightGrey bg-white py-3 pl-4 text-base ${
                      !isValidInput ? 'border-pink' : ''
                    }`}
                  />
                  {!isValidInput && (
                    <span className="text-red absolute top-14 right-2 w-[347px] text-right text-[11px] text-[#ff0000]">
                      {errorMessage}
                    </span>
                  )}
                </div>
              </div>
              <div className="my-auto flex items-start lg:items-end lg:self-end">
                <button
                  type="submit"
                  onClick={handleCheckDomain}
                  className="rounded-full border-2 border-purple bg-purple px-[35px]  py-[10px] font-['Mont-semibold'] text-base text-white transition  duration-500 hover:border-2 hover:border-purple hover:bg-transparent hover:text-purple lg:px-[40px] lg:py-[10px]"
                >
                  {ctaButton}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DomainSearchBlock;
