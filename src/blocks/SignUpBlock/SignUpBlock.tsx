import React, { useEffect, useState } from 'react';
import { ComponentPageBlocksSignUp, ProductPrice } from '@utils/types';
import { useRouter } from 'next/router';
import Button from '@components/Button';
import Register from '@layout/Auth/Register';

interface FormData {
  email: any;
}

const loginUrl = new URL(process.env.NEXT_PUBLIC_LOGIN_URL?.toString() ?? '');

function SignUpBlock({
  title,
  description,
  ctaButton,
  product_price,
}: ComponentPageBlocksSignUp): JSX.Element {
  const router = useRouter();

  const { sku, price, currency } = product_price?.data
    ?.attributes as ProductPrice;

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
    //console.log('FormData', FormData);

    const errors: any = {};
    let formIsValid = true;

    if (!FormData.email) {
      formIsValid = false;
      errors.email = 'Email is required';
    } else if (/\s/.test(FormData.email)) {
      formIsValid = false;
      errors.email = 'Email cannot contain blank spaces';
    } else if (!/\S+@\S+\.\S+/.test(FormData.email)) {
      formIsValid = false;
      errors.email = 'Email is invalid';
    }

    setErrors(errors);

    const cartData = JSON.stringify([
      {
        sku,
        currency: currency.toString(),
        price: price as number,
        quantity: 1,
      },
    ]);

    // Submit form data if valid
    if (formIsValid) {
      const apiEndpoint =
        process.env.NEXT_PUBLIC_STRAPI_URI ?? 'http://localhost:1337';

      const emailReq = encodeURIComponent(FormData.email);
      const res = await fetch(`${apiEndpoint}/api/check/${emailReq}`);

      if (res.ok) {
        localStorage.removeItem('SELECTED_CART_ITEMS');
        const { existing } = await res.json();
        //console.log(existing);
        if (existing) {
          const stateString = JSON.stringify({
            page: 'thank-you-subscription',
            data: sku,
          });
          router.push(loginUrl + Buffer.from(stateString).toString('base64'));
        } else {
          sessionStorage.setItem('ENSCALE', cartData);
          localStorage.setItem('USER_EMAIL', FormData.email);
          router.push({
            pathname: '/register',
          });
        }
      } else {
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
    sessionStorage.removeItem('layershift_fa_access_token');
    localStorage.removeItem('layershift_user_is_logged_in');
    localStorage.removeItem('layershift_fa_refresh_token');
  }, []);

  return (
    <div className="h-full w-full bg-darkTeal xl:h-[340px]">
      <div className="container  mx-auto py-[50px]  md:w-[90%] lg:py-[95px]  xlSpecial:w-[77%]">
        <div className="flex flex-col justify-between gap-x-5  lg:flex-row">
          <div className="smallest:max-w-[385px]  md:max-w-[470px] xlSpecial:max-w-[485px] ">
            <h3 className="w-full font-['Mont-regular'] text-[28px] text-white">
              {title}
            </h3>
            <div className="w-full font-['Mont-light'] text-lg leading-8 text-white sm:w-[60%]">
              <div>{description}</div>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col   lg:w-auto"
          >
            <div className="flex  flex-col  items-start text-darkGrey   lg:flex-row lg:items-center">
              <div className="mt-5  flex w-full flex-col md:w-[491px]  lg:px-0 xl:mt-0">
                <input
                  placeholder="email@email.com"
                  type="email"
                  name="email"
                  value={FormData.email.trim()}
                  onChange={handleChange}
                  className="w-full  rounded-xl border-2 border-lightGrey bg-white py-3 pl-4 text-base "
                />
              </div>
            </div>
            <div className="flex  items-start pt-8  lg:items-end lg:self-end   ">
              <Button
                clickHandler={(e) => handleSubmit(e)}
                cta={ctaButton as string}
                color="primary"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpBlock;
