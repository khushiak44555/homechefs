import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../src/screens/LoginScreen';
import RegisterScreen from '../src/screens/RegisterScreen';
import SignInScreen from '../src/screens/SignInScreen'; // Import SignInScreen
import HomeScreen from '../src/screens/HomeScreen';
import SearchScreen from '../src/screens/SearchScreen';
import CategoryScreen from '../src/screens/CategoryScreen';
import BurgerListScreen from '../src/screens/BurgerListScreen'; // Import BurgerListScreen


const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
        <Stack.Screen name="BurgerListScreen" component={BurgerListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;