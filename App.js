import React from 'react';
import { Navigator } from './screens'
import { AppRegistry } from 'react-native'
import { ApolloProvider } from '@apollo/client'
import client from './config/client'
import { Provider } from 'react-redux'
import store from './store'
import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading'

export default function App() {
  const [loaded] = useFonts({
    Oswald: require('./assets/fonts/Oswald-VariableFont_wght.ttf')
  })

  if (!loaded) {
    return <AppLoading />
  }

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Navigator/>
      </Provider>
    </ApolloProvider>
  );
}

AppRegistry.registerComponent('MyApplication', () => App)
