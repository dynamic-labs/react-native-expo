import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { client } from "../client";
import { useReactiveClient } from "@dynamic-labs/react-hooks";

export const SocialDetails = ({ route }) => {
  const { credential } = route.params;
  const { auth, wallets } = useReactiveClient(client);

  // Debugging logs to check the values
  console.log("Wallet from useReactiveClient:", wallets);
  console.log("Credential:", credential);
  console.log("Auth:", auth);

  useEffect(() => {
    const setPrimaryWallet = async () => {
      console.log("Wallet from useReactiveClient:", wallets);
      await wallets.setPrimary({ walletId: credential?.id });
    };

    setPrimaryWallet();
  }, [wallets, credential?.id]);

  const renderCredentialDetails = () => {
    switch (credential?.format) {
      case "email":
        return (
          <>
            <Text style={styles.field}>
              <Text style={styles.fieldLabel}>Email:</Text>{" "}
              {credential?.email || "N/A"}
            </Text>
          </>
        );
      case "oauth":
        return (
          <>
            {credential.oauthAccountPhotos &&
              credential.oauthAccountPhotos.length > 0 && (
                <Image
                  source={{ uri: credential.oauthAccountPhotos[0] }}
                  style={styles.icon}
                />
              )}
            <Text style={styles.field}>
              <Text style={styles.fieldLabel}>Display Name:</Text>{" "}
              {credential?.oauthDisplayName || "N/A"}
            </Text>
            <Text style={styles.field}>
              <Text style={styles.fieldLabel}>Provider:</Text>{" "}
              {credential?.oauthProvider || "N/A"}
            </Text>
            <Text style={styles.field}>
              <Text style={styles.fieldLabel}>Username:</Text>{" "}
              {credential?.oauthUsername || "N/A"}
            </Text>
          </>
        );
      case "phoneNumber":
        return (
          <>
            <Text style={styles.field}>
              <Text style={styles.fieldLabel}>Phone Number:</Text> +
              {credential?.phoneCountryCode} {credential?.phoneNumber || "N/A"}
            </Text>
          </>
        );
      default:
        return (
          <Text style={styles.field}>
            No details available for this format.
          </Text>
        );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Social Details</Text>
      {renderCredentialDetails()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  field: {
    fontSize: 16,
    marginBottom: 8,
  },
  fieldLabel: {
    fontWeight: "bold",
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
});

export default SocialDetails;
