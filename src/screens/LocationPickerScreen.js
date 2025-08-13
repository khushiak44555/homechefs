import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';

const recentLocations = [
  {
    key: 'home',
    title: 'Home',
    subtitle: 'Kankanady, Mangalore',
    fullAddress: '123 Main Street, Kankanady, Mangalore, Karnataka 575002',
    icon: 'home',
  },
  {
    key: 'work',
    title: 'Work',
    subtitle: 'Business Park, Mangalore',
    fullAddress: '456 Tech Park, Business District, Mangalore, Karnataka 575001',
    icon: 'office-building',
  },
  {
    key: 'recent1',
    title: 'Mangalore Central',
    subtitle: 'MG Road, Mangalore',
    fullAddress: 'MG Road, Mangalore Central, Mangalore, Karnataka 575001',
    icon: 'map-marker',
  },
];

const suggestedLocations = [
  {
    key: 'suggestion1',
    title: 'City Centre Mall',
    subtitle: 'Mangalore City Centre, MG Road',
    fullAddress: 'City Centre Mall, MG Road, Mangalore, Karnataka 575001',
  },
  {
    key: 'suggestion2',
    title: 'Mangalore University',
    subtitle: 'Mangalagangotri, Mangalore',
    fullAddress: 'Mangalore University, Mangalagangotri, Mangalore, Karnataka 574199',
  },
  {
    key: 'suggestion3',
    title: 'Forum Fiza Mall',
    subtitle: 'Pandeshwar, Mangalore',
    fullAddress: 'Forum Fiza Mall, Pandeshwar, Mangalore, Karnataka 575001',
  },
];

const LocationPickerScreen = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState(suggestedLocations);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [gettingLocation, setGettingLocation] = useState(false);

  useEffect(() => {
    if (searchQuery.length > 2) {
      const filtered = suggestedLocations.filter(location =>
        location.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setIsSearching(true);
    } else {
      setFilteredSuggestions(suggestedLocations);
      setIsSearching(false);
    }
  }, [searchQuery]);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This app needs to access your location to provide accurate delivery',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const getCurrentLocation = async () => {
    setGettingLocation(true);
    
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Location permission is required to get your current location');
      setGettingLocation(false);
      return;
    }

    // Simulate getting GPS location (replace with actual GPS implementation)
    setTimeout(() => {
      const mockLocation = {
        title: 'Current Location',
        subtitle: 'Mangalore, Karnataka',
        fullAddress: 'Your current location, Mangalore, Karnataka, India',
        latitude: 12.9141,
        longitude: 74.8560,
      };
      setCurrentLocation(mockLocation);
      setGettingLocation(false);
      
      // Navigate to address details
      navigation.navigate('AddressDetailsScreen', { location: mockLocation });
    }, 2000);
  };

  const selectLocation = (location) => {
    navigation.navigate('AddressDetailsScreen', { location });
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
        <Text style={styles.headerTitle}>Select Location</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <MaterialIcons name="search" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for area, street name..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <MaterialIcons name="close" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Current Location */}
        <TouchableOpacity
          style={styles.currentLocationButton}
          onPress={getCurrentLocation}
          disabled={gettingLocation}
        >
          <View style={styles.currentLocationIcon}>
            <MaterialIcons 
              name="my-location" 
              size={20} 
              color={gettingLocation ? '#999' : colors.primary} 
            />
          </View>
          <View style={styles.currentLocationText}>
            <Text style={styles.currentLocationTitle}>
              {gettingLocation ? 'Getting location...' : 'Use current location'}
            </Text>
            <Text style={styles.currentLocationSubtitle}>
              {gettingLocation ? 'Please wait' : 'Using GPS'}
            </Text>
          </View>
          {gettingLocation && (
            <MaterialCommunityIcons name="loading" size={20} color="#999" />
          )}
        </TouchableOpacity>

        {!isSearching && (
          <>
            {/* Recent Locations */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recent Locations</Text>
              {recentLocations.map(location => (
                <TouchableOpacity
                  key={location.key}
                  style={styles.locationItem}
                  onPress={() => selectLocation(location)}
                >
                  <View style={styles.locationIcon}>
                    <MaterialCommunityIcons name={location.icon} size={18} color={colors.primary} />
                  </View>
                  <View style={styles.locationInfo}>
                    <Text style={styles.locationTitle}>{location.title}</Text>
                    <Text style={styles.locationSubtitle}>{location.subtitle}</Text>
                  </View>
                  <MaterialIcons name="keyboard-arrow-right" size={20} color="#999" />
                </TouchableOpacity>
              ))}
            </View>

            {/* Suggested Locations */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Popular in Mangalore</Text>
              {suggestedLocations.map(location => (
                <TouchableOpacity
                  key={location.key}
                  style={styles.locationItem}
                  onPress={() => selectLocation(location)}
                >
                  <View style={styles.locationIcon}>
                    <MaterialIcons name="location-on" size={18} color="#999" />
                  </View>
                  <View style={styles.locationInfo}>
                    <Text style={styles.locationTitle}>{location.title}</Text>
                    <Text style={styles.locationSubtitle}>{location.subtitle}</Text>
                  </View>
                  <MaterialIcons name="keyboard-arrow-right" size={20} color="#999" />
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {/* Search Results */}
        {isSearching && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Search Results</Text>
            {filteredSuggestions.length > 0 ? (
              filteredSuggestions.map(location => (
                <TouchableOpacity
                  key={location.key}
                  style={styles.locationItem}
                  onPress={() => selectLocation(location)}
                >
                  <View style={styles.locationIcon}>
                    <MaterialIcons name="location-on" size={18} color="#999" />
                  </View>
                  <View style={styles.locationInfo}>
                    <Text style={styles.locationTitle}>{location.title}</Text>
                    <Text style={styles.locationSubtitle}>{location.subtitle}</Text>
                  </View>
                  <MaterialIcons name="keyboard-arrow-right" size={20} color="#999" />
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.noResults}>
                <MaterialIcons name="location-off" size={40} color="#ccc" />
                <Text style={styles.noResultsText}>No locations found</Text>
                <Text style={styles.noResultsSubtext}>Try searching with different keywords</Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
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
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
    color: '#222',
  },
  currentLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  currentLocationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f8ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  currentLocationText: {
    flex: 1,
  },
  currentLocationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 2,
  },
  currentLocationSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  locationIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  locationInfo: {
    flex: 1,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 2,
  },
  locationSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  noResults: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  noResultsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 16,
    marginBottom: 4,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default LocationPickerScreen;