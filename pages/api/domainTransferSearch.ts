import type { NextApiRequest, NextApiResponse } from 'next';
import * as Sentry from "@sentry/nextjs";

interface Price {
  currency: string;
  renew: number;
  transfer: number;
}

export interface DomainTransfer {
  available: boolean;
  domain: string;
  price?: Price[];
  tld: string;
  checked: boolean;
  message: string;
  detail: any;
}

interface RequestData {
  search: string;
  suggestions?: number;
}
export interface ResponseData {
  result: DomainTransfer;
}

const options = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let url = 'https://domain-search.j.layershift.co.uk/transfer?';
  const searchParams = req.body as RequestData;
  // console.log(searchParams);

  const queryParams = new URLSearchParams({ domain: searchParams.search });

  url += queryParams;

  await fetch(url, options)
    .then((response) => response.json())
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((err) => Sentry.captureException(err));
}
