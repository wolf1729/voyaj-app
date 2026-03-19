import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, FlatList, Dimensions } from 'react-native';
import { Bell, Plus } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';

// Reusable Components
import SectionHeader from '../components/common/SectionHeader';
import TripCard from '../components/trip/TripCard';
import RecommendationCard from '../components/trip/RecommendationCard';
import Card from '../components/common/Card';

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
        <TouchableOpacity style={styles.heroCardContainer}>
          <Card style={styles.heroCard}>
            <ImageBackground
              source={{ uri: 'https://images.unsplash.com/photo-1544735745-b89bfa94ca7e?auto=format&fit=crop&q=80&w=1000' }}
              style={styles.heroBackground}
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
          </Card>
        </TouchableOpacity>

        {/* Upcoming Trips Section */}
        <SectionHeader title="Your Upcoming Trips" onSeeAll={() => {}} />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
          {upcomingTrips.map((trip) => (
            <View key={trip.id} style={styles.upcomingCardWrapper}>
              <TripCard trip={trip} showDetailsButton={true} />
            </View>
          ))}
        </ScrollView>

        {/* Recommended Section */}
        <SectionHeader title="Recommended for You" />

        <FlatList
          data={recommendations}
          renderItem={({ item }) => <RecommendationCard recommendation={item} />}
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
  heroCardContainer: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  heroCard: {
    height: 200,
  },
  heroBackground: {
    flex: 1,
  },
  heroGradient: {
    flex: 1,
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
  horizontalScroll: {
    paddingLeft: 20,
    paddingBottom: 24,
  },
  upcomingCardWrapper: {
    width: width * 0.75,
    marginRight: 16,
  },
  recommendationList: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  recommendationRow: {
    justifyContent: 'space-between',
  },
});

export default HomeScreen;
