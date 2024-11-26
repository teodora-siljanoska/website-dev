// import React, { Dispatch, SetStateAction, useState } from 'react';
// import Image from 'next/image';
// import deskImage from './assets/location.png';
// // import dataJson from 'public/data.json';
// import { DropdownOption } from '@utils/transformProduct';
// import { DropdownVPSConfigOption } from '@pages/vps';

// export interface P {
//   title: string;
//   desktopImage?: image;
//   aligment: 'left' | 'center' | 'right';
//   data: DropdownOption[];
//   setConfigState: Dispatch<SetStateAction<DropdownVPSConfigOption>>;
//   activePeriod: 'monthly' | 'yearly' | 'every3years';
// }

// interface image {
//   width: number;
//   height: number;
//   src: string;
// }

// function ComplexVpsCard({
//   title,
//   desktopImage,
//   aligment,
//   data,
//   setConfigState,
//   activePeriod,
// }: P): JSX.Element {
//   const [showDropdown, setDropdown] = useState<boolean>(false);
//   const [activeDropdownItem, setActiveDropdownItem] = useState<string>(
//     data[0].label
//   );

//   return (
//     <>
//       <div className=" my-10 flex max-h-[273px] w-full max-w-[294px] flex-col items-center rounded-lg border  border-white bg-white shadow-custom">
//         <div className="mt-10">
//           {desktopImage && (
//             <Image
//               alt="image"
//               src={desktopImage.src || deskImage.src}
//               height={desktopImage.height}
//               width={desktopImage.width}
//             />
//           )}
//         </div>
//         <h3
//           className={`w-full ${
//             aligment === 'right'
//               ? 'text-right'
//               : aligment === 'left'
//               ? 'text-left'
//               : 'text-center'
//           } mt-8 mb-6 text-[18px] font-['Mont-semibold'] text-darkGrey sm:text-[26px]`}
//         >
//           {title}
//         </h3>

//         <button
//           className=" inline-flex items-center rounded-lg px-4 text-center  text-base font-['Mont-semibold'] text-darkGrey  "
//           type="button"
//           onClick={() => setDropdown(!showDropdown)}
//         >
//           {activeDropdownItem}
//           <svg
//             className="pl-2"
//             width="30"
//             height="8"
//             viewBox="0 0 12 7"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M0 0.657227L5.7561 0.75647L11.3137 0.657227L5.65685 6.31408L0 0.657227Z"
//               fill="#552B71"
//             />
//           </svg>
//         </button>

//         <div
//           className=" shadow
//          z-10 h-full w-full divide-y rounded  bg-white text-base"
//         >
//           {showDropdown && (
//             <ul className=" shadow  mt-8">
//               {data.map((dataItem, index: number) => (
//                 <li
//                   onClick={() => {
//                     setActiveDropdownItem(dataItem.label);
//                     setConfigState({
//                       price: dataItem.priceDifferenceFromBase,
//                       sku: dataItem.sku,
//                       value: dataItem.label,
//                     });
//                     setDropdown(false);
//                   }}
//                   className="  block w-full  cursor-pointer bg-white  text-base font-['Mont-semibold'] text-darkGrey hover:text-purple"
//                   key={index}
//                 >
//                   <div className="flex flex-col border-b border-lightGrey  px-10 py-4">
//                     <div className="  flex flex-row justify-between ">
//                       {dataItem.label}
//                       <div className=" shrink-0 text-xs font-['Mont-semibold'] text-lightTeal">
//                         +£{dataItem.priceDifferenceFromBase[activePeriod]}
//                       </div>
//                     </div>

//                     {dataItem.descriptions?.map(
//                       (description, index: number) => (
//                         <div
//                           key={index}
//                           className="flex flex-col text-[10px] text-darkGrey"
//                         >
//                           {description}
//                         </div>
//                       )
//                     )}
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default ComplexVpsCard;
