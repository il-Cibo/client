// import {ApolloClient, InMemoryCache} from '@apollo/client'

// const client = new ApolloClient({
//   uri: 'http://localhost:4000/graphql',
//   cache: new InMemoryCache()
// })

// export default client

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';

// const httpLink = createHttpLink({
//   uri: 'http://localhost:4000',
// });

// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem('token');
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       token
//     }
//   }
// });

const client = new ApolloClient({
	// link: authLink.concat(httpLink),
	uri: 'http://192.168.43.142:4000',
  cache: new InMemoryCache()
});

export default client