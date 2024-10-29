import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RestaurantScreen = () => {
  const navigation = useNavigation();

  const restaurants = [
    { id: 1, name: 'Pizza Hut', cuisine: 'Italian', image: require('../assets/pizza.png') },
    { id: 2, name: 'McDonalds', cuisine: 'Fast Food', image: require('../assets/pizza.png') },
    { id: 3, name: 'Sushi Place', cuisine: 'Japanese', image: require('../assets/pizza.png') },
    // Add more restaurant objects here with corresponding images
  ];

  const handleRestaurantPress = (restaurant) => {
    navigation.navigate('RestaurantDetails', { restaurant });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose a Restaurant</Text>
      <FlatList
        data={restaurants}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleRestaurantPress(item)} style={styles.restaurantItem}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.cuisine}>{item.cuisine}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f5f5f5' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 20 },
  restaurantItem: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  image: { width: 80, height: 80, borderRadius: 8 },
  infoContainer: { flex: 1, paddingLeft: 15, justifyContent: 'center' },
  name: { fontSize: 18, fontWeight: 'bold' },
  cuisine: { fontSize: 14, color: 'gray', marginTop: 4 },
});

export default RestaurantScreen;
