import React, { useEffect, useState } from "react";
import { Pressable, Text, StyleSheet } from "react-native";

interface SubmitButtonProps {
  onPress: () => void;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SubmitButton = ({
  onPress,
  name,
  email,
  password,
  confirmPassword,
}: SubmitButtonProps) => {
  const [canPress, setCanPress] = useState(false);

  useEffect(() => {
    if (!password || !confirmPassword || !name || !email) {
      setCanPress(false);
      return;
    }
    if (password === confirmPassword) {
      setCanPress(true);
    } else {
      setCanPress(false);
    }
  }, [password, confirmPassword, name, email]);

  return (
    <Pressable
      onPress={onPress}
      disabled={!canPress}
      style={canPress ? styles.canSubmit : styles.cannotSubmit}
    >
      <Text>Submit</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  canSubmit: {
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
  },
  cannotSubmit: {
    width: "80%",
    backgroundColor: "gray",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default SubmitButton;
