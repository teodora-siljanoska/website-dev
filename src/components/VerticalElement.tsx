import React from 'react';
import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import Button from './Button';
// import logo from './assets/logo.svg';

export interface P {
  title: string;
  desc?: string;
  buttonCTA: string;
  buttonLink: string;
  left: boolean;
}

function VerticalElement({
  title,
  desc,
  buttonCTA,
  buttonLink,
  left,
}: P): JSX.Element {
  return (
    <VerticalTimelineElement
      className=""
      iconStyle={{ background: 'rgb(157, 100, 169)', color: '#fff' }}
      icon={
        <svg
          width="29"
          height="28"
          viewBox="0 0 29 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.7088 12.9521H17.3544H16.7021H15.0249V14.8157H16.7021H17.3544H20.7321C23.8535 14.8157 26.3926 17.3548 26.3926 20.4763C26.3926 23.5977 23.8535 26.1368 20.7321 26.1368H18.7287H18.5424H16.2595C16.7254 26.8124 17.4009 27.5345 18.3793 27.9771C18.3793 27.9771 18.5424 28.0004 18.752 28.0004H20.7088C21.2212 28.0004 21.7337 27.9538 22.1996 27.8606C25.6239 27.1618 28.2096 24.1335 28.2096 20.4996C28.2329 16.3299 24.8552 12.9521 20.7088 12.9521Z"
            fill="white"
          />
          <path
            d="M17.3544 21.385H20.7321C21.2445 21.385 21.6638 20.9657 21.6638 20.4533C21.6638 19.9408 21.2445 19.5215 20.7321 19.5215H17.3544H16.7021H15.0249V21.385H16.7021H17.3544Z"
            fill="white"
          />
          <path
            d="M17.96 24.6934H20.7321C23.0615 24.6934 24.9484 22.8065 24.9484 20.477C24.9484 18.1476 23.0615 16.2607 20.7321 16.2607H17.3544H16.7021H15.0249V18.1243H16.7021H17.3544H20.7321C22.0365 18.1243 23.0848 19.1726 23.0848 20.477C23.0848 21.7815 22.0365 22.8298 20.7321 22.8298H17.3544H16.7487H15.0715C15.1414 23.4587 15.2811 24.0877 15.5141 24.6934H17.3544H17.96Z"
            fill="white"
          />
          <path
            d="M16.7021 14.8157H17.3544V12.9521H16.7021H15.0249V14.8157H16.7021Z"
            fill="url(#paint0_linear_1070_7372)"
          />
          <path
            d="M17.3544 21.3852V19.5449H16.7021H15.0249V21.3852H16.7021H17.3544Z"
            fill="url(#paint1_linear_1070_7372)"
          />
          <path
            d="M17.9601 24.6927C17.6572 24.1103 17.4476 23.4581 17.3544 22.8291H16.7487H15.0715C15.1414 23.4581 15.2812 24.087 15.5141 24.6927H17.3544H17.9601Z"
            fill="url(#paint2_linear_1070_7372)"
          />
          <path
            d="M17.3544 18.1009V16.2373H16.7021H15.0249V18.1009H16.7021H17.3544Z"
            fill="url(#paint3_linear_1070_7372)"
          />
          <path
            d="M18.7286 26.1133H18.5423H16.2594C16.7253 26.7888 17.4008 27.511 18.3792 27.9535C18.3792 27.9535 18.5423 27.9768 18.7519 27.9768H20.7087C21.2211 27.9768 21.7336 27.9303 22.1995 27.8371L20.3126 27.1149C20.1496 27.0218 18.8684 26.2298 18.7286 26.1133Z"
            fill="url(#paint4_linear_1070_7372)"
          />
          <path
            d="M12.6954 25.6936C12.0898 24.6221 11.7404 23.3409 11.7404 22.1762V7.52392C11.7404 5.19447 9.8535 3.30762 7.52404 3.30762C5.19459 3.30762 3.30774 5.19447 3.30774 7.52392V22.1762C3.30774 25.1812 5.5906 27.6504 8.50241 27.9532C7.31439 27.4174 6.56897 26.4624 6.12637 25.6936C5.52072 24.6221 5.1713 23.3409 5.1713 22.1762V7.52392C5.1713 6.21943 6.21955 5.17118 7.52404 5.17118C8.82854 5.17118 9.87679 6.21943 9.87679 7.52392V22.1762C9.87679 25.1812 12.1597 27.6504 15.0715 27.9532C13.8834 27.4174 13.138 26.4624 12.6954 25.6936Z"
            fill="white"
          />
          <path
            d="M7.52419 6.5918C7.01171 6.5918 6.59241 7.0111 6.59241 7.52358V22.1758C6.59241 25.1808 8.87527 27.65 11.7871 27.9529C10.5991 27.4171 9.85364 26.462 9.41104 25.6933C8.80539 24.6217 8.45597 23.3405 8.45597 22.1758V7.52358C8.45597 7.0111 8.03667 6.5918 7.52419 6.5918Z"
            fill="white"
          />
          <path
            d="M18.3794 27.9534C17.401 27.5108 16.7255 26.7887 16.2596 26.1131C16.1664 25.9734 16.0732 25.8103 15.98 25.6705C15.7937 25.3444 15.6539 25.0183 15.5141 24.6689C15.2812 24.0632 15.1181 23.4343 15.0715 22.8053C15.0483 22.5957 15.025 22.3627 15.025 22.1531V21.3844V19.5208V18.0998V16.2363V14.8153V12.9517V7.52413C15.025 3.3777 11.6473 0 7.52413 0C3.3777 0 0 3.3777 0 7.52413V22.1764C0 25.1581 2.28286 27.6273 5.19468 27.9534C4.00666 27.4176 3.26123 26.4626 2.81864 25.6938C2.21298 24.6223 1.86356 23.3411 1.86356 22.1764V7.52413C1.86356 4.40266 4.40266 1.86356 7.52413 1.86356C10.6456 1.86356 13.1847 4.40266 13.1847 7.52413V22.2696C13.2313 24.9018 15.0483 27.1148 17.4942 27.7904H17.5408C17.797 27.8602 18.0765 27.9068 18.3794 27.9534Z"
            fill="white"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1070_7372"
              x1="14.4963"
              y1="13.8805"
              x2="25.6687"
              y2="13.8805"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#002442" />
              <stop
                offset="0.0163359"
                stopColor="#143551"
                stopOpacity="0.9533"
              />
              <stop
                offset="0.0697697"
                stopColor="#526A7E"
                stopOpacity="0.8007"
              />
              <stop offset="0.1228" stopColor="#8798A6" stopOpacity="0.6491" />
              <stop offset="0.1742" stopColor="#B2BDC6" stopOpacity="0.5023" />
              <stop offset="0.2236" stopColor="#D3DADF" stopOpacity="0.3612" />
              <stop offset="0.2704" stopColor="#EBEEF1" stopOpacity="0.2273" />
              <stop offset="0.3137" stopColor="#FAFBFB" stopOpacity="0.1037" />
              <stop offset="0.35" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_1070_7372"
              x1="14.5121"
              y1="20.4652"
              x2="25.6239"
              y2="20.4652"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#002442" />
              <stop
                offset="0.0163359"
                stopColor="#143551"
                stopOpacity="0.9533"
              />
              <stop
                offset="0.0697697"
                stopColor="#526A7E"
                stopOpacity="0.8007"
              />
              <stop offset="0.1228" stopColor="#8798A6" stopOpacity="0.6491" />
              <stop offset="0.1742" stopColor="#B2BDC6" stopOpacity="0.5023" />
              <stop offset="0.2236" stopColor="#D3DADF" stopOpacity="0.3612" />
              <stop offset="0.2704" stopColor="#EBEEF1" stopOpacity="0.2273" />
              <stop offset="0.3137" stopColor="#FAFBFB" stopOpacity="0.1037" />
              <stop offset="0.35" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_1070_7372"
              x1="14.3213"
              y1="24.3433"
              x2="24.2886"
              y2="21.6726"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.0795072" stopColor="#002442" />
              <stop
                offset="0.0921322"
                stopColor="#143551"
                stopOpacity="0.9533"
              />
              <stop offset="0.1334" stopColor="#526A7E" stopOpacity="0.8007" />
              <stop offset="0.1744" stopColor="#8798A6" stopOpacity="0.6491" />
              <stop offset="0.2141" stopColor="#B2BDC6" stopOpacity="0.5023" />
              <stop offset="0.2523" stopColor="#D3DADF" stopOpacity="0.3612" />
              <stop offset="0.2885" stopColor="#EBEEF1" stopOpacity="0.2273" />
              <stop offset="0.3219" stopColor="#FAFBFB" stopOpacity="0.1037" />
              <stop offset="0.35" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_1070_7372"
              x1="14.366"
              y1="17.1733"
              x2="26.049"
              y2="17.1733"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#002442" />
              <stop
                offset="0.0163359"
                stopColor="#143551"
                stopOpacity="0.9533"
              />
              <stop
                offset="0.0697697"
                stopColor="#526A7E"
                stopOpacity="0.8007"
              />
              <stop offset="0.1228" stopColor="#8798A6" stopOpacity="0.6491" />
              <stop offset="0.1742" stopColor="#B2BDC6" stopOpacity="0.5023" />
              <stop offset="0.2236" stopColor="#D3DADF" stopOpacity="0.3612" />
              <stop offset="0.2704" stopColor="#EBEEF1" stopOpacity="0.2273" />
              <stop offset="0.3137" stopColor="#FAFBFB" stopOpacity="0.1037" />
              <stop offset="0.35" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint4_linear_1070_7372"
              x1="16.8834"
              y1="28.9492"
              x2="20.9768"
              y2="25.5144"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.1922" stopColor="#002442" />
              <stop offset="0.4368" stopColor="#8092A1" stopOpacity="0.5235" />
              <stop offset="0.6223" stopColor="#DBE0E5" stopOpacity="0.1621" />
              <stop offset="0.7054" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      }
    >
      <div className={`${left ? 'text-left' : 't:text-right'}`}>
        <div className="pb-[10px] font-['Mont-semibold'] text-lg text-purple md:text-xl">
          {title}
        </div>
        <div className="text-sm md:text-lg">
          <div className="pb-[17px] font-['Mont-book'] text-darkGrey">
            {desc}
          </div>
        </div>
        {buttonCTA && (
          <Button color="primary" cta={buttonCTA} link={buttonLink} />
        )}
      </div>
    </VerticalTimelineElement>
  );
}
export default VerticalElement;
