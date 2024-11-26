/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import showPwdImg from './assets/show-password.svg';
import hidePwdImg from './assets/hide-password.svg';
import cross from './assets/cross.svg';
import Image from 'next/legacy/image';
import { passwordStrength } from 'check-password-strength';
import Link from 'next/link';
import * as Sentry from "@sentry/nextjs";

interface P {
  closePopUp: () => void;
}
interface Country {
  name: string;
  dial_code: string;
  code: string;
  flag: string;
}
const CountryList: Country[] = require('country-list-with-dial-code-and-flag');

interface Values {
  firstName: string;
  lastName: string;
  username: string;
  company: string;
  email: string;
  address: string;
  city: string;
  country: string;
  postCode: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const tabs = ['Personal info', 'Company info', 'Account info'];

const RegisterwithSteps = ({ closePopUp }: P): JSX.Element => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [passStrength, setPassStrength] = useState<
    'Too weak' | 'Weak' | 'Medium' | 'Strong'
  >('Too weak');
  const [passwordNum, setPasswordNum] = useState<
    0 | 'w-1/4' | 'w-1/2' | 'w-3/4' | 'w-full'
  >(0);
  const [passwordColor, setPasswordColor] = useState<
    'bg-white' | 'bg-formDarkPink' | 'bg-pink' | 'bg-yellow' | 'bg-darkTeal'
  >('bg-white');
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [showDropdown, setDropdown] = useState<boolean>(false);
  const [showDropdownCountry, setDropdownCountry] = useState<boolean>(false);
  const [activeDropdownItem, setActiveDropdownItem] = useState<string>(
    `${CountryList[0].dial_code}`
  );
  const [activeDropdownCountry, setActiveDropdownCountry] = useState<string>(
    CountryList[0].name
  );
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState(true);

  const validationSchema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    username: yup.string().required('Username is required'),
    company: yup.string().required('Company name is required'),
    email: yup
      .string()
      .email('Email must be a valid email')
      .required('Email is required'),
    address: yup.string().required('Address is required'),
    city: yup.string().required('City is required'),
    country: yup.string().required('Country is required'),
    postCode: yup.string().required('Post code is required'),
    phone: yup.string().required('Phone is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(8)
      .max(16)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Must have at least one capital letter, number and symbol.'
      ),
    confirmPassword: yup
      .string()
      .required('Confirm Password is required')
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  });
  const initialValues: Values = {
    firstName: '',
    lastName: '',
    username: '',
    address: '',
    city: '',
    company: '',
    country: '',
    email: '',
    password: '',
    phone: '',
    postCode: '',
    confirmPassword: '',
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values: Values) => {
      const res = handleRegister(values);
      console.log(res);
    },
  });

  useEffect(() => {
    const pwdStrength = passwordStrength(formik.values.password).value;

    if (pwdStrength === 'Too weak') {
      setPasswordNum('w-1/4');
      setPasswordColor('bg-formDarkPink');
      setPassStrength(pwdStrength);
    } else if (pwdStrength === 'Weak') {
      setPasswordNum('w-1/2');
      setPasswordColor('bg-pink');
      setPassStrength(pwdStrength);
    } else if (pwdStrength === 'Medium') {
      setPasswordNum('w-3/4');
      setPasswordColor('bg-yellow');
      setPassStrength(pwdStrength);
    } else if (pwdStrength === 'Strong') {
      setPasswordNum('w-full');
      setPasswordColor('bg-darkTeal');
      setPassStrength(pwdStrength);
    }
  }, [formik.values.password]);

  const handleRegister = async (values: Values) => {
    const data = { ...values };

    await validationSchema
      .validate(data)
      .then(() => {
        void fetch('/api/register', {
          method: 'POST',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }).then((res) => {
          if (res.status === 200) {
            //console.log('Response succeeded!');
            setIsSubmitted(true);
          }
        });
        closePopUp();
      })
      .catch((err) => Sentry.captureException(err));
  };

  return (
    <>
      {isOpen && (
        <div className="container relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center  rounded-2xl bg-white p-4 shadow-custom registerPopup:min-w-[1250px] registerPopup:max-w-[1155px] ">
          <span onClick={closePopUp} className="absolute right-6 top-5">
            <button onClick={() => setIsOpen(false)}>
              <Image
                src={cross.src}
                alt="cross for closing the dialog"
                layout="fixed"
                width={25}
                height={25}
              />
            </button>
          </span>

          <div className="w-[600px] py-6   md:ml-[295px]">
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

                <div className="text-center text-xs md:text-base">
                  Choose items
                </div>
              </div>

              <div className="w-48">
                <div className="relative mb-2">
                  <div className=" steps align-center absolute flex content-center items-center align-middle">
                    <div className="align-center w-40 flex-1 items-center rounded bg-[#009D98] align-middle">
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
                  <div className="steps align-center absolute flex content-center items-center align-middle">
                    <div className="align-center w-full flex-1 items-center rounded bg-[#E1E1E1] align-middle">
                      <div className="w-[33%] rounded bg-[#E1E1E1] py-1" />
                    </div>
                  </div>

                  <div className=" mx-auto flex h-10 w-10 items-center rounded-full border-2 bg-white text-lg text-white">
                    <span className="text-gray-600 w-full text-center">
                      <svg
                        width="22"
                        height="31"
                        viewBox="0 0 22 31"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.5874 11.145L20.7524 1.29V0.074999H1.67242V5.835H11.9324L6.48742 14.835V16.05H10.8524C13.5974 16.05 15.3974 17.67 15.3974 20.19C15.3974 22.755 13.6874 24.555 11.3024 24.555C9.00742 24.555 7.47742 22.98 7.38742 20.595H0.952422C1.13242 26.49 5.36242 30.54 11.3024 30.54C17.3774 30.54 21.8774 26.265 21.8774 20.415C21.8774 15.735 18.9974 12.18 14.5874 11.145Z"
                          fill="#E1E1E1"
                        />
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="text-center text-xs md:text-base">Checkout</div>
              </div>

              <div className="w-48">
                <div className="relative mb-2">
                  <div className="steps align-center absolute flex content-center items-center align-middle">
                    <div className="align-center w-full flex-1 items-center rounded bg-[#E1E1E1] align-middle">
                      <div className="w-0 rounded bg-[#E1E1E1] py-1" />
                    </div>
                  </div>

                  <div className=" mx-auto flex h-10 w-10 items-center rounded-full border-2 bg-white text-lg text-white">
                    <span className="text-gray-600 w-full text-center">
                      <svg
                        width="24"
                        height="30"
                        viewBox="0 0 24 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M23.1906 18.66H20.6256V11.55H15.7656L14.7306 18.66H8.47559L16.3956 0.074999H10.0506L0.195586 23.115V24.285H14.5506V30H20.6256V24.285H23.1906V18.66Z"
                          fill="#E1E1E1"
                        />
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="text-center text-xs md:text-base">Payment</div>
              </div>
            </div>
          </div>

          <span className="mb-4 mt-6 flex w-full justify-center lg:mb-10">
            <h2 className="text-xl font-extralight lg:text-3xl">
              Create{' '}
              <strong className="font-['Mont-bold'] text-liliac">
                Account
              </strong>
            </h2>
          </span>
          <div className="mx-auto flex justify-center text-center md:items-center">
            {tabs.map((item, idx) => (
              <button
                onClick={() => setActiveTab(idx)}
                key={idx}
                className={`${idx === activeTab
                  ? "bg-liliac/10 font-['Mont-semibold'] text-purple"
                  : "bg-white font-['Mont-regular'] text-black"
                  } w-auto cursor-pointer rounded-t-xl py-5 px-2 text-base leading-5 md:px-5 md:text-xl`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex w-[100%] flex-col items-center rounded-b-2xl bg-liliac/10 md:m-auto md:w-[80%] md:rounded-2xl">
            <div className="max-h-[400px] w-[100%] overflow-auto py-0 px-5 text-left md:m-auto md:max-h-full md:px-12 lg:py-10 ">
              {activeTab === 0 && (
                <div className="py-2">
                  <form
                    onSubmit={formik.handleSubmit}
                    className="h-full flex-col rounded-2xl py-[30px] lg:h-[576px] lg:py-[50px]"
                  >
                    <div className="flex flex-col">
                      <div className="flex flex-col justify-between lg:flex-row  ">
                        <div className="relative mb-2 flex flex-col pb-5 lg:mb-0">
                          <label
                            className="pl-4  text-sm text-darkGrey md:text-lg lg:text-base"
                            htmlFor="firstName"
                          >
                            First name
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.firstName}
                            placeholder="Name"
                            className="mt-1 h-11 w-full rounded-lg border-2 border-lightGrey pl-2 text-sm text-darkGrey lg:h-12 lg:w-[332px]  lg:text-base registerPopup:w-[397px]"
                          />
                          {formik.errors.firstName ? (
                            <p className="absolute bottom-0 left-4 text-xs text-[#dc2626]">
                              {formik.errors.firstName}
                            </p>
                          ) : null}
                        </div>
                        <div className="relative mb-2 flex flex-col pb-5 lg:mb-0">
                          <label
                            className=" pl-4 text-sm text-darkGrey md:text-lg lg:text-base"
                            htmlFor="lastName"
                          >
                            Last name
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.lastName}
                            placeholder="Name"
                            className="mt-1 h-11 w-full rounded-lg border-2 border-lightGrey pl-2 text-sm text-darkGrey lg:h-12 lg:w-[332px]  lg:text-base registerPopup:w-[397px]"
                          />
                          {formik.errors.lastName ? (
                            <p className="absolute bottom-0 left-4 text-xs text-[#dc2626]">
                              {formik.errors.lastName}
                            </p>
                          ) : null}
                        </div>
                      </div>

                      <div className="flex flex-col justify-between lg:mt-5 lg:flex-row">
                        <div className="relative mb-2 flex flex-col pb-5 lg:mb-0">
                          <label
                            className="pl-4 text-sm text-darkGrey md:text-lg lg:text-base"
                            htmlFor="email"
                          >
                            E-mail
                          </label>
                          <input
                            type="text"
                            id="email"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            placeholder="Name"
                            className="mt-1 h-11 w-full rounded-lg border-2 border-lightGrey pl-2 text-sm text-darkGrey lg:h-12 lg:w-[332px]  lg:text-base registerPopup:w-[397px]"
                          />
                          {formik.errors.email ? (
                            <p className="absolute bottom-0 left-4 text-xs text-[#dc2626]">
                              {formik.errors.email}
                            </p>
                          ) : null}
                        </div>
                        <div className="relative mb-2 flex flex-col pb-5 lg:mb-0">
                          <label
                            className="pl-4 text-sm text-darkGrey md:text-lg lg:text-base"
                            htmlFor="phone"
                          >
                            Phone
                          </label>
                          <div className="flex flex-row items-end justify-between gap-1 sm:justify-start">
                            <button
                              className="text-smlg:text-base relative mt-1 inline-flex h-11 w-[95px] items-center  rounded-lg border-2 border-lightGrey bg-white px-4  text-center  font-['Mont-semibold'] text-darkGrey lg:h-12 "
                              type="button"
                              onClick={() => setDropdown(!showDropdown)}
                            >
                              {activeDropdownItem}
                              <svg
                                className="absolute right-2 pl-2"
                                width="30"
                                height="8"
                                viewBox="0 0 12 7"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M0 0.657227L5.7561 0.75647L11.3137 0.657227L5.65685 6.31408L0 0.657227Z"
                                  fill="#552B71"
                                />
                              </svg>
                            </button>
                            <div className="absolute mt-10 flex w-[95px]  flex-col rounded-lg bg-white">
                              {showDropdown && (
                                <ul className="scrollbar absolute z-50 max-h-[300px] overflow-y-scroll py-1">
                                  {CountryList.map((country, index: number) => (
                                    <li
                                      onClick={() => {
                                        setActiveDropdownItem(
                                          country.dial_code
                                        );
                                        setDropdown(false);
                                      }}
                                      className="flex w-full  cursor-pointer justify-between bg-white py-2 px-4 text-sm font-['Mont-semibold'] text-black hover:text-purple lg:text-base"
                                      key={index}
                                    >
                                      <span>{country.flag}</span>
                                      <span>{country.dial_code}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>

                            <div className="">
                              <input
                                type="text"
                                id="phone"
                                name="phone"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.phone}
                                placeholder="Phone number"
                                className="mt-1 h-11 w-full rounded-lg border-2 border-lightGrey pl-2 text-sm text-darkGrey lg:h-12 lg:text-base registerPopup:w-[299px] "
                              />
                              {formik.errors.phone ? (
                                <p className="absolute bottom-0 left-4 text-xs text-[#dc2626]">
                                  {formik.errors.phone}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-1 flex items-end justify-end lg:mt-[217px]">
                        <button
                          type="button"
                          className="justify-center rounded-full border-2 border-darkTeal bg-darkTeal px-[25px] py-[5px] text-lg text-white  transition duration-500 hover:border-2 hover:border-lightTeal   hover:bg-lightTeal hover:text-white lg:px-[40px] lg:py-[13px]"
                          onClick={() => setActiveTab(activeTab + 1)}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === 1 && (
                <div className="">
                  <form
                    onSubmit={formik.handleSubmit}
                    className="  h-full flex-col rounded-2xl py-[30px]  lg:h-[576px]   lg:py-[50px]"
                  >
                    <div className="flex flex-col justify-between ">
                      <div className="flex flex-col justify-between lg:flex-row ">
                        <div className="relative mb-2 flex flex-col pb-5 lg:mb-0">
                          <label
                            htmlFor="company"
                            className="pl-4 text-sm text-darkGrey md:text-lg lg:text-base"
                          >
                            Company name
                          </label>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.company}
                            placeholder="Company name"
                            className="mt-1 h-11 w-full rounded-lg border-2 border-lightGrey pl-2 text-sm text-darkGrey lg:h-12 lg:w-[332px]  lg:text-base registerPopup:w-[397px]"
                          />
                          {formik.errors.company ? (
                            <p className="absolute bottom-0 left-4 text-xs text-[#dc2626]">
                              {formik.errors.company}
                            </p>
                          ) : null}
                        </div>
                        <div className="relative mb-2 flex flex-col pb-5 lg:mb-0">
                          <label
                            htmlFor="address"
                            className="pl-4 text-sm text-darkGrey md:text-lg lg:text-base"
                          >
                            Street Address{' '}
                          </label>
                          <input
                            type="text"
                            id="address"
                            name="address"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.address}
                            placeholder="Name"
                            className="mt-1 h-11 w-full rounded-lg border-2 border-lightGrey pl-2 text-sm text-darkGrey lg:h-12 lg:w-[332px]  lg:text-base registerPopup:w-[397px]"
                          />
                          {formik.errors.address ? (
                            <p className="absolute bottom-0 left-4 text-xs text-[#dc2626]">
                              {formik.errors.address}
                            </p>
                          ) : null}
                        </div>
                      </div>
                      <div className="mr-0 flex flex-col justify-between lg:mt-5 lg:flex-row ">
                        <div className="relative mb-2 flex flex-col pb-5 lg:mb-0">
                          <label
                            htmlFor="city"
                            className="pl-4 text-sm text-darkGrey md:text-lg lg:text-base"
                          >
                            City
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.city}
                            placeholder="Name"
                            className="mt-1 h-11 w-full rounded-lg border-2 border-lightGrey pl-2 text-sm text-darkGrey lg:h-12 lg:w-[332px]  lg:text-base registerPopup:w-[397px]"
                          />
                          {formik.errors.city ? (
                            <p className="absolute bottom-0 left-4 text-xs text-[#dc2626]">
                              {formik.errors.city}
                            </p>
                          ) : null}
                        </div>
                        <div className="relative mb-2 flex flex-col pb-5 lg:mb-0">
                          <label
                            htmlFor="country"
                            className="pl-4 text-sm text-darkGrey md:text-lg lg:text-base"
                          >
                            Country
                          </label>{' '}
                          <select
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.country}
                            className="scrollbar mt-1  h-11 w-full rounded-lg border-2  border-lightGrey  bg-white text-sm font-['Mont-semibold'] text-darkGrey lg:h-12  lg:w-[332px]   lg:text-base registerPopup:w-[397px]"
                          >
                            {CountryList.map(
                              (dropdownCountry, index: number) => (
                                <option
                                  onClick={() => {
                                    setActiveDropdownCountry(
                                      dropdownCountry.name
                                    );
                                    setDropdownCountry(false);
                                  }}
                                  className="cursor-pointer bg-white py-2 px-4 text-base font-['Mont-semibold'] text-black hover:bg-purple/10 hover:text-purple"
                                  key={index}
                                >
                                  <span>{dropdownCountry.name}</span>
                                </option>
                              )
                            )}
                          </select>
                          {formik.errors.country ? (
                            <p className="absolute bottom-0 left-4 text-xs text-[#dc2626]">
                              {formik.errors.country}
                            </p>
                          ) : null}
                        </div>
                      </div>
                      <div className="relative mb-2 flex flex-col pb-5 lg:mt-5 lg:mb-0">
                        <label
                          htmlFor="postCode"
                          className="pl-4 text-sm text-darkGrey md:text-lg lg:text-base"
                        >
                          Post code
                        </label>
                        <input
                          type="text"
                          id="postCode"
                          name="postCode"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.postCode}
                          placeholder="ex. SW1W 0NY "
                          className="mt-1 h-11 w-full rounded-lg border-2 border-lightGrey pl-2 text-sm text-darkGrey lg:h-12 lg:w-[332px] lg:text-base registerPopup:w-[397px]"
                        />
                        {formik.errors.postCode ? (
                          <p className="absolute bottom-0 left-4 text-xs text-[#dc2626]">
                            {formik.errors.postCode}
                          </p>
                        ) : null}
                      </div>
                      <div className=" mt-1 flex items-end justify-end lg:mt-28">
                        <button
                          type="button"
                          className="justify-center rounded-full border-2 border-darkTeal bg-darkTeal px-[25px] py-[5px] text-lg text-white  transition duration-500 hover:border-2 hover:border-lightTeal   hover:bg-lightTeal hover:text-white lg:px-[40px] lg:py-[13px]"
                          onClick={() => setActiveTab(activeTab + 1)}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === 2 && (
                <div className="">
                  <form
                    onSubmit={formik.handleSubmit}
                    className="h-full flex-col rounded-2xl py-[30px] lg:h-[576px] lg:py-[50px]"
                  >
                    <div className="flex flex-col justify-center">
                      <div className="relative mb-2 flex flex-col pb-5 lg:mb-0">
                        <label
                          className="pl-4 text-sm text-darkGrey md:text-lg lg:text-base"
                          htmlFor="username"
                        >
                          Username
                        </label>
                        <input
                          type="text"
                          id="username"
                          name="username"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.username}
                          placeholder="Username"
                          className="mt-1 h-11 w-full rounded-lg border-2 border-lightGrey pl-2 text-sm text-darkGrey lg:h-12 lg:w-[332px]  lg:text-base registerPopup:w-[397px]"
                        />
                        {formik.errors.username ? (
                          <p className="absolute bottom-0 left-4 text-xs text-[#dc2626]">
                            {formik.errors.username}
                          </p>
                        ) : null}
                      </div>
                      <div className="flex flex-col justify-between md:mt-7 lg:mt-5 lg:flex-row">
                        <div className="relative mb-2 flex flex-col lg:mb-0">
                          <label
                            htmlFor="password"
                            className="pl-4 text-sm text-darkGrey md:text-lg lg:text-base"
                          >
                            Password
                          </label>
                          <input
                            type={isRevealPwd ? 'text' : 'password'}
                            id="password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            placeholder="Password"
                            className="mt-1  h-11 w-full rounded-lg border-2 border-lightGrey pl-2 text-sm lg:h-12 lg:w-[332px] lg:text-base registerPopup:w-[397px]"
                          />
                          <div className=" absolute right-4 top-9 md:top-11">
                            <Image
                              alt="/"
                              title={
                                isRevealPwd ? 'Show password' : 'Hide password'
                              }
                              src={!isRevealPwd ? showPwdImg : hidePwdImg}
                              onClick={() =>
                                setIsRevealPwd((prevState) => !prevState)
                              }
                              height={20}
                              width={19.41}
                              layout="fixed"
                            />
                          </div>

                          {formik.errors.password ? (
                            <p className="absolute top-[69px] left-4 text-xs text-[#dc2626] md:top-[79px] lg:bottom-12 ">
                              {formik.errors.password}
                            </p>
                          ) : null}
                          <div className=" mt-10 h-2 w-full rounded-full bg-white">
                            <div
                              className={`${passwordNum} h-full rounded-full duration-500 ${passwordColor}`}
                            />
                          </div>
                          <div className="mt-1 pl-4 text-[11px] text-[#696969]">
                            Password strength: {passStrength}
                          </div>
                        </div>
                        <div className="relative mb-2 flex flex-col pb-5 lg:mb-0">
                          <label
                            htmlFor="confirmPassword"
                            className="pl-4 text-sm text-darkGrey md:text-lg lg:text-base"
                          >
                            Confirm Password
                          </label>
                          <input
                            type={isRevealPwd ? 'text' : 'password'}
                            id="confirmPassword"
                            name="confirmPassword"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.confirmPassword}
                            placeholder="Confirm Password"
                            className="mt-1 h-11 w-full rounded-lg border-2 border-lightGrey pl-2 text-sm lg:h-12 lg:w-[332px] lg:text-base registerPopup:w-[397px]"
                          />
                          <div className="absolute right-4 top-9 md:top-11">
                            <Image
                              alt="/"
                              title={
                                isRevealPwd ? 'Show password' : 'Hide password'
                              }
                              src={!isRevealPwd ? showPwdImg : hidePwdImg}
                              onClick={() =>
                                setIsRevealPwd((prevState) => !prevState)
                              }
                              height={20}
                              width={19.41}
                              layout="fixed"
                            />
                          </div>
                          {formik.errors.confirmPassword ? (
                            <p className="absolute bottom-0 left-4 text-xs text-[#dc2626] lg:bottom-12">
                              {formik.errors.confirmPassword}
                            </p>
                          ) : null}
                        </div>
                      </div>

                      <div className="mt-3 mb-2 flex flex-col self-start lg:mt-16 lg:mb-0 xl:self-start">
                        <div className="flex flex-row">
                          <div className="h-5 w-5">
                            <input
                              id="default-checkbox"
                              type="checkbox"
                              value=""
                              className="rounded text-black"
                            />
                          </div>
                          <div className="ml-2 -mt-1">
                            <label
                              htmlFor="default-checkbox"
                              className="text-sm font-['Mont-regular'] text-black lg:text-lg "
                            >
                              Subscribe to our mailing list.
                            </label>
                            <p className="text-xs text-black">
                              Join our mailing list and hear about our special
                              deals days before they go live on the website!
                            </p>
                          </div>
                        </div>

                        <div className="mt-5 flex flex-row">
                          <div className="h-5 w-5">
                            <input
                              id="default-checkbox-two"
                              type="checkbox"
                              value=""
                              className="rounded text-black"
                            />
                          </div>
                          <label
                            htmlFor="default-checkbox-two"
                            className="ml-2 -mt-1 flex text-sm font-['Mont-regular'] text-black lg:text-lg "
                          >
                            <span className="">
                              I have read and agree to the
                              <Link
                                href="/terms-of-service"
                                passHref
                                className="ml-2 cursor-pointer text-[#A660A3] underline"
                              >
                                Terms of Service.
                              </Link>
                            </span>
                          </label>
                        </div>
                      </div>

                      <div className="mt-4 flex w-full items-end justify-end sm:mt-10 lg:mt-20">
                        <button
                          type="submit"
                          className="justify-center rounded-full border-2 border-darkTeal bg-darkTeal px-[25px] py-[5px] text-lg text-white  transition duration-500 hover:border-2 hover:border-lightTeal   hover:bg-lightTeal hover:text-white lg:px-[40px] lg:py-[13px]"
                          value="Save &#38; Finish"
                          disabled={isSubmitted}
                        >
                          Save &#38; Finish
                        </button>
                      </div>
                      {isSubmitted && (
                        <p className="absolute bottom-8 w-full text-center">
                          Registration Successful!
                        </p>
                      )}
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default RegisterwithSteps;
