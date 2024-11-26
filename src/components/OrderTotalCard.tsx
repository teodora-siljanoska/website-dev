// /* eslint-disable @typescript-eslint/no-unsafe-member-access */
// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
// import React, { Dispatch, SetStateAction, useState } from 'react';
// import Button, { P as ButtonProps } from './Button';
// import CheckListItem, { P as CheckListItemsProps } from './CheckListItem';
// import DescriptionOrder, { P as DescriptionItems } from './DescriptionOrder';
// import SVG from 'react-inlinesvg';
// import arrow from '../components/assets/arrowGreen.svg';
// import { TimePeriods } from '@pages/vps';

// interface P {
//   title: string;
//   secondTitle: string;
//   buttonProps: ButtonProps;
//   checklistItems: CheckListItemsProps[];
//   descriptionItems: DescriptionItems[];
//   question: string;
//   secondQuestion: string;
//   contact: string;
//   radioButtonTitle: string;
//   radioButtonPrice: string;
//   radioButtonDescription: string;
//   secondradioButtonTitle: string;
//   secondradioButtonPrice: string;
//   secondradioButtonDescription: string;
//   setConfigState: TimePeriods;

//   onCheckout?: () => any;
// }

// function OrderTotalCard({
//   buttonProps,
//   title,
//   secondTitle,
//   checklistItems,
//   descriptionItems,
//   question,
//   contact,
//   secondQuestion,
//   radioButtonTitle,
//   radioButtonPrice,
//   radioButtonDescription,
//   secondradioButtonTitle,
//   secondradioButtonPrice,
//   secondradioButtonDescription,
//   setConfigState,
//   onCheckout,
// }: P): JSX.Element {
//   const [billingPeriod, setBillingPeriod] = useState<
//     'monthly' | 'yearly' | 'Every 3 years'
//   >('monthly');

//   return (
//     <div className=" pl-10  ">
//       <div className="w-[314px]  rounded-t-2xl   bg-purple/10   md:w-[444px]">
//         <p className="  mb-4 mt-7 pt-10 text-center text-2xl font-['Mont-bold'] text-darkGrey">
//           {title}
//         </p>
//         <div className="mt-8 flex  flex-row justify-center  space-x-16">
//           <div className="items-center">
//             <input
//               id="default-radio-1"
//               readOnly
//               type="radio"
//               value="yearly"
//               name="default-radio"
//               checked={billingPeriod === 'yearly'}
//               className="h-4 w-4 cursor-pointer"
//               onClick={() => {
//                 setConfigState('yearly');
//                 setBillingPeriod('yearly');
//               }}
//             />
//             <label
//               htmlFor="default-radio-1"
//               className="ml-2 cursor-pointer text-base  font-['Mont-bold'] text-darkGrey"
//             >
//               {radioButtonTitle}
//             </label>
//             <div className="flex flex-col">
//               <div className=" ml-5 text-4xl font-extrabold text-lightTeal">
//                 {radioButtonPrice}
//               </div>
//               <div className="ml-6 text-2xl font-['Mont-semibold']">
//                 {radioButtonDescription}
//               </div>
//             </div>
//           </div>
//           <div className=" items-center">
//             <input
//               id="default-radio-2"
//               type="radio"
//               readOnly
//               value="monthly"
//               checked={billingPeriod === 'monthly'}
//               name="default-radio"
//               className="h-4 w-4 cursor-pointer  focus:ring-2"
//               onClick={() => {
//                 setConfigState('monthly');
//                 setBillingPeriod('monthly');
//               }}
//             />
//             <label
//               htmlFor="default-radio-2"
//               className="ml-2 cursor-pointer text-base font-['Mont-bold'] text-darkGrey"
//             >
//               {secondradioButtonTitle}
//             </label>

//             <div className="flex flex-col ">
//               <div className="ml-5 text-4xl  font-extrabold text-liliac">
//                 {secondradioButtonPrice}
//               </div>
//               <div className="ml-6 text-2xl font-['Mont-semibold']">
//                 {secondradioButtonDescription}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mt-5 mb-4 flex justify-center">
//           <span onClick={onCheckout}>
//             <Button
//               cta={buttonProps.cta}
//               clickHandler={() => {
//                 console.log('Creating order...');
//               }}
//               color={buttonProps.color}
//             />
//           </span>
//         </div>
//         <p className="mt-16 text-center text-2xl">{secondTitle}</p>
//         <div className="flex flex-row justify-between p-5">
//           <div className=" flex   flex-col space-y-4  ">
//             {descriptionItems.map((item: DescriptionItems, index: number) => (
//               <DescriptionOrder
//                 key={index}
//                 cta={item.cta}
//                 alignment={item.alignment}
//               />
//             ))}
//           </div>
//           <div className="flex flex-col content-end items-end space-y-4 text-base  font-['Mont-semibold']  ">
//             {checklistItems.map((item: CheckListItemsProps, index: number) => (
//               <CheckListItem
//                 key={index}
//                 cta={item.cta}
//                 checking={item.checking}
//                 size={item.size}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//       <div className="flex h-[72px] w-[444px] flex-row items-center  justify-between rounded-b-2xl bg-lightTeal/10 px-4 text-[12px] font-['Mont-bold']">
//         <div>
//           <div className=" text-darkGrey">{question}</div>
//           <div className=" text-darkGrey">{secondQuestion}</div>
//         </div>
//         <div className=" flex cursor-pointer flex-row gap-4 text-lightTeal ">
//           {contact}
//           <SVG src={arrow.src} className="" />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default OrderTotalCard;
