import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const CheckoutScreen = () => {
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const handleCheckout = () => {
    // Implement checkout logic here
    console.log('Checkout with address:', address, 'and phone:', phone);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Enter your address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      <Button title="Place Order" onPress={handleCheckout} />
    </View>
  );
};

export default CheckoutScreen;