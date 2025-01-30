import { FC, useState } from "react";
import { client } from "../client";
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Text,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

export const LoginView: FC = () => {
  const [usedOneTimePasswordMethod, setUsedOneTimePasswordMethod] = useState<
    "email" | "sms" | null
  >(null);
  const [loginMethod, setLoginMethod] = useState<"email" | "sms" | null>(null);
  const [inputValue, setInputValue] = useState(""); // Email or phone number
  const [otp, setOtp] = useState(""); // OTP input value

  const handleLoginSubmit = async () => {
    try {
      if (loginMethod === "email") {
        await client.auth.email.sendOTP(inputValue);
        setUsedOneTimePasswordMethod("email");
      } else if (loginMethod === "sms") {
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
      backgroundColor: "rgba(255, 255, 255, 0.9)",
    },
    logo: {
      width: 150,
      height: 150,
      alignSelf: "center",
      marginBottom: 40,
    },
    input: {
      height: 45,
      borderColor: "#DDD",
      borderWidth: 1,
      borderRadius: 10,
      width: "85%",
      paddingHorizontal: 15,
      marginBottom: 20,
      backgroundColor: "#FFF",
      fontSize: 16,
    },
    dropdownContainer: {
      width: "85%",
      marginBottom: 20,
    },
    buttonContainer: {
      width: "85%",
      marginVertical: 10,
      backgroundColor: "#007AFF",
      borderRadius: 10,
      paddingVertical: 12,
    },
    buttonText: {
      color: "#FFF",
      textAlign: "center",
      fontSize: 18,
      fontWeight: "bold",
    },
    linkText: {
      fontSize: 16,
      color: "#007AFF",
      marginTop: 20,
      textDecorationLine: "underline",
      textAlign: "center",
    },
  });

  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />

        {/* Step 1: Select Login Method */}
        {!loginMethod && (
          <View style={styles.dropdownContainer}>
            <Text style={styles.buttonText}>Login with:</Text>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => setLoginMethod("email")}
            >
              <Text style={styles.buttonText}>Login with Email</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => setLoginMethod("sms")}
            >
              <Text style={styles.buttonText}>Login with Phone</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Step 2: Input Field for Email or Phone Number */}
        {loginMethod && !usedOneTimePasswordMethod && (
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
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleLoginSubmit}
            >
              <Text style={styles.buttonText}>
                {loginMethod === "sms" ? "Send OTP" : "Send Email"}
              </Text>
            </TouchableOpacity>
          </>
        )}

        {/* Step 3: OTP Input Field for Verification */}
        {usedOneTimePasswordMethod && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              keyboardType="number-pad"
              onChangeText={setOtp}
              value={otp}
            />
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleOtpSubmit}
            >
              <Text style={styles.buttonText}>Verify OTP</Text>
            </TouchableOpacity>
          </>
        )}

        {/* Step 4: Social Connect and UI Flow Options */}
        <Text
          style={styles.linkText}
          onPress={() => client.auth.social.connect({ provider: "farcaster" })}
        >
          Connect with Farcaster
        </Text>
        <Text
          style={styles.linkText}
          onPress={() => client.auth.social.connect({ provider: "google" })}
        >
          Connect with Google
        </Text>
        <Text style={styles.linkText} onPress={() => client.ui.auth.show()}>
          Open Auth Flow UI
        </Text>
      </View>
    </ImageBackground>
  );
};
