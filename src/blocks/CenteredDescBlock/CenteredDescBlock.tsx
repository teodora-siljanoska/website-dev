import CenteredDescription from '@components/CenteredDescription';
import { ComponentPageBlocksCenteredDesc } from '@utils/types';
import React from 'react';

function CenteredDescBlock({
  centeredDesc,
}: ComponentPageBlocksCenteredDesc): JSX.Element {
  return (
    <div className="container m-auto flex">
      <CenteredDescription
        cta={centeredDesc?.cta ?? ''}
        alignment={centeredDesc?.alignment ?? 'center'}
      />
    </div>
  );
}
export default CenteredDescBlock;
