/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState, useEffect, useRef } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Image from 'next/legacy/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  CartItem,
  CreateEstimateOrOrder,
  CreateOrderRequest,
} from '@utils/cart';
import { usePlacesWidget } from 'react-google-autocomplete';
import PhoneInput, { formatPhoneNumberIntl } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import ErrorForm from '@components/ErrorPop';
import animation from '../../../src/components/assets/loader-grey.svg';
import ErrorAddToCartPopUp from '@components/ErrorAddToCartPopUp';

interface P {
  closePopUp?: () => void;
  setEmail?: any;
  closeEmailForm?: any;
  cart?: CartItem[];
  countryCode?: any;
}
export interface Country {
  name: string;
  dial_code: string;
  code: string;
  flag: string;
}
const CountryList: Country[] = require('country-list-with-dial-code-and-flag');

interface Values {
  firstName: string;
  lastName: string;
  phone: string;
  company: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  country: string;
  city: string;
  postCode: string;
  stateCode: string;
  currencyCode: any;
  vatNumber: string;
  termsOfService: any;
}

const tabs = ['Personal info', 'Company info'];

const Register = ({
  closePopUp,
  setEmail,
  closeEmailForm,
  cart,
  countryCode,
}: P) => {
  const router = useRouter();
  const [orderItems, setOrderItems] = useState<any>([]);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [selectedCountryCode, setSelectedCountryCode] = useState(
    CountryList[0].dial_code
  );
  const [selectedCodeCountry, setSelectedCodeCountry] =
    useState<string>(countryCode);

  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const trial = cart?.length ?? false;

  const [showDropdownCountry, setDropdownCountry] = useState<boolean>(false);

  const [emailError, setEmailError] = useState<boolean>(false);
  const [errorPopUpMessage, setErrorPopUpMessage] = useState<boolean>(false);

  const [isTermsChecked, setTermsChecked] = useState(false);

  const [activeDropdownItem, setActiveDropdownItem] = useState<string>(
    `${CountryList[0].dial_code}`
  );
  const [activeDropdownCountry, setActiveDropdownCountry] = useState<string>(
    CountryList[0].code
  );
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const delayClosePopup = () => {
    if (Object.keys(formik.errors).length !== 0) {
      setErrorPopUpMessage(true);
      setTimeout(() => {
        setErrorPopUpMessage(false);
      }, 5000);
    }

    // window.setTimeout(closePopUp, 5000);
  };

  const selectedCurrencyRef = useRef<string>('GBP');

  const [errorMessasge, setErrorMessage] = useState<string>('');

  const geoCountry = localStorage.getItem('GEOIP_COUNTRY');

  useEffect(() => {
    const curr = localStorage.getItem('SELECTED_CURRENCY');
    if (curr) {
      selectedCurrencyRef.current = curr;
    }
  }, []);

  const validationSchema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    city: yup.string().required('City is required'),
    country: yup.string().required('Country is required'),
    phone: yup.string().required('Phone number is required'),
    addressLine1: yup.string().required('Address Line 1 is required'),
    company: yup.string().required('Company name is required'),
    vatNumber: yup
      .string()
      .test(
        'is-vat-prefix-valid',
        'Please enter a VAT prefix',
        (value) => !value || /^[a-zA-Z]{2}/.test(value)
      ),
    termsOfService: yup
      .boolean()
      .oneOf([true], 'Please accept the terms and conditions'),
  });
  const initialValues: Values = {
    firstName: '',
    lastName: '',
    phone: '',
    company: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    country: '',
    city: '',
    postCode: '',
    stateCode: '',
    currencyCode: selectedCurrencyRef,
    vatNumber: '',
    termsOfService: false,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: Values) => {
      const res = await handleRegister(values, selectedCurrencyRef.current);
    },
  });

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const [selectedNumber, setSelectedNumber] = useState<string>('');
  const [selectedAddress, setSelectedAddress] = useState<string>('');

  const { ref: refAdd } = usePlacesWidget<HTMLInputElement>({
    apiKey: apiKey,
    onPlaceSelected: (place) => {
      //console.log(place);
      const hasPostalTown = place?.address_components?.some((item: any) =>
        item?.types?.includes('postal_town')
      );
      const formatedAddress = place?.formatted_address;
      const parts = formatedAddress?.split(',');
      const result = parts[0].trim();

      place?.address_components?.forEach((item: any) => {
        item?.types?.forEach((type: any) => {
          if (hasPostalTown) {
            switch (type) {
              case 'route':
                formik.setFieldValue('addressLine1', result);
                break;
              case 'locality':
                const selectedAddressTwo = item?.short_name;
                formik.setFieldValue('addressLine2', selectedAddressTwo);
                break;
              case 'postal_town':
                const selectedCity = item?.short_name;
                formik.setFieldValue('city', selectedCity);
                break;
              case 'postal_code':
                const selectedZip = item?.short_name;
                formik.setFieldValue('postCode', selectedZip);
                break;
              case 'country':
                const selectedCountry = item?.short_name;
                formik.setFieldValue('country', selectedCountry);
                break;
              case 'administrative_area_level_1':
                const selectedState = item?.short_name;
                formik.setFieldValue('stateCode', selectedState);
                break;
            }
          } else {
            switch (type) {
              case 'sublocality':
                formik.setFieldValue('addressLine2', item?.short_name);
                break;
              case 'route':
                formik.setFieldValue('addressLine1', result);
                break;
              case 'locality':
                const selectedAddressTwo = item?.short_name;
                formik.setFieldValue('city', selectedAddressTwo);
                break;
              case 'postal_code':
                const selectedZip = item?.short_name;
                formik.setFieldValue('postCode', selectedZip);
                break;
              case 'country':
                const selectedCountry = item?.short_name;
                formik.setFieldValue('country', selectedCountry);
                break;
              case 'administrative_area_level_1':
                const selectedState = item?.short_name;
                formik.setFieldValue('stateCode', selectedState);
                break;
            }
          }
        });
      });
    },
    options: {
      types: ['address'],
    },
  });

  const [isErrorFormOpen, setIsErrorFormOpen] = useState(false);

  const openErrorForm = () => {
    setIsErrorFormOpen(true);
  };
  const closeErrorForm = () => {
    setIsErrorFormOpen(false);
  };

  const handleRegister = async (values: Values, selectedCurrency: string) => {
    setIsSubmitted(true);
    setIsLoading(true);
    localStorage.setItem('USER_DATA', JSON.stringify(values));

    let cartItems = null;
    let estimate = true;

    if (cart) {
      cartItems = [{ cart, quantity: 1 }];
      estimate = false;
    }

    const error = await CreateEstimateOrOrder({
      cartItems: cart ?? [],
      customer: { ...values, email: setEmail },
      estimate,
    } as CreateOrderRequest);

    if (error) {
      console.log('Check error: ', error)
      setIsSubmitted(false);
      localStorage.removeItem('USER_DATA');
      console.error('FormError:', error.message);
      if (error.message.includes('phone')) {
        setErrorMessage('Phone number invalid. Please try again.');
      } else if (error.message.includes('email')) {
        setErrorMessage('Email already registered. Please try again.');
        setEmailError(true);
      } else if (error.message.includes('vat')) {
        setErrorMessage('Invalid VAT number. Please try again.');
      } else if (error.message.includes('VAT Number not applicable')) {
        setErrorMessage('VAT number not applicable for this country. Please try again.');
      } else if (error.message.includes('zip')) {
        setErrorMessage('Invalid postcode or ZIP. Please try again.');
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
      openErrorForm();
      setIsLoading(false);
    } else if (cart) {
      router.push('/thank-you-subscription');
    } else {
      router.push('/summary');
    }
  };

  useEffect(() => {
    formik.setFieldValue('country', countryCode);
  }, [countryCode]);

  const [selectedNeyCodeCountry, setSelectedNewCodeCountry] =
    useState(countryCode);

  const handleCountryChange = (country: any) => {
    setSelectedCodeCountry(country);
  };
  return (<>
    <div className="relative top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 items-center rounded-2xl bg-liliac/10 p-4 registerPopup:min-w-[1250px] registerPopup:max-w-[1155px] ">
      <div className="flex w-[100%] flex-col items-center rounded-b-2xl  md:m-auto md:w-[80%] md:rounded-2xl">
        <div className="max-h-[400px] w-[100%] overflow-auto py-0 px-5 text-left md:m-auto md:max-h-full md:px-12 lg:py-10 ">
          <form
            onSubmit={formik.handleSubmit}
            className="grid gap-[60px] rounded-2xl py-[30px] lg:py-[50px]"
          >
            <div className="grid gap-[25px]">
              <p className='font-["Mont-semibold"] text-[20px] text-purple'>
                Personal details
              </p>
              <div className="flex flex-col font-['Mont-regular']">
                <div className="flex flex-col justify-between lg:flex-row  ">
                  <div className="relative mb-2 flex flex-col pb-5 lg:mb-0">
                    <label
                      className="pl-4  text-sm text-darkGrey md:text-lg lg:text-base"
                      htmlFor="firstName"
                    >
                      First name <span className="text-[#dc2626]">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.firstName.trim()}
                      placeholder="Name"
                      className={`mt-1 h-11 w-full rounded-lg border-2 border-lightGrey pl-2 text-sm text-darkGrey lg:h-12 lg:w-[332px]  lg:text-base registerPopup:w-[397px] ${formik.errors.firstName && formik.touched.firstName
                        ? 'border-[#dc2626]'
                        : ''
                        }`}
                    />
                    {formik.errors.firstName && formik.touched.firstName ? (
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
                      Last name <span className="text-[#dc2626]">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.lastName.trim()}
                      placeholder="Name"
                      className={`mt-1 h-11 w-full rounded-lg border-2 border-lightGrey pl-2 text-sm text-darkGrey lg:h-12 lg:w-[332px]  lg:text-base registerPopup:w-[397px] ${formik.errors.lastName && formik.touched.lastName
                        ? 'border-[#dc2626]'
                        : ''
                        }`}
                    />
                    {formik.errors.lastName && formik.touched.lastName ? (
                      <p className="absolute bottom-0 left-4 text-xs text-[#dc2626]">
                        {formik.errors.lastName}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="flex flex-col justify-between lg:flex-row">
                  <div className="relative mb-2 flex flex-col pb-5 lg:mt-5 lg:mb-0">
                    <label
                      className="pl-4 text-sm text-darkGrey md:text-lg lg:text-base"
                      htmlFor="email"
                    >
                      E-mail <span className="text-[#dc2626]">*</span>
                    </label>
                    <input
                      type="email"
                      disabled={true}
                      readOnly={true}
                      value={setEmail.trim()}
                      placeholder="email"
                      className={`mt-1 h-11 w-full rounded-lg border-2 border-lightGrey pl-2 text-sm text-grey lg:h-12 lg:w-[332px] lg:text-base registerPopup:w-[397px]`}
                    />
                  </div>
                  <div className="relative mb-2 flex w-full max-w-[397px] flex-col pb-5 lg:mt-5 lg:mb-0">
                    <label
                      className="pl-4 text-sm text-darkGrey md:text-lg lg:text-base"
                      htmlFor="phone"
                    >
                      Phone number <span className="text-[#dc2626]">*</span>
                    </label>
                    <div
                      className={`flex flex-row items-end justify-between gap-1 sm:justify-start ${formik.errors.phone && formik.touched.phone ? '' : ''
                        }`}
                    >
                      <PhoneInput
                        onCountryChange={(country: any) => {
                          setSelectedCodeCountry(country);
                          formik.setFieldValue('phone', '');
                        }}
                        defaultCountry={!geoCountry ? 'GB' : geoCountry as any}
                        international
                        flagUrl={'/flags/{XX}.svg'}
                        countryCallingCodeEditable={true}
                        value={formik.values.phone}
                        onChange={(value) => {
                          const formattedValue = value?.replace(/\s+/g, '');
                          formik.setFieldValue('phone', formattedValue);
                          if (value) {
                            const newCountry = value.slice(0, 2);
                            if (newCountry !== selectedCodeCountry) {
                              setSelectedCodeCountry(newCountry);
                            }
                          }
                        }}
                        countries={CountryList.map((country) => country.code) as any}
                      />
                      {formik.errors.phone && formik.touched.phone ? (
                        <p className="absolute bottom-0 left-4 text-xs text-[#dc2626]">
                          {formik.errors.phone}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-[25px]">
              <p className='font-["Mont-semibold"] text-[20px] text-purple'>
                Company Info
              </p>
              <div className="flex flex-col justify-between font-['Mont-regular'] lg:flex-row">
                <div className="relative mb-2 flex flex-col pb-5 lg:mb-0">
                  <label
                    htmlFor="company"
                    className="pl-4 text-sm text-darkGrey md:text-lg lg:text-base"
                  >
                    Company name <span className="text-[#dc2626]">*</span>
                  </label>

                  <input
                    type="text"
                    id="company"
                    name="company"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.company.replace(/\s{2,}$/g, ' ')}
                    placeholder="Company name"
                    className={`mt-1 h-11 w-full rounded-lg border-2 border-lightGrey pl-2 text-sm text-darkGrey lg:h-12 lg:w-[332px]  lg:text-base registerPopup:w-[397px] ${formik.errors.company && formik.touched.company
                      ? 'border-[#dc2626]'
                      : ''
                      }`}
                  />
                  {formik.errors.company && formik.touched.company ? (
                    <p className="absolute bottom-0 left-4 text-xs text-[#dc2626]">
                      {formik.errors.company}
                    </p>
                  ) : null}
                </div>
                <div className="relative mb-2 flex flex-col pb-5 lg:mb-0">
                  <label
                    htmlFor="vatNumber"
                    className="pl-4 text-sm text-darkGrey md:text-lg lg:text-base"
                  >
                    Vat number
                  </label>
                  <input
                    type="text"
                    id="vatNumber"
                    name="vatNumber"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.vatNumber.trim()}
                    placeholder="ex. GB903034962"
                    className={`mt-1 h-11 w-full rounded-lg border-2 border-lightGrey pl-2 text-sm text-darkGrey lg:h-12 lg:w-[332px]  lg:text-base registerPopup:w-[397px] ${formik.errors.vatNumber && formik.touched.vatNumber
                      ? 'border-[#dc2626]'
                      : ''
                      }`}
                  />
                  {formik.errors.vatNumber && formik.touched.vatNumber ? (
                    <p className="absolute bottom-0 left-4 text-xs text-[#dc2626]">
                      {formik.errors.vatNumber}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="grid gap-[25px]">
              <p className='font-["Mont-semibold"] text-[20px] text-purple'>
                Company address
              </p>
              <div className="flex flex-col justify-between font-['Mont-regular'] ">
                <div className="flex flex-col justify-between lg:flex-row ">
                  <div className="relative mb-2 flex flex-col pb-5 lg:mb-0">
                    <label
                      htmlFor="addressLine1"
                      className="pl-4 text-sm text-darkGrey md:text-lg lg:text-base"
                    >
                      Address <span className="text-[#dc2626]">*</span>
                    </label>
                    <input
                      ref={refAdd}
                      type="text"
                      id="addressLine1"
                      name="addressLine1"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.addressLine1.replace(
                        /\s{2,}$/g,
                        ' '
                      )}
                      placeholder="Address Line 1"
                      className={`mt-1 h-11 w-full rounded-lg border-2 border-lightGrey pl-2 text-sm text-darkGrey lg:h-12 lg:w-[332px]  lg:text-base registerPopup:w-[397px] ${formik.errors.addressLine1 &&
                        formik.touched.addressLine1
                        ? 'border-[#dc2626]'
                        : ''
                        }`}
                    />
                    {formik.errors.addressLine1 &&
                      formik.touched.addressLine1 ? (
                      <p className="absolute bottom-0 left-4 text-xs text-[#dc2626]">
                        {formik.errors.addressLine1}
                      </p>
                    ) : null}
                  </div>

                  <div className="relative mb-2 flex flex-col justify-between pb-5 lg:mb-0">
                    <label
                      htmlFor="addressLine1"
                      className="pl-4 text-sm text-darkGrey md:text-lg lg:text-base"
                    ></label>
                    <input
                      type="text"
                      id="addressLine2"
                      name="addressLine2"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.addressLine2.replace(
                        /\s{2,}$/g,
                        ' '
                      )}
                      placeholder="Address Line 2"
                      className="mt-1 h-11 w-full rounded-lg border-2 border-lightGrey pl-2 text-sm text-darkGrey lg:h-12 lg:w-[332px]  lg:text-base registerPopup:w-[397px]"
                    />
                  </div>
                </div>
                <div className="mr-0 flex flex-col justify-between lg:flex-row ">
                  <div className="relative mb-2 flex flex-col pb-5 lg:mt-5 lg:mb-0">
                    <label
                      htmlFor="city"
                      className="pl-4 text-sm text-darkGrey md:text-lg lg:text-base"
                    >
                      City <span className="text-[#dc2626]">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.city.replace(/\s{2,}$/g, ' ')}
                      placeholder="City"
                      className={`mt-1 h-11 w-full rounded-lg border-2 border-lightGrey pl-2 text-sm text-darkGrey lg:h-12 lg:w-[332px]  lg:text-base registerPopup:w-[397px] ${formik.errors.city && formik.touched.city
                        ? 'border-[#dc2626]'
                        : ''
                        }`}
                    />
                    {formik.errors.city && formik.touched.city ? (
                      <p className="absolute bottom-0 left-4 text-xs text-[#dc2626]">
                        {formik.errors.city}
                      </p>
                    ) : null}
                  </div>
                  <div className="relative mb-2 flex flex-col pb-5 lg:mt-5 lg:mb-0">
                    <label
                      htmlFor="postCode"
                      className="pl-4 text-sm text-darkGrey md:text-lg lg:text-base"
                    >
                      Post Code/ZIP Code
                    </label>
                    <input
                      type="text"
                      id="postCode"
                      name="postCode"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.postCode.replace(/\s{2,}$/g, ' ')}
                      placeholder="SW1W 0NY "
                      className={`mt-1 h-11 w-full rounded-lg border-2 border-lightGrey pl-2 text-sm text-darkGrey lg:h-12 lg:w-[332px] lg:text-base registerPopup:w-[397px]`}
                    />
                  </div>
                </div>
                <div className="mr-0 flex flex-col justify-between lg:flex-row ">
                  <div className="relative mb-2 flex flex-col pb-5 lg:mt-5 lg:mb-0 ">
                    <label
                      htmlFor="country"
                      className="pl-4 text-sm text-darkGrey md:text-lg lg:text-base "
                    >
                      Country <span className="text-[#dc2626]">*</span>
                    </label>{' '}
                    <select
                      id="country"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.country}
                      className={`mt-1 h-11 w-full rounded-lg border-2 border-lightGrey bg-white pl-2 font-['Mont-semibold'] text-sm text-darkGrey lg:h-12 lg:w-[332px] lg:text-base registerPopup:w-[397px] ${formik.errors.country && formik.touched.country
                        ? 'border-[#dc2626]'
                        : ''
                        }`}
                    >
                      {CountryList.map((dropdownCountry) => (
                        <option
                          onClick={() => {
                            setActiveDropdownCountry(dropdownCountry.code);
                            setDropdownCountry(false);
                          }}
                          className="cursor-pointer bg-white py-2 px-4 font-['Mont-semibold'] text-base text-black hover:bg-purple/10 hover:text-purple"
                          key={dropdownCountry.code}
                          value={dropdownCountry.code}
                        >
                          {dropdownCountry.name}
                        </option>
                      ))}
                    </select>
                    {formik.errors.country && formik.touched.country ? (
                      <p className="absolute bottom-0 left-4 text-xs text-[#dc2626]">
                        {formik.errors.country}
                      </p>
                    ) : null}
                  </div>
                  {formik.values.country === 'US' ||
                    formik.values.country === 'IN' ||
                    formik.values.country === 'CA' ? (
                    <div className="relative mb-2 flex flex-col pb-5 lg:mt-5 lg:mb-0">
                      <label
                        htmlFor="stateCode"
                        className="pl-4 text-sm text-darkGrey md:text-lg lg:text-base"
                      >
                        State code
                      </label>
                      <input
                        type="text"
                        id="stateCode"
                        name="stateCode"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.stateCode.trim()}
                        placeholder="Enter state code"
                        className="mt-1 h-11 w-full rounded-lg border-2 border-lightGrey pl-2 text-sm text-darkGrey lg:h-12 lg:w-[332px] lg:text-base registerPopup:w-[397px]"
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="grid">
              <div className="flex flex-row">
                <div>
                  <input
                    id="default-checkbox-two"
                    type="checkbox"
                    checked={formik.values.termsOfService} // Use checked attribute
                    onChange={() =>
                      formik.setFieldValue(
                        'termsOfService',
                        !formik.values.termsOfService
                      )
                    } // Toggle the value
                    className="rounded text-black"
                  />
                </div>
                <label
                  htmlFor="default-checkbox-two"
                  className="ml-2 -mt-1 flex font-['Mont-regular'] text-sm text-black lg:text-lg  "
                >
                  <span className="">
                    I have read and agree to the
                    <Link
                      href="/legal"
                      passHref
                      target="_blank"
                      rel="noopener noreferrer" // These attributes are for security
                      className="ml-2 cursor-pointer text-[#A660A3] underline"
                    >
                      Terms of Service.
                    </Link>

                  </span>
                </label>
              </div>
              {formik.errors.termsOfService &&
                formik.touched.termsOfService ? (
                <p className="relative bottom-0 left-4 text-xs text-[#dc2626]">
                  Please accept the terms and conditions.
                </p>
              ) : null}
            </div>

            <div className="flex w-full items-end justify-end text-center">
              {/* {isLoading && (
                <div className="spinner flex gap-2" id="spinner">
                  Creating account{' '}
                  <Image
                    className="animate-spin"
                    alt="image"
                    src={animation.src}
                    height={25}
                    width={25}
                    layout="fixed"
                  />
                </div>
              )} */}
              <div
                id="spinner"
                className="spinner flex items-center justify-center gap-2 rounded-full border-2  border-darkTeal bg-darkTeal px-[25px] py-[5px] font-['Mont-semibold'] text-lg text-white  transition duration-500 hover:border-2 hover:border-lightTeal   hover:bg-lightTeal hover:text-white lg:px-[40px] lg:py-[13px]"
              >
                <input
                  type="submit"
                  value="Create account"
                  disabled={isSubmitted}
                  onClick={delayClosePopup}
                />
                {isLoading && (
                  <Image
                    className="animate-spin"
                    alt="image"
                    src={animation.src}
                    height={25}
                    width={25}
                    layout="fixed"
                  />
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      {isErrorFormOpen && (
        <ErrorForm
          message={errorMessasge}
          closeError={closeErrorForm}
          emailError={emailError}
        />
      )}
    </div>
    {errorPopUpMessage && (
      <ErrorAddToCartPopUp message="Some fields are incorrect. Please review and correct the highlighted errors." />
    )}
  </>);
};
export default Register;
