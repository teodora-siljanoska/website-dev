/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Image from 'next/legacy/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useState, useContext, useEffect } from 'react';
import SVG from 'react-inlinesvg';
import MegaMenuNew from './MegaMenuNew';
import cart from './assets/cart.svg';
import downArrow from './assets/downArrow.svg';
import CurrencySelector from '../../../pages/vps/currencySelector';
import tabletBurger from './assets/tablet-burger.svg';
import tabletX from './assets/tabletX.svg';
import headphones from './assets/headphones.svg';
import menu from './assets/menu.png';
import logoWhite from './assets/logo-white.png';
import line from './assets/line.png';
import logo from './assets/newLogo.svg';
import Button from '@components/Button';
import LoginContext from '@utils/contexts/loginContext';
import CartContext from '@utils/contexts/cartContext';
import CartWordPresContext from '@utils/contexts/cartWordPresContext';
import CartDomainFinalContext from '@utils/contexts/cartFinalDomainContext';
import SearchBar from './Searchbar';
import {
  ComponentPageComponentsOptionsTabHeader,
  HeaderEntity,
  Maybe,
} from '@utils/types';
import findMediaUrl from '@utils/findMediaUrl';
import BurgerMenuNew from './BurgerMenuNew';
import * as Sentry from "@sentry/nextjs";

export interface HeaderInterface {
  header: {
    data: HeaderEntity;
  };
}
interface RedirectUrl {
  accessUrl: string;
}
interface P {
  header: HeaderEntity | undefined;
  currentSlug: string;
  showLoginWindow: boolean;
  setShowLoginWindow: React.Dispatch<React.SetStateAction<boolean>>;
}

function HeaderBlock({
  currentSlug,
  showLoginWindow,
  setShowLoginWindow,
  header,
}: P): JSX.Element {
  const { user, setUser } = useContext(LoginContext);

  const loginUrl = new URL(process.env.NEXT_PUBLIC_LOGIN_URL?.toString() ?? '');

  const [burgerMenu, setBurgerMenu] = useState<boolean>(false);

  const [megaMenuNewShow, setMegaMenuNewShow] = useState<Maybe<
    Maybe<ComponentPageComponentsOptionsTabHeader>[]
  > | null>(null);

  const [searchData, setSearchData] = useState<string>('');
  const [showRegisterWindow, setShowRegisterWindow] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string>('');
  const [refreshToken, setRefreshToken] = useState<string>('');
  const { cartItems, setCartItems } = useContext(CartContext);
  const { domainFinalCart, setDomainFinalCartItems } = useContext(
    CartDomainFinalContext
  );
  const { cartWordPresItems, setCartWordPresItems } =
    useContext(CartWordPresContext);
  const [cartLenght, setCartLenght] = useState<number>();

  useEffect(() => {
    setCartLenght(
      cartItems.length + cartWordPresItems.length + domainFinalCart.length
    );
  }, [cartItems, domainFinalCart, cartWordPresItems]);
  useEffect(() => {
    setAccessToken(
      sessionStorage.getItem('layershift_fa_access_token') ??
      'ACCESS TOKEN ERROR'
    );
    setRefreshToken(
      localStorage.getItem('layershift_fa_refresh_token') ??
      'REFRESH TOKEN ERROR'
    );
  }, []);

  const router = useRouter();

  const handleBurgerMenuClose = useCallback(() => {
    setBurgerMenu(false);
  }, []);

  const myAccountHandler = useCallback(async () => {
    await fetch('/api/myAccount', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accessToken, refreshToken }),
    })
      .then((res) => {
        return res.json();
      })
      .then((final: RedirectUrl) => {
        //console.log('final', final);
        router.push(final.accessUrl);
      })
      .catch((e) => Sentry.captureException(e));
  }, [accessToken]);

  const handleMegaMenuClose = useCallback(() => {
    setMegaMenuNewShow(null);
  }, []);

  const loginHandler = useCallback(() => {
    if (showRegisterWindow) {
      setShowRegisterWindow(false);
    }
    setShowLoginWindow(true);
  }, [showRegisterWindow]);

  const logoutHandler = () => {
    setUser({
      firstName: '',
      isLoggedin: false,
    });
    localStorage.removeItem('layershift_fa_refresh_token');
    sessionStorage.removeItem('layershift_fa_access_token');
    localStorage.removeItem('layershift_user_first_name');
    localStorage.removeItem('layershift_user_info');
    localStorage.removeItem('layershift_user_is_logged_in');
  };

  const registerHandler = useCallback(() => {
    if (showLoginWindow) {
      setShowLoginWindow(false);
    }
    setShowRegisterWindow(true);
  }, [showLoginWindow]);

  const handleSearchEnter = useCallback(
    (e: any) => {
      if (e.key === 'Enter' && searchData !== '') {
        void router.push({ pathname: '/search', query: { searchData } });
      }
    },
    [router, searchData]
  );

  // const [loadHeader, { loading: headerLoading, data: headerStrapiData }] =
  //   useLazyQuery<HeaderInterface>(GET_HEADER);

  // const getHeader = useCallback(async () => {
  //   await loadHeader({
  //     variables: {},
  //   });
  // }, [loadHeader]);
  // useEffect(() => {
  //   void getHeader();
  // }, [getHeader]);

  // const { data, error } = useSWR('projects', async () => {
  //   const response = await axios.get('/api/headerContent');
  //   const fetchedData = response.data.data.header?.data || [];
  //   // console.log("response",response.data.data.projects?.data);

  //   return fetchedData;
  // });
  return (
    <>
      <div className="z-50 w-full shadow-custom">
        <div className=" bg-purple z-50">
          <div className="z-50 flex h-[80px] flex-col justify-center md:container md:mx-auto md:h-auto md:py-1">
            <div className="flex items-center gap-x-4">
              <div className="hidden items-center  md:flex">
                <Image
                  src={headphones.src}
                  alt="logo"
                  layout="fixed"
                  height={26.97}
                  width={27}
                />
              </div>
              <div className="hidden font-['Mont-book'] text-white md:flex md:flex-row">
                {header?.attributes?.contactInfoHeader}
              </div>
              <div
                id="menu-links"
                className="flex grow flex-col justify-around"
              >
                <div id="search-lang" className="flex  justify-end">
                  <div className="flex w-full items-center gap-x-8 md:w-auto">
                    <SearchBar />
                    <div className="hidden md:block">
                      <a
                        href="/shopping-cart"
                        className="flex cursor-pointer gap-x-1"
                      >
                        <Image
                          src={cart.src}
                          alt="logo"
                          layout="fixed"
                          height={22.41}
                          width={24.97}
                        />
                        <span className="first-letter h-5 w-5 rounded-full bg-white p-1 text-center font-['Mont-bold'] text-xs text-purple">
                          {cartLenght}
                        </span>
                      </a>{' '}
                    </div>

                    <div className="hidden md:block">
                      <a className="flex cursor-pointer gap-x-1">
                        <Image
                          src={line.src}
                          alt="logo"
                          layout="fixed"
                          height={28}
                          width={2}
                        />
                      </a>
                    </div>

                    {/* <div className="hidden text-white lg:block">
                    <Link href="/vps">
                      {user.isLoggedin ? (
                        <a>{user.firstName}</a>
                      ) : (
                        <a> my.layershift</a>
                      )}
                    </Link>
                  </div> */}

                    {/* {!user.isLoggedin && (
                      <>
                        <Link href={loginUrl.toString()} legacyBehavior>
                          <div className="hidden cursor-pointer text-white hover:underline md:block font-['Mont-book']">
                            login
                          </div>
                        </Link>
     
                      </>
                    )} */}
                    {user.isLoggedin && (
                      <>
                        <div
                          className="hidden  cursor-pointer text-white hover:underline md:block"
                          onClick={myAccountHandler}
                        >
                          {user.isLoggedin ? (
                            <a>{user.firstName}</a>
                          ) : (
                            <a>My Account</a>
                          )}
                          {/* {`My Account`} */}
                        </div>
                        <div
                          className="hidden cursor-pointer text-white hover:underline md:block"
                          onClick={logoutHandler}
                        >
                          logout
                        </div>
                      </>
                    )}
                    <div className="hidden md:block">
                      {' '}
                      <CurrencySelector />
                    </div>

                    <div className="flex w-full flex-row items-center justify-between px-5 md:hidden">
                      <Link href="/" passHref>
                        <Image
                          src={logoWhite.src}
                          alt="menu"
                          height={53}
                          width={53}
                        />
                      </Link>

                      <div className="flex items-center gap-x-3 md:hidden">
                        <div className="md:hidden">
                          <CurrencySelector />
                        </div>
                        <button
                          className="flex flex-row   md:hidden"
                          onClick={() => setBurgerMenu(true)}
                        >
                          <Image
                            src={menu.src}
                            alt="menu"
                            height={21}
                            width={31}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="z-50 hidden h-[70px] justify-between bg-white text-purple md:flex lg:flex-row">
            <div className="container mx-auto flex flex-row justify-between">
              <div className="mt-5 hidden md:block">
                <Link href="/">
                  <Image
                    src={
                      findMediaUrl(header?.attributes?.logoHeader) ?? logo.src
                    }
                    alt="logo"
                    layout="fixed"
                    height={34}
                    width={173}
                  />
                </Link>
              </div>
              <button
                className="hidden flex-row self-center   md:flex xlSpecial:hidden"
                onClick={() => setBurgerMenu(!burgerMenu)}
              >
                <Image
                  src={!burgerMenu ? tabletBurger.src : tabletX.src}
                  alt="menu"
                  height={21}
                  width={31}
                />
              </button>
              <div
                id="links"
                className={` ml-10 flex flex-row items-center justify-end font-['Mont-regular'] md:hidden lg:gap-x-7  xlSpecial:flex  `}
              >
                {header?.attributes?.tabHeader?.map((itemTab, index) => (
                  <div key={index}>
                    {itemTab?.options ? (
                      <button
                        onClick={() =>
                          setMegaMenuNewShow(itemTab.optionsTabHeader ?? [])
                        }
                        className="flex items-center hover:text-liliac"
                      >
                        <p>{itemTab.titleTabHeader}</p>
                        <SVG src={downArrow.src} className="ml-2" />
                      </button>
                    ) : (
                      <div className="hover:text-liliac">
                        <Link href={itemTab?.linkTabHeader ?? '/'}>
                          {itemTab?.titleTabHeader}
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
                <div className="hidden xlSpecial:flex ">
                  {header?.attributes?.buttonHeader?.buttons?.map(
                    (item, index) => (
                      <Button
                        key={index}
                        cta={item?.cta ?? ''}
                        link={item?.link ?? '/'}
                        color={item?.color ?? 'tertiary'}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {burgerMenu && (
          <BurgerMenuNew
            headerData={header}
            currentSlug={currentSlug}
            closeBurgerMenu={handleBurgerMenuClose}
          />
        )}
        {megaMenuNewShow !== null && (
          <MegaMenuNew
            categories={megaMenuNewShow}
            closeMegaMenu={handleMegaMenuClose}
          />
        )}
      </div>
    </>
  );
}

export default HeaderBlock;
