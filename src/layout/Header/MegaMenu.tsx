import { StaticImageData } from 'next/legacy/image';
import Link from 'next/link';
import React from 'react';
import Image from 'next/legacy/image';
import xIcon from './assets/xBigManu.svg';

export interface NavLink {
  name: string;
  href: string;
  current: boolean;
  newTab: boolean;
}

export interface Link {
  cta: string;
  to: string;
  image: StaticImageData;
  description: string;
  icon: StaticImageData;
  link: string;
}

export interface Category {
  name: string;
  subitems?: Link[];
}

export interface P {
  categories?: Category[];
  navLinks?: NavLink[];
  closeMegaMenu?: () => void;
}

export interface HeaderData {
  categories?: Category[];
  navLinks?: NavLink[];
}

const MegaMenu = ({ categories, closeMegaMenu }: P): JSX.Element => {
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
          <div className="flex flex-col justify-between xl:mr-24 ">
            {categories?.map((item: Category) => (
              <div key={item.name} className="flex shrink-0 flex-col gap-y-6">
                {/* <a
                className={`flex items-center text-2xl font-['Mont-bold'] text-white`}
              >
                {item.name}
              </a> */}
                <div className=" grid w-full grid-cols-3 lg:grid-cols-4 ">
                  {item.subitems?.map((subitem: Link) => (
                    <>
                      <Link href={subitem.link} passHref>
                        <div>
                          <Image
                            src={subitem.image}
                            alt="icon"
                            width={49}
                            height={49}
                          />
                        </div>

                        <div className="text-lg font-['Mont-regular'] text-white">
                          {subitem.cta}
                        </div>
                        <div className="h-8 w-[70%] text-xs font-['Mont-light']">
                          {subitem.description}
                        </div>
                        <div className="mb-9 mt-4 flex flex-row">
                          <span onClick={closeMegaMenu}>
                            <div className="font-['Mont-bold'] hover:underline">
                              {subitem.to}
                            </div>
                          </span>
                          <div className="mt-1 ml-3 flex flex-col">
                            <Image
                              src={subitem.icon}
                              alt="icon"
                              width={16}
                              height={14}
                            />
                          </div>
                        </div>
                      </Link>
                    </>
                  ))}
                </div>
              </div>
            ))}
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

export default MegaMenu;
