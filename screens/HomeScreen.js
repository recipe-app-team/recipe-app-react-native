import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  TextInput, // ✨ Import TextInput
} from "react-native";
import { useEffect, useState, useLayoutEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import UserDropdown from "../components/UserDropdown";
import { Ionicons } from "@expo/vector-icons"; // ✨ Import Icons
import { getRecipes } from "../services/recipeService";
import { getUser, logoutUser } from "../utils/authStorage";

export default function HomeScreen({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // ✅ track logged user
  const [searchQuery, setSearchQuery] = useState(""); // ✨ Search state

  useEffect(() => {
    loadRecipes();
    loadUser();
  }, []);

  const loadUser = async () => {
    const u = await getUser();
    setUser(u);
  };

  // 🔥 USER DROPDOWN IN HEADER (ONLY IF LOGGED IN)
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        user ? (
          <UserDropdown
            user={user}
            onProfilePress={() => navigation.navigate("Profile")}
            onLogoutPress={async () => {
              await logoutUser();
              setUser(null);
              navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
              });
            }}
          />
        ) : null,
    });
  }, [navigation, user]);

  const loadRecipes = async (query = "") => {
    setLoading(true);
    const data = await getRecipes(query);
    setRecipes(data);
    setLoading(false);
  };

  // ❤️ Navigate to Favorites (login required)
  const goToFavorites = async () => {
    const u = await getUser();
    console.log("❤️ Favorites clicked, user =", u);

    if (!u) {
      navigation.navigate("Login");
      return;
    }

    navigation.navigate("Favorites");
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#fff" }}>
      {/* HEADER INSIDE SCREEN */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Text style={{ fontSize: 26, fontWeight: "bold" }}>
          Recipes 🍽️
        </Text>

        <TouchableOpacity
          onPress={goToFavorites}
          style={{
            paddingVertical: 6,
            paddingHorizontal: 12,
            backgroundColor: "#111",
            borderRadius: 20,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 14 }}>
            ❤️ Favorites
          </Text>
        </TouchableOpacity>
      </View>

      {/* SEARCH BAR (✨ NEW) */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#f0f0f0",
          borderRadius: 12,
          paddingHorizontal: 12,
          paddingVertical: 8,
          marginBottom: 16,
        }}
      >
        <Ionicons name="search" size={20} color="#888" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Search recipes..."
          placeholderTextColor="#888"
          style={{ flex: 1, fontSize: 16, color: "#333" }}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={() => loadRecipes(searchQuery)}
          returnKeyType="search"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              setSearchQuery("");
              loadRecipes("");
            }}
          >
            <Ionicons name="close-circle" size={20} color="#888" />
          </TouchableOpacity>
        )}
      </View>

      {/* RECIPES LIST */}
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.idMeal}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <RecipeCard
            recipe={{
              title: item.strMeal,
              image: item.strMealThumb,
            }}
            onPress={() =>
              navigation.navigate("RecipeDetails", {
                recipe: item,
              })
            }
          />
        )}
      />
    </View>
  );
}
