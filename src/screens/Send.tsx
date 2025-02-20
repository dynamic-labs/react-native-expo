import React, { useCallback, useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { client } from "../client";
import { useReactiveClient } from "@dynamic-labs/react-hooks";
import { sepolia, ink, inkSepolia } from "viem/chains";
// ERC20 Token ABI
const erc20Abi = [
  {
    name: "transfer",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "recipient", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
] as const;

const Send = () => {
  const { viem, wallets } = useReactiveClient(client);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [tokenAddress, setTokenAddress] = useState(""); // Empty for native tokens
  const [loading, setLoading] = useState(false);

  const sendTransaction = useCallback(async () => {
    try {
      setLoading(true);
      if (!recipient || !amount) {
        Alert.alert("Error", "Please enter recipient and amount.");
        setLoading(false);
        return;
      }

      const evmWallet = wallets.userWallets.find(
        ({ chain }: { chain: string }) => chain === "EVM",
      );
      if (!evmWallet) {
        throw new Error("EVM wallet not found");
      }

      console.log("SETTING PRIMARY WALLET");
      await wallets.setPrimary({ walletId: evmWallet.id });

      console.log("CREATING WALLET CLIENT");
      const walletClient = await viem.createWalletClient({ wallet: evmWallet });

      if (!tokenAddress) {
        console.log("SENDING NATIVE TOKEN");
        const txnHash = await walletClient.sendTransaction({
          to: recipient as `0x${string}`,
          value: BigInt(amount),
        });

        Alert.alert("Transaction Sent!", `Hash: ${txnHash}`);
        console.log("Transaction Hash:", txnHash);
        setLoading(false);
        return;
      }

      //   console.log("CREATING PUBLIC CLIENT FOR ERC20");
      //   const viemChain = viem.chains.find((c) => c.id === evmWallet.chainId);
      //   if (!viemChain) {
      //     throw new Error("Invalid EVM chain");
      //   }

      const publicClient = viem.createPublicClient({
        chain: sepolia, // ✅ Use actual chain object, not a string
      });

      console.log("SIMULATING CONTRACT CALL");
      const senderAddress = await evmWallet.address;

      const { request } = await publicClient.simulateContract({
        account: senderAddress as `0x${string}`,
        address: tokenAddress as `0x${string}`,
        abi: erc20Abi,
        functionName: "transfer",
        args: [recipient as `0x${string}`, BigInt(Number(amount))],
      });

      console.log("EXECUTING TRANSACTION");
      const txnHash = await walletClient.writeContract(request);

      Alert.alert("Transaction Sent!", `Hash: ${txnHash}`);
    } catch (error) {
      console.error("Transaction Failed:", error);
      Alert.alert("Transaction Error", error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [recipient, amount, tokenAddress, viem, wallets]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Recipient Address:</Text>
      <TextInput
        style={styles.input}
        placeholder="0x..."
        value={recipient}
        onChangeText={setRecipient}
      />

      <Text style={styles.label}>Amount:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      <Text style={styles.label}>
        Token Address (Leave empty for native token):
      </Text>
      <TextInput
        style={styles.input}
        placeholder="0x... (optional)"
        value={tokenAddress}
        onChangeText={setTokenAddress}
      />

      <Button
        title={loading ? "Sending..." : "Send Transaction"}
        onPress={sendTransaction}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
    flex: 1,
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default Send;
