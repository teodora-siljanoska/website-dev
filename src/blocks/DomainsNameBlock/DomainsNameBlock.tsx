/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  KeyboardEventHandler,
  useContext,
} from 'react';
import Image from 'next/legacy/image';
import animation from './assets/animation.svg';
import { useRouter } from 'next/router';
import TestingModal from './testingModal';
import DomainTableRow from '@components/DomainTableRow';
import { ResponseData as DomainData, Domain } from '@pages/api/domainSearch';
import { CurrencyContext } from '@utils/contexts/currencyContext';
import CartDomainContext from '@utils/contexts/cartDomainContext';
import * as Sentry from "@sentry/nextjs";
export interface DomainInterface {
  domainName?: string;
  domainPrice: number;
  domainSelectedCurrency: string;
}

function DomainsNameBlock(): JSX.Element {
  const { selectedCurrency, currencySymbol } = useContext(CurrencyContext);
  const { domainCart, setDomainCartItems } = useContext(CartDomainContext);
  const [savedDomains, setSavedDomains] = useState<string[]>([]);
  const [formInput, setFormInput] = useState<string>('');
  const [domain, setDomain] = useState<DomainData | null>(null);
  const [domainSuggestions, setDomainSuggestions] = useState<DomainData | null>(
    null
  );
  const [pinnedDomains, setPinnedDomains] = useState<Domain[]>([]);
  const [show, setShow] = useState<boolean>(true);
  useEffect(() => {
    const isDomainPinned = pinnedDomains.some(
      (item) => domain?.result.domain === item.domain
    );
    setShow(!isDomainPinned);
  }, [pinnedDomains, domain]);
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);
  const [continueThePurchase, setContinueThePurchase] =
    useState<boolean>(false);
  const router = useRouter();
  const searchWord = (router.query.searchData as string) || ('' as string);
  const [filteredDomains, setFilteredDomains] = useState<Domain[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchWord) {
      setFormInput(searchWord);
      void handleSubmit(searchWord);
    }
  }, [searchWord]);

  useEffect(() => {
    if (domainSuggestions?.suggestions) {
      setFilteredDomains([...domainSuggestions.suggestions]);
    }
  }, [domainSuggestions?.suggestions]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newDomain: DomainInterface;
    const tmp = savedDomains;
    const pinTmp = [...pinnedDomains];
    const filteredTmp = [...filteredDomains];
    const selectedDomain =
      domain?.result.domain === event.target.value
        ? domain.result
        : domainSuggestions?.suggestions?.find(
          (domain) => domain.domain === event.target.value
        );

    const data: DomainInterface[] = [];

    if (event.target.checked) {
      tmp.push(event.target.value);
    } else if (tmp.includes(event.target.value)) {
      tmp.splice(tmp.indexOf(event.target.value), 1);
    }
    if (event.target.checked) {
      if (selectedDomain && !pinnedDomains.includes(selectedDomain)) {
        pinTmp.push({ ...selectedDomain, checked: true });
      }
    }
    if (pinnedDomains.find((domain) => domain.domain === event.target.value)) {
      const domainToRemove = pinnedDomains.find(
        (domain) => domain.domain === event.target.value
      )!;

      pinTmp.splice(pinTmp.indexOf(domainToRemove), 1);
    }
    if (event.target.checked) {
      if (selectedDomain && filteredDomains.includes(selectedDomain)) {
        filteredTmp.splice(filteredTmp.indexOf(selectedDomain), 1);
      }
    }
    if (
      selectedDomain &&
      pinnedDomains.find((domain) => domain.domain === selectedDomain.domain) &&
      !filteredDomains.find((domain) => domain.domain === selectedDomain.domain)
    ) {
      filteredTmp.push(selectedDomain);
    }

    setSavedDomains(tmp);
    setPinnedDomains(pinTmp);
    setFilteredDomains(filteredTmp);
    setDomainCartItems([]);

    savedDomains.map((item, index) => {
      const itemOfList =
        domain?.result.domain === item
          ? domain.result
          : domainSuggestions?.suggestions?.find(
            (domain) => domain.domain === item
          );
      let itemPrice = 0;
      itemOfList?.price?.map((item, index) =>
        item.currency === selectedCurrency ? (itemPrice = item.register) : ''
      );
      data.push({
        domainName: itemOfList?.domain,
        domainPrice: itemPrice,
        domainSelectedCurrency: selectedCurrency,
      });
    });
    setDomainCartItems([...data]);
    // localStorage.setItem(
    //   'SELECTED_DOMAIN_CART_ITEMS',
    //   JSON.stringify([...data])
    // );
  };
  function scrollListOfDomains() {
    const domList = document.getElementById('domainList');
    if (domList) {
      const yOffset = -100; // Adjust this value as needed
      const y =
        domList.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  function scrollConfigurator() {
    const domainConf = document.getElementById('configuratorDomain');
    if (domainConf) {
      const yOffset = -100; // Adjust this value as needed
      const y =
        domainConf.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }
  const handleSubmit = useCallback((formInput: string) => {
    setDomain(null);
    setDomainSuggestions(null);

    void fetch('/api/domainSearch', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ search: formInput }),
    })
      .then((response) => response.json())
      .then((response) => setDomain(response as DomainData))
      .catch((err) => Sentry.captureException(err));

    setIsLoading(true);
    void fetch('/api/domainSuggest', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ search: formInput }),
    })
      .then((response) => response.json())
      .then((response) => {
        setDomainSuggestions(response as DomainData);
        setIsLoading(false);
        setTimeout(scrollListOfDomains, 1000);
      })
      .catch((err) => {
        Sentry.captureException(err);
        setIsLoading(false);
        setTimeout(scrollListOfDomains, 1000);
      });
  }, []);

  const handleDomainClick = (newDomain: string) => {
    setFormInput(newDomain);
    void handleSubmit(newDomain);
  };

  const handleSearchEnter: KeyboardEventHandler = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        handleCheckDomain();
      }
    },
    [handleSubmit, formInput]
  );

  const handleAddtoCart = () => {
    setIsAddedToCart(true);
  };

  const handleContinuePurchase = () => {
    setContinueThePurchase(true);
  };

  {
    continueThePurchase && setTimeout(scrollConfigurator, 2000);
  }
  const [isValidInput, setIsValidInput] = useState(true); // Initially, input is valid
  const [errorMessage, setErrorMessage] = useState('');
  const handleCheckDomain = () => {
    // Regular expression for a valid domain name
    const firstDomainNamePattern = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const secondDomainNamePattern = /^[a-zA-Z0-9-]+$/;

    if (
      !firstDomainNamePattern.test(formInput) &&
      !secondDomainNamePattern.test(formInput)
    ) {
      setIsValidInput(false);
      setErrorMessage('Please enter a valid domain name');
      return;
    }

    // If the input is a valid domain name, continue with the domain check
    setIsValidInput(true);
    setErrorMessage('');

    void handleSubmit(formInput);
  };
  return (
    <>
      <div className="container mx-auto">
        <div className="my-16 flex flex-col items-center justify-center gap-9 md:flex-row md:gap-3">
          <div className="relative flex flex-col">
            <input
              onChange={(e) => setFormInput(e.target.value)}
              onKeyDown={handleSearchEnter}
              value={formInput.trim()}
              type="text"
              id="search"
              name="search"
              placeholder="example.com"
              className={`mb-8 w-[347px] rounded-xl border-2 border-lightGrey bg-white py-3 pl-4 text-base md:mb-0 ${!isValidInput ? 'border-pink' : ''
                }`}
            />
            {!isValidInput && (
              <span className="text-red absolute top-14 right-2 w-[347px] text-right font-['Mont-regular'] text-[11px] text-[#ff0000]">
                {errorMessage}
              </span>
            )}
          </div>

          <button
            type="submit"
            onClick={handleCheckDomain}
            disabled={isLoading}
            className="rounded-full border-2 border-purple bg-purple px-[35px]  py-[10px] font-['Mont-semibold'] text-sm text-white transition  duration-500 hover:border-2 hover:border-purple hover:bg-transparent hover:text-purple md:text-base lg:px-[40px] lg:py-[10px]"
          >
            Check domain
          </button>
        </div>

        {isLoading ? (
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
        ) : (
          <div />
        )}
        <div>
          <div className="mt-2 flex justify-center">
            {domain && (
              <div>
                <table>
                  <thead>
                    <tr className="text-left font-['Mont-regular'] text-base md:text-xl">
                      <th className=" p-4" />
                      <th className=" p-2">Domain Name</th>
                      <th className=" p-2 md:pr-8">Register Price</th>
                      <th className=" p-2">Renewal Price</th>
                    </tr>
                  </thead>
                  <tbody id="domainList" className="font-['Mont-regular'] text-sm md:text-lg">
                    {show && (
                      <tr
                        className={`${domain.result.available.toString() === 'false'
                          ? 'text-pink'
                          : 'text-darkGrey'
                          }  bg-[#A660A3]/20 hover:bg-darkGrey/5`}
                      >
                        <td className=" p-4 md:pr-10 ">
                          {domain.result.available.toString() === 'false' ? (
                            <input
                              type="checkbox"
                              disabled
                              id="coding"
                              name="interest"
                              value="coding"
                            />
                          ) : (
                            <input
                              type="checkbox"
                              id="coding"
                              name="interest"
                              value={domain.result.domain}
                              onChange={onChangeHandler}
                              checked={domain.result.checked}
                            />
                          )}{' '}
                        </td>
                        <td
                          onClick={() => {
                            handleDomainClick(domain.result.domain);
                          }}
                          className=" p-3 md:pr-32 "
                        >{`${domain.result.domain}`}</td>
                        {
                          <td className=" p-3 md:pr-32">
                            {domain.result.available && currencySymbol}{' '}
                            {!domain.result.available
                              ? 'Not available'
                              : domain.result.price?.map((item, index) =>
                                item.currency === selectedCurrency
                                  ? item.register.toFixed(2)
                                  : ''
                              )}
                          </td>
                        }
                        {
                          <td className=" p-3">
                            {domain.result.available && currencySymbol}{' '}
                            {!domain.result.available
                              ? 'Not available'
                              : domain.result.price?.map((item, index) =>
                                item.currency === selectedCurrency
                                  ? item.renew.toFixed(2)
                                  : ''
                              )}
                          </td>
                        }
                      </tr>
                    )}
                    {pinnedDomains.map((domain) => (
                      <DomainTableRow
                        domain={domain}
                        key={domain.domain}
                        handleCheckbox={onChangeHandler}
                        handleNameClick={handleDomainClick}
                        type="pinned"
                      />
                    ))}
                    {!isLoading &&
                      filteredDomains.map((domain) => (
                        <DomainTableRow
                          domain={domain}
                          key={domain.domain}
                          handleCheckbox={onChangeHandler}
                          handleNameClick={handleDomainClick}
                          type="filtered"
                        />
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="my-10 flex justify-center ">
            {domainSuggestions && (
              <button
                type="submit"
                onClick={() => {
                  handleContinuePurchase();
                }}
                className="rounded-full border-2 border-purple bg-purple px-[35px]  py-[10px] font-['Mont-semibold'] text-sm text-white transition  duration-500 hover:border-2 hover:border-purple hover:bg-transparent hover:text-purple md:text-base lg:px-[40px] lg:py-[10px]"
              >
                Configure
              </button>
            )}
          </div>
        </div>
        <div>
          {continueThePurchase && <TestingModal domains={savedDomains} />}
        </div>
      </div>
    </>
  );
}

export default DomainsNameBlock;
