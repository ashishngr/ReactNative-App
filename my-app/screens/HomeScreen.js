import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Navbar from "../component/Navbar";

const HomeScreen = ({ navigation }) => {
  const restaurants = [
    {
      id: 1,
      name: "Pizza Hut",
      cuisine: "Italian",
      image: require("../assets/pizza.png"),
    },
    {
      id: 2,
      name: "McDonalds",
      cuisine: "Fast Food",
      image: require("../assets/pizza.png"),
    },
    // Add more restaurants here
  ];

  return (
    <View style={styles.container}>
      {/* <Navbar title={"Hungry Foods"} showBackButton={false} /> */}
      <View>
        <FlatList
          data={restaurants}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <View style={styles.restaurantItem}>
                <Image source={item.image} style={styles.restaurantImage} />
                <View style={styles.restaurantInfo}>
                  <Text style={styles.restaurantName}>{item.name}</Text>
                  <Text style={styles.restaurantCuisine}>{item.cuisine}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  restaurantItem: {
    flexDirection: "row",
    marginBottom: 10,
  },
  restaurantImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  restaurantCuisine: {
    color: "gray",
  },
});

export default HomeScreen;
