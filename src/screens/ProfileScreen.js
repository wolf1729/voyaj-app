import { Image } from "expo-image";
import {
  Settings,
  MapPin,
  Edit2,
  MoreVertical,
  Globe,
  History,
} from "lucide-react-native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen = ({ navigation }) => {
  const trips = [
    {
      id: "1",
      title: "Summer in Amalfi Coast",
      date: "Jul 12 - Jul 20, 2023",
      isPublic: true,
      image:
        "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "2",
      title: "Kyoto Cherry Blossoms",
      date: "Mar 28 - Apr 5, 2024",
      isPublic: false,
      image:
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "3",
      title: "Paris Weekend Getaway",
      date: "Oct 14 - Oct 17, 2023",
      isPublic: true,
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800",
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => navigation.navigate("Settings")}
          >
            <Settings size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* User Info */}
        <View style={styles.userInfo}>
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200",
              }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editBadge}>
              <Edit2 size={12} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>Alex Rivera</Text>
          <View style={styles.locationRow}>
            <MapPin size={16} color="#9ca3af" />
            <Text style={styles.locationText}>San Francisco, CA</Text>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsCard}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>TRIPS CREATED</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>142</Text>
            <Text style={styles.statLabel}>TRIPS SAVED</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>18</Text>
            <Text style={styles.statLabel}>COUNTRIES</Text>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Text style={[styles.tabText, styles.activeTabText]}>My Trips</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Saved</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Stats</Text>
          </TouchableOpacity>
        </View>

        {/* Trips List */}
        <View style={styles.tripsList}>
          {trips.map((trip) => (
            <TouchableOpacity key={trip.id} style={styles.tripCard}>
              <Image
                source={{ uri: trip.image }}
                style={styles.tripImage}
                contentFit="cover"
              />
              <View style={styles.visibilityBadge}>
                {trip.isPublic ? (
                  <View style={styles.badgeContent}>
                    <Globe size={12} color="#ffffff" />
                    <Text style={styles.badgeText}>PUBLIC</Text>
                  </View>
                ) : (
                  <View
                    style={[
                      styles.badgeContent,
                      { backgroundColor: "rgba(0,0,0,0.6)" },
                    ]}
                  >
                    <History size={12} color="#ffffff" />
                    <Text style={styles.badgeText}>PRIVATE</Text>
                  </View>
                )}
              </View>
              <View style={styles.tripInfo}>
                <View style={styles.tripHeader}>
                  <Text style={styles.tripTitle}>{trip.title}</Text>
                  <TouchableOpacity>
                    <MoreVertical size={20} color="#9ca3af" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.tripDate}>{trip.date}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },
  settingsButton: {
    position: "absolute",
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  userInfo: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 24,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#ffffff",
  },
  editBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#f26422",
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 3,
    borderColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 14,
    color: "#9ca3af",
    marginLeft: 4,
  },
  statsCard: {
    marginHorizontal: 20,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    flexDirection: "row",
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 24,
  },
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
  divider: {
    width: 1,
    height: "60%",
    backgroundColor: "#f3f4f6",
    alignSelf: "center",
  },
  tabsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#f26422",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#9ca3af",
  },
  activeTabText: {
    color: "#f26422",
  },
  tripsList: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  tripCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    overflow: "hidden",
  },
  tripImage: {
    width: "100%",
    height: 160,
  },
  visibilityBadge: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  badgeContent: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#ffffff",
    marginLeft: 4,
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
});

export default ProfileScreen;
