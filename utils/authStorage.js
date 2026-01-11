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
export const registerUser = async (email, password, name = "", username = "") => {
  const usersJson = await AsyncStorage.getItem(USERS_KEY);
  const users = usersJson ? JSON.parse(usersJson) : [];

  if (users.find((u) => u.email === email)) {
    throw new Error("Email already exists");
  }

  if (username && users.find((u) => u.username === username)) {
    throw new Error("Username already exists");
  }

  const newUser = { email, password, name, username };
  users.push(newUser);

  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(newUser));
};

// Update user
export const updateUser = async (currentEmail, userData, oldPassword = null) => {
  const usersJson = await AsyncStorage.getItem(USERS_KEY);
  const users = usersJson ? JSON.parse(usersJson) : [];

  // Find current user
  const userIndex = users.findIndex((u) => u.email === currentEmail);
  if (userIndex === -1) {
    throw new Error("User not found");
  }

  const currentUser = users[userIndex];

  // If changing password, validate old password
  if (userData.password && userData.password !== currentUser.password) {
    if (!oldPassword || oldPassword !== currentUser.password) {
      throw new Error("Old password is incorrect");
    }
  }

  // Check if new email is already taken by another user
  if (userData.email && userData.email !== currentEmail) {
    const emailExists = users.find((u) => u.email === userData.email);
    if (emailExists) {
      throw new Error("Email already exists");
    }
  }

  // Check if new username is already taken by another user
  if (userData.username && userData.username !== currentUser.username) {
    const usernameExists = users.find((u) => u.username === userData.username);
    if (usernameExists) {
      throw new Error("Username already exists");
    }
  }

  // Update user with new data, keeping old values if not provided
  users[userIndex] = {
    email: userData.email || currentUser.email,
    password: userData.password || currentUser.password,
    name: userData.name !== undefined ? userData.name : currentUser.name,
    username: userData.username !== undefined ? userData.username : currentUser.username,
  };

  // Update storage
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(users[userIndex]));

  return users[userIndex];
};

// Logout
export const logoutUser = async () => {
  await AsyncStorage.removeItem(USER_KEY);
};
