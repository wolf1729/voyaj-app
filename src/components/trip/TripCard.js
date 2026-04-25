import { Image } from "expo-image";
import { Globe, History, MoreVertical } from "lucide-react-native";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Badge from "../common/Badge";
import Card from "../common/Card";

const TripCard = ({
  trip,
  onPress,
  showMenu = false,
  showDetailsButton = false,
}) => (
  <TouchableOpacity onPress={onPress}>
    <Card style={styles.tripCard}>
      <Image
        source={{ uri: trip.image }}
        style={styles.tripImage}
        contentFit="cover"
      />

      {trip.daysLeft && (
        <Badge
          type="days"
          text={`IN ${trip.daysLeft} DAYS`}
          style={styles.daysBadge}
        />
      )}

      {trip.isPublic !== undefined && (
        <Badge
          type="status"
          text={trip.isPublic ? "PUBLIC" : "PRIVATE"}
          icon={trip.isPublic ? Globe : History}
          style={styles.visibilityBadge}
        />
      )}

      <View style={styles.tripInfo}>
        <View style={styles.tripHeader}>
          <Text style={styles.tripTitle}>{trip.title}</Text>
          {showMenu && (
            <TouchableOpacity>
              <MoreVertical size={20} color="#9ca3af" />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.tripDate}>{trip.date}</Text>

        {showDetailsButton && (
          <TouchableOpacity style={styles.viewDetailsButton}>
            <Text style={styles.viewDetailsText}>View Details</Text>
          </TouchableOpacity>
        )}
      </View>
    </Card>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  tripCard: {
    width: "100%",
    marginBottom: 20,
  },
  tripImage: {
    width: "100%",
    height: 160,
  },
  daysBadge: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  visibilityBadge: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  tripInfo: {
    padding: 16,
  },
  tripHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tripTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },
  tripDate: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 4,
  },
  viewDetailsButton: {
    marginTop: 12,
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
  },
  viewDetailsText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },
});

export default TripCard;
