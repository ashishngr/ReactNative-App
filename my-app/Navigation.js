import * as React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import OrderTrackingScreen from "./screens/OrderTrackingScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RestaurantScreen from "./screens/RestaurantScreen";
import SignInScreen from "./screens/SignIn";
import SignUpScreen from "./screens/SignUp";
import Layout from "./Layout";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
          name="Home"
          children={(props) => (
            <Layout>
              <HomeScreen {...props} />
            </Layout>
          )}
        />
        <Stack.Screen
          name="Restaurant"
          children={(props) => (
            <Layout>
              <RestaurantScreen {...props} />
            </Layout>
          )}
        />
        <Stack.Screen
          name="Cart"
          children={(props) => (
            <Layout>
              <CartScreen {...props} />
            </Layout>
          )}
        />
        <Stack.Screen
          name="Checkout"
          children={(props) => (
            <Layout>
              <CheckoutScreen {...props} />
            </Layout>
          )}
        />
        <Stack.Screen
          name="Profile"
          children={(props) => (
            <Layout>
              <ProfileScreen {...props} />
            </Layout>
          )}
        />
        <Stack.Screen
          name="SignIn"
          children={(props) => (
            <Layout>
              <SignInScreen {...props} />
            </Layout>
          )}
        />
        <Stack.Screen
          name="SignUp"
          children={(props) => (
            <Layout>
              <SignUpScreen {...props} />
            </Layout>
          )}
        />
        <Stack.Screen
          name="OrderTracking"
          children={(props) => (
            <Layout>
              <OrderTrackingScreen {...props} />
            </Layout>
          )}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
