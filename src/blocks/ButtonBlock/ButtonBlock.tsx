import Button from '@components/Button';
import { ComponentPageBlocksButtons } from '@utils/types';
import React from 'react';

function ButtonBlock({ buttons }: ComponentPageBlocksButtons): JSX.Element {
  return (
    <div className="container mx-auto my-5 flex flex-col items-center justify-center gap-8 sm:flex-row sm:flex-wrap sm:gap-20">
      {buttons?.map((item, index) => (
        <Button
          key={index}
          cta={item?.cta ?? ''}
          color={item?.color ?? 'primary'}
          link={item?.link ?? '#'}
        />
      ))}
    </div>
  );
}
export default ButtonBlock;
