import AsyncStorage from "@react-native-async-storage/async-storage";

const StorageUtils = {
  storeItem: async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      console.log(`Stored ${key} in AsyncStorage`);
    } catch (error) {
      console.error(`Error storing ${key}:`, error);
    }
  },
  getItem: async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error(`Error retrieving ${key}:`, error);
      return null;
    }
  },
  removeItem: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      console.log(`Removed ${key} from AsyncStorage`);
    } catch (error) {
      console.error(`Error removing ${key}:`, error);
    }
  },
  clearStorage: async () => {
    try {
      await AsyncStorage.clear();
      console.log("Cleared AsyncStorage");
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error);
    }
  },
  storeAPIToken: async (token) => {
    try {
      await StorageUtils.storeItem('apiToken', token);
      console.log("Stored API Token");
    } catch (error) {
      console.error("Error storing API Token:", error);
    }
  },
  getAPIToken: async () => {
    try {
      const token = await StorageUtils.getItem('apiToken');
      console.log("Retrieved API Token:", token);
      return token;
    } catch (error) {
      console.error("Error retrieving API Token:", error);
      return null;
    }
  },
  removeAPIToken: async () => {
    try {
      await StorageUtils.removeItem('apiToken');
      console.log("Removed API Token");
    } catch (error) {
      console.error("Error removing API Token:", error);
    }
  },
};
export default StorageUtils;
