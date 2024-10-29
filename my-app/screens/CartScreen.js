import React, { useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <View style={{ padding: 10 }}>
            <Text>{item.name}</Text>
            <Text>₹{item.price}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'right' }}>Total: ₹{totalPrice}</Text>
      <Button title="Checkout" onPress={() => navigation.navigate('Checkout')} />
    </View>
  );
};

export default CartScreen;