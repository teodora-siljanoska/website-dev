/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import data from '../public/chargebeeData.json';

const productSample = data['product-families'][0].products[0];

type Product = typeof productSample;

export interface Price {
  monthly: number;
  yearly: number;
}

export interface NumeralOption {
  priceDifference: Price;
  sizeIncrement: number;
  options: number[];
  minQty: number;
  maxQty: number;
  sku: string;
  unit: string;
}
export interface DropdownOption {
  label: string;
  sku: string;
  descriptions?: string[];
  priceDifferenceFromBase: Price;
}
interface DropdownOptions {
  name: string;
  options: DropdownOption[];
}

export interface FinalProduct {
  location: string;
  sku: string;
  basePrice: Price;
  RAM?: NumeralOption;
  CPU?: NumeralOption;
  SSD?: NumeralOption;
  panel?: DropdownOptions;
  //   traffic?: DropdownOptions;
  //   IPv4?: DropdownOptions;
  //   IPv6?: DropdownOptions;
  //   cloudlinux?: DropdownOptions;
  //   kernelcare?: DropdownOptions;
  security?: DropdownOptions;
  //   litespeed?: DropdownOptions;
}

const fillNumeralOptionArray = (
  min: number,
  max: number,
  increment: number,
  arr: string[]
): void => {
  for (let i = min; i <= max; i += increment) {
    arr.push(i);
  }
};

const transformProduct = (product: Product): FinalProduct => {
  const result: FinalProduct = {
    location: product.label,
    basePrice: {
      yearly: product.price[1].amount,
      monthly: product.price[0].amount,
    },
    sku: product['SKU-stub'],
  };
  result.RAM = {
    unit: 'GB',
    sizeIncrement: 1,
    priceDifference: {
      monthly: product.attributes[2].price[0].amount,
      yearly: product.attributes[2].price[1].amount,
    },
    options: [],
    minQty: product.attributes[2].min,
    maxQty: product.attributes[2].max,
    sku: product.attributes[2]['SKU-stub'],
  };
  fillNumeralOptionArray(
    result.RAM.minQty,
    result.RAM.maxQty,
    result.RAM.sizeIncrement,
    result.RAM.options
  );
  result.CPU = {
    unit: 'vCPU',
    sizeIncrement: 1,
    priceDifference: {
      monthly: product.attributes[1].price[0].amount,
      yearly: product.attributes[1].price[1].amount,
    },

    options: [],
    minQty: product.attributes[1].min,
    maxQty: product.attributes[1].max,
    sku: product.attributes[1]['SKU-stub'],
  };
  fillNumeralOptionArray(
    result.CPU.minQty,
    result.CPU.maxQty,
    result.CPU.sizeIncrement,
    result.CPU.options
  );
  result.SSD = {
    unit: 'GB',
    sizeIncrement: product.attributes[3].increment,
    priceDifference: {
      monthly: product.attributes[3].price[0].amount,
      yearly: product.attributes[3].price[1].amount,
    },

    options: [],
    minQty: product.attributes[3].min,
    maxQty: product.attributes[3].max,
    sku: product.attributes[3]['SKU-stub'],
  };
  fillNumeralOptionArray(
    result.SSD.minQty,
    result.SSD.maxQty,
    result.SSD.sizeIncrement,
    result.SSD.options
  );
  product.attributes[0].options;

  result.panel = { name: product.attributes[0].label, options: [] };
  product.attributes[0].options.forEach((option) =>
    result.panel?.options.push({
      label: option.label,
      sku: option['SKU-stub'],
      priceDifferenceFromBase: {
        monthly: option.price[0].amount,
        yearly: option.price[1].amount,
      },
    })
  );

  result.security = { name: product.attributes[9].label, options: [] };
  product.attributes[9].options.forEach((option) =>
    result.security?.options.push({
      label: option.label,
      sku: option['SKU-stub'],
      priceDifferenceFromBase: {
        monthly: option.price[0].amount,
        yearly: option.price[1].amount,
      },
    })
  );

  return result;
};

export default transformProduct;
