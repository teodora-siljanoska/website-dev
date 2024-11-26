import React, { useContext, useEffect, useRef, useState } from 'react';
import { useQuery } from '@apollo/client';
import { LOCATIONS_QUERY } from '@utils/queries';
import { LocationContext } from '@utils/contexts/locationContext';
import Image from 'next/legacy/image';
import deskImage from './assets/location.png';
import arrow from './assets/arrowfull.svg';
import ReactMarkdown from 'react-markdown';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
import useSWR from 'swr';
import { LocationEntity } from '@utils/types';
export interface P {
  title?: string;
  desktopImage?: image;
  aligment?: 'left' | 'center' | 'right';
}

interface image {
  width: number;
  height: number;
  src: string;
}

export interface LocationData {
  attributes: { description: string; name: string; sku: string };
}
interface EmptyDataInterface {
  data: LocationData[];
}
export interface LocationRequest {
  locations: EmptyDataInterface;
}
function LocationSelector({ title, desktopImage, aligment }: P): JSX.Element {
  const isBetweenTabletAndDesktop = useMediaQuery({
    minWidth: 1023,
    maxWidth: 1429,
  });
  const isTablet = useMediaQuery({ maxWidth: 1022, minWidth: 640 });

  const isHorizontalPhone = useMediaQuery({ maxWidth: 735 });

  const isSmallMedia = useMediaQuery({ maxWidth: 639 });

  const { selectedLocation, setSelectedLocation, setSkuLocation, skuLocation } =
    useContext(LocationContext);

  const {
    data: locationsData,
    error: locationsDataError,
    isLoading,
  } = useSWR('locations', async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_URI}/api/locations`
    );

    return response.data.data;
  });

  const onChangeHandler = (selected: string) => {
    localStorage.setItem('SELECTED_LOCATION', selected);
    setSelectedLocation(selected);
  };

  useEffect(() => {
    const findSku = locationsData?.find(
      (item: LocationEntity) => item.attributes?.name === selectedLocation
    );
    setSkuLocation(findSku?.attributes.sku ?? '');
  }, [selectedLocation, locationsData, setSkuLocation]);

  const [showLocationDropdown, setShowLocationDropdown] =
    useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowLocationDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);
  return (
    <>
      <div>
        {isLoading && <div className="text-center text-purple">loading...</div>}
        {locationsData && (
          <>
            <div className="mx-5 flex  items-center rounded-lg border border-white bg-white py-11 shadow-custom">
              <div className="hidden h-full basis-1/2 px-10  text-center font-['Mont-regular'] text-xl md:block lg:hidden xlSpecial:block xlSpecial:px-20 text-darkGrey">
                {title}
              </div>
              <div className="hidden h-28 border-r-2 border-lightGrey md:block lg:hidden xlSpecial:block"></div>
              <div className="basis-full sm:basis-full  md:basis-1/2 lg:basis-full xlSpecial:basis-1/2 w-full self-center ">
                <div className="flex  w-full flex-col  items-center gap-6">
                  <div className="h-full">
                    <Image
                      alt="image"
                      src={deskImage.src}
                      height={48}
                      width={48}
                    />
                  </div>
                  <div className="block h-full basis-1/2 px-10  text-center font-['Mont-regular'] text-lg md:hidden lg:block xlSpecial:hidden xlSpecial:px-20 text-darkGrey">
                    {title}
                  </div>
                  <div
                    className="relative flex w-[90%] bg-white text-center text-base "
                    ref={dropdownRef}
                  >
                    <button
                      className="z-30 inline-flex w-full items-center justify-center gap-2 self-center rounded-lg bg-white px-4 text-center font-['Mont-regular'] text-base text-purple focus:border-2 focus:border-purple"
                      type="button"
                      onClick={() =>
                        setShowLocationDropdown(!showLocationDropdown)
                      }
                    >
                      <span>
                        {/* {selectedLocation} */}
                        {
                          locationsData.find(
                            (element: any) =>
                              element.attributes.name === selectedLocation
                          )?.attributes.description
                        }
                      </span>
                      <span>
                        <Image
                          className={`${
                            showLocationDropdown && 'rotate-180 duration-500'
                          }`}
                          alt="image"
                          src={arrow.src}
                          height={10}
                          width={10}
                        />
                      </span>
                    </button>
                    {showLocationDropdown && (
                      <div className="absolute z-50 mt-9 flex w-full flex-col rounded-lg bg-white shadow-custom">
                        <ul>
                          {locationsData.map(
                            (locations: LocationData, index: number) => (
                              <li
                                key={locations.attributes.name}
                                onClick={() => {
                                  onChangeHandler(locations.attributes.name),
                                    setShowLocationDropdown(
                                      !showLocationDropdown
                                    );
                                }}
                                className={` ${
                                  index !== locationsData.length - 1 &&
                                  'border-b-[1px] border-lightGrey'
                                } ${
                                  selectedLocation ===
                                    locations.attributes.name && 'bg-liliac/10'
                                }
                                flex cursor-pointer justify-between py-2  text-left hover:bg-liliac/20  `}
                              >
                                <div className=" px-5">
                                  <section className="font-['Mont-bold'] text-base text-purple">
                                    <ReactMarkdown>
                                      {locations.attributes.description}
                                    </ReactMarkdown>
                                  </section>
                                  {/* <section className="font-['Mont-bold'] text-base text-purple">
                                    {locations.attributes.name}
                                  </section>
                                  <section className="font-['Mont-regular'] text-sm text-darkGrey prose-ul:ml-5 prose-ul:list-disc">
                                    <ReactMarkdown>
                                      {locations.attributes.description}
                                    </ReactMarkdown>
                                  </section> */}
                                </div>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default LocationSelector;
