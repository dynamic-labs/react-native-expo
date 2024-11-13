import { FC, useState } from "react";
import { client } from "../client";
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Button,
  TextInput,
  Text,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

export const LoginView: FC = () => {
  const [usedOneTimePasswordMethod, setUsedOneTimePasswordMethod] = useState<
    "email" | "sms" | null
  >(null);
  const [loginMethod, setLoginMethod] = useState<"email" | "sms">("email");
  const [inputValue, setInputValue] = useState(""); // Email or phone number
  const [otp, setOtp] = useState(""); // OTP input value

  const handleLoginSubmit = async () => {
    try {
      if (loginMethod === "email") {
        await client.auth.email.sendOTP(inputValue);
        setUsedOneTimePasswordMethod("email");
      } else {
        await client.auth.sms.sendOTP({
          dialCode: "1",
          iso2: "us",
          phone: inputValue,
        });
        setUsedOneTimePasswordMethod("sms");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const handleOtpSubmit = async () => {
    try {
      if (usedOneTimePasswordMethod === "email") {
        await client.auth.email.verifyOTP(otp);
      } else if (usedOneTimePasswordMethod === "sms") {
        await client.auth.sms.verifyOTP(otp);
      }
      alert("OTP Verified Successfully!");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Invalid OTP. Please try again.");
    }
  };

  const styles = StyleSheet.create({
    background: {
      flex: 1,
      width: "100%",
      height: "100%",
    },
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      backgroundColor: "rgba(255, 255, 255, 0.8)", // Add a semi-transparent white overlay
    },
    logo: {
      width: 200,
      height: 200,
      alignSelf: "center",
      marginBottom: 30,
    },
    input: {
      height: 40,
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 5,
      width: "80%",
      paddingHorizontal: 10,
      marginBottom: 20,
      backgroundColor: "#fff",
    },
    dropdownContainer: {
      width: "80%",
      marginBottom: 20,
    },
    buttonContainer: {
      width: "80%",
      marginVertical: 10,
    },
    buttonText: {
      color: "#007AFF",
      textAlign: "center",
      fontSize: 16,
      marginBottom: 15,
    },
  });

  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />

        {/* Dropdown for selecting login method */}
        <View style={styles.dropdownContainer}>
          <RNPickerSelect
            onValueChange={(value) => setLoginMethod(value)}
            items={[
              { label: "Login With Email", value: "email" },
              { label: "Login With Phone (US/CA)", value: "sms" },
            ]}
            placeholder={{ label: "Select Login Method", value: null }}
            value={loginMethod}
          />
        </View>

        {/* Input Field for Email or Phone Number */}
        {!usedOneTimePasswordMethod && (
          <>
            <TextInput
              style={styles.input}
              placeholder={
                loginMethod === "email"
                  ? "Enter your email"
                  : "Enter your phone number"
              }
              keyboardType={
                loginMethod === "email" ? "email-address" : "phone-pad"
              }
              onChangeText={setInputValue}
              value={inputValue}
            />

            {/* OTP Submit Button */}
            <View style={styles.buttonContainer}>
              <Button
                title={loginMethod === "sms" ? "Send OTP" : "Send Email"}
                onPress={handleLoginSubmit}
              />
            </View>
          </>
        )}

        {/* OTP Input Field for verification */}
        {usedOneTimePasswordMethod && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              keyboardType="number-pad"
              onChangeText={setOtp}
              value={otp}
            />
            <View style={styles.buttonContainer}>
              <Button title="Verify OTP" onPress={handleOtpSubmit} />
            </View>
          </>
        )}

        {/* Social Connect Buttons */}
        <Text
          style={styles.buttonText}
          onPress={() => client.auth.social.connect({ provider: "farcaster" })}
        >
          Connect with Farcaster
        </Text>
        <Text
          style={styles.buttonText}
          onPress={() => client.auth.social.connect({ provider: "google" })}
        >
          Connect with Google
        </Text>
        <Text style={styles.buttonText} onPress={() => client.ui.auth.show()}>
          Open Auth Flow UI
        </Text>
      </View>
    </ImageBackground>
  );
};
