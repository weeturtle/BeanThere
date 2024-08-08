import React from "react";
import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Link href="/">
        <Text style={styles.footerText}>Home</Text>
      </Link>
      <Link href="/cafes">
        {/* Temp */}
        <Text style={styles.footerText}>Cafes</Text>
      </Link>
      <Link href="/profile">
        <Text style={styles.footerText}>Profile</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f8f8f8",
    padding: 10,
  },
  footerText: {
    fontSize: 20,
  },
});

export default Footer;
