import React, { FC } from "react";
import { View, Text, StyleSheet, ScrollView, Button } from "react-native";
import { useReactiveClient } from "@dynamic-labs/react-hooks";
import { client } from "../client";

export const DisplayAuthenticatedUserView: FC = () => {
  const { auth, ui } = useReactiveClient(client);
  console.log("UI:", ui);

  const { email, environmentId, phoneNumber, sessionId, userId, newUser } =
    auth.authenticatedUser || {};

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>User Profile</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          <Text style={styles.field}>
            <Text style={styles.fieldLabel}>Email:</Text> {email || "N/A"}
          </Text>
          <Text style={styles.field}>
            <Text style={styles.fieldLabel}>Environment ID:</Text>{" "}
            {environmentId || "N/A"}
          </Text>
          <Text style={styles.field}>
            <Text style={styles.fieldLabel}>Phone Number:</Text>{" "}
            {phoneNumber || "N/A"}
          </Text>
          <Text style={styles.field}>
            <Text style={styles.fieldLabel}>Session ID:</Text>{" "}
            {sessionId || "N/A"}
          </Text>
          <Text style={styles.field}>
            <Text style={styles.fieldLabel}>User ID:</Text> {userId || "N/A"}
          </Text>
          <Text style={styles.field}>
            <Text style={styles.fieldLabel}>New User:</Text>{" "}
            {newUser ? "Yes" : "No"}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Show User Modal"
            onPress={() => ui.userProfile.show()}
            color="#4CAF50"
          />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  field: {
    fontSize: 16,
    marginBottom: 8,
  },
  fieldLabel: {
    fontWeight: "bold",
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default DisplayAuthenticatedUserView;
