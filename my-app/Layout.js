// components/Layout.js
import React from "react";
import { View, StyleSheet } from "react-native";
import Navbar from "./component/Navbar";


const Layout = ({ children }) => {
  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <Navbar title={"Hungry Foods"}/>
      </View>
      {/* Main Content */}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    paddingTop: 50,
    paddingHorizontal: 0,
    backgroundColor: "white",
    zIndex: 5,
  },
  content: {
    flex: 1,
    padding: 10,
  },
});

export default Layout;
