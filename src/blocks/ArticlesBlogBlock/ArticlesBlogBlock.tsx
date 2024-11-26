/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Image from 'next/legacy/image';
import Link from 'next/link';
import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import img1 from './assets/article1.webp';
import type { BlogEntity } from '@utils/types';
import findMediaUrl from '@utils/findMediaUrl';
import Pagination from '../../utilityComponents/Pagination';
import { Enum_Blog_Category } from '@utils/types';
import { useMediaQuery } from 'react-responsive';
import arrow from '../../components/assets/arrow.svg';

interface P {
  blogData: BlogEntity[];
  blockData: any;
}

const category = Object.values(Enum_Blog_Category);

const ArticlesBlogBlock = ({ blogData }: P): JSX.Element => {
  const isDesktopOrTablet = useMediaQuery({ minWidth: 933 });
  const isMobile = useMediaQuery({ maxWidth: 932 });

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  const [renderPagination, setRenderPagination] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState(0);
  const filtersContainer = useRef<HTMLUListElement>(null);
  const maxBlogs = 6;

  const [showDropdown, setDropdown] = useState<boolean>(false);
  const [activeDropdownItem, setActiveDropdownItem] =
    useState<string>('Best_Practice');

  const [activeTab, setActiveTab] = useState(0);

  const paginationSetPage = useCallback(
    (newPage: React.SetStateAction<number>) => {
      setCurrentPage(newPage);
      filtersContainer.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    },
    []
  );

  useEffect(() => {
    setRenderPagination(
      blogData.filter(
        (item) => category[activeTab] === item.attributes?.category
      ).length > maxBlogs
    );
  }, [activeTab, blogData]);

  useEffect(() => {
    setCurrentPage(0);
  }, [activeTab]);

  return (
    (<div
      className="flex min-h-fit flex-col bg-white text-darkGrey heroBreakThree:flex-row"
      ref={ref}
    >
      {isMobile && (
        <div className="z-50 my-10">
          <div className="flex flex-col items-center">
            <div className="flex flex-row rounded-lg shadow-custom ">
              <button
                className="inline-flex h-9 w-[19rem] items-center justify-center gap-2 self-center rounded-lg bg-white px-4 text-center text-base font-['Mont-regular'] text-darkGrey focus:border-2 focus:border-purple"
                type="button"
                onClick={() => setDropdown(!showDropdown)}
              >
                {/* Category: */}
                <span>{activeDropdownItem.replace(/_/g, ' ')}</span>
                <span>
                  <Image
                    src={arrow as string}
                    alt="down-arrow"
                    className={`${showDropdown ? 'rotate-180' : ''}`}
                  />
                </span>
              </button>
              <div className="absolute mt-10 flex w-[19rem] flex-col rounded-lg bg-white shadow-customDropdown">
                {showDropdown && (
                  <ul className="rounded-lg bg-white py-2 shadow-customDropdown">
                    {category.map((dataItem, index) => (
                      <li
                        className="flex w-full cursor-pointer justify-center  p-3 text-base font-['Mont-regular'] text-darkGrey "
                        key={index}
                        onClick={() => {
                          setActiveDropdownItem(dataItem ?? '');
                          setActiveTab(index);
                          setDropdown(false);
                        }}
                      >
                        {category[index].replace(/_/g, ' ')}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {isDesktopOrTablet && (
        <div className="ml-10 mt-16 shrink-0 basis-1/5">
          <div className="my-1 cursor-pointer text-left text-2xl font-['Mont-bold'] text-purple sm:text-left sm:text-[26px]">
            Category
          </div>
          {category.map((cate, index) => {
            return (
              (<div
                onClick={() => setActiveTab(index)}
                key={index}
                className={`${
                  activeTab === index
                    ? "font-['Mont-bold'] text-liliac"
                    : "font-['Mont-light'] text-darkGrey"
                } my-4 cursor-pointer text-left text-2xl sm:text-left sm:text-[26px]`}
              >
                {category[index].replace(/_/g, ' ')}
              </div>)
            );
          })}
        </div>
      )}
      <div className="container mx-auto " ref={ref}>
        <div className={`pt-8 ${inView ? 'fade-in-bottom' : ''}`}>
          <ul className="grid grid-cols-1  justify-center gap-5 md:grid-cols-2 lg:grid-cols-3">
            {/* <ul className=" flex flex-wrap gap-5 justify-center "> */}

            {blogData
              .filter(
                (item) => category[activeTab] === item.attributes?.category
              )
              .slice(currentPage * maxBlogs, currentPage * maxBlogs + maxBlogs)
              .map((card, index) => (
                <li className="flex justify-center" key={index}>
                  <Link
                    href={
                      card.attributes?.slug
                        ? `/blog/${card.attributes.slug}`
                        : ''
                    }
                    passHref
                  >
                    <div className="flex max-w-sm cursor-pointer flex-col items-center overflow-hidden pt-10  sm:items-start">
                      <div id="top" className="group relative max-w-[300px]">
                        <div className="">
                          <Image
                            className=""
                            src={
                              findMediaUrl(card.attributes?.thumbnail) ??
                              img1.src
                            }
                            alt="image"
                            layout="intrinsic"
                            objectFit="cover"
                            width={300}
                            height={256}
                          />
                        </div>
                        <div className="text-sm">
                          {card.attributes?.publishedAt}| by{' '}
                          {card.attributes?.author}
                        </div>
                        <div className="pt-3 pb-5 text-lg font-['Mont-semibold'] text-purple">
                          {card.attributes?.seo?.metaTitle}
                        </div>
                        <div className=" pr-2 text-right text-xl text-darkTeal hover:underline">
                          Read more
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
          </ul>
          <div className="my-[135px]">
            {renderPagination && (
              <Pagination
                currentPage={currentPage}
                setPage={paginationSetPage}
                totalEntries={
                  blogData.filter(
                    (item) => category[activeTab] === item.attributes?.category
                  ).length
                }
                limit={maxBlogs}
              />
            )}
          </div>
        </div>
      </div>
    </div>)
  );
};

export default ArticlesBlogBlock;
