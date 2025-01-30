import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { client } from "../client";
import { useReactiveClient } from "@dynamic-labs/react-hooks";
import { parseEther } from "viem";

export const WalletDetails = ({ route }) => {
  const { credential } = route.params;
  const { wallets } = useReactiveClient(client);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const setPrimaryWallet = async () => {
      console.log("Wallet from useReactiveClient:", wallets);
      await wallets.setPrimary({ walletId: credential?.id });
    };

    setPrimaryWallet();
  }, [wallets, credential?.id]);

  const handleSignMessage = async () => {
    if (!credential || !wallets) {
      Alert.alert("Error", "Missing wallet or credential.");
      return;
    }

    try {
      const response = await wallets.signMessage({
        wallet: credential,
        message: "hello world",
      });

      console.log("Signed message:", wallets.primary);
      Alert.alert(
        "Message Signed",
        `Signed Message: ${response.signedMessage}`,
      );
    } catch (error) {
      console.error("Error signing message:", error);
      Alert.alert("Error", "Failed to sign message. Please try again.");
    }
  };

  const handleSendCrypto = async () => {
    setIsLoading(true);

    await wallets.switchNetwork({
      wallet: wallets.primary,
      chainId: "11155111",
    });
    const network = await wallets.getNetwork({ wallet: wallets.primary });

    try {
      const kernelClient = await client.zeroDev.createKernelClient({
        wallet: wallets.primary,
        paymaster: "SPONSOR",
      });

      console.log("SKernel client created:", kernelClient.chain);
      const hash = await kernelClient.sendTransaction({
        to: "0xcC90c7c3E3Ad6e4E6bd8CF4fB10D09edC20a9506",
        value: parseEther("0.001"),
        maxGas: 1000000,
        maxGas: 1000000,
        callGasLimit: 100000, // Reasonable gas limit
        verificationGasLimit: 200000, // Adjust based on smart wallet verification logic
        preVerificationGas: 21000, // Minimum for a transaction
        maxFeePerGas: 33412176, // Adjust based on network conditions
        maxPriorityFeePerGas: 1417500,
      });

      console.log(`Transaction completed: ${hash}`);
    } catch (error) {
      console.error("Transaction failed:", error);
      Alert.alert(
        "Transaction Error",
        error.message || "An unknown error occurred.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Wallet Details</Text>
      <Text style={styles.field}>
        <Text style={styles.fieldLabel}>Address:</Text>{" "}
        {credential?.address || "N/A"}
      </Text>
      <Text style={styles.field}>
        <Text style={styles.fieldLabel}>Chain:</Text>{" "}
        {credential?.chain || "N/A"}
      </Text>
      <Text style={styles.field}>
        <Text style={styles.fieldLabel}>Wallet Name:</Text>{" "}
        {credential?.walletName || "N/A"}
      </Text>
      <Text style={styles.field}>
        <Text style={styles.fieldLabel}>Provider:</Text>{" "}
        {credential?.walletProvider || "N/A"}
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Sign Message"
          onPress={handleSignMessage}
          color="#4CAF50"
          disabled={isLoading}
        />
        <Button
          title="Send Crypto"
          onPress={handleSendCrypto}
          color="#2196F3"
          disabled={isLoading}
        />
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
  },
});

export default WalletDetails;
