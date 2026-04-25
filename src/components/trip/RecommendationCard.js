import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Star } from "lucide-react-native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const RecommendationCard = ({ recommendation, onPress }) => (
  <TouchableOpacity style={styles.recommendationCard} onPress={onPress}>
    <Image
      source={{ uri: recommendation.image }}
      style={styles.recommendationImage}
      contentFit="cover"
    />
    <LinearGradient
      colors={["transparent", "rgba(0,0,0,0.8)"]}
      style={styles.recommendationGradient}
    >
      <Text style={styles.recommendationTitle}>{recommendation.title}</Text>
      <View style={styles.recommendationFooter}>
        <Text style={styles.recommendationRating}>{recommendation.rating}</Text>
        <Star
          size={12}
          color="#facc15"
          fill="#facc15"
          style={{ marginHorizontal: 4 }}
        />
        <Text style={styles.recommendationTag}>• {recommendation.tag}</Text>
      </View>
    </LinearGradient>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  recommendationCard: {
    width: (width - 40) / 2 - 8,
    height: 220,
    borderRadius: 20,
    marginHorizontal: 8,
    marginBottom: 16,
    overflow: "hidden",
  },
  recommendationImage: {
    width: "100%",
    height: "100%",
  },
  recommendationGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    justifyContent: "flex-end",
    padding: 12,
  },
  recommendationTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  recommendationFooter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  recommendationRating: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
  },
  recommendationTag: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 10,
  },
});

export default RecommendationCard;
