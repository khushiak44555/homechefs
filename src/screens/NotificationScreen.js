import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';

const NotificationScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState({
    pushNotifications: true,
    orderUpdates: true,
    promotions: false,
    newsletter: true,
    sms: false,
    email: true,
    sound: true,
    vibration: true,
  });

  const toggleNotification = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const notificationSettings = [
    {
      id: 'pushNotifications',
      title: 'Push Notifications',
      subtitle: 'Receive notifications on your device',
      icon: 'bell-outline',
    },
    {
      id: 'orderUpdates',
      title: 'Order Updates',
      subtitle: 'Get updates about your orders',
      icon: 'package-variant-closed',
    },
    {
      id: 'promotions',
      title: 'Promotions & Offers',
      subtitle: 'Receive special offers and discounts',
      icon: 'tag-outline',
    },
    {
      id: 'newsletter',
      title: 'Newsletter',
      subtitle: 'Weekly newsletter with latest updates',
      icon: 'newspaper-variant-outline',
    },
  ];

  const communicationSettings = [
    {
      id: 'sms',
      title: 'SMS Notifications',
      subtitle: 'Receive SMS updates',
      icon: 'message-text-outline',
    },
    {
      id: 'email',
      title: 'Email Notifications',
      subtitle: 'Receive email updates',
      icon: 'email-outline',
    },
  ];

  const systemSettings = [
    {
      id: 'sound',
      title: 'Sound',
      subtitle: 'Play sound for notifications',
      icon: 'volume-high',
    },
    {
      id: 'vibration',
      title: 'Vibration',
      subtitle: 'Vibrate for notifications',
      icon: 'vibrate',
    },
  ];

  const renderNotificationItem = (item) => (
    <View key={item.id} style={styles.notificationItem}>
      <MaterialCommunityIcons 
        name={item.icon} 
        size={24} 
        color="#666" 
        style={styles.notificationIcon}
      />
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationSubtitle}>{item.subtitle}</Text>
      </View>
      <Switch
        value={notifications[item.id]}
        onValueChange={() => toggleNotification(item.id)}
        trackColor={{ false: '#e0e0e0', true: colors.primary }}
        thumbColor={notifications[item.id] ? '#fff' : '#f4f3f4'}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* General Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>
          {notificationSettings.map(renderNotificationItem)}
        </View>

        {/* Communication Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Communication</Text>
          {communicationSettings.map(renderNotificationItem)}
        </View>

        {/* System Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>System</Text>
          {systemSettings.map(renderNotificationItem)}
        </View>

        {/* Clear All Section */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.clearAllButton}>
            <MaterialCommunityIcons name="delete-outline" size={22} color="#ff4757" />
            <Text style={styles.clearAllText}>Clear All Notifications</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 34, // Same width as back button for centering
  },
  section: {
    backgroundColor: colors.white,
    marginBottom: 15,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  notificationIcon: {
    marginRight: 15,
    width: 24,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  notificationSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  clearAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ff4757',
    backgroundColor: '#fff5f5',
  },
  clearAllText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ff4757',
    marginLeft: 8,
  },
});

export default NotificationScreen;