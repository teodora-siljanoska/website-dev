import React from 'react';
import Image from 'next/legacy/image';
import imageBig from '../ImageBlock/assets/image.png';
import {
  ComponentPageBlocksImage,
  UploadFileEntityResponse,
} from '@utils/types';
import findMediaUrl from '../../../utils/findMediaUrl';
import { useMediaQuery } from 'react-responsive';

function ImageBlock({
  image,
  desc,
  mobileImage,
}: ComponentPageBlocksImage): JSX.Element {
  return (
    <div className="mx-auto w-[90%] xlSpecial:container md:w-[90%]">
      <div className="hidden justify-center heroBreakThree:flex">
        <Image
          alt="image"
          src={findMediaUrl(image) ?? imageBig.src}
          height={image?.data?.attributes?.height ?? 221}
          width={image?.data?.attributes?.width ?? 600}
          layout="intrinsic"
        />
      </div>
      {!mobileImage?.data ? (
        <div className="flex justify-center heroBreakThree:hidden">
          <Image
            alt="image"
            src={findMediaUrl(image) ?? imageBig.src}
            height={image?.data?.attributes?.height ?? 221}
            width={image?.data?.attributes?.width ?? 600}
            layout="intrinsic"
          />
        </div>
      ) : (
        <div className="flex justify-center heroBreakThree:hidden">
          <Image
            alt="image"
            src={findMediaUrl(mobileImage) ?? imageBig.src}
            height={mobileImage?.data?.attributes?.height ?? 221}
            width={mobileImage?.data?.attributes?.width ?? 600}
            layout="intrinsic"
          />
          
        </div>
      )}
      <div className="container mt-2 text-sm text-darkGrey">{desc}</div>
    </div>
  );
}
export default ImageBlock;
