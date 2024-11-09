import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Navigation from './Navigation';
import AuthContextProvider from './common/AuthContext';


export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Ashish Nagar First --- React Native APP</Text>
    //   <StatusBar style="auto" />
    // </View>
    <AuthContextProvider>
      <Navigation />
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
