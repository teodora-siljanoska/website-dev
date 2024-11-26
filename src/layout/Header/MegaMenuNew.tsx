import { StaticImageData } from 'next/legacy/image';
import Link from 'next/link';
import React from 'react';
import Image from 'next/legacy/image';
import xIcon from './assets/xBigManu.svg';
import { ComponentPageComponentsOptionsTabHeader, Maybe } from '@utils/types';
import arrowIcon from './assets/rightArrow.png';
import findMediaUrl from '@utils/findMediaUrl';
import MegaMenuicon from './assets/megaMenu.png';

export interface NavLink {
  name: string;
  href: string;
  current: boolean;
  newTab: boolean;
}

export interface P {
  categories?: Maybe<ComponentPageComponentsOptionsTabHeader>[] | null;
  navLinks?: NavLink[];
  closeMegaMenu?: () => void;
}

const MegaMenuNew = ({ categories, closeMegaMenu }: P): JSX.Element => {
  return (
    <div>
      <section
        id="desktop"
        className={`absolute z-50 hidden w-full bg-purple  text-white xlSpecial:block shadow-customDropdown`}
      >
        <div className="container mx-auto mt-4 flex w-full justify-end">
          <button onClick={closeMegaMenu}>
            <Image src={xIcon.src} alt="x" width={24.16} height={24.12} />
          </button>
        </div>
        <div className="container mx-auto flex w-full flex-col py-14">
          <div className=" grid w-full grid-cols-3 lg:grid-cols-4 justify-between xl:mr-24 ">
            {categories?.map(
              (
                item: ComponentPageComponentsOptionsTabHeader | null,
                index: number
              ) => (
                <div key={index} className="flex shrink-0 flex-col gap-y-6">
                  <div className=" ">
                    <Link  onClick={closeMegaMenu} href={item?.linkOptionTab ?? '/'} passHref>
                      <div>
                        <Image
                          src={
                            findMediaUrl(item?.logoOptionTab) ??
                            MegaMenuicon.src
                          }
                          alt="icon"
                          width={49}
                          height={49}
                          className="rounded-full"
                        />
                      </div>

                      <div className="text-lg font-['Mont-regular'] text-white">
                        {item?.titleOptionTab}
                      </div>
                      <div className="h-8 w-[70%] text-xs font-['Mont-light']">
                        {item?.blurbOptionTab}
                      </div>
                      <div className="mb-9 mt-4 flex flex-row">
                        <span onClick={closeMegaMenu}>
                          <div className="font-['Mont-bold'] hover:underline">
                            {item?.buttonOptionTab}
                          </div>
                        </span>
                        <div className="mt-1 ml-3 flex flex-col">
                          <Image
                            src={arrowIcon.src}
                            alt="icon"
                            width={16}
                            height={14}
                          />
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>
      <div
        className="fixed inset-x-0 bottom-0 top-[120px] z-40 opacity-0"
        onClick={closeMegaMenu}
      />
    </div>
  );
};

export default MegaMenuNew;
