import React, { FC } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useReactiveClient } from "@dynamic-labs/react-hooks";
import { client } from "../client";

export const DisplayAuthenticatedUserView: FC = () => {
  const { auth } = useReactiveClient(client);

  const { email, environmentId, phoneNumber, sessionId, userId, newUser } = auth.authenticatedUser || {};
  const verifiedCredentials = auth.authenticatedUser?.verifiedCredentials || [];

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>User Profile</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          <Text style={styles.field}><Text style={styles.fieldLabel}>Email:</Text> {email || "N/A"}</Text>
          <Text style={styles.field}><Text style={styles.fieldLabel}>Environment ID:</Text> {environmentId || "N/A"}</Text>
          <Text style={styles.field}><Text style={styles.fieldLabel}>Phone Number:</Text> {phoneNumber || "N/A"}</Text>
          <Text style={styles.field}><Text style={styles.fieldLabel}>Session ID:</Text> {sessionId || "N/A"}</Text>
          <Text style={styles.field}><Text style={styles.fieldLabel}>User ID:</Text> {userId || "N/A"}</Text>
          <Text style={styles.field}><Text style={styles.fieldLabel}>New User:</Text> {newUser ? "Yes" : "No"}</Text> 
        </View>

        <Text style={styles.header}>Verified Credentials</Text>

        {verifiedCredentials.map((credential, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{credential.format.toUpperCase()} Credential</Text>
            {credential.format === "blockchain" && (
              <>
                <Text style={styles.field}><Text style={styles.fieldLabel}>Address:</Text> {credential.address}</Text>
                <Text style={styles.field}><Text style={styles.fieldLabel}>Chain:</Text> {credential.chain}</Text>
                <Text style={styles.field}><Text style={styles.fieldLabel}>Wallet Name:</Text> {credential.walletName}</Text>
                <Text style={styles.field}><Text style={styles.fieldLabel}>Wallet Provider:</Text> {credential.walletProvider}</Text>
              </>
            )}
            {credential.format === "email" && (
              <Text style={styles.field}><Text style={styles.fieldLabel}>Email:</Text> {credential.email}</Text>
            )}
            {credential.format === "oauth" && (
              <>
                <Text style={styles.field}><Text style={styles.fieldLabel}>OAuth Provider:</Text> {credential.oauthProvider}</Text>
                <Text style={styles.field}><Text style={styles.fieldLabel}>Username:</Text> {credential.oauthUsername}</Text>
                <Text style={styles.field}><Text style={styles.fieldLabel}>Display Name:</Text> {credential.oauthDisplayName}</Text>
                <Text style={styles.field}><Text style={styles.fieldLabel}>Photo:</Text> {credential.oauthAccountPhotos[0]}</Text>
              </>
            )}
            {credential.format === "phoneNumber" && (
              <Text style={styles.field}><Text style={styles.fieldLabel}>Phone Number:</Text> +{credential.phoneCountryCode} {credential.phoneNumber}</Text>
            )}
          </View>
        ))}
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
});

export default DisplayAuthenticatedUserView;
