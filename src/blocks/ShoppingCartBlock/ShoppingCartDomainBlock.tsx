import React, { useState } from 'react';
import arrow from './assets/arrow.svg';
import bin from './assets/bin.svg';
import Image from 'next/legacy/image';
import * as yup from 'yup';
import Button from '@components/Button';
import { Field, Form, Formik, useFormik } from 'formik';

export interface P {
  title: string;
}

interface Country {
  name: string;
  dial_code: string;
  code: string;
  flag: string;
}
// const CountryList: Country[] = require('country-list-with-dial-code-and-flag');

interface Values {
  address: string;
  city: string;
  country: string;
  postCode: string;
  secondAddress: string;
}

function ShoppingCartDomainBlock({ title }: P): JSX.Element {
  const [showDropdown, setDropdown] = useState<boolean>(false);
  // const [showDropdownCountry, setDropdownCountry] = useState<boolean>(false);
  // const [activeDropdownCountry, setActiveDropdownCountry] = useState<string>();

  //console.log(title);

  const validationSchema = yup.object().shape({
    address: yup.string().required('Address is required'),
    secondAddress: yup.string().required('Address is required'),
    city: yup.string().required('City is required'),
    country: yup.string().required('Country is required'),
    postCode: yup.string().required('Post code is required'),
    phone: yup.string().required('Phone is required'),
  });

  const initialValues: Values = {
    address: '',
    secondAddress: '',
    city: '',
    country: '',
    postCode: '',
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values: Values) => {
      const res = values;
      //console.log(res);
    },
  });

  return (
    <div className="container mx-auto">
      <div className=" flex justify-center py-6">
        <div className="flex">
          <div className="w-1/4">
            <div className="relative mb-2">
              <div className="mx-auto flex h-10 w-10 items-center rounded-full bg-white text-lg text-white">
                <span className="w-full text-center text-white">
                  <svg
                    width="12"
                    height="30"
                    viewBox="0 0 12 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.92209 0.074999V5.745H5.55709V30H11.9021V0.074999H0.92209Z"
                      fill="#009D98"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div className="text-center text-xs md:text-base">Choose items</div>
          </div>

          <div className="w-48">
            <div className="relative mb-2">
              <div className=" steps  absolute flex content-center items-center align-middle">
                <div className=" w-40 flex-1 items-center rounded bg-[#009D98] align-middle">
                  <div className="w-full  rounded bg-[#009D98] py-1" />
                </div>
              </div>

              <div className="mx-auto flex h-10 w-10 items-center rounded-full bg-white text-lg text-white">
                <span className="w-full text-center text-white">
                  <svg
                    width="22"
                    height="31"
                    viewBox="0 0 22 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.4483 24.97C19.4683 16.915 21.0433 13.54 21.0433 9.895C21.0433 4.36 16.9033 0.489999 11.0083 0.489999C5.02334 0.489999 1.19834 4.45 1.19834 9.94V10.615H7.63334V10.03C7.63334 7.915 8.98334 6.475 11.1433 6.475C13.1683 6.475 14.5633 7.87 14.5633 9.94C14.5633 13.045 12.9433 15.385 0.61334 29.605V31H21.5833V24.97H12.4483Z"
                      fill="#009D98"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div className="text-center text-xs md:text-base">
              Sign in/Register
            </div>
          </div>

          <div className="w-48">
            <div className="relative mb-2">
              <div className="steps  absolute flex content-center items-center align-middle">
                <div className="w-full  flex-1 items-center rounded bg-[#009D98] align-middle">
                  <div className="w-[33%] rounded bg-[#009D98] py-1" />
                </div>
              </div>

              <div className=" mx-auto flex h-10 w-10 items-center rounded-full border-2 bg-white text-lg text-white">
                <span className="w-full text-center text-grey">
                  <svg
                    width="22"
                    height="31"
                    viewBox="0 0 22 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.5874 11.145L20.7524 1.29V0.074999H1.67242V5.835H11.9324L6.48742 14.835V16.05H10.8524C13.5974 16.05 15.3974 17.67 15.3974 20.19C15.3974 22.755 13.6874 24.555 11.3024 24.555C9.00742 24.555 7.47742 22.98 7.38742 20.595H0.952422C1.13242 26.49 5.36242 30.54 11.3024 30.54C17.3774 30.54 21.8774 26.265 21.8774 20.415C21.8774 15.735 18.9974 12.18 14.5874 11.145Z"
                      fill="#009D98"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div className="text-center text-xs md:text-base">
              Checkout & Payment
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20 text-[26px] font-['Mont-bold'] text-liliac">
        Review & Checkout
      </div>
      <div className="flex flex-col items-end">
        <div>
          <div>Country</div>
          <div>
            <button
              className="inline-flex items-center rounded-md bg-white px-4 py-2.5 text-center text-sm font-medium text-black ring-1 ring-lightGrey hover:bg-purple/10 focus:outline-none"
              type="button"
              onClick={() => setDropdown(!showDropdown)}
            >
              Dropdown button{' '}
              <span className="pl-2">
                <Image
                  src={arrow as string}
                  alt="down-arrow"
                  className={`${showDropdown ? 'rotate-180 ' : ' '}`}
                />
              </span>
            </button>
            {showDropdown && (
              <ul className="absolute py-1 text-sm text-grey/70 dark:text-grey/20">
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 hover:bg-grey/10 dark:hover:bg-grey/60 dark:hover:text-black"
                  >
                    Macedonia
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 hover:bg-grey/10 dark:hover:bg-grey/60 dark:hover:text-black"
                  >
                    Srbija
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 hover:bg-grey/10 dark:hover:bg-grey/60 dark:hover:text-black"
                  >
                    Bugarija
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="mt-20 mb-2 flex justify-end text-xl text-liliac">
        <button type="button">Empty cart</button>
      </div>
      <div className="mx-auto flex justify-center">
        <table>
          <thead className="border-b-[1px] border-lightGrey">
            <tr className="text-left text-base font-extralight md:text-xl">
              <th className="w-[150px]">#</th>
              <th className="w-[500px]">Product name</th>
              <th className="w-[300px]">Cycle</th>
              <th className="w-[300px]">Price</th>
              <th> </th>
            </tr>
          </thead>
          <tbody className="text-lg">
            <tr>
              <td>1</td>
              <td>Cloud VPS Extreme</td>
              <td>Monthly</td>
              <td>£ 35</td>
              <td>
                <button type="button">
                  <span className="pr-2">
                    <Image src={bin as string} alt="down-arrow" />
                  </span>
                </button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Cloud VPS Extreme</td>
              <td>Monthly</td>
              <td>£ 35</td>
              <td>
                <button type="button">
                  <span className="pr-2">
                    <Image
                      src={bin as string}
                      alt="down-arrow"
                      className={`${showDropdown ? 'rotate-180 ' : ' '}`}
                    />
                  </span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mx-auto mt-20 flex justify-end text-xl">
        <table className="border-t-[1px] border-lightGrey ">
          <tr>
            <th className="pr-5 text-right font-['Mont-bold']">Subtotal</th>
            <td>£ 542</td>
          </tr>
          <tr>
            <th className="pr-5 text-right font-['Mont-bold']">VAT</th>
            <td>UK 20%</td>
          </tr>
          <tr className="border-t-[1px] border-lightGrey">
            <th className="pr-5 text-right font-['Mont-bold']">Total</th>
            <td>£ 350</td>
          </tr>
        </table>
      </div>

      <div className="mx-auto my-20 flex justify-between gap-5">
        <Button color="secondary" cta="Back" link="#" />
        <Button color="tertiary" cta="Next" link="#" />
      </div>
    </div>
  );
}
export default ShoppingCartDomainBlock;
