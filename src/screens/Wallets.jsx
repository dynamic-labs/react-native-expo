import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useReactiveClient } from "@dynamic-labs/react-hooks";
import { client } from "../client";
import { useNavigation } from "@react-navigation/native"; // Import navigation hook

export const UserWallets = () => {
  const { auth, wallets } = useReactiveClient(client);
  const navigation = useNavigation(); // Initialize navigation hook

  const verifiedCredentials = auth.authenticatedUser?.verifiedCredentials || [];
  console.log("client:", wallets);
  const wallet = wallets.embedded?.getWallet();
  console.log("wallet:", wallet);
  const handleViewWallet = (credential) => {
    console.warn("sending credentials:", credential);

    if (credential && typeof credential === "object") {
      navigation.navigate("WalletDetails", { credential });
    } else {
      console.warn("Invalid credentials:", credential);
    }
};
  return (
    <ScrollView contentContainerStyle={styles.container}>
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
          {/* Render other formats as before */}
          <TouchableOpacity onPress={() => handleViewWallet(credential)}>
            <Text style={styles.link}>View Wallet</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
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
  link: {
    fontSize: 16,
    color: "#007AFF",
    marginTop: 10,
    textDecorationLine: "underline",
  },
});

export default UserWallets;
