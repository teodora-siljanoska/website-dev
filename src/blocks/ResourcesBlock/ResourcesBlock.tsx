/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import Resources, { P as ResourcesProps } from '../../components/Resources';
import { ComponentPageBlocksResources } from '@utils/types';

export interface P {
  title: string;
  resourceCard: ResourcesProps[];
}

function ResourcesBlock({
  title,
  resourceCard,
}: ComponentPageBlocksResources): JSX.Element {
  return (
    <>
      <div>
        <div className="mb-8 text-center text-[28px] font-['Mont-bold'] text-darkGrey">
          {title}
        </div>
        <div className="flex flex-wrap justify-center gap-10">
          {resourceCard?.map((item, index) => (
            <div key={index} className="">
              <Resources data={item?.data} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default ResourcesBlock;
