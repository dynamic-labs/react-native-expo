import React, { useEffect } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { client } from "../client";
import { useReactiveClient } from "@dynamic-labs/react-hooks";

export const WalletDetails = ({ route }) => {
    const { credential } = route.params;
    const { auth, ui, wallets } = useReactiveClient(client);

    // Debugging logs to check the values
    console.log("Wallet from useReactiveClient:", wallets);
    console.log("Credential:", credential);
    console.log("Auth:", auth, "UI:", ui, "Wallets:");

    useEffect(async() => {
  console.log("Wallet from useReactiveClient:", wallets);   
   await wallets.setPrimary({walletId: credential?.id});
    }, [ wallets]);

    const handleSignMessage = async () => {
      if (wallets && typeof wallets.signMessage === 'function') {
          try {
              // Use credential directly as the wallet parameter
              const response = await wallets.signMessage({
                  wallet: credential, // Use credential here
                  message: "hello world",
              });
  
              Alert.alert("Message Signed", `Signed Message: ${response.signedMessage}`);
          } catch (error) {
              console.error("Error signing message:", error);
              Alert.alert("Error", "Failed to sign message. Please try again.");
          }
      } else {
          console.warn("signMessage function is not available on wallets.");
      }
  };
  

    const handleSendCrypto = () => {
        Alert.alert("Send Crypto", "This will initiate the Send Crypto flow.");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Wallet Details</Text>
            <Text style={styles.field}>
                <Text style={styles.fieldLabel}>Address:</Text> {credential?.address || "N/A"}
            </Text>
            <Text style={styles.field}>
                <Text style={styles.fieldLabel}>Chain:</Text> {credential?.chain || "N/A"}
            </Text>
            <Text style={styles.field}>
                <Text style={styles.fieldLabel}>Wallet Name:</Text> {credential?.walletName || "N/A"}
            </Text>
            <Text style={styles.field}>
                <Text style={styles.fieldLabel}>Provider:</Text> {credential?.walletProvider || "N/A"}
            </Text>

            {/* Buttons for actions */}
            <View style={styles.buttonContainer}>
                <Button title="Sign Message" onPress={handleSignMessage} color="#4CAF50" />
                <Button title="Send Crypto" onPress={handleSendCrypto} color="#2196F3" />
            </View>
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
    buttonContainer: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },
});

export default WalletDetails;
