import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LandingScreen from "../screens/LandingScreen";
import HomeScreen from "../screens/HomeScreen";
import RecipeDetails from "../screens/RecipeDetails";
import FavoritesScreen from "../screens/FavoritesScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">

        {/* LANDING */}
        <Stack.Screen
          name="Landing"
          component={LandingScreen}
          options={{ headerShown: false }}
        />

        {/* AUTH */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Login" }}
        />

        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: "Register" }}
        />

        {/* APP */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Recipes" }}
        />

        <Stack.Screen
          name="RecipeDetails"
          component={RecipeDetails}
          options={{ title: "Recipe Details" }}
        />

        <Stack.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{ title: "Favorites" }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
