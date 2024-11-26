/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextApiRequest, NextApiResponse } from 'next';
import { FusionAuthClient } from '@fusionauth/typescript-client';
import { GET_PORTAL_SESSION } from '@utils/queries';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { OrderItem } from '@pages/vps/types';
import * as Sentry from "@sentry/nextjs";

interface RequestBody {
  orderItems: OrderItem[];
  refreshToken: string;
  accessToken: string;
}

const httpLink = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_STRAPI_URI ?? 'http://localhost:1337'
    }/graphql`,
  useGETForQueries: true,
});

const faClient = new FusionAuthClient(
  process.env.NEXT_PUBLIC_FUSIONAUTH_CLIENT_ID ?? '',
  process.env.NEXT_PUBLIC_FUSIONAUTH_URI ?? ''
);

async function MyAccount(req: NextApiRequest, res: NextApiResponse) {
  const body: RequestBody = req.body;

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists

    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: body.accessToken ? `${body.accessToken}` : '',
      },
    };
  });

  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  try {
    const final = await apolloClient.query({
      query: GET_PORTAL_SESSION,
    });
    const accessUrl = final.data.portalSession.data.attributes.accessUrl;

    return res.status(200).json({ accessUrl });
  } catch (e) {
    Sentry.captureException(e);
    const newAccessToken = await faClient.exchangeRefreshTokenForJWT({
      token: body.accessToken,
      refreshToken: body.refreshToken,
    });

    const newAuthLink = setContext((_, { headers }) => {
      // get the authentication token from local storage if it exists

      // return the headers to the context so httpLink can read them
      return {
        headers: {
          ...headers,
          authorization: `${newAccessToken.response.token ?? 'error'}`,
        },
      };
    });

    const newApolloClient = new ApolloClient({
      link: newAuthLink.concat(httpLink),
      cache: new InMemoryCache(),
    });

    try {
      const final = await newApolloClient.query({
        query: GET_PORTAL_SESSION,
      });
      const accessUrl = final.data.portalSession.data.attributes.accessUrl;

      return res.status(200).json({ accessUrl });
    } catch (e) {
      Sentry.captureException(e);

      return res.status(400);
    }
  }
}

export default MyAccount;
