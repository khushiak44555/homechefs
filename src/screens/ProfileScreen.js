import React, { useState, useEffect } from 'react';
import { BackHandler } from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';

const ProfileScreen = ({ navigation }) => {
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);

// Update the profileMenuItems array:
// Update the profileMenuItems array:
const profileMenuItems = [
  {
    icon: 'map-marker-outline',
    title: 'Address',
    onPress: () => navigation.navigate('AddressList')
  },
  {
    icon: 'credit-card-outline',
    title: 'Payment Details',
    onPress: () => navigation.navigate('Payment')
  },
  {
    icon: 'clipboard-text-outline',
    title: 'Past Orders',
    onPress: () => navigation.navigate('OrdersTab')
  },
  {
    icon: 'heart-outline',
    title: 'Favourites',
    onPress: () => navigation.navigate('FavouritesTab')
  },
  {
    icon: 'percent',
    title: 'Promo & Offers',
    onPress: () => navigation.navigate('OffersTab')
  },
];

// Update the settingsItems array:
const settingsItems = [
  {
    icon: 'lock-outline',
    title: 'Change Password',
    onPress: () => console.log('Change Password')
  },
  {
    icon: 'bell-outline',
    title: 'Notification',
    onPress: () => navigation.navigate('Notification')
  },
  {
    icon: 'help-circle-outline',
    title: 'Help & Support',
    onPress: () => navigation.navigate('Help')
  },
  {
    icon: 'file-document-outline',
    title: 'FAQ',
    onPress: () => navigation.navigate('FAQ')
  },
  {
    icon: 'file-document-outline',
    title: 'Terms & Service',
    onPress: () => navigation.navigate('Terms')
  },
  {
    icon: 'logout',
    title: 'Logout',
    onPress: () => {
      // Add logout logic here
      navigation.navigate('Login');
    },
    isLogout: true
  },
];

// Add useEffect to handle back navigation
useEffect(() => {
  const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
    navigation.navigate('ProfileTab');
    return true;
  });

  return () => backHandler.remove();
}, [navigation]);

  const handleEditProfile = () => {
    setShowOptionsMenu(false);
    navigation.navigate('EditProfileScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Account</Text>
        <TouchableOpacity 
          style={styles.moreButton}
          onPress={() => setShowOptionsMenu(true)}
        >
          <MaterialCommunityIcons name="dots-vertical" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Options Menu Modal */}
      <Modal
        visible={showOptionsMenu}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowOptionsMenu(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowOptionsMenu(false)}
        >
          <View style={styles.optionsMenu}>
            <TouchableOpacity
              style={styles.optionItem}
              onPress={handleEditProfile}
            >
              <MaterialCommunityIcons 
                name="pencil-outline" 
                size={20} 
                color="#333" 
                style={styles.optionIcon}
              />
              <Text style={styles.optionText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 90 }}
      >
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={require('../../assets/images/profile.jpg')}
              style={styles.profileImage}
            />
            <View style={styles.editIconContainer}>
              <MaterialCommunityIcons name="pencil" size={16} color="#fff" />
            </View>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Esther Howard</Text>
            <Text style={styles.profilePhone}>+91 7843983933</Text>
          </View>
          
        </View>

        {/* User Profile Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>User Profile</Text>
          {profileMenuItems.map((item, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <MaterialCommunityIcons 
                name={item.icon} 
                size={22} 
                color="#666" 
                style={styles.menuIcon}
              />
              <Text style={styles.menuText}>{item.title}</Text>
              <MaterialIcons name="chevron-right" size={24} color="#ccc" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          {settingsItems.map((item, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <MaterialCommunityIcons 
                name={item.icon} 
                size={22} 
                color={item.isLogout ? "#ff4757" : "#666"} 
                style={styles.menuIcon}
              />
              <Text style={[
                styles.menuText, 
                item.isLogout && styles.logoutText
              ]}>
                {item.title}
              </Text>
              <MaterialIcons 
                name="chevron-right" 
                size={24} 
                color={item.isLogout ? "#ff4757" : "#ccc"} 
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}

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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  moreButton: {
    padding: 5,
  },
  // Modal and Options Menu Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 70, // Adjust based on header height
    paddingRight: 20,
  },
  optionsMenu: {
    backgroundColor: colors.white,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minWidth: 150,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  optionIcon: {
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  profileSection: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 25,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImageContainer: {
    position: 'relative',
    marginRight: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#ff6b35',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  profilePhone: {
    fontSize: 16,
    color: '#666',
  },
  editProfileButton: {
    backgroundColor: '#ff6b35',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  editProfileText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
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
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  menuIcon: {
    marginRight: 15,
    width: 22,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  logoutText: {
    color: '#ff4757',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingBottom: 50,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  navBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  activeNavBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -8,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
});

export default ProfileScreen;