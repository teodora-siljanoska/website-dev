import React from 'react';
import { CustomWordInterface } from '@pages/vps/types';

export interface AccordionWordShoppingItemProps {
  product: CustomWordInterface;
  productIndex: number;
  isOpen: boolean;
  btnOnClick: () => void;
}

function AccordionWordShoppingCart({
  product,
  productIndex,
  isOpen,
  btnOnClick,
}: AccordionWordShoppingItemProps): JSX.Element {
  return (
    <div className="w-full">
      <div className="py-[10px] ">
        <div className="flex  justify-items-center ">
          <h3 className="pr-[10px] text-[18px] text-darkGrey sm:text-[18px]">
            <button className=" flex flex-row items-center justify-center text-left">
              <div className="w-[150px]">{productIndex}</div>
              <div className="flex w-[500px] gap-2">
                <div>{product.vmPlan?.title}</div>
              </div>
              <div className="w-[300px]">{product.timePeriod}</div>
              <div className="w-[300px]">
                {product.selectedCurrency === 'USD'
                  ? '$'
                  : product.selectedCurrency === 'EUR'
                  ? '€'
                  : product.selectedCurrency === 'GBP'
                  ? '£'
                  : ' '}{' '}
                {product.totalPrice.toFixed(2)}
              </div>
              <div></div>
            </button>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default AccordionWordShoppingCart;
