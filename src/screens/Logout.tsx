// src/screens/LogoutScreen.js
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useReactiveClient } from "@dynamic-labs/react-hooks";
import { client } from "../client";

const LogoutScreen = () => {
  const navigation = useNavigation();
  const { auth } = useReactiveClient(client);

  useEffect(() => {
    const performLogout = async () => {
      try {
        await auth.logout();  // Perform logout
        console.log("Logged out successfully");
        navigation.navigate("Home");  // Redirect to Home after logout
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };

    performLogout();
  }, [auth, navigation]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Logging out...</Text>
    </View>
  );
};

export default LogoutScreen;
