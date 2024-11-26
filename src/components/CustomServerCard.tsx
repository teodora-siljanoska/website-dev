import React, { useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import { CustomVpsInterface, EditVpsInterface } from '@pages/vps/types';
import { LocationContext } from '@utils/contexts/locationContext';
import EditVPSContext from '@utils/contexts/editVPSContext';
import { CurrencyContext } from '@utils/contexts/currencyContext';

interface P {
  title: string;
  description: string;
  ctaButton: string;
  linkButton: string;
  cartValue: CustomVpsInterface;
}

function CustomServerCard({
  title,
  description,
  ctaButton,
  linkButton,
  cartValue,
}: P): JSX.Element {
  const { selectedLocation, setSelectedLocation } = useContext(LocationContext);
  const { editVPSItems, setEditVPSItems } = useContext(EditVPSContext);
  const { selectedCurrency, currencySymbol } = useContext(CurrencyContext);

  const onClickEditItem = (editVPS: CustomVpsInterface) => {
    const addonsEdit: EditVpsInterface[] = [];
    const numAddonsEdit: EditVpsInterface[] = [];

    editVPS.addons.map((item) => {
      addonsEdit.push({ groupSelection: item.title });
    });
    editVPS.numericalAddons.map((item) => {
      numAddonsEdit.push({
        groupSelection: item.title,
        amount: item.amountSelected,
      });
    });

    // if (editVPS.vmPlan?.title?.includes('Manchester')) {
    //   setSelectedLocation('Manchester');
    //   localStorage.setItem('SELECTED_LOCATION', 'Manchester');
    // } else if (editVPS.vmPlan?.title?.includes('Chicago')) {
    //   setSelectedLocation('Chicago');
    //   localStorage.setItem('SELECTED_LOCATION', 'Chicago');
    // } else if (editVPS.vmPlan?.title?.includes('Singapore')) {
    //   setSelectedLocation('Singapore');
    //   localStorage.setItem('SELECTED_LOCATION', 'Singapore');
    // }
    setEditVPSItems([...addonsEdit, ...numAddonsEdit]);
    localStorage.setItem(
      'SELECTED_EDIT_ITEMS',
      JSON.stringify([...addonsEdit, ...numAddonsEdit])
    );
  };
  // const damiData: CustomVpsInterface = {
  //   timePeriod: 'Monthly',
  //   totalPrice: 80.9,
  //   selectedCurrency: selectedCurrency,
  //   addons: [
  //     {
  //       sku: 'cloudlinux-solo',
  //       skuMonthly: 'cloudlinux-solo-GBP-Monthly',
  //       skuYearly: 'cloudlinux-solo-GBP-Yearly',
  //       title: 'CloudLinux Solo',
  //       selectedCurrency: selectedCurrency,
  //       group: 'server-upgrades',
  //       monthlyPrice: 6.3,
  //       yearlyPrice: 71.82,
  //     },
  //     {
  //       sku: 'imunifyav',
  //       skuMonthly: 'imunifyav-GBP-Monthly',
  //       skuYearly: 'imunifyav-GBP-Yearly',
  //       title: 'ImunifyAV',
  //       selectedCurrency: selectedCurrency,
  //       group: 'website-security',
  //       monthlyPrice: 0,
  //       yearlyPrice: 0,
  //     },
  //     {
  //       sku: 'plesk-web-admin',
  //       skuMonthly: 'plesk-web-admin-GBP-Monthly',
  //       skuYearly: 'plesk-web-admin-GBP-Yearly',
  //       title: 'Plesk Web Admin Edition',
  //       selectedCurrency: selectedCurrency,
  //       group: 'server-licensing',
  //       monthlyPrice: 0,
  //       yearlyPrice: 0,
  //     },
  //     {
  //       sku: 'plesk-email-security-pro',
  //       skuMonthly: 'plesk-email-security-pro-GBP-Monthly',
  //       skuYearly: 'plesk-email-security-pro-GBP-Yearly',
  //       title: 'Plesk Email Security Pro',
  //       selectedCurrency: selectedCurrency,
  //       group: 'email-security',
  //       monthlyPrice: 8.1,
  //       yearlyPrice: 92.34,
  //     },
  //     {
  //       sku: 'backup-gold',
  //       skuMonthly: 'backup-gold-GBP-Monthly',
  //       skuYearly: 'backup-gold-GBP-Yearly',
  //       title: 'Backup Gold',
  //       selectedCurrency: selectedCurrency,
  //       group: 'ls-backup',
  //       monthlyPrice: 20,
  //       yearlyPrice: 228,
  //     },
  //   ],
  //   numericalAddons: [
  //     {
  //       sku: 'vcpu',
  //       skuMonthly: 'vcpu-GBP-Monthly',
  //       skuYearly: 'vcpu-GBP-Yearly',
  //       title: 'vCPU cores',
  //       amountSelected: 4,
  //       selectedCurrency: selectedCurrency,
  //       max: 32,
  //       min: 1,
  //       increment: 1,
  //       monthlyPrice: 20,
  //       yearlyPrice: 228,
  //     },
  //     {
  //       sku: 'ram',
  //       skuMonthly: 'ram-GBP-Monthly',
  //       skuYearly: 'ram-GBP-Yearly',
  //       title: 'RAM (GB)',
  //       amountSelected: 2,
  //       selectedCurrency: selectedCurrency,
  //       max: 64,
  //       min: 1,
  //       increment: 1,
  //       monthlyPrice: 6,
  //       yearlyPrice: 68.4,
  //     },
  //     {
  //       sku: 'disk',
  //       skuMonthly: 'disk-GBP-Monthly',
  //       skuYearly: 'disk-GBP-Yearly',
  //       title: 'Storage (Flash-based) (GB)',
  //       amountSelected: 75,
  //       selectedCurrency: selectedCurrency,
  //       max: 500,
  //       min: 50,
  //       increment: 25,
  //       monthlyPrice: 5.5,
  //       yearlyPrice: 57.49999999999999,
  //     },
  //   ],
  // };
  // const damiData: EditVpsInterface[] = [
  //   { groupSelection: 'CloudLinux Solo' },
  //   { groupSelection: 'ImunifyAV' },
  //   {
  //     groupSelection: 'Plesk Web Admin Edition',
  //   },
  //   { groupSelection: 'Plesk Email Security Pro' },
  //   { groupSelection: 'Backup Silver' },
  //   { groupSelection: 'vCPU cores', amount: 2 },
  //   { groupSelection: 'RAM (GB)', amount: 5 },
  //   {
  //     groupSelection: 'Storage (Flash-based) (GB)',
  //     amount: 3,
  //   },
  // ];
  return (
    <div className="flex !h-full flex-col items-center">
      <div className="flex !h-full  xs:w-[19rem] w-[16rem] flex-col justify-between rounded-2xl bg-purple px-11 py-7 shadow-custom">
        <p className="text-center font-['Mont-bold'] text-3xl text-white">
          {title}
        </p>
        <div className="my-16 text-center text-[18px] font-['Mont-light'] text-white">
          <ReactMarkdown>{description}</ReactMarkdown>
        </div>

        <div className="mb-4 flex justify-center pt-3">
          <div className="my-3  ">
            <button
              className="justify-center rounded-full border-2 border-darkTeal  bg-darkTeal  px-[32px] py-[12px] text-base  text-white transition		 duration-500 hover:border-2   hover:border-lightTeal hover:bg-lightTeal hover:text-white lg:text-lg"
              type="button"
              onClick={() => {
                onClickEditItem(cartValue);
              }}
            >
              <a href={linkButton}>{ctaButton}</a>
            </button>
            {/* <Button cta={ctaButton} link={linkButton} color="tertiary" ></Button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomServerCard;
