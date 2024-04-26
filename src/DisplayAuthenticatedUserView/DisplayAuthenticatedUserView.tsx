import { FC } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { client } from "../client";
import { useReactiveClient } from "@dynamic-labs/react-hooks";

export const DisplayAuthenticatedUserView: FC = () => {
  const { auth } = useReactiveClient(client);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.section__heading}>JWT:</Text>
        <Text>{auth.token}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.section__heading}>User:</Text>
        <Text>{JSON.stringify(auth.authenticatedUser, null, 2)}</Text>
      </View>

      <Button title="Logout" onPress={auth.logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: "stretch",
    gap: 40,
    padding: 20,
  },

  scroll: {
    alignContent: "stretch",
  },

  heading: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: -50,
  },

  heading__text: {
    fontSize: 20,
  },

  error: {
    color: "red",
  },

  section: {
    gap: 5,
  },

  section__heading: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
