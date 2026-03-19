import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { ChevronRight, Eye, Bell } from 'lucide-react-native';

const SettingItem = ({ 
  icon: Icon, 
  label, 
  value, 
  onPress, 
  iconBg, 
  showChevron = true, 
  isSwitch = false, 
  switchValue, 
  onSwitchChange,
  isLast = false
}) => {
  const getIconColor = () => {
    if (Icon === Eye) return '#10b981';
    if (Icon === Bell) return '#3b82f6';
    return '#f26422';
  };

  return (
    <TouchableOpacity 
      style={[styles.settingItem, isLast && { borderBottomWidth: 0 }]} 
      onPress={onPress}
      disabled={isSwitch}
    >
      <View style={styles.settingLeft}>
        <View style={[styles.iconContainer, { backgroundColor: iconBg }]}>
          <Icon size={20} color={getIconColor()} />
        </View>
        <Text style={styles.settingLabel}>{label}</Text>
      </View>
      <View style={styles.settingRight}>
        {value && <Text style={styles.settingValue}>{value}</Text>}
        {isSwitch ? (
          <Switch
            trackColor={{ false: '#e5e7eb', true: '#f26422' }}
            thumbColor={'#ffffff'}
            onValueChange={onSwitchChange}
            value={switchValue}
          />
        ) : (
          showChevron && <ChevronRight size={20} color="#d1d5db" />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontSize: 14,
    color: '#9ca3af',
    marginRight: 8,
  },
});

export default SettingItem;
