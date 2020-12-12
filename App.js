import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Login, Register, Home, Favorite, Search } from './screens'
import { Ionicons } from '@expo/vector-icons'
import { AppRegistry } from 'react-native'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
// const client = new ApolloClient({
//   uri: 'http://localhost:4000/graphql',
//   cache: new InMemoryCache()
// })

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

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
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Favorite" component={Favorite} />
      </Tab.Navigator>
    </NavigationContainer>
    // </ApolloProvider>
  );
}

AppRegistry.registerComponent('MyApplication', () => App)
