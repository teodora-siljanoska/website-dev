import type { NextApiRequest, NextApiResponse } from 'next';
import meiliClient from '@layout/Header/MeiliSearchClient';
import * as Sentry from "@sentry/nextjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const query = req.query;
    const { keyWord } = query as any;

    const index = await meiliClient.multiSearch({
      queries: [{ indexUid: 'page', q: keyWord }],
    });

    res.status(200).json({ index });
  } catch (error) {
    Sentry.captureException(error);

    res.status(500).json({ error: 'Error fetching data' });
  }
}
