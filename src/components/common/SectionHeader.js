import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const SectionHeader = ({ title, onSeeAll, seeAllText = "See All" }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    {onSeeAll && (
      <TouchableOpacity onPress={onSeeAll}>
        <Text style={styles.seeAllText}>{seeAllText}</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },
  seeAllText: {
    fontSize: 14,
    color: "#ef4444",
    fontWeight: "600",
  },
});

export default SectionHeader;
