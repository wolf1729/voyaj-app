import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ArrowLeft, User, Lock, Bell, Eye, Globe, ExternalLink, ChevronRight, LogOut } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAuth, signOut } from '@react-native-firebase/auth';

// Reusable Components
import SettingItem from '../components/profile/SettingItem';
import Divider from '../components/common/Divider';

const SettingsScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState(true);
  const [publicProfile, setPublicProfile] = useState(false);

  const handleLogout = () => {
    signOut(getAuth());
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Account Settings */}
        <Text style={styles.sectionTitle}>ACCOUNT SETTINGS</Text>
        <View style={styles.sectionCard}>
          <SettingItem 
            icon={User} 
            label="Profile Edit" 
            iconBg="#fff4ef" 
            onPress={() => {}} 
          />
          <Divider inset={64} />
          <SettingItem 
            icon={Lock} 
            label="Password Change" 
            iconBg="#fff4ef" 
            onPress={() => {}} 
          />
        </View>

        {/* App Settings */}
        <Text style={styles.sectionTitle}>APP SETTINGS</Text>
        <View style={styles.sectionCard}>
          <SettingItem 
            icon={Bell} 
            label="Push Notifications" 
            iconBg="#eff6ff" 
            isSwitch={true}
            switchValue={notifications}
            onSwitchChange={setNotifications}
          />
          <Divider inset={64} />
          <SettingItem 
            icon={Eye} 
            label="Public Profile" 
            iconBg="#ecfdf5" 
            isSwitch={true}
            switchValue={publicProfile}
            onSwitchChange={setPublicProfile}
          />
          <Divider inset={64} />
          <SettingItem 
            icon={Globe} 
            label="Language" 
            value="English (US)"
            iconBg="#fff4ef" 
            onPress={() => {}} 
          />
        </View>

        {/* Support & About */}
        <Text style={styles.sectionTitle}>SUPPORT & ABOUT</Text>
        <View style={styles.sectionCard}>
          <TouchableOpacity style={styles.supportItem} onPress={() => {}}>
            <Text style={styles.supportLabel}>Help Center</Text>
            <ExternalLink size={20} color="#9ca3af" />
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity style={styles.supportItem} onPress={() => {}}>
            <Text style={styles.supportLabel}>Terms of Service</Text>
            <ChevronRight size={20} color="#d1d5db" />
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity style={styles.supportItem} onPress={() => {}}>
            <Text style={styles.supportLabel}>Privacy Policy</Text>
            <ChevronRight size={20} color="#d1d5db" />
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color="#ef4444" style={{ marginRight: 10 }} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerVersion}>Voyaj v1.0.0</Text>
          <Text style={styles.footerCredit}>Made for wanderlust enthusiasts</Text>
        </View>
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
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#9ca3af',
    marginTop: 24,
    marginBottom: 12,
    paddingHorizontal: 20,
    letterSpacing: 0.5,
  },
  sectionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginHorizontal: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  supportItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  supportLabel: {
    fontSize: 16,
    color: '#374151',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eff6ff',
    marginHorizontal: 20,
    marginTop: 32,
    paddingVertical: 16,
    borderRadius: 16,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ef4444',
  },
  footer: {
    alignItems: 'center',
    marginTop: 32,
  },
  footerVersion: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 4,
  },
  footerCredit: {
    fontSize: 12,
    color: '#d1d5db',
  },
});

export default SettingsScreen;
