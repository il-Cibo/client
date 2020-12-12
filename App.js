import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home, Favorite } from './screens'
import { Ionicons } from '@expo/vector-icons'
import { AppRegistry } from 'react-native'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const Tab = createBottomTabNavigator();
// const client = new ApolloClient({
//   uri: 'http://localhost:4000/graphql',
//   cache: new InMemoryCache()
// })

export default function App() {
  return (
    // <ApolloProvider client={client}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home-outline' : 'ios-home-outline'
              } else if (route.name === 'Favorite') {
                iconName = focused ? 'heart-outline' : 'heart-outline' 
              }

              return <Ionicons name={iconName} size={size} color={color} />
            }
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray'
          }}
        >
          {/* <Tab.Screen name="Home" component={Home} /> */}
          <Tab.Screen name="Favorite" component={Favorite} />
        </Tab.Navigator>
      </NavigationContainer>
    // </ApolloProvider>
  );
}

AppRegistry.registerComponent('MyApplication', () => App)


