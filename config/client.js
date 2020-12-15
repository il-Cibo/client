import { ApolloClient, InMemoryCache } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client';

const IP = '10.0.2.15:19000'
const uri = `http://${IP}:4000/`;

const client = new ApolloClient({
  uri: uri,
  cache: new InMemoryCache(),
  link: createUploadLink({ uri })
})

export default client