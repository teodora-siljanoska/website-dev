import type { NextApiRequest, NextApiResponse } from 'next';
import * as Sentry from "@sentry/nextjs";
const options = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
};

interface RequestData {
  domain: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let url = 'https://domain-search.j.layershift.co.uk/xmlattributes?';
  const searchParams = req.body as RequestData;
  const queryParams = new URLSearchParams({ domain: searchParams.domain });
  url += queryParams;

  await fetch(url, options)
    .then((response) => response.json())
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((err) => Sentry.captureException(err));
}
