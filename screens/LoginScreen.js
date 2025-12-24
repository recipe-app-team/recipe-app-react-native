import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { loginUser } from "../utils/authStorage";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    const cleanEmail = email.trim().toLowerCase();

    const user = {
      id: cleanEmail, // UNIQUE PER USER
      email: cleanEmail,
    };

    await loginUser(user);

    // 🔥 VERY IMPORTANT
    navigation.reset({
      index: 0,
      routes: [{ name: "Favorites" }],
    });
  };

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Text style={{ fontSize: 26, fontWeight: "700", marginBottom: 20 }}>
        Login
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        autoCapitalize="none"
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          borderRadius: 10,
          padding: 12,
          marginBottom: 20,
        }}
      />

      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: "#111",
          padding: 14,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 16 }}>
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}
