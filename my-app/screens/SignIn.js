import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

import authAPI from "../common/authAPI"; 
import StorageUtils from  "../common/HandleStorage"; 
import { AuthContext } from '../common/AuthContext';


const SignInScreen = () => {

  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [loading, setLoading] = useState(false);

  const {setIsLoggedIn} = useContext(AuthContext)


  const handleSignIn = async() => {
    setLoading(true); 
    try {
      // Call the login API with email and password
      const response = await authAPI.login({ email, password });
      console.log("Response in signIn page code", response); 
      
      // If successful, save the token and update the auth context
      if (response.status === 200 && response.data.token) {
        await StorageUtils.storeAPIToken(response.data.token);
         // Save token in storage
        setIsLoggedIn(true);
        navigation.navigate('Home');
      } else {
        Alert.alert("Sign In Failed", "Invalid email or password");
      }
    } catch (error) {
      console.error("Sign In Error:", error);
      Alert.alert("Error", "An error occurred during sign in. Please try again.");
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Sign In</Text>

        <TextInput
          placeholder="Email Address"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        <TouchableOpacity onPress={handleSignIn} style={styles.signInButton}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signupLinkText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
    elevation: 1,
  },
  signInButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    elevation: 2,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signupText: {
    color: '#333',
    fontSize: 14,
  },
  signupLinkText: {
    color: '#ff6347',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default SignInScreen;
