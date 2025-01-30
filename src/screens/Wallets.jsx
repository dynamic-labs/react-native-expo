import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useReactiveClient } from "@dynamic-labs/react-hooks";
import { client } from "../client";
import { useNavigation } from "@react-navigation/native";

export const UserWallets = () => {
  const { auth, wallets } = useReactiveClient(client);
  const navigation = useNavigation();

  const verifiedCredentials = auth.authenticatedUser?.verifiedCredentials || [];
  // console.log("wallets", wallets.embedded.getWallet());

  const handleViewWallet = (credential) => {
    if (credential && typeof credential === "object") {
      if (credential.format === "blockchain") {
        navigation.navigate("WalletDetails", { credential });
      } else if (
        credential.format === "email" ||
        credential.format === "oauth"
      ) {
        navigation.navigate("SocialDetails", { credential });
      }
    } else {
      console.warn("Invalid credentials:", credential);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Verified Credentials</Text>

      {/* Blockchain Credentials Section */}
      {verifiedCredentials
        .filter((credential) => credential.format === "blockchain")
        .map((credential, index) => (
          <View key={`blockchain-${index}`} style={styles.section}>
            <Text style={styles.sectionTitle}>Blockchain Credential</Text>
            <Text style={styles.field}>
              <Text style={styles.fieldLabel}>Address:</Text>{" "}
              {credential.address}
            </Text>
            <Text style={styles.field}>
              <Text style={styles.fieldLabel}>Chain:</Text> {credential.chain}
            </Text>
            <Text style={styles.field}>
              <Text style={styles.fieldLabel}>Wallet Name:</Text>{" "}
              {credential.walletName}
            </Text>
            <Text style={styles.field}>
              <Text style={styles.fieldLabel}>Wallet Provider:</Text>{" "}
              {credential.walletProvider}
            </Text>
            <TouchableOpacity onPress={() => handleViewWallet(credential)}>
              <Text style={styles.link}>View Wallet</Text>
            </TouchableOpacity>
          </View>
        ))}

      {/* Email Credentials Section */}
      {verifiedCredentials
        .filter((credential) => credential.format === "email")
        .map((credential, index) => (
          <View key={`email-${index}`} style={styles.section}>
            <Text style={styles.sectionTitle}>Email Credential</Text>
            <Text style={styles.field}>
              <Text style={styles.fieldLabel}>Email:</Text> {credential.email}
            </Text>
            <TouchableOpacity onPress={() => handleViewWallet(credential)}>
              <Text style={styles.link}>View Email Credential</Text>
            </TouchableOpacity>
          </View>
        ))}

      {/* OAuth Credentials Section */}
      {verifiedCredentials
        .filter((credential) => credential.format === "oauth")
        .map((credential, index) => (
          <View key={`oauth-${index}`} style={styles.section}>
            <Text style={styles.sectionTitle}>OAuth Credential</Text>
            <Text style={styles.field}>
              <Text style={styles.fieldLabel}>Provider:</Text>{" "}
              {credential.oauthProvider}
            </Text>
            <Text style={styles.field}>
              <Text style={styles.fieldLabel}>Username:</Text>{" "}
              {credential.oauthUsername}
            </Text>
            <TouchableOpacity onPress={() => handleViewWallet(credential)}>
              <Text style={styles.link}>View OAuth Credential</Text>
            </TouchableOpacity>
          </View>
        ))}

      {/* Phone Number Credentials Section */}
      {verifiedCredentials
        .filter((credential) => credential.format === "phoneNumber")
        .map((credential, index) => (
          <View key={`phoneNumber-${index}`} style={styles.section}>
            <Text style={styles.sectionTitle}>Phone Number Credential</Text>
            <Text style={styles.field}>
              <Text style={styles.fieldLabel}>Phone Number:</Text> +
              {credential.phoneCountryCode} {credential.phoneNumber}
            </Text>
            <TouchableOpacity onPress={() => handleViewWallet(credential)}>
              <Text style={styles.link}>View Phone Credential</Text>
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
