// src/screens/Home.js
import React from "react";
import { useReactiveClient } from "@dynamic-labs/react-hooks";
import { client } from "../client";
import { LoginView } from "../LoginView";
import { DisplayAuthenticatedUserView } from "../DisplayAuthenticatedUserView";
import { Text, View } from "react-native";

const Home = () => {
  const { auth, sdk } = useReactiveClient(client);
  console.log("SDK Loaded:", sdk.loaded);
  console.log("Auth Token:", auth.token);

  if (!sdk.loaded) {
    return <Text>Loading...</Text>;
  }

  if (auth.token) {
    return <DisplayAuthenticatedUserView />;
  }

  return <LoginView />;
};

export default Home;
