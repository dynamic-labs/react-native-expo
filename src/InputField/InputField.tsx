import { Button, StyleSheet, TextInput, View } from "react-native";
import { FC, useState } from "react";
import { colors, spacing, typography } from "../theme";

export type LoginViewProps = {
  onSubmit: (text: string) => void;
  placeholder?: string;
};

export const InputField: FC<LoginViewProps> = ({ onSubmit, placeholder }) => {
  const [content, setContent] = useState("");

  return (
    <View style={styles.section}>
      <TextInput
        style={styles.section__input}
        placeholder={placeholder}
        onChangeText={setContent}
        value={content}
      />

      <Button title="Submit" onPress={() => onSubmit(content)} />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.smallGap,
  },

  section__input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.light.base4,
    borderRadius: spacing.smallGap,
    paddingHorizontal: spacing.gap,
    paddingVertical: spacing.smallGap + 2,
    backgroundColor: colors.light.base2,
    fontSize: typography.sizes.bodyNormal,
    color: colors.light.textPrimary,
  },
});
