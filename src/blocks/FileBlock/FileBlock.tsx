import React from 'react';
import FileComponent from '@components/FileComponent';
import { ComponentPageBlocksFiles } from '@utils/types';

function FileBlock({ files }: ComponentPageBlocksFiles): JSX.Element {
  return (
    <>
      <div className="mx-auto my-40 flex justify-center smallest:w-[90%] md:w-[77%] xlSpecial:max-w-[55%] 3xl:container">
        <div className="grid w-full grid-rows-1 justify-between gap-x-[20px]  gap-y-10 md:gap-y-6">
          {files.data.map((item, index: number) => (
            <>
              <FileComponent
                key={index}
                title={item.attributes?.name ?? ''}
                link={item.attributes?.url ?? '#'}
              />
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default FileBlock;
