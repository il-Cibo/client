import {ApolloClient, InMemoryCache} from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client';

const IP = '192.168.43.142'
const uri = `http://${IP}:4000/`;

const client = new ApolloClient({
	// link: authLink.concat(httpLink),
	uri: 'http://192.168.43.142:4000',
  cache: new InMemoryCache(),
// });
  // uri: 'http://192.168.1.8:4000/',
  // cache: new InMemoryCache(),
  link: createUploadLink({ uri })
})

export default client