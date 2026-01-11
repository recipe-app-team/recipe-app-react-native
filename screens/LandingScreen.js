import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
  } from "react-native";
  
  export default function LandingScreen({ navigation }) {
    return (
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
        }}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        {/* DARK OVERLAY */}
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.45)",
            justifyContent: "center",
            alignItems: "center",
            padding: 24,
          }}
        >
          {/* TEXT */}
          <Text
            style={{
              fontSize: 40,
              fontWeight: "700",
              color: "#fff",
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            Cook Now
          </Text>
  
          <Text
            style={{
              fontSize: 18,
              color: "#eee",
              textAlign: "center",
              lineHeight: 26,
              maxWidth: "85%",
              marginBottom: 48,
            }}
          >
            Discover simple and delicious recipes.
            Cook better, every day.
          </Text>
  
          {/* BUTTON */}
          <TouchableOpacity
            onPress={() => navigation.replace("Home")}
            style={{
              backgroundColor: "#fff",
              paddingVertical: 14,
              paddingHorizontal: 48,
              borderRadius: 30,
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontWeight: "600",
                color: "#111",
              }}
            >
              Get Started
            </Text>
          </TouchableOpacity>
  
          {/* LOGIN */}
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text
              style={{
                color: "#fff",
                fontSize: 15,
                opacity: 0.85,
              }}
            >
              Already have an account? Login
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
  