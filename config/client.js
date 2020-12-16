import { ApolloClient, InMemoryCache } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client';

const IP = '192.168.1.7'
const uri = `http://${IP}:4000/`;


const client = new ApolloClient({
  uri: uri,
  cache: new InMemoryCache(),
  link: createUploadLink({ uri })
})

export default client