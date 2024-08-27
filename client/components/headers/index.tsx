import React, { ReactNode } from "react";
import { View, StyleSheet } from "react-native";

const HeaderContainer = ({ children }: { children: ReactNode }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 56,
    flex: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#E0D7CF",
  },
});

export default HeaderContainer;
