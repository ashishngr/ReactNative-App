import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import { useContext } from 'react';
import { AuthContext } from '../common/AuthContext';

const Navbar = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();
  const route = useRoute(); 

  const { logout } = useContext(AuthContext);

  const pages = [
    { name: "Home", route: "Home", icon: "home-outline" },
    { name: "Restaurant", route: "Restaurant", icon: "restaurant-outline" },
    { name: "OrderTracking", route: "OrderTracking", icon: "receipt-outline" },
    { name: "Cart", route: "Cart", icon: "cart-outline" },
    { name: "Profile", route: "Profile", icon: "person-outline" }, 
    {
      name: "Logout",
      icon: "log-out-outline",
      isLogout: true,
      onPress: async () => {
        try {
          await AsyncStorage.clear(); // Clear local storage
          navigation.reset({
            index: 0,
            routes: [{ name: "SignIn" }], // Navigate to Login page
          });
        } catch (error) {
          console.log("Error clearing storage", error);
        }
      },
    },
  ];

  const animatedHeight = new Animated.Value(0);
  const animatedOpacity = new Animated.Value(0);

  useEffect(() => {
    if (menuVisible) {
      Animated.parallel([
        Animated.timing(animatedHeight, {
          toValue: 335,
          duration: 600,
          useNativeDriver: false
        }),
        Animated.timing(animatedOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: false
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(animatedHeight, {
          toValue: 0,
          duration: 600,
          useNativeDriver: false
        }),
        Animated.timing(animatedOpacity, {
          toValue: 0,
          duration: 400,
          useNativeDriver: false
        })
      ]).start();
    }
  }, [menuVisible]);

  const toggleMenu = () => setMenuVisible(!menuVisible);

  return (
    <View style={styles.navbarContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Hungry Foods</Text>
        <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
          <Ionicons name={menuVisible ? "close-outline" : "menu-outline"} size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      <Animated.View style={[styles.menuItems, { height: animatedHeight, opacity: animatedOpacity }]}>
  {pages.map((page, index) => (
    <React.Fragment key={index}>
      <TouchableOpacity
        style={[
          styles.menuItem,
          route.name === page.route && styles.activeMenuItem,
          page.isLogout && styles.logoutItem
        ]}
        onPress={() => {
          logout();
          toggleMenu();
          navigation.navigate("Login");
        }}
      >
        <Ionicons
          name={page.icon}
          size={24}
          color={page.isLogout ? "#ff6347" : "#fff"}
          style={styles.icon}
        />
        <Text style={[styles.menuText, page.isLogout && styles.logoutText]}>
          {page.name}
        </Text>
      </TouchableOpacity>
      {index < pages.length - 1 && <View style={styles.separator} />}
    </React.Fragment>
  ))}
</Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbarContainer: {
    backgroundColor: "#6a11cb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
    zIndex: 10
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#ff6347",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontFamily: "chewy",
    textAlign: "center",
  },
  menuButton: {
    position: "absolute",
    right: 10,
    padding: 10,
    backgroundColor: "#ff6347",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  menuItems: {
    overflow: "hidden",
    backgroundColor: "#6a11cb",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: "100%",
    justifyContent: "center"
  },
  activeMenuItem: {
    backgroundColor: "#ff6347",
    borderRadius: 10,
  },
  icon: {
    width: 30, // Ensures icons align in the same column
    textAlign: "center",
  },
  menuText: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 15,
    textAlign: "center",
  },
  separator: {
    height: 1,
    width: "90%",
    backgroundColor: "#fff",
    opacity: 0.3,
    alignSelf: "center",
  },
  logoutItem: {
    backgroundColor: "#f8d7da",
  },
  logoutText: {
    color: "#ff6347",
  },
});

export default Navbar;
