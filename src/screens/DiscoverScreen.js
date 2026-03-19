import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { Search, Bell } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';

// Reusable Components
import SectionHeader from '../components/common/SectionHeader';
import ItineraryCard from '../components/trip/ItineraryCard';

const DiscoverScreen = () => {
  const filters = ['Trending', 'Budget Friendly', 'Luxury'];
  
  const itineraries = [
    {
      id: '1',
      title: "7 Days in Iceland's Golden Circle",
      price: '$$$',
      rating: '4.9',
      author: 'Alex Rivera',
      authorImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100',
      duration: '7 Days',
      copies: '1.2k copies',
      image: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: '2',
      title: 'Hidden Gems of Vietnam Coastal Route',
      price: '$',
      rating: '4.8',
      author: 'Sarah Chen',
      authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
      duration: '12 Days',
      copies: '842 copies',
      image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: '3',
      title: 'Romantic Weekend in the Heart of Paris',
      price: '$$',
      rating: '4.7',
      author: 'Marc Dubois',
      authorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
      duration: '3 Days',
      copies: '2.5k copies',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800',
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <View style={styles.logoIcon}>
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/201/201623.png' }} 
              style={{ width: 24, height: 24 }} 
            />
          </View>
          <Text style={styles.logoText}>Voyaj</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={24} color="#374151" />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#9ca3af" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search destinations..."
            placeholderTextColor="#9ca3af"
          />
        </View>
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersScroll}>
          {filters.map((filter, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.filterChip, index === 0 && styles.activeFilterChip]}
            >
              <Text style={[styles.filterText, index === 0 && styles.activeFilterText]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Itineraries Header */}
      <SectionHeader title="Popular Itineraries" />

      <FlatList
        data={itineraries}
        renderItem={({ item }) => <ItineraryCard itinerary={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.itineraryList}
        showsVerticalScrollIndicator={false}
      />
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
    paddingVertical: 12,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#f26422',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingHorizontal: 16,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#111827',
  },
  filtersContainer: {
    marginBottom: 24,
  },
  filtersScroll: {
    paddingHorizontal: 20,
  },
  filterChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  activeFilterChip: {
    backgroundColor: '#f26422',
    borderColor: '#f26422',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  activeFilterText: {
    color: '#ffffff',
  },
  itineraryList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});

export default DiscoverScreen;
