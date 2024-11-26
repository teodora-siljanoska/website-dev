import { ComponentPageBlocksTitle } from '@utils/types';
import React from 'react';
import Title from '../../components/Title';

function TitleBlock({ centeredTitle }: ComponentPageBlocksTitle): JSX.Element {
  return (
    <div className="container mx-auto w-[90%] leading-tight md:w-[90%] xlSpecial:w-[75%]">
      <Title
        cta={centeredTitle?.cta ?? ''}
        alignment={centeredTitle?.aligment ?? 'center'}
        fontSize={centeredTitle?.fontSize ?? 'Big'}
      />
    </div>
  );
}
export default TitleBlock;
