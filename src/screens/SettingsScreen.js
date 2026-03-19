import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { ArrowLeft, User, Lock, Bell, Eye, Globe, HelpCircle, FileText, Shield, LogOut, ChevronRight, ExternalLink } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAuth, signOut } from '@react-native-firebase/auth';

const SettingsScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState(true);
  const [publicProfile, setPublicProfile] = useState(false);

  const handleLogout = () => {
    signOut(getAuth());
  };

  const SettingItem = ({ icon: Icon, label, value, onPress, iconBg, showChevron = true, isSwitch = false, switchValue, onSwitchChange }) => (
    <TouchableOpacity 
      style={styles.settingItem} 
      onPress={onPress}
      disabled={isSwitch}
    >
      <View style={styles.settingLeft}>
        <View style={[styles.iconContainer, { backgroundColor: iconBg }]}>
          <Icon size={20} color={Icon === Eye ? '#10b981' : (Icon === Bell ? '#3b82f6' : '#f26422')} />
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
          <View style={styles.divider} />
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
          <View style={styles.divider} />
          <SettingItem 
            icon={Eye} 
            label="Public Profile" 
            iconBg="#ecfdf5" 
            isSwitch={true}
            switchValue={publicProfile}
            onSwitchChange={setPublicProfile}
          />
          <View style={styles.divider} />
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
          <TouchableOpacity style={styles.settingItem} onPress={() => {}}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingLabelNormal}>Help Center</Text>
            </View>
            <ExternalLink size={20} color="#9ca3af" />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.settingItem} onPress={() => {}}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingLabelNormal}>Terms of Service</Text>
            </View>
            <ChevronRight size={20} color="#d1d5db" />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.settingItem} onPress={() => {}}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingLabelNormal}>Privacy Policy</Text>
            </View>
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
  settingLabelNormal: {
    fontSize: 16,
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
  divider: {
    height: 1,
    backgroundColor: '#f3f4f6',
    marginLeft: 64,
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
