import React, { useEffect, useState } from 'react';
import Button from './Button';
import Image from 'next/legacy/image';
import x from './assets/x.svg';
import { useRouter } from 'next/router';
import Ribbons from './assets/opacity-ribbons.svg';
import * as EmailValidator from 'email-validator';
import animation from '../../src/components/assets/loader-grey.svg';

interface FormData {
  email: any;
}
interface P {
  closeEmailForm: any; // Define the prop typ
}

const loginUrl = new URL(process.env.NEXT_PUBLIC_LOGIN_URL?.toString() ?? '');

function EnterEmail({ closeEmailForm }: P): JSX.Element {
  const router = useRouter();
  const [alertT, setAlertT] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [FormData, setFormData] = useState<FormData>({
    email: '',
  });

  const [errors, setErrors] = useState<FormData>({
    email: '',
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    const errors: any = {};
    let formIsValid = true;

    const res = EmailValidator.validate(FormData.email);

    if (res === true) {
      formIsValid = true;
    } else if (res === false) {
      formIsValid = false;
      errors.email = 'Please enter a valid email address';
    }
    console.log('errors', errors.email);

    function isValidEmail(email: any) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        return false; // Basic format check failed
      }

      // Additional checks for common issues
      const specialCharsRegex = /[&=_\-'<>,]/;
      const consecutiveDotsRegex = /\.\./;

      if (specialCharsRegex.test(email) || consecutiveDotsRegex.test(email)) {
        return false; // Additional checks failed
      }

      return true;
    }

    setErrors(errors);

    // Submit form data if valid
    if (formIsValid) {
      setIsLoading(true);
      const apiEndpoint =
        process.env.NEXT_PUBLIC_STRAPI_URI ?? 'http://localhost:1337';

      const emailReq = encodeURIComponent(FormData.email);
      const res = await fetch(`${apiEndpoint}/api/check/${emailReq}`);

      if (res.ok) {
        sessionStorage.removeItem('ENSCALE');
        const { existing } = await res.json();
        //console.log(existing);
        const stateString = JSON.stringify({ page: 'summary' });
        if (existing) {
          router.push(loginUrl + Buffer.from(stateString).toString('base64'));
        } else {
          localStorage.setItem('USER_EMAIL', FormData.email);
          router.push({
            pathname: '/register',
          });
        }
      } else {
        setIsLoading(false);
        setErrors({ email: 'Something went wrong' });
      }
    }
  };

  const handleChange = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    const updatedFormData = {
      ...FormData,
      email: name === 'email' ? value : FormData.email,
    };

    setFormData(updatedFormData);
  };

  useEffect(() => {
    function handleEscPress(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setAlertT(false);
        closeEmailForm(true);
      }
    }
    function handleClickOutside(event: MouseEvent) {
      const modal = document.querySelector('.modal');
      if (modal && !modal.contains(event.target as Node)) {
        setAlertT(false);
        closeEmailForm(true);
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
    <div className="fixed top-1/2 left-1/2 z-50  h-fit w-full -translate-x-1/2 -translate-y-1/2 rounded-2xl md:h-auto">
      <div className="h-full overflow-y-auto">
        <form
          action="/"
          className={`mx-auto box-border h-full w-full max-w-[760px] rounded-[10px] border-2 border-lightGrey bg-white md:h-auto  ${alertT && 'py-[220px]'
            }  `}
          onSubmit={handleSubmit}
          style={{
            backgroundImage: `url("${Ribbons.src as string}")`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          <div
            className={` flex justify-end pr-[10px] pt-[10px] ${alertT ? 'hidden' : 'block'
              }`}
          >
            <Image
              src={x.src}
              height={25}
              width={25}
              alt="x"
              onClick={closeEmailForm}
              className="cursor-pointer"
            />
          </div>
          <div
            className={`mx-auto box-border flex flex-col items-center px-[60px] py-[80px] ${alertT ? 'hidden' : ''
              }`}
          >
            <label className='mb-[65px] font-["Mont-semibold"] text-[28px] text-[#9D64A9]'>
              Please enter your email below
            </label>
            <div className="mb-[50px] box-border flex w-full rounded-[3px] text-center ">
              <div className="w-full ">
                <span>
                  <input
                    placeholder="email@email.com"
                    type="email"
                    name="email"
                    value={FormData.email.trim()}
                    onChange={handleChange}
                    className="mt-[3px] box-border w-full rounded-[5px] border-2 border-solid border-[#E1E1E1] p-3"
                  />
                  {errors.email && (
                    <p className="pt-2 text-start text-xs text-[#dc2626]">
                      {errors.email}
                    </p>
                  )}
                </span>
              </div>
            </div>
            <div className="flex w-full justify-end">
              <button
                onClick={(e: any) => handleSubmit(e)}
                className="rounded-full  border-2 border-purple bg-purple  px-[35px] py-[12px]  text-white transition  duration-500 hover:border-2 hover:border-purple hover:bg-transparent hover:text-purple lg:px-[40px] lg:py-[13px]"
              >
                {isLoading ? (
                  <div className="spinner flex gap-2" id="spinner">
                    Submit{' '}
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
                  'Submit'
                )}
              </button>
              {/* <Button
                color="primary"
                cta="Submit"
                clickHandler={(e) => handleSubmit(e)}
              /> */}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EnterEmail;
