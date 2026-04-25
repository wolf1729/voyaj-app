import { Image } from "expo-image";
import { Star, Clock, Download } from "lucide-react-native";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Badge from "../common/Badge";
import Card from "../common/Card";

const ItineraryCard = ({ itinerary, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Card style={styles.itineraryCard}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: itinerary.image }}
          style={styles.itineraryImage}
          contentFit="cover"
        />
        <Badge
          type="rating"
          text={itinerary.rating}
          icon={Star}
          style={styles.ratingBadge}
        />
      </View>
      <View style={styles.itineraryContent}>
        <View style={styles.itineraryHeader}>
          <Text style={styles.itineraryTitle} numberOfLines={2}>
            {itinerary.title}
          </Text>
          <Text style={styles.priceText}>{itinerary.price}</Text>
        </View>
        <View style={styles.authorRow}>
          <Image
            source={{ uri: itinerary.authorImage }}
            style={styles.authorAvatar}
          />
          <Text style={styles.authorName}>by {itinerary.author}</Text>
        </View>
        <View style={styles.itineraryFooter}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Clock size={14} color="#9ca3af" />
              <Text style={styles.statText}>{itinerary.duration}</Text>
            </View>
            <View style={styles.statItem}>
              <Download size={14} color="#9ca3af" />
              <Text style={styles.statText}>{itinerary.copies}</Text>
            </View>
          </View>
          <View style={styles.viewTripButton}>
            <Text style={styles.viewTripText}>View Trip</Text>
          </View>
        </View>
      </View>
    </Card>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  itineraryCard: {
    marginBottom: 20,
  },
  imageContainer: {
    height: 200,
    width: "100%",
  },
  itineraryImage: {
    width: "100%",
    height: "100%",
  },
  ratingBadge: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  itineraryContent: {
    padding: 16,
  },
  itineraryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  itineraryTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginRight: 10,
  },
  priceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#f26422",
  },
  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  authorAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  authorName: {
    fontSize: 14,
    color: "#6b7280",
  },
  itineraryFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
    paddingTop: 12,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  statText: {
    fontSize: 12,
    color: "#9ca3af",
    marginLeft: 6,
  },
  viewTripButton: {
    backgroundColor: "#fff4ef",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  viewTripText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#f26422",
  },
});

export default ItineraryCard;
