// import React, { useState } from 'react';
// import { useFormik } from 'formik';
// import * as yup from 'yup';
// import ReCAPTCHA from 'react-google-recaptcha';

// export interface ValuesTechnical {
//   summary: string;
//   service: string;
//   serverName: string;
//   details: string;
// }
// export interface ValuesSales {
//   email: string;
//   summary: string;
//   service: string;
//   details: string;
// }
// export interface ValuesBilling {
//   summary: string;
//   invoice: string;
//   details: string;
// }
// export interface ValuesAbuse {
//   email: string;
//   incident: string;
//   details: string;
// }

// const formTabs = [
//   'Technical Problem or Question',
//   'Sales & New Customer Enquiries',
//   'Billing, Payments & Subscriptions',
//   'Report Abuse',
// ];

// function ContactUsFormBlock(): JSX.Element {
//   // const [captchaValue, setCaptchaValue] = useState<string | null>(null);

//   const [activeTab, setActiveTab] = useState<number>(0);
//   const [captchaValue, setCaptchaValue] = useState<string | null>('chiribu');
//   const [isSubmittedTechnical, setIsSubmittedTechnical] =
//     useState<boolean>(false);
//   const [isSubmittedSales, setIsSubmittedSales] = useState<boolean>(false);
//   const [isSubmittedBilling, setIsSubmittedBilling] = useState<boolean>(false);
//   const [isSubmittedAbuse, setIsSubmittedAbuse] = useState<boolean>(false);

//   const validationSchemaTechnical = yup.object().shape({
//     summary: yup.string().required('Summary is required'),
//     service: yup.string().required('Service is required'),
//     serverName: yup.string().required('Server name is required'),
//     details: yup.string(),
//   });

//   const validationSchemaSales = yup.object().shape({
//     email: yup
//       .string()
//       .email('Email must be a valid email')
//       .required('Email is required'),
//     summary: yup.string().required('Summary is required'),
//     service: yup.string().required('Service is required'),
//     details: yup.string(),
//   });

//   const validationSchemaBilling = yup.object().shape({
//     summary: yup.string().required('Summary is required'),
//     invoice: yup.string().required('Invoice / order no. is required'),
//     details: yup.string(),
//   });

//   const validationSchemaAbuse = yup.object().shape({
//     email: yup
//       .string()
//       .email('Email must be a valid email')
//       .required('Email is required'),
//     incident: yup.string().required('Incident type is required'),
//     details: yup.string(),
//   });

//   const formikTechnical = useFormik({
//     initialValues: {
//       summary: '',
//       service: '',
//       serverName: '',
//       details: '',
//     },
//     validationSchema: validationSchemaTechnical,
//     onSubmit: async (values: ValuesTechnical) => {
//       await handleSubmitTechnical(values);
//     },
//     validateOnBlur: false,
//     validateOnChange: false,
//   });
//   const formikSales = useFormik({
//     initialValues: {
//       email: '',
//       summary: '',
//       service: '',
//       details: '',
//     },
//     validationSchema: validationSchemaSales,
//     onSubmit: async (values: ValuesSales) => {
//       await handleSubmitSales(values);
//     },
//     validateOnBlur: false,
//     validateOnChange: false,
//   });
//   const formikBilling = useFormik({
//     initialValues: {
//       summary: '',
//       invoice: '',
//       details: '',
//     },
//     validationSchema: validationSchemaBilling,
//     onSubmit: async (values: ValuesBilling) => {
//       await handleSubmitBilling(values);
//     },
//     validateOnBlur: false,
//     validateOnChange: false,
//   });
//   const formikAbuse = useFormik({
//     initialValues: {
//       email: '',
//       incident: '',
//       details: '',
//     },
//     validationSchema: validationSchemaAbuse,
//     onSubmit: async (values: ValuesAbuse) => {
//       await handleSubmitAbuse(values);
//     },
//     validateOnBlur: false,
//     validateOnChange: false,
//   });

//   const handleCaptcha = (value: string | null) => {
//     setCaptchaValue(value);
//   };

//   const handleSubmitTechnical = async (values: ValuesTechnical) => {
//     const data = { ...values };

//     await validationSchemaTechnical
//       .validate(data)
//       .then(() => {
//         if (captchaValue) {
//           fetch('/api/contactTechnical', {
//             method: 'POST',
//             headers: {
//               Accept: 'application/json, text/plain, */*',
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(data),
//           })
//             .then((res) => {
//               if (res.status === 200) {
//                 console.log('Response succeeded!');
//                 setIsSubmittedTechnical(true);
//               }
//             })
//             .catch((err) => console.log(err));
//         }
//       })
//       .catch((err) => console.log(err));
//   };

//   const handleSubmitSales = async (values: ValuesSales) => {
//     const data = { ...values };

//     await validationSchemaSales
//       .validate(data)
//       .then(() => {
//         if (captchaValue) {
//           fetch('/api/contactSales', {
//             method: 'POST',
//             headers: {
//               Accept: 'application/json, text/plain, */*',
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(data),
//           })
//             .then((res) => {
//               if (res.status === 200) {
//                 console.log('Response succeeded!');
//                 setIsSubmittedSales(true);
//               }
//             })
//             .catch((err) => console.log(err));
//         }
//       })
//       .catch((err) => console.log(err));
//   };

//   const handleSubmitBilling = async (values: ValuesBilling) => {
//     const data = { ...values };

//     await validationSchemaBilling
//       .validate(data)
//       .then(() => {
//         if (captchaValue) {
//           fetch('/api/contactBilling', {
//             method: 'POST',
//             headers: {
//               Accept: 'application/json, text/plain, */*',
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(data),
//           })
//             .then((res) => {
//               if (res.status === 200) {
//                 console.log('Response succeeded!');
//                 setIsSubmittedBilling(true);
//               }
//             })
//             .catch((err) => console.log(err));
//         }
//       })
//       .catch((err) => console.log(err));
//   };

//   const handleSubmitAbuse = async (values: ValuesAbuse) => {
//     const data = { ...values };

//     await validationSchemaAbuse
//       .validate(data)
//       .then(() => {
//         if (captchaValue) {
//           fetch('/api/contactAbuse', {
//             method: 'POST',
//             headers: {
//               Accept: 'application/json, text/plain, */*',
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(data),
//           })
//             .then((res) => {
//               if (res.status === 200) {
//                 console.log('Response succeeded!');
//                 setIsSubmittedAbuse(true);
//               }
//             })
//             .catch((err) => console.log(err));
//         }
//       })
//       .catch((err) => console.log(err));
//   };

//   return (
//     <>
//       <div className="mx-auto items-center justify-center self-center md:container">
//         <div className="mx-auto grid grid-cols-2 justify-center text-center md:w-[75%] md:items-center lg:grid-cols-4 ">
//           {formTabs.map((item, idx) => (
//             <button
//               // eslint-disable-next-line @typescript-eslint/no-unused-vars
//               onClick={() => setActiveTab(idx)}
//               key={idx}
//               className={`${
//                 idx === activeTab
//                   ? 'order-last h-full bg-liliac/10 font-["Mont-semibold"] text-purple lg:order-none'
//                   : "bg-white font-['Mont-regular'] text-black"
//               } w-auto cursor-pointer rounded-t-xl py-5 px-2 text-base md:px-5 md:text-xl`}
//             >
//               {item}
//             </button>
//           ))}
//         </div>

//         <div className="flex w-[100%] flex-col items-center bg-liliac/10 md:m-auto md:w-[80%] md:rounded-2xl">
//           <div className="py-16 px-12 text-left text-lg font-['Mont-regular'] sm:w-[70%] sm:px-5 md:m-auto">
//             {activeTab === 0 && (
//               <form onSubmit={formikTechnical.handleSubmit}>
//                 <div className="flex flex-col gap-5 sm:grid sm:grid-cols-2 sm:gap-x-16 sm:gap-y-5">
//                   <div className="flex flex-col">
//                     <label className="pl-2">Summary</label>
//                     <input
//                       type="text"
//                       id="summary"
//                       name="summary"
//                       onChange={formikTechnical.handleChange}
//                       onBlur={formikTechnical.handleBlur}
//                       value={formikTechnical.values.summary}
//                       className={`rounded-md border border-darkGrey/20 px-4 py-2 text-base  focus:outline-none ${
//                         formikTechnical.errors.summary
//                           ? 'border-2 border-formDarkPink'
//                           : ''
//                       }`}
//                       placeholder="Summarize your query"
//                     />
//                     {formikTechnical.errors.summary ? (
//                       <p className="absolute mt-[72px] ml-4 text-xs text-formDarkPink">
//                         {formikTechnical.errors.summary}
//                       </p>
//                     ) : null}
//                   </div>
//                   <div className="flex flex-col">
//                     <label className="pl-2">Service</label>
//                     <input
//                       type="text"
//                       id="service"
//                       name="service"
//                       onChange={formikTechnical.handleChange}
//                       onBlur={formikTechnical.handleBlur}
//                       value={formikTechnical.values.service}
//                       className={`rounded-md border border-darkGrey/20 px-4 py-2 text-base focus:outline-none ${
//                         formikTechnical.errors.service
//                           ? 'border-2 border-formDarkPink'
//                           : ''
//                       }`}
//                       placeholder="Service oprions"
//                     />
//                     {formikTechnical.errors.service ? (
//                       <p className="absolute mt-[72px] ml-4 text-xs text-formDarkPink">
//                         {formikTechnical.errors.service}
//                       </p>
//                     ) : null}
//                   </div>
//                   <div className="flex flex-col">
//                     <label className="pl-2">Server name</label>
//                     <input
//                       type="text"
//                       id="serverName"
//                       name="serverName"
//                       onChange={formikTechnical.handleChange}
//                       onBlur={formikTechnical.handleBlur}
//                       value={formikTechnical.values.serverName}
//                       className={`rounded-md border border-darkGrey/20 px-4 py-2 text-base focus:outline-none ${
//                         formikTechnical.errors.serverName
//                           ? 'border-2 border-formDarkPink'
//                           : ''
//                       }`}
//                       placeholder="Server or domain name"
//                     />
//                     {formikTechnical.errors.serverName ? (
//                       <p className="absolute mt-[72px] ml-4 text-xs text-formDarkPink">
//                         {formikTechnical.errors.serverName}
//                       </p>
//                     ) : null}
//                   </div>

//                   <div className="col-span-2 flex  flex-col">
//                     <label className="pl-2">Details</label>
//                     <textarea
//                       name="details"
//                       id="details"
//                       rows={10}
//                       onChange={formikTechnical.handleChange}
//                       onBlur={formikTechnical.handleBlur}
//                       value={formikTechnical.values.details}
//                       className={`rounded-md border border-darkGrey/20 px-4 py-2 text-base focus:outline-none ${
//                         formikTechnical.errors.details
//                           ? 'border-2 border-formDarkPink'
//                           : ''
//                       }`}
//                       placeholder="Please provide as much information as possible."
//                     />
//                     {formikTechnical.errors.details ? (
//                       <p className="absolute mt-[72px] ml-4 text-xs text-formDarkPink">
//                         {formikTechnical.errors.details}
//                       </p>
//                     ) : null}
//                   </div>
//                   <ReCAPTCHA
//                     size="normal"
//                     sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''}
//                     onChange={handleCaptcha}
//                   />
//                   <div className="col-span-2 flex justify-center pt-10">
//                     <button
//                       type="submit"
//                       disabled={isSubmittedTechnical}
//                       className="justify-center rounded-full border-2 border-darkTeal bg-darkTeal px-[40px] py-[13px]  text-lg text-white transition duration-500   hover:border-2 hover:border-lightTeal hover:bg-lightTeal hover:text-white"
//                     >
//                       Submit
//                     </button>
//                   </div>
//                   {isSubmittedTechnical && (
//                     <div className="col-span-2 flex justify-center text-xs text-[#00FF00]">
//                       Message sent!
//                     </div>
//                   )}
//                 </div>
//               </form>
//             )}
//             {activeTab === 1 && (
//               <form onSubmit={formikSales.handleSubmit}>
//                 <div className="flex flex-col gap-5 sm:grid sm:grid-cols-2 sm:gap-x-16 sm:gap-y-5">
//                   <div className="flex flex-col">
//                     <label className="pl-2">Email</label>
//                     <input
//                       type="text"
//                       name="email"
//                       id="email"
//                       onChange={formikSales.handleChange}
//                       onBlur={formikSales.handleBlur}
//                       value={formikSales.values.email}
//                       className={`rounded-md border border-darkGrey/20 px-4 py-2 text-base focus:outline-none ${
//                         formikSales.errors.email
//                           ? 'border-2 border-formDarkPink'
//                           : ''
//                       }`}
//                       placeholder="Your email addres"
//                     />
//                     {formikSales.errors.email ? (
//                       <p className="absolute mt-[72px] ml-4 text-xs text-formDarkPink">
//                         {formikSales.errors.email}
//                       </p>
//                     ) : null}
//                   </div>
//                   <div className="flex flex-col">
//                     <label className="pl-2">Summary</label>
//                     <input
//                       type="text"
//                       id="summary"
//                       name="summary"
//                       onChange={formikSales.handleChange}
//                       onBlur={formikSales.handleBlur}
//                       value={formikSales.values.summary}
//                       className={`rounded-md border border-darkGrey/20 px-4 py-2 text-base  focus:outline-none ${
//                         formikSales.errors.summary
//                           ? 'border-2 border-formDarkPink'
//                           : ''
//                       }`}
//                       placeholder="Summarize your query"
//                     />
//                     {formikSales.errors.summary ? (
//                       <p className="absolute mt-[72px] ml-4 text-xs text-formDarkPink">
//                         {formikSales.errors.summary}
//                       </p>
//                     ) : null}
//                   </div>
//                   <div className="flex flex-col">
//                     <label className="pl-2">Service</label>
//                     <input
//                       type="text"
//                       id="service"
//                       name="service"
//                       onChange={formikSales.handleChange}
//                       onBlur={formikSales.handleBlur}
//                       value={formikSales.values.service}
//                       className={`${
//                         formikSales.errors.service
//                           ? 'border-2 border-formDarkPink'
//                           : ''
//                       } rounded-md border border-darkGrey/20 px-4 py-2 text-base focus:outline-none`}
//                       placeholder="Service oprions"
//                     />
//                     {formikSales.errors.service ? (
//                       <p className="absolute mt-[72px] ml-4 text-xs text-formDarkPink">
//                         {formikSales.errors.service}
//                       </p>
//                     ) : null}
//                   </div>

//                   <div className="col-span-2 flex  flex-col">
//                     <label className="pl-2">Details</label>
//                     <textarea
//                       name="details"
//                       id="details"
//                       rows={10}
//                       onChange={formikSales.handleChange}
//                       onBlur={formikSales.handleBlur}
//                       value={formikSales.values.details}
//                       className={`rounded-md border border-darkGrey/20 px-4 py-2 text-base focus:outline-none ${
//                         formikSales.errors.details
//                           ? 'border-2 border-formDarkPink'
//                           : ''
//                       }`}
//                       placeholder="Please provide as much information as possible."
//                     />
//                     {formikSales.errors.details ? (
//                       <p className="absolute mt-[72px] ml-4 text-xs text-formDarkPink">
//                         {formikSales.errors.details}
//                       </p>
//                     ) : null}
//                   </div>
//                   <ReCAPTCHA
//                     size="normal"
//                     sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''}
//                     onChange={handleCaptcha}
//                   />
//                   <div className="col-span-2 flex justify-center pt-10">
//                     <button
//                       type="submit"
//                       disabled={isSubmittedSales}
//                       className="justify-center rounded-full border-2 border-darkTeal bg-darkTeal px-[40px] py-[13px]  text-lg text-white transition duration-500   hover:border-2 hover:border-lightTeal hover:bg-lightTeal hover:text-white"
//                     >
//                       Submit
//                     </button>
//                   </div>
//                   {isSubmittedSales && (
//                     <div className="col-span-2 flex justify-center text-xs text-[#00FF00]">
//                       Message sent!
//                     </div>
//                   )}
//                 </div>
//               </form>
//             )}
//             {activeTab === 2 && (
//               <form onSubmit={formikBilling.handleSubmit}>
//                 <div className="flex flex-col gap-5 sm:grid sm:grid-cols-2 sm:gap-x-16 sm:gap-y-5">
//                   <div className="flex flex-col justify-between">
//                     <label className="pl-2">Summary</label>
//                     <input
//                       type="text"
//                       id="summary"
//                       name="summary"
//                       onChange={formikBilling.handleChange}
//                       onBlur={formikBilling.handleBlur}
//                       value={formikBilling.values.summary}
//                       className={`rounded-md border border-darkGrey/20 px-4 py-2 text-base  focus:outline-none ${
//                         formikBilling.errors.summary
//                           ? 'border-2 border-formDarkPink'
//                           : ''
//                       }`}
//                       placeholder="Summarize your query"
//                     />
//                     {formikBilling.errors.summary ? (
//                       <p className="absolute mt-[72px] ml-4 text-xs text-formDarkPink">
//                         {formikBilling.errors.summary}
//                       </p>
//                     ) : null}
//                   </div>
//                   <div className="flex flex-col">
//                     <label className="pl-2">Invoice / order number</label>
//                     <input
//                       type="text"
//                       id="invoice"
//                       name="invoice"
//                       onChange={formikBilling.handleChange}
//                       onBlur={formikBilling.handleBlur}
//                       value={formikBilling.values.invoice}
//                       className={`rounded-md border border-darkGrey/20 px-4 py-2 text-base focus:outline-none ${
//                         formikBilling.errors.invoice
//                           ? 'border-2 border-formDarkPink'
//                           : ''
//                       } `}
//                       placeholder="Invoice / order number"
//                     />
//                     {formikBilling.errors.invoice ? (
//                       <p className="absolute mt-[72px] ml-4 text-xs text-formDarkPink">
//                         {formikBilling.errors.invoice}
//                       </p>
//                     ) : null}
//                   </div>

//                   <div className="col-span-2 flex  flex-col">
//                     <label className="pl-2">Details</label>
//                     <textarea
//                       name="details"
//                       id="details"
//                       rows={10}
//                       onChange={formikBilling.handleChange}
//                       onBlur={formikBilling.handleBlur}
//                       value={formikBilling.values.details}
//                       className={`rounded-md border border-darkGrey/20 px-4 py-2 text-base focus:outline-none  ${
//                         formikBilling.errors.details
//                           ? 'border-2 border-formDarkPink'
//                           : ''
//                       }`}
//                       placeholder="Please provide as much information as possible."
//                     />
//                     {formikBilling.errors.details ? (
//                       <p className="absolute mt-[72px] ml-4 text-xs text-formDarkPink">
//                         {formikBilling.errors.details}
//                       </p>
//                     ) : null}
//                   </div>
//                   <ReCAPTCHA
//                     size="normal"
//                     sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''}
//                     onChange={handleCaptcha}
//                   />
//                   <div className="col-span-2 flex justify-center pt-10">
//                     <button
//                       type="submit"
//                       disabled={isSubmittedBilling}
//                       className="justify-center rounded-full border-2 border-darkTeal bg-darkTeal px-[40px] py-[13px]  text-lg text-white transition duration-500   hover:border-2 hover:border-lightTeal hover:bg-lightTeal hover:text-white"
//                     >
//                       Submit
//                     </button>
//                   </div>
//                   {isSubmittedBilling && (
//                     <div className="col-span-2 flex justify-center text-xs text-[#00FF00]">
//                       Message sent!
//                     </div>
//                   )}
//                 </div>
//               </form>
//             )}
//             {activeTab === 3 && (
//               <form onSubmit={formikAbuse.handleSubmit}>
//                 <div className="flex flex-col gap-5 sm:grid sm:grid-cols-2 sm:gap-x-16 sm:gap-y-5">
//                   <div className="flex flex-col justify-between">
//                     <label className="pl-2">Email</label>
//                     <input
//                       type="text"
//                       name="email"
//                       id="email"
//                       onChange={formikAbuse.handleChange}
//                       onBlur={formikAbuse.handleBlur}
//                       value={formikAbuse.values.email}
//                       className={`rounded-md border border-darkGrey/20 px-4 py-2 text-base focus:outline-none ${
//                         formikAbuse.errors.email ? 'border-formDarkPink' : ''
//                       } `}
//                       placeholder="Your email addres"
//                     />
//                     {formikAbuse.errors.email ? (
//                       <p className="absolute mt-[72px] ml-4 text-xs text-formDarkPink">
//                         {formikAbuse.errors.email}
//                       </p>
//                     ) : null}
//                   </div>

//                   <div className="flex flex-col">
//                     <label className="pl-2">Abuse incident type</label>
//                     <input
//                       type="text"
//                       id="incident"
//                       name="incident"
//                       onChange={formikAbuse.handleChange}
//                       onBlur={formikAbuse.handleBlur}
//                       value={formikAbuse.values.incident}
//                       className={`rounded-md border border-darkGrey/20 px-4 py-2 text-base focus:outline-none ${
//                         formikAbuse.errors.incident ? 'border-formDarkPink' : ''
//                       }`}
//                       placeholder="Server or domain name"
//                     />
//                     {formikAbuse.errors.incident ? (
//                       <p className="absolute mt-[72px] ml-4 text-xs text-formDarkPink">
//                         {formikAbuse.errors.incident}
//                       </p>
//                     ) : null}
//                   </div>

//                   <div className="col-span-2 flex  flex-col">
//                     <label className="pl-2">Details</label>
//                     <textarea
//                       name="details"
//                       id="details"
//                       rows={10}
//                       onChange={formikAbuse.handleChange}
//                       onBlur={formikAbuse.handleBlur}
//                       value={formikAbuse.values.details}
//                       className={`rounded-md border border-darkGrey/20 px-4 py-2 text-base focus:outline-none ${
//                         formikAbuse.errors.details ? 'border-formDarkPink' : ''
//                       }`}
//                       placeholder="Please provide as much information as possible."
//                     />
//                     {formikAbuse.errors.details ? (
//                       <p className="absolute mt-[72px] ml-4 text-xs text-formDarkPink">
//                         {formikAbuse.errors.details}
//                       </p>
//                     ) : null}
//                   </div>
//                   <ReCAPTCHA
//                     size="normal"
//                     sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''}
//                     onChange={handleCaptcha}
//                   />

//                   <div className="col-span-2 flex justify-center pt-10">
//                     <button
//                       type="submit"
//                       disabled={isSubmittedAbuse}
//                       className="justify-center rounded-full border-2 border-darkTeal bg-darkTeal px-[40px] py-[13px]  text-lg text-white transition duration-500   hover:border-2 hover:border-lightTeal hover:bg-lightTeal hover:text-white"
//                     >
//                       Submit
//                     </button>
//                   </div>
//                   {isSubmittedAbuse && (
//                     <div className="col-span-2 flex justify-center text-xs text-[#00FF00]">
//                       Message sent!
//                     </div>
//                   )}
//                 </div>
//               </form>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ContactUsFormBlock;
