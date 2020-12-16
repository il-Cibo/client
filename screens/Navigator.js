import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Login, Register, Home, Favorite, Search, AddRecipe, MealPlan, UserProfile, DetailRecipe, EditRecipe } from './'
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading'
import { useReactiveVar } from '@apollo/client'
import { tokenVar } from '../store/makeVar'
import AsyncStorage from '@react-native-async-storage/async-storage';

function Navigator() {
  const token = useReactiveVar(tokenVar)
  // const token = useSelector((state) => state.token)  

  const Stack = createStackNavigator();
  const HomeStack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  useEffect(() => {
    const getToken = async () => {
      const initToken = await AsyncStorage.getItem('token');
      tokenVar(initToken)
    }
    getToken()
  }, [])

  function HomeStackScreen() {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <HomeStack.Screen name="EditRecipe" component={EditRecipe} options={{ headerShown: false }} />
        <HomeStack.Screen name="DetailRecipe" component={DetailRecipe} options={{ headerShown: false }} />
        <HomeStack.Screen name="Search" component={Search} options={{ headerShown: false }} />
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
              iconName = focused ? 'heart' : 'heart-outline'
            } else if (route.name === 'Add Recipe') {
              iconName = focused ? 'add-circle' : 'add-circle-outline'
            } else if (route.name === 'Meal Plan') {
              iconName = focused ? 'calendar' : 'calendar-outline'
            } else if (route.name === 'Profile') {
              iconName = focused ? 'user-circle' : 'user-circle-o'
              return <FontAwesome name={iconName} size={size} color={color} />
            }

            return <Ionicons name={iconName} size={size} color={color} />
          }
        })}
        tabBarOptions={{
          activeTintColor: '#FF9494',
          inactiveTintColor: 'gray'
        }}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Favorite" component={Favorite} />
        <Tab.Screen name="Add Recipe" component={AddRecipe} options={{ headerShown: false }} />
        <Tab.Screen name="Meal Plan" component={MealPlan} options={{ headerShown: false }} />
        <Tab.Screen name="Profile" component={UserProfile} options={{ headerShown: false }} />
      </Tab.Navigator>
    )
  }

  const [loaded] = useFonts({
    Oswald: require('../assets/fonts/Oswald-VariableFont_wght.ttf')
  })

  if (!loaded) {
    return <AppLoading />
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {token? <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }}></Stack.Screen> : <React.Fragment>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}></Stack.Screen>
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}></Stack.Screen>
        </React.Fragment> }
        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator