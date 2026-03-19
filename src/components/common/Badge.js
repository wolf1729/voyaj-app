import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Star } from 'lucide-react-native';

const Badge = ({ icon: Icon, text, type = 'default', style }) => {
  const getBadgeStyle = () => {
    switch (type) {
      case 'rating': return styles.ratingBadge;
      case 'days': return styles.daysBadge;
      case 'status': return styles.statusBadge;
      default: return styles.defaultBadge;
    }
  };

  const getTextStyle = () => {
    switch (type) {
      case 'rating': return styles.ratingText;
      case 'days': return styles.daysText;
      case 'status': return styles.statusText;
      default: return styles.defaultText;
    }
  };

  return (
    <View style={[getBadgeStyle(), style]}>
      {Icon && <Icon size={12} color={type === 'rating' ? '#f26422' : '#ffffff'} fill={type === 'rating' ? '#f26422' : 'none'} style={styles.icon} />}
      <Text style={getTextStyle()}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  defaultBadge: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingBadge: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  daysBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusBadge: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 4,
  },
  defaultText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827',
  },
  daysText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default Badge;
