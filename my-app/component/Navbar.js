import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // Use icons from @expo/vector-icons
import ProfileDropdown from "./ProfileDropdown";

const Navbar = ({ title, showBackButton }) => {
  const navigation = useNavigation();

  const pages = [
    { name: "Home", route: "Home", icon: "home-outline" },
    { name: "Restaurant", route: "Restaurant", icon: "restaurant-outline" },
    { name: "OrderTracking", route: "OrderTracking", icon: "receipt-outline" },
    { name: "Cart", route: "Cart", icon: "cart-outline" },
  ];

  const profileOptions = [
    { label: "Profile", icon: "person-outline", onPress: () => navigation.navigate("Profile") },
    { label: "Settings", icon: "settings-outline", onPress: () => navigation.navigate("Settings") },
    { label: "Sign In", icon: "log-in-outline", onPress: () => navigation.navigate("SignIn") },
    { label: "Sign Up", icon: "person-add-outline", onPress: () => navigation.navigate("SignUp") },
    { label: "Logout", icon: "log-out-outline", onPress: () => console.log("Logging out...") },
  ];

  return (
    <View style={styles.navbar}>
      {/* Back button */}
      {showBackButton && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconContainer}
        >
          <Ionicons name="arrow-back" size={26} color="#FFFFFF" />
        </TouchableOpacity>
      )}

      {/* Title */}
      <Text style={styles.navbarTitle}>{title}</Text>

      {/* Navigation List with Icons */}
      <View style={styles.navList}>
        {pages.map((page) => (
          <TouchableOpacity
            key={page.name}
            onPress={() => navigation.navigate(page.route)}
            style={styles.navItem}
          >
            <View style={styles.iconWrapper}>
              <Ionicons name={page.icon} size={24} color="#333333" />
            </View>
            <Text style={styles.navText}>{page.name}</Text>
          </TouchableOpacity>
        ))}
        <View style={styles.profileContainer}>
          <ProfileDropdown options={profileOptions} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#6a11cb", // Gradient start color
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5, // Shadow effect
  },
  navbarTitle: {
    flex: 1,
    fontSize: 26,
    fontWeight: "900",
    textAlign: "center",
    color: "#ff6347", // Tomato color for a fun look
    paddingVertical: 10,
    textTransform: "uppercase", // Makes text all caps
    letterSpacing: 2, // Adds spacing between letters
    textShadowColor: "#00bfff", // Light blue shadow for contrast
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
    borderWidth: 2,
    borderColor: "#ff4500", // Orange red border for extra flair
    borderRadius: 10,
    paddingHorizontal: 8,
    maxWidth: "80%",
  },
  navList: {
    flexDirection: "row",
    alignItems: "center",
  },
  navItem: {
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: 12,
  },
  iconWrapper: {
    backgroundColor: "#ffffff",
    padding: 8,
    borderRadius: 30,
    shadowColor: "#000", // Shadow for the icon background
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  navText: {
    fontSize: 12,
    color: "#ffffff",
    marginTop: 5,
  },
  iconContainer: {
    padding: 5,
    marginRight: 10,
  },
  profileContainer: {
    marginLeft: 20, // Adjust this value to add space
  },
});

export default Navbar;
