import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setContext } from 'apollo-link-context';
import { createUploadLink } from 'apollo-upload-client';

const IP = '192.168.1.3'
const uri = `http://${IP}:4000/`;

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('token');
  return {
    ...headers,
    headers: {
      token: token || null
    }
  };
});

const uploadLink = createUploadLink({ uri })

const client = new ApolloClient({
  link: ApolloLink.from([ authLink, uploadLink ]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
})

export default client