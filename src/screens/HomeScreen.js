import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, FlatList, Dimensions } from 'react-native';
import { Bell, Plus, Star } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const upcomingTrips = [
    {
      id: '1',
      title: 'Amalfi Coast, Italy',
      date: 'May 15 - May 22, 2024',
      daysLeft: '12',
      image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&q=80&w=800',
    },
  ];

  const recommendations = [
    {
      id: '1',
      title: 'London, UK',
      rating: '4.8',
      tag: 'AI Rating',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: '2',
      title: 'Paris, France',
      rating: '4.9',
      tag: 'Trending',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: '3',
      title: 'Bali, Indonesia',
      rating: '4.7',
      tag: 'Wellness',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: '4',
      title: 'Banff, Canada',
      rating: '4.9',
      tag: 'Nature',
      image: 'https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?auto=format&fit=crop&q=80&w=400',
    },
  ];

  const renderRecommendation = ({ item }) => (
    <TouchableOpacity style={styles.recommendationCard}>
      <Image source={{ uri: item.image }} style={styles.recommendationImage} contentFit="cover" />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.recommendationGradient}
      >
        <Text style={styles.recommendationTitle}>{item.title}</Text>
        <View style={styles.recommendationFooter}>
          <Text style={styles.recommendationRating}>{item.rating}</Text>
          <Star size={12} color="#facc15" fill="#facc15" style={{ marginHorizontal: 4 }} />
          <Text style={styles.recommendationTag}>• {item.tag}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greetingTitle}>Good morning, Alex!</Text>
            <Text style={styles.greetingSubtitle}>Where should we go next?</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={24} color="#374151" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        {/* Hero Card */}
        <TouchableOpacity style={styles.heroCard}>
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1544735745-b89bfa94ca7e?auto=format&fit=crop&q=80&w=1000' }}
            style={styles.heroBackground}
            imageStyle={{ borderRadius: 24 }}
          >
            <LinearGradient
              colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.4)']}
              style={styles.heroGradient}
            >
              <View style={styles.plusCircle}>
                <Plus size={32} color="#ffffff" />
              </View>
              <Text style={styles.heroTitle}>Create New Trip</Text>
              <Text style={styles.heroSubtitle}>Let Voyaj plan your journey</Text>
            </LinearGradient>
          </ImageBackground>
        </TouchableOpacity>

        {/* Upcoming Trips Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Upcoming Trips</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
          {upcomingTrips.map((trip) => (
            <TouchableOpacity key={trip.id} style={styles.upcomingCard}>
              <Image source={{ uri: trip.image }} style={styles.upcomingImage} contentFit="cover" />
              <View style={styles.daysBadge}>
                <Text style={styles.daysBadgeText}>IN {trip.daysLeft} DAYS</Text>
              </View>
              <View style={styles.upcomingInfo}>
                <Text style={styles.upcomingTitle}>{trip.title}</Text>
                <Text style={styles.upcomingDate}>{trip.date}</Text>
                <TouchableOpacity style={styles.viewDetailsButton}>
                  <Text style={styles.viewDetailsText}>View Details</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Recommended Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended for You</Text>
        </View>

        <FlatList
          data={recommendations}
          renderItem={renderRecommendation}
          keyExtractor={(item) => item.id}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={styles.recommendationRow}
          contentContainerStyle={styles.recommendationList}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    marginBottom: 20,
  },
  greetingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  greetingSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 4,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  notificationBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  heroCard: {
    marginHorizontal: 20,
    height: 200,
    borderRadius: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
  },
  heroBackground: {
    flex: 1,
  },
  heroGradient: {
    flex: 1,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  heroSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    marginTop: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  seeAllText: {
    fontSize: 14,
    color: '#ef4444',
    fontWeight: '600',
  },
  horizontalScroll: {
    paddingLeft: 20,
    paddingBottom: 24,
  },
  upcomingCard: {
    width: width * 0.75,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  upcomingImage: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  daysBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  daysBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  upcomingInfo: {
    padding: 16,
  },
  upcomingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  upcomingDate: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  viewDetailsButton: {
    marginTop: 12,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  viewDetailsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  recommendationList: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  recommendationRow: {
    justifyContent: 'space-between',
  },
  recommendationCard: {
    width: (width - 40) / 2 - 8,
    height: 220,
    borderRadius: 20,
    marginHorizontal: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  recommendationImage: {
    width: '100%',
    height: '100%',
  },
  recommendationGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    justifyContent: 'flex-end',
    padding: 12,
  },
  recommendationTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  recommendationFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  recommendationRating: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  recommendationTag: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 10,
  },
});

export default HomeScreen;
