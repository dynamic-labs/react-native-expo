import { FC } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { client } from "../client";
import { useReactiveClient } from "@dynamic-labs/react-hooks";

export const DisplayAuthenticatedUserView: FC = () => {
  const { auth } = useReactiveClient(client);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.section__heading}>User:</Text>
        <View style={styles.content_section}>
          <Text>{JSON.stringify(auth.authenticatedUser, null, 2)}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.section__heading}>Actions</Text>
        <View style={[styles.content_section, styles.actions_section]}>
          <Button
            onPress={() => client.ui.userProfile.show()}
            title="User Profile UI"
          />
          <Button onPress={() => client.auth.logout()} title="Logout" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.section__heading}>JWT:</Text>
        <View style={styles.content_section}>
          <Text>{auth.token}</Text>
        </View>
      </View>
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

  content_section: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#f9f9f9",
  },

  actions_section: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
});
