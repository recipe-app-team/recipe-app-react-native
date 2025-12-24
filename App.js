import { SafeAreaView } from "react-native";
import AppNavigator from "./navigation/AppNavigator";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppNavigator />
    </SafeAreaView>
  );
}
