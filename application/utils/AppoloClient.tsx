import React from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://us-central1-info802-firebase-graphql.cloudfunctions.net/graphql',
  cache: new InMemoryCache(),
});

interface ApolloClientProviderInterface {
  children: React.ReactNode;
}

const ApolloClientProvider = ({children}: ApolloClientProviderInterface) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
