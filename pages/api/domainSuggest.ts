import type { NextApiRequest, NextApiResponse } from 'next';
import * as Sentry from "@sentry/nextjs";

interface Price {
  currency: string;
  register: number;
  renew: number;
}

interface Domain {
  available: boolean;
  domain: string;
  price?: Price[];
  tld: string;
}

interface RequestData {
  search: string;
  suggestions?: number;
}
export interface ResponseData {
  result: Domain;
  suggestions?: Domain[];
}

const options = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let url = 'https://domain-search.j.layershift.co.uk/search?';
  const searchParams = req.body as RequestData;
  // console.log(searchParams);

  const queryParams = new URLSearchParams({ search: searchParams.search });
  if (searchParams.suggestions) {
    queryParams.append('suggestions', `${searchParams.suggestions}`);
  }
  url += queryParams;

  // console.log(url);

  await fetch(url, options)
    .then((response) => response.json())
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((err) => Sentry.captureException(err));
}
