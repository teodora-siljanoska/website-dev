import ButtonBlock from '@blocks/ButtonBlock/ButtonBlock';
import CenteredDescBlock from '@blocks/CenteredDescBlock/CenteredDescBlock';
import DescriptionBlock from '@blocks/DescriptionBlock/DescriptionBlock';
import HeroBlogBlock from '@blocks/HeroBlogBlock/HeroBlogBlock';
import ImageBlock from '@blocks/ImageBlock/ImageBlock';
import SpacingBlock from '@blocks/SpacingBlock/SpacingBlock';
import TestimonialCardBlock from '@blocks/TestimonialCardBlock/TestimonialCardBlock';
import TitleBlock from '@blocks/TitleBlock/TitleBlock';
import React from 'react';
import type { BlogEntity } from '../../utils/types';

interface P {
  singleBlogData: BlogEntity;
}

export function BlogBlocks({ singleBlogData }: P) {
  return (
    <>
      {singleBlogData.attributes?.blogBlocks
        ? singleBlogData.attributes.blogBlocks.map(
            (block, i): JSX.Element | null | undefined => {
              switch (block?.__typename) {
                case 'ComponentPageBlocksHeroBlog':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <HeroBlogBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksTitle':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <TitleBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksImage':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <ImageBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksCenteredDesc':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <CenteredDescBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksButtons':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <ButtonBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksTestimonialCard':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <TestimonialCardBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksTestimonialCard':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <TestimonialCardBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksDescription':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <DescriptionBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksSpacing':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <SpacingBlock {...block} />
                    </React.Fragment>
                  );
                  break;

                default:
                  return null;
              }
            }
          )
        : null}
    </>
  );
}

export default BlogBlocks;
