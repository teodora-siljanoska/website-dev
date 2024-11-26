import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_STRAPI_URI ?? 'http://localhost:1337'
    }/graphql`,
});

const withToken = setContext(() => {
  let token = '';
  try {
    if (sessionStorage) {
      token = sessionStorage.getItem('layershift_fa_access_token') ?? '';
    }
  } finally {
    return { token };
  }
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const { token } = operation.getContext();
  operation.setContext(() => ({
    headers: {
      Authorization: token ?? '',
    },
  }));
  return forward(operation);
});

const link = ApolloLink.from([withToken, authMiddleware.concat(httpLink)]);

const client = new ApolloClient({
  cache: new InMemoryCache({ resultCaching: true }),
  link: link,
});

export default client;