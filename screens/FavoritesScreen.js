import { View, Text, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { getUser } from "../utils/authStorage";
import { getFavorites } from "../utils/favoritesStorage";
import RecipeCard from "../components/RecipeCard";

export default function FavoritesScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadFavorites);
    return unsubscribe;
  }, [navigation]);

  const loadFavorites = async () => {
    const user = await getUser();
    console.log("📦 FavoritesScreen user =", user);
  
    if (!user) {
      navigation.navigate("Login");
      return;
    }
  
    const data = await getFavorites(user.id);
    console.log("📦 Favorites loaded for", user.id, data);
  
    setFavorites(data);
  };
  

  if (favorites.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No favorites yet ❤️</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.idMeal}
      renderItem={({ item }) => (
        <RecipeCard
          recipe={{
            title: item.strMeal,
            image: item.strMealThumb,
          }}
          onPress={() =>
            navigation.navigate("RecipeDetails", { recipe: item })
          }
        />
      )}
    />
  );
}
