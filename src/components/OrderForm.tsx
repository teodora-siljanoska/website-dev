import React, { useContext, useEffect, useState } from 'react';
import Button from './Button';
import Image from 'next/legacy/image';
import plus from './assets/plus-button.svg';
import x from './assets/x.svg';
import CartContext from '@utils/contexts/cartContext';
import { CustomVpsInterface } from '@pages/vps/types';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Ribbons from './assets/opacity-ribbons.svg';
import * as Sentry from "@sentry/nextjs";

interface FormData {
  domainName: any;
  email: any;
  fullName: any;
  companyName?: any;
  emailTo?: any;
  domainNames: string[];
  sslOption?: string;
  phone?: string;
}
interface P {
  emailTo?: any;
  formType?: 'domain' | 'ssl' | 'identity';
  selectedSSLCard?: any;
  setIsOrderFormOpen: (isOpen: boolean) => void;
  setIsDomainFormOpen: (isOpen: boolean) => void;
  setIsIdFormOpen: (isOpen: boolean) => void;
  setIsSubmitted?: (isSubmitted: boolean) => void;
}

function OrderForm({
  emailTo,
  formType,
  selectedSSLCard,
  setIsOrderFormOpen,
  setIsDomainFormOpen,
  setIsSubmitted,
  setIsIdFormOpen,
}: P): JSX.Element {
  const [alertT, setAlertT] = useState(false);

  const { cartItems, setCartItems } = useContext(CartContext);
  const [productForCart, setProductForCart] = useState<CustomVpsInterface>();
  const [FormData, setFormData] = useState<FormData>({
    domainName: '',
    companyName: '',
    emailTo: { emailTo }, // Set emailTo to the desired value
    email: '',
    fullName: '',
    domainNames: ['', '', ''],
    sslOption: '',
    phone: '',
  });
  const [errors, setErrors] = useState<FormData>({
    domainName: '',
    companyName: '',
    email: '',
    fullName: '',
    domainNames: ['', '', ''],
    emailTo: { emailTo }, // Set emailTo to the desired value
    phone: '',
  });

  useEffect(() => {
    if (selectedSSLCard !== undefined) {
      setProductForCart({
        timePeriod: 'Yearly',
        totalPrice: selectedSSLCard.attributes.price,
        selectedCurrency: selectedSSLCard.attributes.currency,
        vmPlan: {
          sku: selectedSSLCard.attributes.product.data.attributes.sku,
          skuMonthly: '',
          skuYearly: selectedSSLCard.attributes.sku,
          title: selectedSSLCard.attributes.product.data.attributes.title,
          monthlyPrice: 0,
          yearlyPrice: selectedSSLCard.attributes.price,
          domain: FormData.domainName,
        },
        addons: [],
        numericalAddons: [],
        domain: {
          domainName: FormData.domainName,
        },
      });
    }
  }, [selectedSSLCard, FormData.domainName]);

  const onClickAddToCart = (newVPS: CustomVpsInterface | undefined) => {
    if (!FormData.domainName.trim()) {
      // Display an error message or handle the empty domainName case as needed
      console.error('Domain name is required');
      return;
    }

    const start: CustomVpsInterface[] = [];
    if (localStorage.getItem('SELECTED_CART_ITEMS') === null) {
      localStorage.setItem('SELECTED_CART_ITEMS', JSON.stringify(start));
    }
    if (localStorage.getItem('SELECTED_CART_ITEMS') !== null) {
      start.push(
        ...(JSON.parse(
          localStorage.getItem('SELECTED_CART_ITEMS') ?? ''
        ) as CustomVpsInterface[])
      );
    }

    setCartItems([
      ...start,
      {
        addons: [],
        numericalAddons: [],
        selectedCurrency: newVPS?.selectedCurrency || '',
        timePeriod: newVPS?.timePeriod || 'Yearly',
        totalPrice: newVPS?.totalPrice || 0,
        vmPlan: newVPS?.vmPlan,
        domain: {
          domainName: newVPS?.domain?.domainName,
        },
      },
    ]);
    localStorage.setItem(
      'SELECTED_CART_ITEMS',
      JSON.stringify([
        ...start,
        {
          addons: newVPS?.addons ?? [],
          numericalAddons: newVPS?.numericalAddons || [],
          selectedCurrency: newVPS?.selectedCurrency || '',
          timePeriod: newVPS?.timePeriod || 'Monthly',
          totalPrice: newVPS?.totalPrice,
          vmPlan: newVPS?.vmPlan,
          domain: {
            domainName: newVPS?.domain?.domainName,
          },
        },
      ])
    );
    //console.log('Added to cart successfully');
    if (setIsSubmitted) {
      setIsSubmitted(true);
    }
    setIsOrderFormOpen(false);
    setIsDomainFormOpen(false);
    if (setIsSubmitted) {
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }
  };

  const handleImageClick = () => {
    setIsOrderFormOpen(false);
    setIsDomainFormOpen(false);
    setIsIdFormOpen(false);
  };

  const handleAddDomainName = () => {
    setFormData((prevState) => ({
      ...prevState,
      domainNames: [...prevState.domainNames, ''], // Add a new empty domain name
    }));
  };

  const handleDomainNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;
    setFormData((prevState) => {
      const updatedDomainNames = [...prevState.domainNames];
      updatedDomainNames[index] = value;
      return {
        ...prevState,
        domainNames: updatedDomainNames,
      };
    });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    const errors: any = {};
    let formIsValid = true;

    if (!FormData.fullName.trim()) {
      errors.fullName = 'Full name is required';
      formIsValid = false;
    }

    if (!FormData.email.trim()) {
      errors.email = 'Email address is required';
      formIsValid = false;
    } else if (/\s/.test(FormData.email)) {
      errors.email = 'Email address cannot contain blank spaces';
      formIsValid = false;
    }

    if (
      formType === 'domain' ||
      (formType === 'ssl' && !FormData.domainName.trim())
    ) {
      errors.domainName = 'Domain name is required';
      formIsValid = false;
    }

    if (formType === 'identity') {
      // Check if all initial domain names are empty strings
      if (
        FormData.domainNames.slice(0, 3).some((name) => !name.trim()) ||
        FormData.domainNames.length < 3
      ) {
        errors.domainNames = 'You need to fill all three initial domain names';
        formIsValid = false;
      }
    }

    if (formType === 'ssl' && !FormData?.sslOption?.trim()) {
      errors.sslOption = 'Please select one of the options above';
      formIsValid = false;
    }

    if (!FormData.companyName.trim()) {
      errors.companyName = 'Company name is required';
      formIsValid = false;
    }

    //console.log('FormData', FormData);
    console.log('errors', errors);

    setErrors(errors);

    if (formIsValid) {
      //console.log('is valid');
      try {
        const res = await fetch('/api/sendOrder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(FormData),
          credentials: 'same-origin',
        });
        console.log(res);
        if (res.status === 200) {
          setAlertT(true);
        } else {
          console.error('Error sending message.');
        }
      } catch (error) {
        Sentry.captureException(error);
      }

      setFormData({
        fullName: '',
        email: '',
        companyName: '',
        domainName: '',
        domainNames: [],
      });
    }
  };

  const handleChange = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    const updatedFormData = {
      ...FormData,
      fullName:
        name === 'name' ? value.replace(/\s{2,}$/g, ' ') : FormData.fullName,
      email: name === 'email' ? value : FormData.email,
      companyName:
        name === 'company'
          ? value.replace(/\s{2,}$/g, ' ')
          : FormData.companyName,
      domainName: name === 'domainName' ? value : FormData.domainName,
      phone: name === 'phone' ? value : FormData.phone,
    };

    setFormData(updatedFormData);
  };

  useEffect(() => {
    function handleEscPress(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setAlertT(false);
        document.body.style.overflow = 'auto';
      }
    }
    function handleClickOutside(event: MouseEvent) {
      const modal = document.querySelector('.modal');
      if (modal && !modal.contains(event.target as Node)) {
        setAlertT(false);
        document.body.style.overflow = 'auto';
      }
    }
    document.addEventListener('keydown', handleEscPress);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleEscPress);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setAlertT]);

  return (
    <div className="">
      <form
        style={
          alertT
            ? {
              backgroundImage: `url("${Ribbons.src as string}")`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }
            : {}
        }
        action="/"
        className={`scrollbar-hidden glow-form fixed  top-1/2 left-1/2 z-50 mx-auto box-border h-fit w-full -translate-x-1/2 -translate-y-1/2 overflow-y-scroll bg-white smallest:rounded-none md:rounded-2xl xl:w-[1155px] ${alertT && 'py-[120px] md:max-h-[50%]'
          } `}
        onSubmit={handleSubmit}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}
      >
        <div
          className={`mb-[60px] flex justify-end pr-[10px] pt-[10px] ${alertT ? 'hidden' : 'block'
            }`}
        >
          <Image
            src={x.src}
            height={25}
            width={25}
            alt="x"
            onClick={handleImageClick}
            className="cursor-pointer"
          />
        </div>
        {alertT && (
          <div className='grid justify-items-start px-10 font-["Mont-regular"] md:justify-items-center md:px-0 '>
            <div className="font-['Mont-semibold'] text-[30px] text-purple">
              THANK YOU!
            </div>
            <div className="font-['Mont-book'] text-[30px] text-darkGrey">
              FOR SUBMITTING YOUR REQUEST!
            </div>
            <div className="pt-5 pb-16 font-['Mont-book'] text-[20px] text-darkGrey">
              A specialist from our SSL team with be in touch with you today, or
              within one business day.
            </div>
            <Button
              color="primary"
              cta="Okay"
              clickHandler={handleImageClick}
            />
          </div>
        )}
        <div className={`${alertT ? 'hidden' : 'block'}`}>
          {formType === 'domain' && (
            <div
              className={`mx-auto mb-16 flex flex-col items-center px-0 md:px-[40px] xl:px-[95px] ${alertT ? 'hidden' : ''
                }`}
            >
              <label className='mb-[65px] font-["Mont-semibold"] text-[28px] text-[#9D64A9] smallest:mx-[20px] md:mx-0'>
                Please fill out the info below
              </label>
              <div className="mb-[50px] box-border bg-[#F6EFF6] px-[15px] py-[70px] smallest:rounded-none md:rounded-[3px] md:px-[265px]">
                <p className='mb-[29px] font-["Mont-regular"] text-[19px]'>
                  What domain name would you like to secure?
                </p>

                <div className="mx-auto max-w-[397px]">
                  <p className='pl-[16px] font-["Mont-regular"] text-[18px]'>
                    Domain name
                  </p>
                  <span>
                    <input
                      placeholder="www.example.com"
                      type="text"
                      name="domainName"
                      value={FormData.domainName.trim()}
                      onChange={handleChange}
                      className="mt-[3px box-border w-full rounded-[5px] border-2 border-solid border-[#E1E1E1] p-3"
                    />
                  </span>
                  {errors && (
                    <p className=" left-4 text-xs text-[#dc2626]">
                      Domain name is required!
                    </p>
                  )}
                </div>
              </div>
              <Button
                color="primary"
                cta="Add to cart"
                clickHandler={() => onClickAddToCart(productForCart)}
              />
            </div>
          )}

          {formType === 'ssl' && (
            <div
              className={` mx-auto mb-16 box-border flex flex-col items-center px-0 md:px-[40px] xl:px-[95px] ${alertT && 'hidden'
                }`}
            >
              <label className='mb-[65px] font-["Mont-semibold"] text-[28px] text-[#9D64A9] smallest:mx-[20px] md:mx-0'>
                Please fill out the info below
              </label>

              <div className="mb-[50px] box-border w-full rounded-[3px] bg-[#F6EFF6] px-[15px] pt-[44px] pb-[80px] md:px-[46px]">
                <div className="ml-[10px] mb-[40px] grid w-full">
                  <label className="mt-2 inline-flex items-center">
                    <input
                      type="radio"
                      name="sslOption"
                      value="Organisation Validated"
                      className="form-radio h-5 w-5  border-[#9D64A9] checked:border-transparent checked:bg-[#9D64A9] hover:border-[#9D64A9]"
                      onChange={() =>
                        setFormData({
                          ...FormData,
                          sslOption: 'Organisation Validated',
                        })
                      }
                    />
                    <span className='ttext-black ml-2 font-["Mont-regular"] text-[16px]'>
                      Organisation Validated
                    </span>
                  </label>
                  <label className="mt-2 inline-flex items-center">
                    <input
                      type="radio"
                      name="sslOption"
                      value="Extended Validated"
                      className="form-radio h-5 w-5  border-[#9D64A9] checked:border-transparent checked:bg-[#9D64A9] hover:border-[#9D64A9]"
                      onChange={() =>
                        setFormData({
                          ...FormData,
                          sslOption: 'Extended Validated',
                        })
                      }
                    />
                    <span className='ml-2 font-["Mont-regular"] text-[16px] text-black'>
                      Extended Validated
                    </span>
                  </label>
                  {errors.sslOption && (
                    <p className="left-4 pt-5 text-xs text-[#dc2626]">
                      {errors.sslOption}
                    </p>
                  )}
                </div>
                <div className="mb-[50px] flex flex-col gap-[20px]">
                  <div className={`mx-[10px] grid md:flex`}>
                    <div className="w-full ">
                      <p className='pl-[16px] font-["Mont-regular"] text-[18px]'>
                        Full name
                      </p>
                      <span>
                        <input
                          placeholder="Jon Doe"
                          type="text"
                          name="name"
                          value={FormData.fullName}
                          onChange={handleChange}
                          className="mt-[3px] mb-[20px] box-border w-full max-w-[397px] rounded-[5px] border-2 border-solid border-[#E1E1E1] p-3 md:mb-0"
                        />
                      </span>
                      {errors.fullName && (
                        <p className=" left-4 text-xs text-[#dc2626]">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div className="w-full ">
                      <p className='pl-[16px] font-["Mont-regular"] text-[18px]'>
                        Email address
                      </p>
                      <span>
                        <input
                          placeholder="email@email.com"
                          type="email"
                          name="email"
                          value={FormData.email.trim()}
                          onChange={handleChange}
                          className="mt-[3px] box-border w-full max-w-[397px] rounded-[5px] border-2 border-solid border-[#E1E1E1] p-3"
                        />
                      </span>
                      {errors.email && (
                        <p className=" left-4 text-xs text-[#dc2626]">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className={`mx-[10px] grid md:flex`}>
                    <div className="w-full ">
                      <p className='pl-[16px] font-["Mont-regular"] text-[18px]'>
                        Company name (Official Trading Name)
                      </p>
                      <span>
                        <input
                          placeholder="Company name LTD"
                          type="text"
                          name="company"
                          value={FormData.companyName}
                          onChange={handleChange}
                          className="mt-[3px] mb-[20px] box-border w-full max-w-[397px] rounded-[5px] border-2 border-solid border-[#E1E1E1] p-3 md:mb-0"
                        />
                      </span>
                      {errors.companyName && (
                        <p className=" left-4 text-xs text-[#dc2626]">
                          Company name is required!
                        </p>
                      )}
                    </div>

                    <div className="w-full ">
                      <p className='pl-[16px] font-["Mont-regular"] text-[18px]'>
                        Telephone number
                      </p>
                      <span>
                        <div className="flex flex-row items-end justify-between gap-1 sm:justify-start">
                          <PhoneInput
                            flagUrl={'/flags/{XX}.svg'}
                            international
                            countryCallingCodeEditable={true}
                            value={FormData.phone}
                            onChange={(phone) =>
                              setFormData((prevState) => ({
                                ...prevState,
                                phone: phone,
                              }))
                            }
                          />
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="ml-[10px] max-w-[397px]">
                    <p className="pl-[16px] font-['Mont-regular'] text-[18px]">
                      Domain name
                    </p>
                    <input
                      placeholder="www.example.com"
                      type="text"
                      name="domainName"
                      value={FormData.domainName}
                      onChange={handleChange}
                      className="my-[3px] box-border w-full rounded-[5px] border-2 border-solid border-[#E1E1E1] p-3"
                    />
                  </div>
                  {errors.domainName && (
                    <p className=" left-4 text-xs text-[#dc2626]">
                      {errors.domainName}
                    </p>
                  )}
                </div>
              </div>
              <Button
                color="primary"
                cta="Submit"
                clickHandler={(e) => handleSubmit(e)}
              />
            </div>
          )}
          {formType === 'identity' && (
            <div
              className={`mx-auto mb-16 box-border flex flex-col items-center px-0 md:px-[40px] xl:px-[95px] ${alertT && 'hidden'
                }`}
            >
              <label className=' mb-[25px] font-["Mont-semibold"] text-[28px] text-[#9D64A9] smallest:mx-[20px] md:mx-0'>
                Please fill out the info below
              </label>
              <div className=" box-border w-full bg-[#F6EFF6] px-[15px] pt-[44px] pb-[80px] smallest:rounded-none md:rounded-[3px] md:px-[46px]">
                {
                  <div className="mb-[50px] flex flex-col gap-[20px]">
                    <div className={`mx-[10px] grid md:flex`}>
                      <div className="w-full ">
                        <p className='pl-[16px] font-["Mont-regular"] text-[18px]'>
                          Full name
                        </p>
                        <span>
                          <input
                            placeholder="Jon Doe"
                            type="text"
                            name="name"
                            value={FormData.fullName}
                            onChange={handleChange}
                            className="mt-[3px] mb-[20px] box-border w-full max-w-[397px] rounded-[5px] border-2 border-solid border-[#E1E1E1] p-3 md:mb-0"
                          />
                        </span>
                        {errors.fullName && (
                          <p className=" left-4 text-xs text-[#dc2626]">
                            {errors.fullName}
                          </p>
                        )}
                      </div>

                      <div className="w-full ">
                        <p className='pl-[16px] font-["Mont-regular"] text-[18px]'>
                          Email address
                        </p>
                        <span>
                          <input
                            placeholder="email@email.com"
                            type="text"
                            name="email"
                            value={FormData.email}
                            onChange={handleChange}
                            className="mt-[3px] box-border w-full max-w-[397px] rounded-[5px] border-2 border-solid border-[#E1E1E1] p-3"
                          />
                        </span>
                        {errors.email && (
                          <p className=" left-4 text-xs text-[#dc2626]">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className={`mx-[10px] grid md:flex`}>
                      <div className="w-full ">
                        <p className='pl-[16px] font-["Mont-regular"] text-[18px]'>
                          Company name (Official Trading Name)
                        </p>
                        <span>
                          <input
                            placeholder="Company name LTD"
                            type="text"
                            name="company"
                            value={FormData.companyName}
                            onChange={handleChange}
                            className="mt-[3px] box-border w-full max-w-[397px] rounded-[5px] border-2 border-solid border-[#E1E1E1] p-3"
                          />
                        </span>
                        {errors.companyName && (
                          <p className=" left-4 text-xs text-[#dc2626]">
                            Company name is required!
                          </p>
                        )}
                      </div>
                      <div className="w-full ">
                        <p className='pl-[16px] font-["Mont-regular"] text-[18px]'>
                          Telephone number
                        </p>
                        <div className="flex flex-row items-end justify-between gap-1 sm:justify-start">
                          <PhoneInput
                            flagUrl={'/flags/{XX}.svg'}
                            international
                            countryCallingCodeEditable={true}
                            value={FormData.phone}
                            onChange={(phone) =>
                              setFormData((prevState) => ({
                                ...prevState,
                                phone: phone,
                              }))
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                }

                <div>
                  <div className="ml-[10px] max-w-[397px]">
                    <p className="pl-[16px] font-['Mont-regular'] text-[18px]">
                      Domain name
                    </p>
                    {FormData.domainNames.map((domainName, index) => (
                      <span key={index}>
                        <input
                          placeholder="www.example.com"
                          type="text"
                          name="domainName"
                          value={domainName}
                          onChange={(e) => handleDomainNameChange(e, index)}
                          className="my-[3px] box-border w-full rounded-[5px] border-2 border-solid border-[#E1E1E1] p-3"
                        />
                      </span>
                    ))}
                    {errors.domainNames && (
                      <p className="left-4 text-xs text-[#dc2626]">
                        {errors.domainNames}
                      </p>
                    )}
                  </div>
                  <div
                    onClick={handleAddDomainName}
                    className="ml-[20px] flex w-fit max-w-[397px] cursor-pointer items-center justify-start gap-3 pt-[10px]"
                  >
                    <Image src={plus.src} height={37} width={37} alt="plus" />
                    <p>Add Domain</p>
                  </div>
                </div>
              </div>
              <Button
                color="primary"
                cta="Submit"
                clickHandler={(e) => handleSubmit(e)}
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default OrderForm;
