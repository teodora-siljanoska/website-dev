import React from 'react';
import heroImagePlaceholder from './assets/hero2.png';
import ReactMarkdown from 'react-markdown';

interface P {
  smallTitle?: string;
  title: string;
  description?: string;
  heroImage: string;
  size: 'large' | 'small';
}

function HeroBlockTest({
  size,
  title,
  description,
  heroImage,
  smallTitle,
}: P): JSX.Element {
  let style = '';

  switch (size) {
    case 'large':
      style = ` lg:h-[610px] md:h-[547px] h-[351.53px] py-1 sm:py-20 2xl:py-44 w-full bg-cover bg-center bg-no-repeat`;
      break;
    case 'small':
      style = ` lg:h-[470px] md:h-[450.44px] h-[433px] py-5 sm:py-20 md:py-5  2xl:py-24 w-full bg-cover bg-center bg-no-repeat `;
      break;

    default:
      null;
      break;
  }
  return (
    <div
      className={style}
      style={{
        backgroundImage: `url('${heroImagePlaceholder.src}')`,
      }}
    >
      <div className="container mx-auto flex flex-col  ">
        <div className="font-['Mont-light'] text-lg  text-white">
          {smallTitle}
        </div>
        <div className="w-[70%] font-['Mont-regular'] text-[28px] text-white prose-strong:font-['Mont-bold'] prose-ul:ml-6 prose-ul:list-disc  prose-li:text-[20px] md:text-[50px] prose-li:md:text-[25px] lg:w-[45%] ">
          <ReactMarkdown>{title}</ReactMarkdown>
        </div>
        <div className="w-[70%] font-['Mont-bold'] text-[28px] text-white  md:text-[50px] lg:w-[50%] ">
          {description}
        </div>
      </div>
    </div>
  );
}

export default HeroBlockTest;
