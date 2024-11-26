import React, { useState } from 'react';
import { useRouter } from 'next/router';

const EstimateCalc = () => {
  // const estimateList = localStorage.getItem('ESTIMATE_LIST');
  // if (estimateList !== null) {
  //     const parsedObject = JSON.parse(estimateList);
  //     let total = 0;
  //     const estimatesHtml = parsedObject?.map((estimate: any) => {
  //         const currency = estimate['subscription_estimate'].currency_code;
  //         let amount = 0;
  //         const itms = estimate['unbilled_charge_estimates'].map((charge: any) => {
  //             if (charge.amount > 0) {
  //                 amount += charge.amount;
  //                 total += charge.amount;
  //                 return (
  //                     <ul key={charge.id}>
  //                         {charge.description}: {charge.amount_in_decimal}{' '}
  //                         {charge.currency_code}
  //                     </ul>
  //                 );
  //             }
  //         });
  //         return (
  //             <>
  //                 <p>
  //                     estimate: {amount / 100} {currency}
  //                 </p>
  //                 <li>{itms}</li>
  //             </>
  //         );
  //     });
  // } else {
  //     <p>Error:No estimates provided!</p>;
  // }
  // return <>Estimated Here</>;
};

export default EstimateCalc;
