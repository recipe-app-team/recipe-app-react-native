import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
  } from "react-native";
  import { useEffect, useState } from "react";
  import { getUser } from "../utils/authStorage";
  import {
    getFavorites,
    saveFavorites,
  } from "../utils/favoritesStorage";
  
  export default function RecipeDetails({ route, navigation }) {
    const { recipe } = route.params;
  
    const [isFavorite, setIsFavorite] = useState(false);
  
    // Check if recipe already liked
    useEffect(() => {
      checkFavorite();
    }, []);
  
    const checkFavorite = async () => {
      const user = await getUser();
      if (!user) return;
  
      const favorites = await getFavorites(user.id);
      const exists = favorites.some(
        (item) => item.idMeal === recipe.idMeal
      );
      setIsFavorite(exists);
    };
  
    const handleLike = async () => {
      const user = await getUser();
  
      // Not logged in → go to login
      if (!user) {
        navigation.navigate("Login");
        return;
      }
  
      const favorites = await getFavorites(user.id);
      const exists = favorites.find(
        (item) => item.idMeal === recipe.idMeal
      );
  
      let updatedFavorites;
  
      if (exists) {
        updatedFavorites = favorites.filter(
          (item) => item.idMeal !== recipe.idMeal
        );
        setIsFavorite(false);
      } else {
        updatedFavorites = [...favorites, recipe];
        setIsFavorite(true);
      }
  
      await saveFavorites(user.id, updatedFavorites);
    };
  
    return (
      <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
        {/* IMAGE */}
        <Image
          source={{ uri: recipe.strMealThumb }}
          style={{ height: 260, width: "100%" }}
        />
  
        <View style={{ padding: 20 }}>
          {/* TITLE */}
          <Text
            style={{
              fontSize: 28,
              fontWeight: "700",
              marginBottom: 8,
              color: "#111",
            }}
          >
            {recipe.strMeal}
          </Text>
  
          {/* CATEGORY + LIKE */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            {/* CATEGORY BADGE */}
            <View
              style={{
                backgroundColor: "#f1f1f1",
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 20,
                marginRight: 12,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: "#555",
                }}
              >
                {recipe.strCategory}
              </Text>
            </View>
  
            {/* LIKE BUTTON */}
            <TouchableOpacity onPress={handleLike}>
              <Text
                style={{
                  fontSize: 18,
                  color: isFavorite ? "red" : "#555",
                }}
              >
                {isFavorite ? "❤️ Liked" : "🤍 Like"}
              </Text>
            </TouchableOpacity>
          </View>
  
          {/* SECTION TITLE */}
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              marginBottom: 10,
              color: "#111",
            }}
          >
            Instructions
          </Text>
  
          {/* INSTRUCTIONS */}
          <Text
            style={{
              fontSize: 16,
              lineHeight: 24,
              color: "#444",
            }}
          >
            {recipe.strInstructions}
          </Text>
        </View>
      </ScrollView>
    );
  }
  