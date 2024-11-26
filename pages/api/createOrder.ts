/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextApiRequest, NextApiResponse } from 'next';
import { FusionAuthClient } from '@fusionauth/typescript-client';
import { CREATE_ORDER } from '@utils/queries';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { OrderItem } from '@pages/vps/types';
import * as Sentry from "@sentry/nextjs";

interface RequestBody {
  orderItems: OrderItem[];
  refreshToken: string;
  accessToken: string;
  coupon?: string;
}

const httpLink = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_STRAPI_URI ?? 'http://localhost:1337'
    }/graphql`,
  useGETForQueries: true,
});


async function CreateOrder(req: NextApiRequest, res: NextApiResponse) {
  console.log('CREATE');
  const body: RequestBody = req.body;

  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        'X-Forwarded-For': clientIp,
        authorization: body.accessToken ? `${body.accessToken}` : '',
      },
    };
  });

  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  try {
    const final = await apolloClient.mutate({
      mutation: CREATE_ORDER,
      variables: body,
    });

    const data = final.data.createOrder.data;

    return res.status(200).json({ data });
  } catch (e: any) {
    //Sentry.captureException(e);
    console.log('gres', e)

    return res.status(400).json(e.message);
  }
}

export default CreateOrder;
