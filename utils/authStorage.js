import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_KEY = "LOGGED_USER";

export const getUser = async () => {
  const json = await AsyncStorage.getItem(USER_KEY);
  return json ? JSON.parse(json) : null;
};

export const loginUser = async (user) => {
  // FORCE overwrite
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const logoutUser = async () => {
  await AsyncStorage.removeItem(USER_KEY);
};
