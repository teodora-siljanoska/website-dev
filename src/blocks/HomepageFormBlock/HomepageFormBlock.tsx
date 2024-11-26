import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { ComponentPageBlocksHomepageForm } from '@utils/types';
import * as Sentry from "@sentry/nextjs";

interface Values {
  name: string;
  email: string;
  message: string;
}

function HomepageFormBlock({
  title,
  description,
}: ComponentPageBlocksHomepageForm): JSX.Element {
  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup
      .string()
      .email('Email must be a valid email')
      .required('Email is required'),
    message: yup.string(),
  });

  const handleSubmit = async (values: Values) => {
    const data = { ...values };

    await validationSchema.validate(data).catch((err) => Sentry.captureException(err));
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values: Values) => {
      void handleSubmit(values);
    },
  });

  return (
    <div className="h-full w-full bg-darkTeal sm:my-20 lg:h-[366px]">
      <div className="container mx-auto py-[20px] lg:pt-[95px]">
        <div className="flex flex-col justify-between lg:flex-row  ">
          <div>
            <h3 className="mb-3 mt-12  text-3xl text-white md:mt-0">{title}</h3>
            <div className="  w-[90%]  text-base font-['Mont-light'] leading-5 text-white">
              <div>{description}</div>
            </div>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className=" mt-0 flex flex-col lg:-mt-12"
          >
            <div className=" mt-12  flex flex-col items-start gap-x-0   text-darkGrey md:flex-row   md:items-center md:gap-x-5">
              <div className="flex w-full flex-col justify-between">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  className="mb-5 w-full rounded-xl border-2 border-lightGrey bg-white py-3 pl-4 text-base  xl:w-[341px] "
                />
                {formik.errors.name ? (
                  <p className="absolute mt-1 pt-[52px] text-xs text-[#dc2626]">
                    {formik.errors.name}
                  </p>
                ) : null}

                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email address"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className=" mb-4 w-full rounded-xl border-2 border-lightGrey bg-white py-3 pl-4 text-base md:mb-2 "
                />
                {formik.errors.email ? (
                  <p className=" absolute mt-2 pt-[120px] text-xs text-[#dc2626]">
                    {formik.errors.email}
                  </p>
                ) : null}
              </div>

              <div className="w-full  pt-2 md:pt-0">
                <textarea
                  id="message"
                  name="message"
                  placeholder="Message"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.message}
                  cols={23}
                  rows={4}
                  className="w-full rounded-xl border-2  border-lightGrey bg-white p-3 pl-4  text-base md:w-[258px] xl:w-[350px]"
                />
                {formik.errors.message ? (
                  <p className=" text-xs text-[#dc2626]">
                    {formik.errors.message}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="mt-5 mb-12  flex items-start pr-0  lg:items-end lg:self-end   ">
              <button
                type="submit"
                className=" rounded-full border-2 border-purple bg-purple  px-[35px] py-[10px] text-sm text-white transition  duration-500 hover:border-2 hover:border-purple hover:bg-transparent hover:text-purple md:text-lg lg:px-[40px] lg:py-[10px]"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HomepageFormBlock;
