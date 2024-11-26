import { ComponentPageBlocksStepsBlock } from '@utils/types';
import React from 'react';
import Benefit from '@components/Benefit';

function StepsBlock({ steps }: ComponentPageBlocksStepsBlock): JSX.Element {
  return (
    <div className="container mx-auto flex flex-col">
      <div className="flex flex-col items-center justify-center gap-x-10 gap-y-20 lg:flex-row lg:items-start">
        {steps?.map((item, index: number) => (
          <Benefit
            key={index}
            buttonColor="primary"
            description={item?.description ?? ''}
            title={item?.title ?? ''}
            image={item?.image ?? undefined}
            alignment="center"
          />
        ))}
      </div>
    </div>
  );
}

export default StepsBlock;
