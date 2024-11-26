/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextApiRequest, NextApiResponse } from 'next';
import { CREATE_CUSTOMER } from '@utils/queries';
import client from '@utils/apollo-client';
import * as Sentry from "@sentry/nextjs";

async function register(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body;
  console.log('regbody', body);

  try {
    const final = await client.mutate({
      mutation: CREATE_CUSTOMER,
      variables: body,
    });
    console.log('sending data...');
    console.log(final.data);
    return res.status(200).json(final.data.createCustomer.data.attributes);
  } catch (e) {
    Sentry.captureException(e);
    console.log(JSON.stringify(e));
    return res.status(400);
  }
}
export default register;
