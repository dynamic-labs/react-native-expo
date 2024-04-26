import { FC, useState } from "react";
import { InputField } from "../InputField";
import { client } from "../client";
import { Button, StyleSheet, View } from "react-native";

export const LoginView: FC = () => {
  const [usedOneTimePasswordMethod, setUsedOneTimePasswordMethod] = useState<
    "email" | "sms" | null
  >(null);

  if (usedOneTimePasswordMethod === "email") {
    return (
      <View style={styles.container}>
        <InputField
          key="otp"
          placeholder="OTP token"
          onSubmit={(token) => client.auth.email.verifyOTP(token)}
        />

        <Button
          title="Cancel"
          onPress={() => setUsedOneTimePasswordMethod(null)}
        />
      </View>
    );
  }

  if (usedOneTimePasswordMethod === "sms") {
    return (
      <View style={styles.container}>
        <InputField
          key="otp"
          placeholder="OTP token"
          onSubmit={(token) => client.auth.sms.verifyOTP(token)}
        />

        <Button
          title="Cancel"
          onPress={() => setUsedOneTimePasswordMethod(null)}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <InputField
        key="email"
        placeholder="Email login"
        onSubmit={(email) =>
          client.auth.email
            .sendOTP(email)
            .then(() => setUsedOneTimePasswordMethod("email"))
        }
      />

      <InputField
        key="sms"
        placeholder="US/CA SMS login"
        onSubmit={(phone) =>
          client.auth.sms
            .sendOTP({ dialCode: "1", iso2: "us", phone })
            .then(() => setUsedOneTimePasswordMethod("sms"))
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: "stretch",
    gap: 40,
    padding: 20,
  },
});
