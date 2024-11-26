import React from 'react';
import Image from 'next/legacy/image';
import TimerImage from './assets/TimerImage.svg';
import { ComponentPageBlocksIconBanner } from '@utils/types';
import findMediaUrl from '@utils/findMediaUrl';
import ReactMarkdown from 'react-markdown';
import ImageWithTitle from '@components/ImageWithTitle';
import { useMediaQuery } from 'react-responsive';

function IconBannerBlock({
  imgTitle,
  title,
  description,
}: ComponentPageBlocksIconBanner): JSX.Element {
  const fullCards = Math.floor((imgTitle?.length ?? 0) / 3) * 3;
  const restCards = (imgTitle?.length ?? 0) - fullCards;
  const isDesktop = useMediaQuery({ minWidth: 1280 });

  return (
    <div className="mx-auto box-border flex w-[90%] flex-col  items-center justify-center gap-[55px] rounded-2xl bg-purple/5 py-[60px]	px-10 md:px-16 xl:px-20">
      <div className="mx-[113px] text-center font-['Mont-semibold'] text-3xl text-purple ">
        <ReactMarkdown>{title ?? ''}</ReactMarkdown>
      </div>
      {restCards === 0 ? (
        <div
          className={`m-auto grid  gap-14 ${
            imgTitle && imgTitle?.length % 2 === 0
              ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
              : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-2 '
          }`}
        >
          {imgTitle?.map((item, index) => {
            return (
              <span className={`max-w-[379px]`} key={index}>
                <ImageWithTitle title={item?.title ?? ''} image={item?.image} />
              </span>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col gap-y-14">
          <div
            className={`m-auto grid  grid-cols-1 gap-14 md:grid-cols-2 xl:grid-cols-2 `}
          >
            {imgTitle?.map((item, index) => {
              return (
                index < restCards && (
                  <span className={`max-w-[379px]`} key={index}>
                    <ImageWithTitle
                      title={item?.title ?? ''}
                      image={item?.image}
                    />
                  </span>
                )
              );
            })}
          </div>
          {fullCards % 2 === 0 ? (
            <div
              className={`m-auto grid  grid-cols-1 gap-14 md:grid-cols-2 xl:grid-cols-3`}
            >
              {imgTitle?.map((item, index) => {
                return (
                  index >= restCards && (
                    <span className={`max-w-[379px]`} key={index}>
                      <ImageWithTitle
                        title={item?.title ?? ''}
                        image={item?.image}
                      />
                    </span>
                  )
                );
              })}
            </div>
          ) : 
          <div>
             <div className="xl:flex flex-col gap-y-14 hidden">
              <div
                className={`m-auto grid  grid-cols-1 gap-14 md:grid-cols-2 xl:grid-cols-3`}
              >
                {imgTitle?.map((item, index) => {
                  return (
                    index >= restCards && (
                      <span className={`max-w-[379px]`} key={index}>
                        <ImageWithTitle
                          title={item?.title ?? ''}
                          image={item?.image}
                        />
                      </span>
                    )
                  );
                })}
              </div>
            </div>
            <div className="xl:hidden flex flex-col gap-y-14">
              <div
                className={`m-auto grid  grid-cols-1 gap-14 md:grid-cols-2 xl:grid-cols-3`}
              >
                {imgTitle?.map((item, index) => {
                  return (
                    index >= restCards &&
                    index !== imgTitle?.length - 1 && (
                      <span className={`max-w-[379px]`} key={index}>
                        <ImageWithTitle
                          title={item?.title ?? ''}
                          image={item?.image}
                        />
                      </span>
                    )
                  );
                })}
              </div>
              <div
                className={`mx-auto grid grid-cols-1  gap-14 md:w-1/2 md:grid-cols-1`}
              >
                {imgTitle?.map((item, index) => {
                  return (
                    index >= restCards &&
                    index === imgTitle?.length - 1 && (
                      <span className={`max-w-[379px]`} key={index}>
                        <ImageWithTitle
                          title={item?.title ?? ''}
                          image={item?.image}
                        />
                      </span>
                    )
                  );
                })}
              </div>
            </div>



          </div>
          
          }
        </div>
      )}
      {description && (
        <div className='text-center font-["Mont-light"] text-xl text-darkGrey xl:mx-[180px]'>
          <ReactMarkdown>{description ?? ''}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default IconBannerBlock;
