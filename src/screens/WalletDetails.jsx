import React from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";

export const WalletDetails = ({ route, navigation }) => {
  const { credential } = route.params;

  const handleSignMessage = () => {
    Alert.alert("Sign Message", "This will initiate the Sign Message flow.");
    // Navigate to SignMessage screen or handle sign message logic here
    // navigation.navigate("SignMessage", { credential });
  };

  const handleSendCrypto = () => {
    Alert.alert("Send Crypto", "This will initiate the Send Crypto flow.");
    // Navigate to SendCrypto screen or handle send crypto logic here
    // navigation.navigate("SendCrypto", { credential });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Wallet Details</Text>
      <Text style={styles.field}><Text style={styles.fieldLabel}>Address:</Text> {credential.address}</Text>
      <Text style={styles.field}><Text style={styles.fieldLabel}>Chain:</Text> {credential.chain}</Text>
      <Text style={styles.field}><Text style={styles.fieldLabel}>Wallet Name:</Text> {credential.walletName}</Text>
      <Text style={styles.field}><Text style={styles.fieldLabel}>Provider:</Text> {credential.walletProvider}</Text>

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
