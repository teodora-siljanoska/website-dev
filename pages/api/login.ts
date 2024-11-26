/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { FusionAuthClient } from '@fusionauth/typescript-client';
import type { NextApiRequest, NextApiResponse } from 'next';
import * as Sentry from "@sentry/nextjs";

const client = new FusionAuthClient(
  process.env.NEXT_PUBLIC_FUSIONAUTH_CLIENT_ID ?? '',
  process.env.NEXT_PUBLIC_FUSIONAUTH_URI ?? ''
);

interface RequestBody {
  email: string;
  password: string;
}

async function Login(req: NextApiRequest, res: NextApiResponse) {
  const body: RequestBody = req.body;
  console.log(body);

  try {
    await client
      .login({
        loginId: body.email,
        password: body.password,
        applicationId: process.env.NEXT_PUBLIC_FUSIONAUTH_CLIENT_ID,
      })
      .then((result: any) => {
        return res.status(200).json(result);
      });
  } catch (e) {
    Sentry.captureException(e);

    return res.status(400);
  }
}

export default Login;
