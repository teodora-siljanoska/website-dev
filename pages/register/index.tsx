import React, { useEffect, useState } from 'react';
import Register from '@layout/Auth/Register';
import Ribbons from './assets/Ribbons.svg';
import Image from 'next/image';
import headphones from './assets/hp.svg';
import logo from './assets/logo.svg';
import RegisterwithSteps from '@layout/Auth/RegisterwithSteps';
import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';

interface IndexProps {
  country: string;
}

export const getServerSideProps = ({ query }: GetServerSidePropsContext) => ({
  props: query,
});

const RegisterPage = ({ country }: IndexProps) => {
  console.log('Country:', country);
  const [cart, setCart] = useState();
  const [emailSet, setEmailSet] = useState('');
  const [showDropdown, setDropdown] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const email = localStorage.getItem('USER_EMAIL');
      const cartData = sessionStorage.getItem('ENSCALE');
      const enscale = JSON.parse(cartData as string);
      setCart(enscale);
      setEmailSet(email as string);
    }
  }, []);

  console.log('cart', cart);
  return (
    <div
      className="box-border grid gap-[215px] pb-[100px]"
      style={{
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        backgroundImage: `url("${Ribbons.src as string}")`,
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="mx-[60px] mt-[30px] grid justify-end gap-[178px]">
        <div className="flex gap-[70px]">
          <div className="flex gap-3">
            <div className="hidden items-center  md:flex">
              <Image
                src={headphones.src}
                alt="headphones"
                layout="fixed"
                height={26.97}
                width={27}
              />
            </div>
            <div className="hidden place-self-center text-purple md:flex md:flex-row font-['Mont-regular']">
              +44 (0)161 826 2309
            </div>
          </div>
          <div className="flex ">
            <div className="hidden items-center  md:flex">
              <Link href="/">
                <Image
                  src={logo.src}
                  alt="logo"
                  layout="fixed"
                  height={57}
                  width={151}
                />
              </Link>
            </div>
          </div>
        </div>

        <p className="justify-self-center font-['Mont-bold'] text-[50px] text-purple">
          REGISTER
        </p>
      </div>

      <Register setEmail={emailSet} cart={cart} countryCode={country} />
    </div>
  );
};

export default RegisterPage;
