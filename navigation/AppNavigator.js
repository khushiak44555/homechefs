import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Auth Screens
import LoginScreen from '../src/screens/LoginScreen';
import RegisterScreen from '../src/screens/RegisterScreen';
import SignInScreen from '../src/screens/SignInScreen';

// All Screens
import HomeScreen from '../src/screens/HomeScreen';
import OrdersScreen from '../src/screens/OrderScreen';
import OffersScreen from '../src/screens/OfferScreen';
import FavouritesScreen from '../src/screens/FavouritesScreen';
import ProfileScreen from '../src/screens/ProfileScreen';
import SearchScreen from '../src/screens/SearchScreen';
import CategoryScreen from '../src/screens/CategoryScreen';
import BurgerListScreen from '../src/screens/BurgerListScreen';
import HomecooksScreen from '../src/screens/HomecooksScreen';
import RestaurantDetailScreen from '../src/screens/RestaurantDetailScreen';
import CartScreen from '../src/screens/CartScreen';
import LocationPickerScreen from '../src/screens/LocationPickerScreen';
import AddressDetailsScreen from '../src/screens/AddressDetailsScreen';
import AddressListScreen from '../src/screens/AddressListScreen';
import NotificationScreen from '../src/screens/NotificationScreen';
import NotificationsScreen from '../src/screens/NotificationsScreen';
import HelpScreen from '../src/screens/HelpScreen';
import FAQScreen from '../src/screens/FAQScreen';
import TermsScreen from '../src/screens/TermsScreen';
import PaymentScreen from '../src/screens/PaymentScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const colors = {
  primary: '#FF6B35',
  inactive: '#999999',
};

// Tab Navigator with Bottom Tabs
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        switch (route.name) {
          case 'HomeTab':
            iconName = focused ? 'home' : 'home-outline';
            break;
          case 'OrdersTab':
            iconName = focused ? 'clipboard-list' : 'clipboard-list-outline';
            break;
          case 'OffersTab':
            iconName = focused ? 'tag-multiple' : 'tag-multiple-outline';
            break;
          case 'FavouritesTab':
            iconName = focused ? 'heart' : 'heart-outline';
            break;
          case 'ProfileTab':
            iconName = focused ? 'account' : 'account-outline';
            break;
        }
        return <MaterialCommunityIcons name={iconName} size={24} color={color} />;
      },
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.inactive,
      tabBarStyle: {
        height: 80,
        paddingTop: 5,
        paddingBottom: 10,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        elevation: 8,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
    })}
  >
    <Tab.Screen 
      name="HomeTab" 
      component={HomeScreen} 
      options={{ title: 'Home' }}
    />
    <Tab.Screen 
      name="OrdersTab" 
      component={OrdersScreen} 
      options={{ title: 'Orders' }}
    />
    <Tab.Screen 
      name="OffersTab" 
      component={OffersScreen} 
      options={{ title: 'Offers' }}
    />
    <Tab.Screen 
      name="FavouritesTab" 
      component={FavouritesScreen} 
      options={{ title: 'Favourites' }}
    />
    <Tab.Screen 
      name="ProfileTab" 
      component={ProfileScreen} 
      options={{ title: 'Profile' }}
    />
  </Tab.Navigator>
);

// Main Navigator
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="MainApp"
        screenOptions={{ headerShown: false }}
      >
        {/* Auth Flow */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        
        {/* Main App with Bottom Tabs */}
        <Stack.Screen name="MainApp" component={TabNavigator} />
        
        {/* All Other Screens */}
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Category" component={CategoryScreen} />
        <Stack.Screen name="BurgerList" component={BurgerListScreen} />
        <Stack.Screen name="Homecooks" component={HomecooksScreen} />
        <Stack.Screen name="RestaurantDetail" component={RestaurantDetailScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="LocationPicker" component={LocationPickerScreen} />
        <Stack.Screen name="AddressDetails" component={AddressDetailsScreen} />
        <Stack.Screen name="AddressList" component={AddressListScreen} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Help" component={HelpScreen} />
        <Stack.Screen name="FAQ" component={FAQScreen} />
        <Stack.Screen name="Terms" component={TermsScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;