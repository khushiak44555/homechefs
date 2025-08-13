import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';

const AddressListScreen = ({ navigation }) => {
  // Sample saved addresses - in real app, this would come from storage/API
  const [savedAddresses, setSavedAddresses] = useState([
    {
      id: 1,
      type: 'home',
      displayName: 'Home',
      houseNumber: 'A-301',
      building: 'Sunshine Apartments',
      fullAddress: 'Kadri, Mangalore, Karnataka 575002',
      phoneNumber: '+91 7843983933',
      isDefault: true,
    },
    {
      id: 2,
      type: 'work',
      displayName: 'Office',
      houseNumber: '5th Floor',
      building: 'Tech Tower',
      fullAddress: 'Bejai, Mangalore, Karnataka 575004',
      phoneNumber: '+91 7843983933',
      isDefault: false,
    },
  ]);

  const getAddressIcon = (type) => {
    switch (type) {
      case 'home':
        return 'home';
      case 'work':
        return 'office-building';
      default:
        return 'map-marker';
    }
  };

  const setAsDefault = (addressId) => {
    setSavedAddresses(addresses =>
      addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === addressId
      }))
    );
    Alert.alert('Success', 'Default address updated successfully');
  };

  const deleteAddress = (addressId) => {
    Alert.alert(
      'Delete Address',
      'Are you sure you want to delete this address?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setSavedAddresses(addresses =>
              addresses.filter(addr => addr.id !== addressId)
            );
          },
        },
      ]
    );
  };

  const addNewAddress = () => {
    // Navigate to location picker or map screen first
    // For now, we'll simulate a location
    const mockLocation = {
      fullAddress: 'Current Location, Mangalore, Karnataka',
      latitude: 12.9141,
      longitude: 74.8560,
    };
    
    navigation.navigate('AddressDetailsScreen', { 
      location: mockLocation,
      fromProfile: true 
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Addresses</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Add New Address Button */}
        <TouchableOpacity 
          style={styles.addAddressButton}
          onPress={addNewAddress}
        >
          <View style={styles.addAddressIcon}>
            <MaterialIcons name="add" size={24} color={colors.primary} />
          </View>
          <Text style={styles.addAddressText}>Add New Address</Text>
          <MaterialIcons name="chevron-right" size={24} color="#ccc" />
        </TouchableOpacity>

        {/* Current Location Option */}
        <TouchableOpacity 
          style={styles.currentLocationButton}
          onPress={() => {
            const currentLocation = {
              fullAddress: 'Current Location, Mangalore, Karnataka',
              latitude: 12.9141,
              longitude: 74.8560,
            };
            navigation.navigate('AddressDetailsScreen', { 
              location: currentLocation,
              fromProfile: true 
            });
          }}
        >
          <MaterialIcons name="my-location" size={20} color={colors.primary} />
          <Text style={styles.currentLocationText}>Use Current Location</Text>
        </TouchableOpacity>

        {/* Saved Addresses */}
        <View style={styles.savedAddressesSection}>
          <Text style={styles.sectionTitle}>Saved Addresses</Text>
          
          {savedAddresses.length === 0 ? (
            <View style={styles.emptyState}>
              <MaterialIcons name="location-off" size={48} color="#ccc" />
              <Text style={styles.emptyStateTitle}>No Saved Addresses</Text>
              <Text style={styles.emptyStateSubtitle}>Add your first address to get started</Text>
            </View>
          ) : (
            savedAddresses.map((address) => (
              <View key={address.id} style={styles.addressCard}>
                <View style={styles.addressHeader}>
                  <View style={styles.addressTypeContainer}>
                    <MaterialCommunityIcons 
                      name={getAddressIcon(address.type)} 
                      size={20} 
                      color={colors.primary} 
                    />
                    <Text style={styles.addressType}>{address.displayName}</Text>
                    {address.isDefault && (
                      <View style={styles.defaultTag}>
                        <Text style={styles.defaultTagText}>Default</Text>
                      </View>
                    )}
                  </View>
                  
                  <TouchableOpacity 
                    style={styles.moreButton}
                    onPress={() => {
                      Alert.alert(
                        'Address Options',
                        'Choose an action',
                        [
                          { text: 'Cancel', style: 'cancel' },
                          {
                            text: 'Set as Default',
                            onPress: () => setAsDefault(address.id),
                          },
                          {
                            text: 'Edit',
                            onPress: () => {
                              // Navigate to edit address
                              const location = {
                                fullAddress: address.fullAddress,
                              };
                              navigation.navigate('AddressDetailsScreen', {
                                location,
                                editAddress: address,
                                fromProfile: true
                              });
                            },
                          },
                          {
                            text: 'Delete',
                            style: 'destructive',
                            onPress: () => deleteAddress(address.id),
                          },
                        ]
                      );
                    }}
                  >
                    <MaterialCommunityIcons name="dots-vertical" size={20} color="#666" />
                  </TouchableOpacity>
                </View>

                <Text style={styles.addressDetails}>
                  {address.houseNumber}
                  {address.building && `, ${address.building}`}
                </Text>
                <Text style={styles.addressLocation}>{address.fullAddress}</Text>
                <Text style={styles.addressPhone}>Phone: {address.phoneNumber}</Text>
              </View>
            ))
          )}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  placeholder: {
    width: 32,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  addAddressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  addAddressIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f8ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  addAddressText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  currentLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  currentLocationText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginLeft: 8,
  },
  savedAddressesSection: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  addressCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  addressTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  addressType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginLeft: 8,
  },
  defaultTag: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 8,
  },
  defaultTagText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  moreButton: {
    padding: 4,
  },
  addressDetails: {
    fontSize: 14,
    color: '#222',
    marginBottom: 4,
    fontWeight: '500',
  },
  addressLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    lineHeight: 20,
  },
  addressPhone: {
    fontSize: 12,
    color: '#999',
  },
});

export default AddressListScreen;