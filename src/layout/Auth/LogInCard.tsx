import React, { useState, useContext } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import LoginContext from '@utils/contexts/loginContext';
import { useRouter } from 'next/router';
import Image from 'next/legacy/image';
import showPassword from './assets/show-password.svg';
import hidePassword from './assets/hide-password.svg';
import * as Sentry from "@sentry/nextjs";

interface ResponseData {
  refreshToken: string;
  token: string;
  user: {
    firstName: string;
    lastName: string;
    city: string;
    country: string;
    username: string;
    company: string;
    email: string;
    address: string;
    postCode: string;
    phone: string;
  };
}

interface Values {
  email: string;
  password: string;
}

interface FinalResponse {
  response: ResponseData;
}

interface P {
  closePopUp: () => void;
}

const LoginCard = ({ closePopUp }: P) => {
  const { setUser } = useContext(LoginContext);
  const router = useRouter();
  const [showPass, setShowPass] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Email must be a valid email')
      .required('Email is required'),

    password: yup
      .string()
      .required('Password is required')
      .min(8)
      .max(16)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Your password must have at least one uppercase and lowercase character, one number and a special symbol.'
      ),
  });

  const handleLogin = async (values: Values) => {
    const data = { ...values };

    await validationSchema
      .validate(data)
      .then(() => {
        fetch('/api/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then((res) => {
            return res.json();
          })
          .then((final: FinalResponse) => {
            localStorage.setItem(
              'layershift_fa_refresh_token',
              final.response.refreshToken
            );
            sessionStorage.setItem(
              'layershift_fa_access_token',
              final.response.token
            );
            localStorage.setItem(
              'layershift_user_first_name',
              final.response.user.firstName
            );
            localStorage.setItem(
              'layershift_user_info',
              JSON.stringify([
                { firstName: final.response.user.firstName },
                { lastName: final.response.user.lastName },
                { city: final.response.user.city },
                { country: final.response.user.country },
                { address: final.response.user.address },
                { company: final.response.user.company },
                { email: final.response.user.email },
                { phone: final.response.user.phone },
                { postCode: final.response.user.postCode },
                { username: final.response.user.username },
              ])
            );
            localStorage.setItem('layershift_user_is_logged_in', 'true');
            //console.log(final);

            setIsSubmitted(true);
            setUser({
              firstName: final.response.user.firstName,
              isLoggedin: true,
            });
            closePopUp();
            router.reload();
          })
          .finally(() => {
            console.log('LOGIN');
          });
      })
      .catch((err) => Sentry.captureException(err));
  };

  const initialValues: Values = {
    email: '',
    password: '',
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values: Values) => {
      const res = handleLogin(values);
      console.log(res);
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex h-full w-full flex-col items-center justify-between  py-16 px-48"
    >
      <div className="flex w-[397px] flex-col gap-y-10">
        <div className="text-[18px]">
          <div className="flex flex-col">
            <label className="pl-2" htmlFor="email">
              E-mail address
            </label>
            <input
              type="text"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="email@email.com"
              className="h-[46px] w-full rounded-md border border-lightGrey pl-2 text-[16px] first-letter:pl-2 focus:outline-purple"
            />
            {formik.errors.email ? (
              <p className="text-xs text-[#8b0000] ">{formik.errors.email}</p>
            ) : null}
          </div>
        </div>
        <div className="flex flex-col text-[18px]">
          <label className="pl-2" htmlFor="password">
            Password
          </label>
          <input
            type={showPass ? 'text' : 'password'}
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            placeholder="Password"
            className="h-[46px] w-full rounded-md  border border-lightGrey pl-2 text-[16px] focus:outline-purple"
          />

          <span
            style={{
              top: '-35px',
              left: 365,
              position: 'relative',
              height: 0,
              cursor: 'pointer',
            }}
            onClick={() => setShowPass(!showPass)}
          >
            <Image
              className="text-lightGrey"
              alt="showPassword"
              src={showPass ? hidePassword.src : showPassword.src}
              height={25}
              width={25}
            />
          </span>
          {formik.errors.password ? (
            <p className="text-xs text-[#8b0000] ">{formik.errors.password}</p>
          ) : null}
          <p className="mt-1 cursor-pointer text-sm text-purple hover:underline">
            Forgot password?
          </p>
        </div>
      </div>
      <div className="w-[397px] pt-5">
        <input
          type="submit"
          className="h-[49px] w-full cursor-pointer rounded-full border-2 border-purple bg-purple text-[18px] text-white duration-300 hover:bg-white hover:text-purple"
          value="Login"
        />
      </div>
      {isSubmitted && <p>Is</p>}
    </form>
  );
};

export default LoginCard;
