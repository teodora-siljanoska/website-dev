import React from 'react';
import { FooterEntity, VpsConfiguratorEntity } from '@utils/types';

interface IndexProps {
  city: string;
  region: string;
  country: string;
  query: any;
}
export interface FooterInterface {
  footer: {
    data: FooterEntity;
  };
}
export type HomeProps = IndexProps;

export interface EditVpsInterface {
  vpsLocation?: string;
  groupSelection: string;
  amount?: number | undefined;
}

export interface CustomVpsAddonInterface {
  title: string;
  description: string;
  sku: string;
  skuMonthly: string;
  skuYearly: string;
  selectedCurrency: string;
  monthlyPrice: number;
  yearlyPrice: number;
  group?: string | null;
}

export interface VPSConfiguratorInterface {
  vpsConfigurator: {
    data: VpsConfiguratorEntity;
  };
}

export interface RedirectUrl {
  chargebeeUrl: string;
}

export type AddonLimitType = {
  limitter?: string;
  group: string;
  limitType: string;
  limit: string | number;
};

export interface CustomVpsNumericalAddonInterface {
  title: string;
  sku: string;
  skuMonthly: string;
  skuYearly: string;
  monthlyPrice: number;
  yearlyPrice: number;
  amountSelected: number;
  selectedCurrency: string;
  max: number;
  min: number;
  increment: number;
}
export interface VmPlanInterface {
  sku?: string;
  skuMonthly?: string;
  skuYearly?: string;
  title?: string;
  monthlyPrice?: number;
  yearlyPrice?: number;
  domain?: string;
}

export interface CustomVpsInterface {
  timePeriod: string;
  totalPrice: number;
  selectedCurrency: string;
  vmPlan?: VmPlanInterface;
  addons: CustomVpsAddonInterface[];
  numericalAddons: CustomVpsNumericalAddonInterface[];
  domain?: {
    domainName: string | undefined;
  };
}
export interface CustomWordInterface {
  timePeriod: string;
  totalPrice: number;
  selectedCurrency: string;
  vmPlan?: VmPlanInterface;
}

export interface MetadataInterface {
  increment: undefined | null | number;
  max: undefined | null | number;
  min: undefined | null | number;
  group: undefined | null | string;
  requires: unknown;
  configurator: boolean;
  default?: boolean;
  sorting: number;
  requirements: RequirementsAddonArray[];
}
export interface RequirementsAddonArray {
  sku: string;
  message: string;
  quantity?: number;
  relationalOperator?: string;
}
export interface TiersInterface {
  ending_unit: number | undefined | null;
  price: number;
  starting_unit: number | undefined | null;
}

export interface ProductPriceInterface {
  attributes: {
    currency: string;
    price: number;
    sku: string;
    period?: string;
    tiers: null | undefined | TiersInterface[];
  };
}
export interface ProductResponseInterface {
  products: {
    data: ProductInterface[];
  };
}
export interface OrderItem {
  sku: string;
  quantity?: number;
}
export interface NumericVPSConfigOption {
  sku: string;
  quantity: number;
  value: number;
}
export interface ProductInterface {
  attributes: {
    title: string;
    description: string;
    sku: string;
    productPrices: {
      data: ProductPriceInterface[];
    };
    metadata: null | undefined | MetadataInterface;
  };
}

export interface IDropDownGroup {
  groupName: string;
  options: ProductInterface[];
}
export enum TimePeriods {
  Monthly = 'Monthly',
  Yearly = 'Yearly',
}

function Types(): JSX.Element {
  return <></>;
}

export default Types;
