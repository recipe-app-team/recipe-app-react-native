import AsyncStorage from "@react-native-async-storage/async-storage";

const getKey = (userId) => `FAVORITES_${userId}`;

export const getFavorites = async (userId) => {
  const data = await AsyncStorage.getItem(getKey(userId));
  return data ? JSON.parse(data) : [];
};

export const saveFavorites = async (userId, favorites) => {
  await AsyncStorage.setItem(
    getKey(userId),
    JSON.stringify(favorites)
  );
};
