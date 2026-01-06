import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_KEY = "LOGGED_USER";
const USERS_KEY = "USERS_LIST";

// Get logged user
export const getUser = async () => {
  const json = await AsyncStorage.getItem(USER_KEY);
  return json ? JSON.parse(json) : null;
};

// Login
export const loginUser = async (email, password) => {
  const usersJson = await AsyncStorage.getItem(USERS_KEY);
  const users = usersJson ? JSON.parse(usersJson) : [];

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
};

// Register
export const registerUser = async (email, password) => {
  const usersJson = await AsyncStorage.getItem(USERS_KEY);
  const users = usersJson ? JSON.parse(usersJson) : [];

  if (users.find((u) => u.email === email)) {
    throw new Error("Email already exists");
  }

  const newUser = { email, password };
  users.push(newUser);

  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(newUser));
};

// Logout
export const logoutUser = async () => {
  await AsyncStorage.removeItem(USER_KEY);
};
