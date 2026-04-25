import React from "react";
import { View, Text, StyleSheet } from "react-native";

const StatBox = ({ value, label }) => (
  <View style={styles.statBox}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  statBox: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#f26422",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: "#9ca3af",
  },
});

export default StatBox;
