import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';

const notificationsData = [
  {
    id: 1,
    type: 'order',
    title: 'Order Delivered Successfully!',
    message: 'Your Chicken Burger order has been delivered. Enjoy your meal!',
    time: '2 min ago',
    isRead: false,
    icon: 'check-circle',
    iconColor: '#4CAF50',
    image: require('../../assets/images/burger.jpg'),
  },
  {
    id: 2,
    type: 'promotion',
    title: 'Special Offer Just for You!',
    message: 'Get 30% off on your next order. Use code SAVE30',
    time: '15 min ago',
    isRead: false,
    icon: 'percent',
    iconColor: colors.primary,
    image: null,
  },
  {
    id: 3,
    type: 'order',
    title: 'Your order is being prepared',
    message: 'Gourmet Griddle is preparing your Grilled Chicken. ETA: 15 mins',
    time: '1 hour ago',
    isRead: true,
    icon: 'chef-hat',
    iconColor: '#FF9800',
    image: require('../../assets/images/griddle.jpg'),
  },
  {
    id: 4,
    type: 'favorite',
    title: 'New items from your favorites!',
    message: 'Stack House Deck added new biryani varieties to their menu',
    time: '3 hours ago',
    isRead: true,
    icon: 'heart',
    iconColor: '#E91E63',
    image: require('../../assets/images/stackhouse.jpg'),
  },
  {
    id: 5,
    type: 'promotion',
    title: 'Weekend Special!',
    message: 'Pancakes at 60% off this weekend. Limited time offer!',
    time: '1 day ago',
    isRead: true,
    icon: 'tag',
    iconColor: colors.primary,
    image: require('../../assets/images/pancake.jpg'),
  },
  {
    id: 6,
    type: 'system',
    title: 'Payment Successful',
    message: 'Your payment of $12.50 has been processed successfully',
    time: '2 days ago',
    isRead: true,
    icon: 'credit-card',
    iconColor: '#4CAF50',
    image: null,
  },
  {
    id: 7,
    type: 'order',
    title: 'Order Cancelled',
    message: 'Your Noodles order has been cancelled. Refund will be processed within 2-3 days',
    time: '3 days ago',
    isRead: true,
    icon: 'close-circle',
    iconColor: '#F44336',
    image: require('../../assets/images/noodles.jpg'),
  },
];

const NotificationsScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState(notificationsData);
  const [filter, setFilter] = useState('all');

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const clearNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.isRead;
    return notification.type === filter;
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity 
          style={styles.headerAction}
          onPress={markAllAsRead}
        >
          <MaterialCommunityIcons name="check-all" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.filterContainer}
      >
        {[
          { key: 'all', label: 'All' },
          { key: 'unread', label: `Unread ${unreadCount > 0 ? `(${unreadCount})` : ''}` },
          { key: 'order', label: 'Orders' },
          { key: 'promotion', label: 'Offers' },
        ].map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.filterTab,
              filter === tab.key ? styles.activeFilterTab : styles.inactiveFilterTab
            ]}
            onPress={() => setFilter(tab.key)}
          >
            <Text style={[
              styles.filterTabText,
              filter === tab.key ? styles.activeFilterTabText : styles.inactiveFilterTabText
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Notifications List */}
      <ScrollView 
        style={styles.notificationsList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {filteredNotifications.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons name="bell-off" size={80} color="#ddd" />
            <Text style={styles.emptyStateTitle}>No notifications</Text>
            <Text style={styles.emptyStateMessage}>
              {filter === 'unread' ? 'All caught up!' : 'You have no notifications yet'}
            </Text>
          </View>
        ) : (
          filteredNotifications.map(notification => (
            <TouchableOpacity
              key={notification.id}
              style={[
                styles.notificationCard,
                !notification.isRead && styles.unreadNotification
              ]}
              onPress={() => markAsRead(notification.id)}
              activeOpacity={0.7}
            >
              <View style={styles.notificationContent}>
                <View style={styles.notificationLeft}>
                  <View style={[styles.iconContainer, { backgroundColor: `${notification.iconColor}20` }]}>
                    <MaterialCommunityIcons 
                      name={notification.icon} 
                      size={18} 
                      color={notification.iconColor} 
                    />
                  </View>
                  <View style={styles.notificationTextContainer}>
                    <View style={styles.titleRow}>
                      <Text style={styles.notificationTitle}>{notification.title}</Text>
                      {!notification.isRead && <View style={styles.unreadDot} />}
                    </View>
                    <Text style={styles.notificationMessage}>{notification.message}</Text>
                    <Text style={styles.notificationTime}>{notification.time}</Text>
                  </View>
                </View>
                
                <View style={styles.notificationRight}>
                  {notification.image && (
                    <Image source={notification.image} style={styles.notificationImage} />
                  )}

                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    flex: 1,
    textAlign: 'center',
  },
  headerAction: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  filterContainer: {
    backgroundColor: colors.white,
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    maxHeight: 45,
  },
  filterTab: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 10,
    borderWidth: 1,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeFilterTab: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  inactiveFilterTab: {
    backgroundColor: '#fff',
    borderColor: colors.primary,
  },
  filterTabText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  activeFilterTabText: {
    color: '#fff',
  },
  inactiveFilterTabText: {
    color: colors.primary,
  },
  notificationsList: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 8,
  },
  notificationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  unreadNotification: {
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
    backgroundColor: '#fff',
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  notificationLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  notificationTextContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
    flex: 1,
  },
  unreadDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginLeft: 6,
  },
  notificationMessage: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 11,
    color: colors.primary,
    fontWeight: '600',
  },
  notificationRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 50,
  },
  notificationImage: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  deleteButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
    marginBottom: 6,
  },
  emptyStateMessage: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});

export default NotificationsScreen;