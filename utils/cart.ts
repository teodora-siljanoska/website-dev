import { useRouter } from 'next/router';
import * as Sentry from "@sentry/nextjs";

interface CartItem {
  sku: string;
  quantity: number;
  price?: number;
  currency: string;
}

interface CreateOrderRequest {
  cartItems?: CartItem[];
  customer?: any;
  accessToken?: string;
  estimate: false;
}

const CreateEstimateOrOrder = async (request: CreateOrderRequest) => {
  const { cartItems, customer, accessToken, estimate } = request;

  let orderItems = [];
  if (!cartItems) {
    orderItems = getOrderItems();
  } else {
    const ci: CartItem[] = cartItems.map((item) => {
      const { sku, quantity } = item;
      return { sku, quantity } as CartItem;
    });
    orderItems = getOrderItems(ci);
  }

  const coupon = localStorage.getItem('COUPON_CODE');

  const apiUrl = estimate ? '/api/createEstimate' : '/api/createOrder';

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderItems,
        customer,
        accessToken,
        coupon,
      }),
    });

    if (response.ok) {
      const res = await response.json();
      //console.log('res', res);
      if (estimate) {
        const { estimates, paymentSources, token, nextEstimates } = res;
        localStorage.setItem('ESTIMATE_LIST', JSON.stringify(estimates));
        localStorage.setItem('ESTIMATE_NEXT_LIST', JSON.stringify(nextEstimates));
        localStorage.setItem(
          'PAYMENT_SOURCES_LIST',
          JSON.stringify(paymentSources)
        );
        if (token) {
          sessionStorage.setItem('layershift_fa_access_token', token);
        }
      }
      return null; // No error, return null
    } else {
      const message = await response.json();
      return { message }; // Return an error object
    }
  } catch (e) {
    Sentry.captureException(e);
    console.error('An error occurred:', e);
    return { message: 'An error occurred' }; // Return an error object
  }
};

const getOrderItems = (cartItems?: CartItem[]): any[] => {
  if (cartItems && cartItems.length > 0) {
    const orderItems: any[] = [];
    for (const item of cartItems ?? []) {
      orderItems.push({
        sku: item.sku,
        quantity: item.quantity,
      });
    }
    return orderItems;
  }

  let amount = 0;
  const oi: any = [];

  const localCartItems = localStorage.getItem('SELECTED_CART_ITEMS');
  if (localCartItems) {
    JSON.parse(localCartItems)?.map((item: any) => {
      amount += item.totalPrice;

      const per = item.timePeriod;

      const addons: any = [];

      if (item.addons) {
        item.addons.map((adn: any) => {
          addons.push({
            sku: adn?.[`sku${per}`],
            quantity: 1,
            price: adn?.[`${per.toLowerCase()}Price`],
          });
        });
      }

      if (item.numericalAddons) {
        item.numericalAddons.map((adn: any) => {
          addons.push({
            sku: adn?.[`sku${per}`],
            quantity: adn.amountSelected,
            price: adn?.[`${per.toLowerCase()}Price`],
          });
        });
      }

      const oItem = {
        sku: item?.vmPlan?.[`sku${per}`],
        addons: addons,
        meta: item?.domain,
        price: item?.totalPrice,
      };
      oi.push(oItem);
    });
  }

  // const wpItemsStr = localStorage.getItem('SELECTED_CART_WORD_PRES_ITEMS');
  // if (wpItemsStr) {
  //   JSON.parse(wpItemsStr)?.map((item: any) => {
  //     amount += item.totalPrice;

  //     const per = item.timePeriod;
  //     const oItem = {
  //       sku: item?.vmPlan?.[`sku${per}`],
  //     };
  //     oi.push(oItem);
  //   });
  // }

  const domainItemsStr = localStorage.getItem(
    'SELECTED_DOMAIN_FINAL_CART_ITEMS'
  );
  if (domainItemsStr) {
    JSON.parse(domainItemsStr)?.map((item: any) => {
      amount += item.domain.domainPrice;
      const curr = item.domain.domainSelectedCurrency;
      oi.push({
        sku: `DOMAIN-REG-${curr}-Yearly`,
        meta: item,
      });
    });
  }

  // const curr = localStorage.getItem('SELECTED_CURRENCY');
  // if (curr) {
  //     setSelectedCurrency((_: any) => curr.toLowerCase());
  // }

  return oi;
};

export { CreateEstimateOrOrder };
export type { CartItem, CreateOrderRequest }; // DTO
