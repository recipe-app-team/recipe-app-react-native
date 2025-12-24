import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
  } from "react-native";
  import { useEffect, useState } from "react";
  import RecipeCard from "../components/RecipeCard";
  import { getRecipes } from "../services/recipeService";
  import { getUser } from "../utils/authStorage";
  
  export default function HomeScreen({ navigation }) {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      loadRecipes();
    }, []);
  
    const loadRecipes = async () => {
      const data = await getRecipes();
      setRecipes(data);
      setLoading(false);
    };
  
    // Navigate to Favorites (login required)
    const goToFavorites = async () => {
        const user = await getUser();
        console.log("❤️ Favorites clicked, user =", user);
      
        if (!user) {
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
        {/* HEADER */}
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
  