import React from 'react';
import { PageEntity } from '@utils/types';

export interface P {
  breadcrumb: string;
  parents: string;
}
interface Page {
  page: PageEntity;
}

function BreadcrumbsBlock({ page }: Page): JSX.Element {
  return (
    <div className="container mx-auto my-5 text-left text-xs text-[#696969] sm:text-sm">
      {page.attributes?.parent?.data?.attributes?.parent?.data == null ? (
        page.attributes?.parent?.data ? (
          <div className="flex gap-1">
            {' '}
            <a
              className="font-[Mont-regular] underline"
              href={`/${
                page.attributes.parent.data.attributes?.slug === '/'
                  ? ''
                  : page.attributes.parent.data.attributes?.slug
              }`}
            >
              {page.attributes.parent.data.attributes?.title}
            </a>{' '}
            / <p className="font-[Mont-bold]">{page.attributes.title}</p>
          </div>
        ) : (
          ''
        )
      ) : (
        <div className="flex gap-1">
          <a
            className="underline font-['Mont-regular']"
            href={`/${
              page.attributes.parent.data.attributes.parent.data.attributes
                ?.slug ?? ''
            }`}
          >
            {
              page.attributes.parent.data.attributes.parent.data.attributes
                ?.title
            }
          </a>{' '}
          /{' '}
          <a
            className="font-[Mont-regular] underline"
            href={`/${page.attributes.parent.data.attributes.slug ?? ''}`}
          >
            {page.attributes.parent.data.attributes.title}
          </a>{' '}
          / <p className="font-[Mont-bold]">{page.attributes.title}</p>
        </div>
      )}
    </div>
  );
}
export default BreadcrumbsBlock;
