import React, { useState,useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useRoute } from "@react-navigation/native";
import authAPI from "../common/authAPI"; 
import { AuthContext } from '../common/AuthContext';

const SignUpScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState(new Date());
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const navigation = useNavigation();
  const {setIsLoggedIn} = useContext(AuthContext)


  const handleSignup = async() => {
    console.log("Signup details:", {
      firstName,
      lastName,
      email,
      phone,
      dob,
      street,
      city,
      state,
      zipCode,
      country,
      password,
      confirmPassword,
    });
    try {
      const signupData = {
        firstName,
        lastName,
        email,
        phone,
        dob,
        street,
        city,
        state,
        zipCode,
        country,
        password,
        confirmPassword,
      };
      const response = await authAPI.signup(signupData); 
      if (response.status === 200 && response.data.token) {
        await StorageUtils.storeAPIToken(response.data.token); // Save token in storage
        setIsLoggedIn(true);
        navigation.navigate('Home');
      } else {
        Alert.alert("Sign Up Failed", "Something went wrong, please try again.");
      }
    } catch (error) {
      console.error("Sign Up Error:", error);
      Alert.alert("Error", "An error occurred during sign up. Please try again.");
    }finally {
      setLoading(false);
    }
  };


  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setDob(selectedDate);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Create an Account</Text>

        <TextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
        />
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
        />
        <TextInput
          placeholder="Email Address"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.dateInput}
        >
          <Text style={styles.dateText}>
            {dob ? dob.toDateString() : "Date of Birth"}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={dob}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
        <TextInput
          placeholder="Street Address"
          value={street}
          onChangeText={setStreet}
          style={styles.input}
        />
        <TextInput
          placeholder="City"
          value={city}
          onChangeText={setCity}
          style={styles.input}
        />
        <TextInput
          placeholder="State"
          value={state}
          onChangeText={setState}
          style={styles.input}
        />
        <TextInput
          placeholder="Zip Code"
          value={zipCode}
          onChangeText={setZipCode}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          placeholder="Country"
          value={country}
          onChangeText={setCountry}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
        />

        <TouchableOpacity onPress={handleSignup} style={styles.signupButton}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <Text style={styles.signInLinkText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
    marginTop: 35,
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 15,
    elevation: 1,
  },
  dateInput: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    marginBottom: 15,
    elevation: 1,
  },
  dateText: {
    color: "#333",
  },
  signupButton: {
    backgroundColor: "#ff6347",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    elevation: 2,
  },
  signupButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signInContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  signInText: {
    color: "#333",
    fontSize: 14,
  },
  signInLinkText: {
    color: "#ff6347",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default SignUpScreen;
