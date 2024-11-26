import type { NextApiRequest, NextApiResponse } from "next";

import client from "@utils/apollo-client";
import { GET_HEADER } from "@utils/queries";
import * as Sentry from "@sentry/nextjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data } = await client.query({
      query: GET_HEADER,
    });



    res.status(200).json({ data });
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).json({ error: "Error fetching data header" });
  }
}