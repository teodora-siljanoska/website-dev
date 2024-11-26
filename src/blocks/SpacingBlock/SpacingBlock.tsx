import { ComponentPageBlocksSpacing } from '@utils/types';
import React, { useEffect, useState } from 'react';

function SpacingBlock({ sizeHeight }: ComponentPageBlocksSpacing): JSX.Element {
  const [height, setHeight] = useState<string>('');

  useEffect(() => {
    switch (sizeHeight) {
      case 'xs': {
        setHeight('h-9 sm:h-10 lg:h-10');
        break;
      }
      case 's': {
        setHeight('h-10 sm:h-20 lg:h-16');
        break;
      }
      case 'm': {
        setHeight('h-16 sm:h-24 lg:h-20');
        break;
      }
      case 'l': {
        setHeight('h-20 sm:h-32 lg:h-28');
        break;
      }
      case 'xl': {
        setHeight('h-32 sm:h-40 lg:h-36');
        break;
      }
      case 'xxl': {
        setHeight('h-44 sm:h-52 lg:h-44');
        break;
      }
      case 'xxxl': {
        setHeight(' h-48 sm:h-60 lg:h-56');
        break;
      }
      default: {
        setHeight('');
      }
    }
  }, [sizeHeight]);

  return (
    <div>
      <div className={`${height} container mx-auto w-full`} />
    </div>
  );
}
export default SpacingBlock;
