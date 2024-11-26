import Image from 'next/legacy/image';
import Link from 'next/link';
import React, { useState } from 'react';
import SVG from 'react-inlinesvg';
import { P as MegaMenuProps } from './MegaMenu';
import x from './assets/xBigManu.svg';
import logo from './assets/burgerLogoNew.svg';
import cart from './assets/cart.svg';
import arrow from './assets/burgerarrow.svg';
import Button from '@components/Button';
import {
  ComponentPageComponentsOptionsTabHeader,
  HeaderEntity,
} from '@utils/types';
import CurrencySelector from '@pages/vps/currencySelector';

interface BurgerMenuProps extends MegaMenuProps {
  closeBurgerMenu: () => void;
  currentSlug: string;
  headerData: HeaderEntity | undefined;
}

const BurgerMenuNew = ({
  headerData,
  navLinks,
  closeBurgerMenu,
}: BurgerMenuProps) => {
  const [currentIndex, setCurrentIndex] = useState(-1);

  const btnOnClick = (index: number) => {
    setCurrentIndex((currentValue) => (currentValue !== index ? index : -1));
  };
  return (
    <>
      <section id="mobile" className="block xlSpecial:hidden">
        <div className="inset-0 z-50 h-screen w-full overflow-y-scroll bg-purple smallest:fixed md:relative xlSpecial:hidden landscape:md:relative">
          <div>
            <nav className="flex-row items-center justify-between px-5 py-3 smallest:flex md:hidden">
              <Link href="/">
                <Image
                  src={logo.src}
                  alt="logo"
                  height={38.675}
                  width={196.3}
                />
              </Link>

              <div className=" flex flex-row  items-center justify-end gap-x-6">
                <button
                  className="flex cursor-pointer items-center"
                  onClick={() => closeBurgerMenu()}
                >
                  <Image src={x.src} alt="x" width={24.16} height={24.12} />
                </button>
              </div>
            </nav>
            <div className="flex w-full flex-row ">
              <ul
                className={`mt-11 flex w-full flex-col items-end justify-end gap-y-6 pr-5 text-right text-xl text-white md:container md:mx-auto`}
              >
                {headerData?.attributes?.tabHeader?.map((item, index) => (
                  <li key={index}>
                    {item?.options ? (
                      <div className="flex flex-col items-end gap-y-6">
                        <button
                          // onClick={() => setSupportMenu(!supportMenu)}
                          onClick={() => btnOnClick(index)}
                          className="flex items-center"
                        >
                          <p>{item.titleTabHeader}</p>
                          <SVG
                            src={arrow.src}
                            className={`ml-2 transition duration-200 ${
                              currentIndex === index ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {currentIndex === index && (
                          <div>
                            <ul className="flex flex-col gap-y-4 pb-5  text-lg">
                              {item.optionsTabHeader?.map(
                                (
                                  opt: ComponentPageComponentsOptionsTabHeader | null,
                                  idx: number
                                ) => (
                                  <Link
                                    key={idx}
                                    href={opt?.linkOptionTab ?? '/'}
                                    passHref
                                    onClick={() => closeBurgerMenu()}
                                  >
                                    {opt?.titleOptionTab}
                                  </Link>
                                )
                              )}
                            </ul>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item?.linkTabHeader ?? '/'}
                        passHref
                        onClick={() => closeBurgerMenu()}
                      >
                        {item?.titleTabHeader}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            onClick={() => closeBurgerMenu()}
            className=" mb-5 mt-8 flex w-full cursor-pointer flex-row justify-end gap-x-4 pr-5 md:container md:mx-auto"
          >
            {headerData?.attributes?.buttonHeader?.buttons?.map(
              (button, index) => (
                <Button
                  key={index}
                  cta={button?.cta ?? ''}
                  link={button?.link ?? '/'}
                  color={button?.color ?? 'tertiary'}
                />
              )
            )}
          </div>
          <div className="mb-16 mt-12">
            <div className="mt-5 flex w-full cursor-pointer flex-row justify-end gap-x-4 pr-5 md:container md:mx-auto">
              <Link
                href="/shopping-cart"
                className=" mt-2 flex  text-xl text-white"
              >
                Shopping cart
              </Link>
              <div>
                <Image src={cart.src} alt="avatar" width={29} height={26} />
              </div>
            </div>
            <div className="mt-5 flex w-full cursor-pointer flex-row justify-end gap-x-4 pr-5 md:container md:mx-auto md:hidden">
              <CurrencySelector />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BurgerMenuNew;
