import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create the AuthContext
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load the token from AsyncStorage
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('authToken');
      setIsLoggedIn(!!token);
      setLoading(false);
    };
    checkLoginStatus();
  }, []);

  // Sign in function to save the token and mark the user as logged in
  const login = async (token) => {
    await AsyncStorage.setItem('authToken', token);
    setIsLoggedIn(true);
  };

  // Sign up function for registration
  const signUp = async (token) => {
    await AsyncStorage.setItem('authToken', token);
    setIsLoggedIn(true);
  };
  // Function to update login status and save token
  const setIsAuthenticated = async (isAuthenticated) => {
    if (isAuthenticated) {
      const token = await AsyncStorage.getItem('authToken');
      setIsLoggedIn(!!token); // Sets the login status based on token
    } else {
      await AsyncStorage.removeItem('authToken');
      setIsLoggedIn(false); // Logout user by removing token
    }
  };
  const logout = async () => {
    await AsyncStorage.removeItem('authToken');
    setIsLoggedIn(false);
  };


  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, login, signUp, setIsAuthenticated, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
