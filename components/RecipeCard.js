import { TouchableOpacity, Text, Image } from "react-native";

export default function RecipeCard({ recipe, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        marginBottom: 16,
        backgroundColor: "#f2f2f2",
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      {recipe.image && (
        <Image
          source={{ uri: recipe.image }}
          style={{ height: 150, width: "100%" }}
        />
      )}

      <Text style={{ fontSize: 18, fontWeight: "bold", padding: 12 }}>
        {recipe.title}
      </Text>
    </TouchableOpacity>
  );
}
