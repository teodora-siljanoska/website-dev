/* eslint-disable @typescript-eslint/no-var-requires */
import React, {
  useState,
  useEffect,
  ChangeEvent,
  useContext,
  useCallback,
} from 'react';
import useDomainsNameHook, {
  additionalAttributesProps,
  coreAttributesProps,
} from './DomainsHooks';
import LoginContext from '@utils/contexts/loginContext';
import CartDomainContext from '@utils/contexts/cartDomainContext';
import { DomainInterface } from './DomainsNameBlock';
import CartDomainFinalContext from '@utils/contexts/cartFinalDomainContext';
import AddToCartPopUp from '@components/AddToCartPopUp';
import Image from 'next/legacy/image';
import arrowfull from './assets/arrowfull.svg';
import { Country } from '@layout/Auth/Register';
import { useRouter } from 'next/router';
import * as EmailValidator from 'email-validator';
import animation from '../../../src/components/assets/loader-grey.svg';
import ErrorAddToCartPopUp from '@components/ErrorAddToCartPopUp';
import { usePlacesWidget } from 'react-google-autocomplete';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export interface DomainFinalInterface {
  domain: DomainInterface;
  type: string;
  auth_code?: string;
  registration_data?: registration_data;
  domainInfo?: answeredQuestionProps[];
}
// export interface PostRequestsProps {
//   domain: string;
//   additionalQuestions: {
//     Attribute: [{}];
//   };
// }

interface testingModalDataProps {
  domains: string[];
}
export interface OrderItem {
  sku: string;
  quantity?: number;
}
interface answeredQuestionProps {
  questionName: string;
  questionAnswer: string;
}

interface parentQuestionsProps {
  questionName: string;
  questionAnswer: string;
  childQuestion: string;
}
export interface registration_data {
  RegistrantAddress1?: string;
  RegistrantCity?: string;
  RegistrantCountry?: string;
  RegistrantEmailAddress?: string;
  RegistrantFirstName?: string;
  RegistrantLastName?: string;
  RegistrantOrganization?: string;
  RegistrantPostalCode?: string;
}
export interface CustomVpsNumericalAddonInterface {
  title: string;
  sku: string;
  skuMonthly: string;
  skuYearly: string;
  monthlyPrice: number;
  yearlyPrice: number;
  amountSelected: number;
  selectedCurrency: string;
  max: number;
  min: number;
  increment: number;
}
interface RedirectUrl {
  chargebeeUrl: string;
}

export interface CustomVpsAddonInterface {
  title: string;
  sku: string;
  skuMonthly: string;
  skuYearly: string;
  selectedCurrency: string;
  monthlyPrice: number;
  yearlyPrice: number;
  group: string;
}

const TestingModal = ({ domains }: testingModalDataProps) => {
  const orderItems: OrderItem[] = [];
  const router = useRouter();

  // const [domainRequest, setDomainRequest] =
  //   useState<[{ domainName: string; questions: string[] }]>();
  let domainRequest: [{ domainName: string; questions: string[] }];
  const CountryList: Country[] = require('country-list-with-dial-code-and-flag');

  const [infoForPerson, setInfoForPerson] = useState<registration_data>();
  const [firstNamePerson, setFirstNamePerson] = useState<string>();
  const [lastNamePerson, setLastNamePerson] = useState<string>();
  const [addressPerson, setAddressPerson] = useState<string>();
  const [cityPerson, setCityPerson] = useState<string>();
  const [countryPerson, setCountryPerson] = useState<string>();
  const [emailPerson, setEmailPerson] = useState<string>();
  const [organizationPerson, setOrganizationPerson] = useState<string>();
  const [postalCodePerson, setPostalCodePerson] = useState<string>();
  const { user } = useContext(LoginContext);
  const { domainCart, setDomainCartItems } = useContext(CartDomainContext);
  const { domainFinalCart, setDomainFinalCartItems } = useContext(
    CartDomainFinalContext
  );
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showLoginWindow, setShowLoginWindow] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [type] = useState<string>('registration');
  const [accessToken, setAccessToken] = useState<string>('');
  const [refreshToken, setRefreshToken] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const [answeredQuestions, setAnsweredQuestions] = useState<
    answeredQuestionProps[]
  >([]);
  const [parentQuestions, setParentQuestions] = useState<
    parentQuestionsProps[]
  >([]);

  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    organization: '',
    email: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
  });

  const validateForm = () => {
    setFormSubmitted(true);
    const errors = {
      firstName: '',
      lastName: '',
      organization: '',
      email: '',
      address: '',
      city: '',
      country: '',
      postalCode: '',
    };

    let formIsValid = true;

    if (!firstNamePerson) {
      errors.firstName = 'First Name is required';
      formIsValid = false;
    } else if (firstNamePerson.length < 2 || firstNamePerson.length > 60) {
      errors.firstName = 'First Name must be between 2 and 60 characters';
      formIsValid = false;
    }
    if (!lastNamePerson) {
      errors.lastName = 'Last Name is required';
      formIsValid = false;
    } else if (lastNamePerson.length < 2 || lastNamePerson.length > 60) {
      errors.lastName = 'Last Name must be between 2 and 60 characters';
      formIsValid = false;
    }
    if (!organizationPerson) {
      errors.organization = 'Organization is required';
      formIsValid = false;
    } else if (
      organizationPerson.length < 2 ||
      organizationPerson.length > 100
    ) {
      errors.organization = 'Organization must be between 2 and 100 characters';
      formIsValid = false;
    }
    // const emailRegex = /^[a-zA-Z0-9._+\-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailPerson) {
      errors.email = 'Email is required';
      formIsValid = false;
    } else if (!EmailValidator.validate(emailPerson ?? '')) {
      errors.email = 'Please enter a valid email address';
      formIsValid = false;
    }

    if (!addressPerson) {
      errors.address = 'Address is required';
      formIsValid = false;
    } else if (addressPerson.length < 2 || addressPerson.length > 100) {
      errors.address = 'Address must be between 2 and 100 characters';
      formIsValid = false;
    }

    if (!cityPerson) {
      errors.city = 'City is required';
      formIsValid = false;
    } else if (cityPerson.length < 2 || cityPerson.length > 100) {
      errors.city = 'City must be between 2 and 100 characters';
      formIsValid = false;
    }

    if (!countryPerson) {
      errors.country = 'Country is required';
      formIsValid = false;
    } else if (countryPerson.length < 2 || countryPerson.length > 100) {
      errors.country = 'Country must be between 2 and 100 characters';
      formIsValid = false;
    }

    if (!postalCodePerson) {
      errors.postalCode = 'Postal Code is required';
      formIsValid = false;
    } else if (postalCodePerson.length < 2 || postalCodePerson.length > 100) {
      errors.postalCode = 'Postal Code must be between 2 and 100 characters';
      formIsValid = false;
    }

    setFormErrors(errors);
    return formIsValid;
  };

  const hookReturn = useDomainsNameHook(domains);

  useEffect(() => {
    hookReturn?.length === 3 && setIsLoaded(true);
  }, [hookReturn?.length]);

  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (formSubmitted) {
      validateForm();
    }
  }, [infoForPerson]);
  const onChangeHandlerInput = (
    questionName: string,
    questionAnswer: string
  ) => {
    if (
      answeredQuestions.find((answer) => answer.questionName === questionName)
    ) {
      const tempData = [
        { questionName, questionAnswer },
        ...answeredQuestions.filter(
          (question) => question.questionName !== questionName
        ),
      ];

      setAnsweredQuestions(tempData);
    } else {
      setAnsweredQuestions(
        answeredQuestions.concat({ questionName, questionAnswer })
      );
    }
  };

  const onChangeHandlerSelect = (
    questionName: string,
    questionAnswer: string,
    options: any
  ) => {
    let hasChild = false;
    let childQuestion = '';
    options.map((option: any) => {
      if (option.Title === questionAnswer) {
        if (option.Requires !== undefined) {
          hasChild = true;
          childQuestion = option.Requires.Attribute.Name;
        } else {
          !hasChild;
          childQuestion = '';
        }
      }
    });
    if (
      answeredQuestions.find((answer) => answer.questionName === questionName)
    ) {
      const tempData = [
        { questionName, questionAnswer },
        ...answeredQuestions.filter(
          (question) => question.questionName !== questionName
        ),
      ];
      setAnsweredQuestions(tempData);
    } else {
      setAnsweredQuestions(
        answeredQuestions.concat({ questionName, questionAnswer })
      );
    }
    if (hasChild) {
      if (
        parentQuestions.find((answer) => answer.questionName === questionName)
      ) {
        const tempData = [
          { questionName, questionAnswer, childQuestion },
          ...parentQuestions.filter(
            (question) => question.questionName !== questionName
          ),
        ];
        setParentQuestions(tempData);
      } else {
        setParentQuestions(
          parentQuestions.concat({
            questionName,
            questionAnswer,
            childQuestion,
          })
        );
      }
    } else {
      if (
        parentQuestions.find((answer) => answer.questionName === questionName)
      ) {
        const tempData = parentQuestions.filter(
          (question) => question.questionName !== questionName
        );
        setParentQuestions(tempData);
      }
    }
  };


  const onClickAddToCartFinalDomain = (
    domains: DomainInterface[],
    type: string,
    registration_data?: registration_data,
    domainInfo?: answeredQuestionProps[]
  ) => {
    if (validateForm()) {
      const start: DomainFinalInterface[] = [];

      if (localStorage.getItem('SELECTED_DOMAIN_FINAL_CART_ITEMS') === null) {
        localStorage.setItem(
          'SELECTED_DOMAIN_FINAL_CART_ITEMS',
          JSON.stringify(start)
        );
      }
      if (localStorage.getItem('SELECTED_DOMAIN_FINAL_CART_ITEMS') !== null) {
        start.push(
          ...(JSON.parse(
            localStorage.getItem('SELECTED_DOMAIN_FINAL_CART_ITEMS') ?? ''
          ) as DomainFinalInterface[])
        );
      }
      setIsLoading(true);

      let i = 0;
      const proba: DomainFinalInterface[] = [];
      {
        let newDomainInfo: answeredQuestionProps[] | undefined = [];

        domains.map((item, index) => {
          domainRequest?.map((req: any) => {
            if (req[0].includes(item.domainName)) {
              if (req[1].length === 0) {
                newDomainInfo = [];
              } else if (req[1].length > 0) {
                newDomainInfo = domainInfo?.filter((question) =>
                  req[1].some((r: string) => question.questionName.includes(r))
                );
              }
            }
          });

          if (start.length === 0) {
            proba.push({
              domain: item,
              type: type,
              registration_data: registration_data,
              domainInfo: newDomainInfo,
            });
          } else {
            start.map((itemFinal, idx) => {
              if (item.domainName === itemFinal.domain.domainName) {
                i = 1;
              } else {
                if (start.length === idx + 1 && i === 0) {
                  proba.push({
                    domain: item,
                    type: type,
                    registration_data: registration_data,
                    domainInfo: newDomainInfo,
                  });
                }
              }
            });
          }
        });
      }

      setDomainFinalCartItems([...start, ...proba]);
      localStorage.setItem(
        'SELECTED_DOMAIN_FINAL_CART_ITEMS',
        JSON.stringify([...start, ...proba])
      );
      setIsAdded(true);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
      // setIsLoading(false);

      window.location.href = '/domains-name-order';
    } else {
      setErrorMessage(true);
      setTimeout(() => {
        setErrorMessage(false);
      }, 5000);
    }
  };

  const handlePost = (
    answeredQuestions: answeredQuestionProps,
    postRequests: [{ domainName: string; questions: string[] }]
  ) => {
    const unique: Record<string, boolean> = {};
    const filteredPostRequests = [] as any;

    for (const post of postRequests) {
      const objString = JSON.stringify(post);
      if (!unique[objString]) {
        filteredPostRequests.push(post);
        unique[objString] = true;
      }
    }

    domainRequest = filteredPostRequests;

    //TO DO add answered questions 1 by 1 in each post request of filteredPostRequests.
    //This is flexible based on what you need.
    // console.log(answeredQuestions, 'all of the answers');
    // console.log(
    //   postRequests,
    //   'all of the post requests that need to be filled with additional attributes'
    // ); //note if the second array is empty inside every object that means that post doesn't have additional questions.
  };

  if (hookReturn !== undefined && isLoaded) {
    const coreQuestions = hookReturn[0];
    const {
      RegistrantAddress1,
      RegistrantCity,
      RegistrantCountry,
      RegistrantEmailAddress,
      RegistrantFirstName,
      RegistrantLastName,
      RegistrantOrganization,
      RegistrantPostalCode,
    } = coreQuestions as coreAttributesProps; // core attributes deconstructed.
    const additionalQuestions = hookReturn[1] as additionalAttributesProps[];
    const postRequests = hookReturn[2] as any;

    return (<>
      <form className="mb-20 h-full flex-col rounded-2xl bg-liliac/10 p-10">
        <div className="mx-auto w-[75%] font-['Mont-regular'] text-lg">
          <div
            id="configuratorDomain"
            className="pb-10 text-center font-['Mont-bold'] text-2xl text-purple"
          >
            Configure domain registrant for selected domains
          </div>
          <div className="mb-10 justify-between gap-x-20 text-darkGrey lg:flex">
            <div className="relative mb-10  flex w-full flex-col lg:mb-0">
              <>
                <label className="ml-4">Registrant first name</label>
                <input
                  name="RegistrantFirstName"
                  type="text"
                  required
                  placeholder="Andrew"
                  maxLength={100}
                  minLength={1}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setFirstNamePerson(event.target.value.trim());
                    setInfoForPerson((prevInfo) => ({
                      ...{
                        ...prevInfo,
                        RegistrantFirstName: event.target.value.trim(),
                      },
                    }));
                  }}
                  className={`${formErrors.firstName && 'border-[#ff3333]'
                    }  mt-1 h-11 w-full rounded-lg border-2 border-lightGrey pl-2 text-sm text-darkGrey placeholder:pl-3 lg:h-12 lg:text-base`}
                />
                {formErrors.firstName && (
                  <p className="absolute -bottom-6 font-['Mont-light'] text-[10px] text-[#ff3333]">
                    {formErrors.firstName}
                  </p>
                )}
              </>
            </div>
            <div className="relative flex w-full flex-col">
              <>
                <label className="ml-4">Registrant last name</label>
                <input
                  name="RegistrantLastName"
                  type="text"
                  required
                  maxLength={100}
                  minLength={1}
                  placeholder="Andreson"
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setLastNamePerson(event.target.value.trim());
                    setInfoForPerson((prevInfo) => ({
                      ...{
                        ...prevInfo,
                        RegistrantLastName: event.target.value.trim(),
                      },
                    }));
                  }}
                  className={`${formErrors.lastName && 'border-[#ff3333]'
                    }  mt-1 h-11 w-full rounded-lg border-2 border-lightGrey pl-2 text-sm text-darkGrey placeholder:pl-3 lg:h-12 lg:text-base`}
                />
                {formErrors.lastName && (
                  <p className="absolute -bottom-6 font-['Mont-light'] text-[10px] text-[#ff3333]">
                    {formErrors.lastName}
                  </p>
                )}
              </>
            </div>
          </div>
          <div className="mb-10 justify-between gap-x-20 text-darkGrey lg:flex">
            <div className="relative mb-10 flex w-full flex-col lg:mb-0">
              <>
                <label className="ml-4">Registrant organisation</label>
                <input
                  name="RegistrantOrganization"
                  type="text"
                  required
                  maxLength={100}
                  minLength={1}
                  placeholder="Layershift"
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setOrganizationPerson(event.target.value.trim());
                    setInfoForPerson((prevInfo) => ({
                      ...{
                        ...prevInfo,
                        RegistrantOrganization: event.target.value.trim(),
                      },
                    }));
                  }}
                  className={`${formErrors.organization && 'border-[#ff3333]'
                    } mt-1 h-11 w-full rounded-lg border-2 border-lightGrey pl-2 text-sm text-darkGrey placeholder:pl-3 lg:h-12 lg:text-base`}
                />
                {formErrors.organization && (
                  <p className="absolute -bottom-6 font-['Mont-light'] text-[10px] text-[#ff3333]">
                    {formErrors.organization}
                  </p>
                )}
              </>
            </div>
            <div className="relative mb-10 flex w-full flex-col lg:mb-0">
              <>
                <label className="ml-4">Registrant email address</label>
                <input
                  name="RegistrantEmailAddress"
                  type="email"
                  required
                  maxLength={100}
                  minLength={1}
                  placeholder="example@example.com"
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setEmailPerson(event.target.value.trim());
                    setInfoForPerson((prevInfo) => ({
                      ...{
                        ...prevInfo,
                        RegistrantEmailAddress: event.target.value.trim(),
                      },
                    }));
                  }}
                  className={`${formErrors.email && 'border-[#ff3333]'
                    } mt-1 h-11 w-full rounded-lg border-2 border-lightGrey pl-2 text-sm text-darkGrey placeholder:pl-3 lg:h-12 lg:text-base`}
                />
                {formErrors.email && (
                  <p className="absolute -bottom-6 font-['Mont-light'] text-[10px] text-[#ff3333]">
                    {formErrors.email}
                  </p>
                )}
              </>
            </div>
          </div>
          <div className="mb-10 justify-between gap-x-20 text-darkGrey lg:flex">
            <div className="relative mb-10 flex w-full flex-col lg:mb-0">
              <>
                <label className="ml-4">Registrant address</label>
                <input
                  name="RegistrantAddress1"
                  required
                  type="text"
                  maxLength={100}
                  minLength={1}
                  placeholder="Street Number and Name"
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setAddressPerson(event.target.value.trim());
                    setInfoForPerson((prevInfo) => ({
                      ...{
                        ...prevInfo,
                        RegistrantAddress1: event.target.value.trim(),
                      },
                    }));
                  }}
                  className={`${formErrors.address && 'border-[#ff3333]'
                    }  mt-1 h-11 w-full rounded-lg border-2 border-lightGrey pl-2 text-sm text-darkGrey placeholder:pl-3 lg:h-12 lg:text-base`}
                />
                {formErrors.address && (
                  <p className="absolute -bottom-6 font-['Mont-light'] text-[10px] text-[#ff3333]">
                    {formErrors.address}
                  </p>
                )}
              </>
            </div>
            <div className="relative flex w-full flex-col">
              <>
                <label className="ml-4">Registrant city</label>
                <input
                  name="RegistrantCity"
                  type="text"
                  required
                  maxLength={100}
                  minLength={1}
                  placeholder="Manchester"
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setCityPerson(event.target.value.trim());
                    setInfoForPerson((prevInfo) => ({
                      ...{
                        ...prevInfo,
                        RegistrantCity: event.target.value.trim(),
                      },
                    }));
                  }}
                  className={`${formErrors.city && 'border-[#ff3333]'
                    }  mt-1 h-11 w-full rounded-lg border-2 border-lightGrey pl-2 text-sm text-darkGrey placeholder:pl-3 lg:h-12 lg:text-base`}
                />
                {formErrors.city && (
                  <p className="absolute -bottom-6 font-['Mont-light'] text-[10px] text-[#ff3333]">
                    {formErrors.city}
                  </p>
                )}
              </>
            </div>
          </div>
          <div className="mb-10 justify-between gap-x-20 text-darkGrey lg:flex">
            <div className="relative mb-10 flex w-full flex-col lg:mb-0">
              <>
                <label className="ml-4">Registrant postal code</label>
                <input
                  name="RegistrantPostalCode"
                  type="text"
                  required
                  maxLength={100}
                  minLength={1}
                  placeholder="SW1W 0NY"
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setPostalCodePerson(event.target.value.trim());
                    setInfoForPerson((prevInfo) => ({
                      ...{
                        ...prevInfo,
                        RegistrantPostalCode: event.target.value.trim(),
                      },
                    }));
                  }}
                  className={`${formErrors.postalCode && 'border-[#ff3333]'
                    } mt-1 h-11 w-full rounded-lg border-2 border-lightGrey pl-2 text-sm text-darkGrey placeholder:pl-3 lg:h-12 lg:w-[70%] lg:text-base`}
                />
                {formErrors.postalCode && (
                  <p className="absolute -bottom-6 font-['Mont-light'] text-[10px] text-[#ff3333]">
                    {formErrors.postalCode}
                  </p>
                )}
              </>
            </div>
            <div className="select-country relative  mb-10 flex w-full flex-col lg:mb-0">
              <>
                <label className="ml-4">Registrant country</label>
                <select
                  name="RegistrantCountry"
                  className={`${formErrors.country && 'border-[#ff3333]'
                    } scrollbar mt-1 h-11 w-full rounded-lg border-2 border-solid border-lightGrey bg-white pl-2 text-sm text-darkGrey placeholder:pl-3 lg:h-12 lg:text-base`}
                  onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                    setCountryPerson(event.target.value);
                    setInfoForPerson((prevInfo) => ({
                      ...{
                        ...prevInfo,
                        RegistrantCountry: event.target.value,
                      },
                    }));
                  }}
                >
                  <option value=""></option>
                  {CountryList.map((dropdownCountry) => (
                    <option
                      key={dropdownCountry.code}
                      value={dropdownCountry.code}
                      className="cursor-pointer bg-white py-2 px-4 font-['Mont-semibold'] text-base text-darkGrey hover:bg-purple/10 hover:text-purple"
                    >
                      {dropdownCountry.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-2 bottom-2 z-0">
                  <Image
                    alt="image"
                    src={arrowfull.src}
                    height={10}
                    width={10}
                  />
                </div>
                {formErrors.country && (
                  <p className="absolute -bottom-6 font-['Mont-light'] text-[10px] text-[#ff3333]">
                    {formErrors.country}
                  </p>
                )}
              </>
            </div>
          </div>
          <div className="flex flex-col ">
            <>
              {additionalQuestions.map((question) => (
                <div key={question.Name}>
                  <div className="flex w-full justify-between ">
                    {question.Options &&
                      question.Options.Option.length > 0 &&
                      question.IsChild === '0' && (
                        <div className="relative  flex w-full flex-col">
                          <div className="mb-5 flex flex-col justify-center ">
                            <label
                              className="pb-2 pt-8  text-lg"
                              htmlFor={question.Name}
                            >
                              {question.Description}
                            </label>
                          </div>
                          <select
                            className="mt-1 h-11 w-full rounded-lg border-2 border-lightGrey bg-white pl-2 text-sm text-darkGrey lg:h-12 lg:text-base"
                            defaultValue=""
                            name={question.Name}
                            onChange={(
                              event: ChangeEvent<HTMLSelectElement>
                            ) => {
                              onChangeHandlerSelect(
                                question.Name,
                                event.target.value,
                                question.Options.Option
                              );
                            }}
                          >
                            <option value="" disabled>
                              Select
                            </option>
                            {question.Options.Option.map((option: any) => (
                              <option
                                key={option.Title}
                                value={option.Required}
                              >
                                {option.Title}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                  </div>
                  {!question.Options && question.IsChild == '0' && (
                    <div className="flex w-full  flex-col items-start pt-8 text-lg">
                      <>
                        <label htmlFor={question.Name}>
                          {question.Description}
                        </label>
                        <input
                          className="mt-2 h-10 w-full rounded-lg bg-white pl-2"
                          required
                          onChange={(
                            event: ChangeEvent<HTMLInputElement>
                          ) => {
                            onChangeHandlerInput(
                              question.Name,
                              event.target.value
                            );
                          }}
                          name={question.Name}
                        />
                      </>
                    </div>
                  )}
                  {!question.Options &&
                    question.IsChild === '1' &&
                    parentQuestions.find(
                      (answer) => answer.childQuestion === question.Name
                    ) && (
                      <div>
                        <>
                          <label
                            className=" flex flex-col  pt-8 text-lg "
                            htmlFor={question.Name}
                          >
                            {question.Description}
                          </label>
                          <input
                            className="mt-2 h-10 w-full rounded-lg bg-white pl-2"
                            required
                            onChange={(
                              event: ChangeEvent<HTMLInputElement>
                            ) => {
                              onChangeHandlerInput(
                                question.Name,
                                event.target.value
                              );
                            }}
                            name={question.Name}
                          />
                        </>
                      </div>
                    )}
                  {question.Options &&
                    question.IsChild === '1' &&
                    parentQuestions.find(
                      (answer) => answer.childQuestion === question.Name
                    ) && (
                      <div className=" pt-8 text-lg">
                        <>
                          <label htmlFor={question.Name}>
                            {question.Description}
                          </label>
                          <select
                            className=" h-10  rounded-lg bg-white pl-2 "
                            defaultValue=""
                            name={question.Name}
                            onChange={(
                              event: ChangeEvent<HTMLSelectElement>
                            ) => {
                              onChangeHandlerSelect(
                                question.Name,
                                event.target.value,
                                question.Options.Option
                              );
                            }}
                          >
                            <option value="" disabled>
                              Select
                            </option>
                            {question.Options.Option.map((option: any) => (
                              <option
                                key={option.Title}
                                value={option.Required}
                              >
                                {option.Title}
                              </option>
                            ))}
                          </select>
                        </>
                      </div>
                    )}
                </div>
              ))}
            </>
          </div>
          <div className="relative mt-5 mb-4 flex w-full flex-col justify-center gap-x-2 md:flex-row">
            <div className="mt-3 text-center">
              <span>
                <button
                  className="justify-center rounded-full border-2 border-purple bg-white px-[42px] py-[12px] font-['Mont-semibold'] text-base  text-purple transition duration-500 hover:border-2   hover:border-purple hover:bg-purple hover:text-white md:text-base"
                  onClick={(event: any) => (
                    (//Add Core Attributes if you need them here.
                    handlePost(answeredQuestions as any, postRequests), onClickAddToCartFinalDomain(
                      domainCart,
                      type,
                      infoForPerson,
                      answeredQuestions
                    ), event.preventDefault()) //Not to refresh the page. Used for testing purposes, you will probably need to adapt this part.
                  )}
                  disabled={isAdded}
                >
                  {isLoading ? (
                    <div className="spinner flex gap-2" id="spinner">
                      Add to cart{' '}
                      <Image
                        className="animate-spin"
                        alt="image"
                        src={animation.src}
                        height={25}
                        width={25}
                        layout="fixed"
                      />
                    </div>
                  ) : (
                    'Add to cart'
                  )}
                </button>
              </span>
              {isSubmitted && <AddToCartPopUp />}
              {!addressPerson ||
                !cityPerson ||
                !countryPerson ||
                !emailPerson ||
                !firstNamePerson ||
                !lastNamePerson ||
                !organizationPerson ||
                (!postalCodePerson && (
                  <div className="absolute pl-2 pt-2 text-xs font-extrabold text-pink">
                    All input fields must be filled.
                  </div>
                ))}
              {errorMessage && (
                <ErrorAddToCartPopUp message="Some fields are incorrect. Please review and correct the highlighted errors." />
              )}
            </div>
          </div>
        </div>
      </form>
    </>);
  }
  return <div />;
};

export default TestingModal;
