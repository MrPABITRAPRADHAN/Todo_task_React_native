import { View, Text } from "react-native";
import LogoutButton from "./component/LogoutButton";
import { auth } from "./firebase";

export default function Home() {
  return (
    <View style={{ padding: 20 }}>
      <Text>Welcome, {auth.currentUser?.email}</Text>
      <LogoutButton />
    </View>
  );
}
