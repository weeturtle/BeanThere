import React, { useEffect, useState } from "react";
import { Pressable, Text } from "react-native";

interface SubmitButtonProps {
  onPress: () => void;
  password: string;
  confirmPassword: string;
}

const SubmitButton = ({
  onPress,
  password,
  confirmPassword,
}: SubmitButtonProps) => {
  const [canPress, setCanPress] = useState(false);

  useEffect(() => {
    if (password === confirmPassword) {
      setCanPress(true);
    } else {
      setCanPress(false);
    }
  }, [password, confirmPassword]);

  return (
    <Pressable
      onPress={onPress}
      disabled={!canPress}
      style={{
        backgroundColor: canPress ? "blue" : "gray",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white" }}>Submit</Text>
    </Pressable>
  );
};

export default SubmitButton;
