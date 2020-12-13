import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Login, Register, Home, Favorite, Search, AddRecipe } from './screens'
import { Ionicons } from '@expo/vector-icons'
import { AppRegistry } from 'react-native'
import { ApolloProvider } from '@apollo/client'
import client from './config/client'
import { Provider } from 'react-redux'
import store from './store'

const Stack = createStackNavigator();
const HomeStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <HomeStack.Screen name="Search" component={Search} options={{ headerShown: false }} />
      <HomeStack.Screen name="AddRecipe" component={AddRecipe} options={{ headerShown: false }} />
    </HomeStack.Navigator>
  )
}

function HomeTabs() {
  return (
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
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Favorite" component={Favorite} />
    </Tab.Navigator>
  )
}

export default function App() {
  
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            {/* <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }}></Stack.Screen> */}
            <Stack.Screen name="AddRecipe" component={AddRecipe} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </ApolloProvider>
  );
}

AppRegistry.registerComponent('MyApplication', () => App)
