import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import OrderTrackingScreen from "./screens/OrderTrackingScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RestaurantScreen from "./screens/RestaurantScreen";
import SignInScreen from "./screens/SignIn";
import SignUpScreen from "./screens/SignUp";
import Layout from "./Layout"; // Ensure Layout is imported
import { AuthContext } from "./common/AuthContext"; // Assuming you have AuthContext to manage user authentication

const Stack = createNativeStackNavigator();

// Main stack for authenticated users

const Navigation = () => {
  const { isLoggedIn } = useContext(AuthContext); // Use isLoggedIn instead of isAuthenticated
  console.log("isLoggedIn........", isLoggedIn);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen
              name="Home"
              component={() => (
                <Layout>
                  <HomeScreen  />
                </Layout>
              )}
            />
            <Stack.Screen
              name="Restaurant"
              component={() => (
                <Layout>
                  <RestaurantScreen  />
                </Layout>
              )}
            />
            <Stack.Screen
              name="Cart"
              component={() => (
                <Layout>
                  <CartScreen  />
                </Layout>
              )}
            />
            <Stack.Screen
              name="Checkout"
              component={() => (
                <Layout>
                  <CheckoutScreen  />
                </Layout>
              )}
            />
            <Stack.Screen
              name="Profile"
              component={() => (
                <Layout>
                  <ProfileScreen  />
                </Layout>
              )}
            />
            <Stack.Screen
              name="OrderTracking"
              component={() => (
                <Layout>
                  <OrderTrackingScreen  />
                </Layout>
              )}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
