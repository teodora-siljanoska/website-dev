import React, { useEffect, useState } from 'react';
import Button from './Button';
import ThankYouMessage from './ThankYouMessage';
import arrow from './assets/arrowService.svg';
import Image from 'next/legacy/image';
import ContactThankYou from './ContactThankYou';
import ErrorForm from './ErrorPop';
import * as Sentry from '@sentry/nextjs';
import HCaptcha from '@hcaptcha/react-hcaptcha';

interface FormData {
  name: any;
  email: any;
  message: any;
  service?: any;
  company?: any;
}
interface P {
  emailTo?: any;
  buttonCta?: string;
}

function ContactForm({ emailTo, buttonCta }: P): JSX.Element {
  const [alertT, setAlertT] = useState(false);
  const [isErrorFormOpen, setIsErrorFormOpen] = useState(false);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  console.log('captchaValue', captchaValue);

  const [FormData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    service: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormData>({
    name: '',
    company: '',
    service: '',
    email: '',
    message: '',
  });

  const handleServiceChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...FormData,
      [name]: value,
    });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    const errors: any = {};
    let formIsValid = true;

    if (!FormData.name) {
      formIsValid = false;
      errors.name = 'Name is required';
    }
    if (!FormData.company) {
      formIsValid = false;
      errors.company = 'Company is required';
    }
    if (!FormData.service) {
      formIsValid = false;
      errors.service = 'Service is required';
    }
    if (!FormData.email) {
      formIsValid = false;
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(FormData.email)) {
      formIsValid = false;
      errors.email = 'Email is invalid';
    }

    if (!FormData.message) {
      formIsValid = false;
      errors.message = 'Message is required';
    }

    setErrors(errors);

    // Submit form data if valid
    if (formIsValid) {
      try {
        const res = await fetch('/api/sendMail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(FormData),
          credentials: 'same-origin',
        });

        if (res.status === 200) {
          setAlertT(true);
          openEmailForm();
          setTimeout(() => {
            setAlertT(false);
          }, 3000);
        } else {
          setIsErrorFormOpen(true);
        }
      } catch (error) {
        Sentry.captureException(error);
      }

      setFormData({
        name: '',
        email: '',
        message: '',
        service: '',
        company: '',
      });
    }
  };

  const handleChange = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    const updatedFormData = {
      ...FormData,
      name: name === 'name' ? value.replace(/\s{2,}$/g, ' ') : FormData.name,
      email: name === 'email' ? value.trim() : FormData.email,
      message:
        name === 'message' ? value.replace(/\s{2,}$/g, ' ') : FormData.message,
      service: name === 'service' ? value : FormData.service,
      company:
        name === 'company' ? value.replace(/\s{2,}$/g, ' ') : FormData.company,
    };

    setFormData(updatedFormData);
  };

  useEffect(() => {
    function handleEscPress(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setAlertT(false);
      }
    }
    function handleClickOutside(event: MouseEvent) {
      const modal = document.querySelector('.modal');
      if (modal && !modal.contains(event.target as Node)) {
        setAlertT(false);
      }
    }
    document.addEventListener('keydown', handleEscPress);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleEscPress);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setAlertT]);
  const [isEmailFormOpen, setIsEmailFormOpen] = useState(false);

  const openEmailForm = () => {
    setIsEmailFormOpen(true);
  };

  const closeEmailForm = () => {
    setIsEmailFormOpen(false);
  };
  return (
    <div>
      <form action="/" className="bg-transparent" onSubmit={handleSubmit}>
        <div>
          <div className="mt-[50px] gap-x-[30px] smallest:grid md:flex">
            <div className=" flex basis-1/2 flex-col md:gap-y-6">
              <div>
                <label
                  htmlFor="name"
                  className='pl-4 font-["Mont-regular"] text-lg leading-[23px] text-darkGrey'
                >
                  First & Last Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={FormData.name}
                  onChange={handleChange}
                  placeholder="Andre Andreson"
                  className="mb-8 w-full rounded-xl border-2 border-lightGrey bg-white py-3 pl-4 text-base md:mb-0"
                />
                {errors.name && (
                  <div className="text-sm text-formDarkPink">{errors.name}</div>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className='pl-4 font-["Mont-regular"] text-lg leading-[23px] text-darkGrey'
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={FormData.email}
                  onChange={handleChange}
                  placeholder="ex. example@example.com"
                  className="mb-8 w-full rounded-xl border-2 border-lightGrey bg-white py-3 pl-4 text-base md:mb-0"
                />
                {errors.email && (
                  <div className="text-sm text-formDarkPink">
                    {errors.email}
                  </div>
                )}
              </div>
            </div>
            <div className="flex basis-1/2 flex-col md:gap-y-6">
              <div>
                <label
                  htmlFor="company"
                  className='pl-4 font-["Mont-regular"] text-lg leading-[23px] text-darkGrey'
                >
                  Registered Business Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={FormData.company}
                  onChange={handleChange}
                  placeholder="ex. Company Name"
                  className="mb-8 w-full rounded-xl border-2 border-lightGrey bg-white py-3 pl-4 text-base md:mb-0"
                />
                {errors.company && (
                  <div className="text-sm text-formDarkPink">
                    {errors.company}
                  </div>
                )}
              </div>
              <div className="service-select relative">
                <label
                  htmlFor="service"
                  className='pl-4 font-["Mont-regular"] text-lg leading-[23px] text-darkGrey'
                >
                  Service
                </label>
                <div
                  className={`absolute bottom-11 right-3  ${
                    errors.service ? 'md:bottom-8' : 'md:bottom-3'
                  } `}
                >
                  <Image
                    src={arrow}
                    alt="icon"
                    width={10}
                    height={10}
                    className=""
                  />
                </div>

                <select
                  id="service"
                  name="service"
                  value={FormData.service}
                  onChange={handleServiceChange}
                  className="mb-8 w-full rounded-xl border-2 border-solid border-lightGrey bg-white py-3 pl-4 font-['Mont-regular'] text-base	md:mb-0"
                >
                  <option
                    onChange={() =>
                      setFormData({
                        ...FormData,
                        service: 'None',
                      })
                    }
                    value="None"
                  ></option>
                  <option
                    onChange={() =>
                      setFormData({
                        ...FormData,
                        service: 'Agency Hosting',
                      })
                    }
                    value="Agency Hosting"
                  >
                    Agency Hosting
                  </option>
                  <option
                    onChange={() =>
                      setFormData({
                        ...FormData,
                        service: 'VPS',
                      })
                    }
                    value="VPS"
                  >
                    VPS
                  </option>
                  <option
                    onChange={() =>
                      setFormData({
                        ...FormData,
                        service: 'Fully Managed VPS',
                      })
                    }
                    value="Fully Managed VPS"
                  >
                    Fully Managed VPS
                  </option>
                  <option
                    onChange={() =>
                      setFormData({
                        ...FormData,
                        service: 'Enscale PaaS Hosting',
                      })
                    }
                    value="Enscale PaaS Hosting"
                  >
                    Enscale PaaS Hosting
                  </option>
                  <option
                    onChange={() =>
                      setFormData({
                        ...FormData,
                        service: 'Ehlo Mail',
                      })
                    }
                    value="Ehlo Mail"
                  >
                    Ehlo Mail
                  </option>
                  <option
                    onChange={() =>
                      setFormData({
                        ...FormData,
                        service: 'SSL Certificates',
                      })
                    }
                    value="SSL Certificates"
                  >
                    SSL Certificates
                  </option>
                  <option
                    onChange={() =>
                      setFormData({
                        ...FormData,
                        service: 'Domains',
                      })
                    }
                    value="Domains"
                  >
                    Domains
                  </option>
                  <option
                    onChange={() =>
                      setFormData({
                        ...FormData,
                        service: 'Other',
                      })
                    }
                    value="Other"
                  >
                    Other
                  </option>
                </select>
                {errors.service && (
                  <div className="text-sm text-formDarkPink">
                    {errors.service}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="pt-6">
          <label
            htmlFor="message"
            className='pl-4 font-["Mont-regular"] text-lg leading-[23px] text-darkGrey'
          >
            Details
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={FormData.message}
            onChange={handleChange}
            placeholder="Please provide as much information as possible."
            className="mb-8 min-h-[300px] w-full rounded-xl border-2 border-lightGrey bg-white py-3 pl-4 text-base md:mb-[0px]"
          ></textarea>
          {errors.message && (
            <div className="text-sm text-formDarkPink">{errors.message}</div>
          )}
        </div>
        <HCaptcha
          sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_KEY!}
          onVerify={setCaptchaValue}
        />
        <div className="flex smallest:justify-center md:justify-end">
          {captchaValue && (
            <button
              type="submit"
              className="min-w-[220px] rounded-full border-2 border-purple bg-purple px-[35px]  py-[12px] text-base font-['Mont-semibold'] text-white transition  duration-500 hover:border-2 hover:border-purple hover:bg-transparent hover:text-purple lg:px-[40px] lg:py-[13px]"
            >
              {buttonCta ?? ''}
            </button>
          )}
        </div>
      </form>
      {isEmailFormOpen && <ContactThankYou closeEmailForm={closeEmailForm} />}
      {isErrorFormOpen && (
        <ErrorForm
          message={`Error sending message.`}
          emailError={false}
          closeError={() => setIsErrorFormOpen(false)}
        />
      )}
      {/* {alertT && <ThankYouMessage />} */}
    </div>
  );
}

export default ContactForm;
