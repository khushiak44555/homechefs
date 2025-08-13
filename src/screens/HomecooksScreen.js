import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';

const categoryFilters = [
  { key: 'all', label: 'All' },
  { key: 'italian', label: 'Italian' },
  { key: 'western', label: 'Western' },
  { key: 'south_indian', label: 'South Indian' },
];

const nearYouRestaurants = [
  {
    key: 'gourmet_griddle',
    name: 'Gourmet Griddle',
    cuisine: 'Indian',
    location: 'Mangalore',
    rating: '4.6',
    time: '15 min',
    distance: '3 km',
    image: require('../../assets/images/griddle.jpg'),
  },
  {
    key: 'savory_delight',
    name: 'Savory Delight Bistro',
    cuisine: 'Italian Dish',
    location: 'Mangalore',
    rating: '4.6',
    time: '15 min',
    distance: '3 km',
    image: require('../../assets/images/griddle.jpg'),
  },
  {
    key: 'urban_eats',
    name: 'Urban Eats & Treats',
    cuisine: 'Chinese',
    location: 'Mangalore',
    rating: '4.6',
    time: '15 min',
    distance: '3 km',
    image: require('../../assets/images/griddle.jpg'),
  },
  {
    key: 'culinary_paradise',
    name: 'Culinary Paradise',
    cuisine: 'Indian',
    location: 'Mangalore',
    rating: '4.6',
    time: '15 min',
    distance: '3 km',
    image: require('../../assets/images/griddle.jpg'),
  },
  {
    key: 'flavor_fusion',
    name: 'Flavor Fusion Cafe',
    cuisine: 'Italian Dish',
    location: 'Mangalore',
    rating: '4.6',
    time: '15 min',
    distance: '3 km',
    image: require('../../assets/images/griddle.jpg'),
  },
  {
    key: 'rustic_table',
    name: 'Rustic Table',
    cuisine: 'Chinese',
    location: 'Mangalore',
    rating: '4.6',
    time: '15 min',
    distance: '3 km',
    image: require('../../assets/images/griddle.jpg'),
  },
];

const topRecommended = [
  {
    key: 'wholesome_bites',
    name: 'Wholesome Bites',
    cuisine: 'Indian',
    location: 'Mangalore',
    rating: '4.6',
    time: '15 min',
    distance: '3 km',
    image: require('../../assets/images/griddle.jpg'),
  },
  {
    key: 'crave_kitchen',
    name: 'Crave Kitchen & Bar',
    cuisine: 'Italian Dish',
    location: 'Mangalore',
    rating: '4.6',
    time: '15 min',
    distance: '3 km',
    image: require('../../assets/images/griddle.jpg'),
  },
  {
    key: 'taste_palette',
    name: 'The Taste Palette',
    cuisine: 'Greek',
    location: 'Mangalore',
    rating: '4.6',
    time: '15 min',
    distance: '3 km',
    image: require('../../assets/images/griddle.jpg'),
  },
  {
    key: 'chic_eats',
    name: 'Chic Eats Bistro',
    cuisine: 'French',
    location: 'Mangalore',
    rating: '4.6',
    time: '15 min',
    distance: '3 km',
    image: require('../../assets/images/griddle.jpg'),
  },
  {
    key: 'garden_fresh',
    name: 'Garden Fresh Grill',
    cuisine: 'Italian Dish',
    location: 'Mangalore',
    rating: '4.6',
    time: '15 min',
    distance: '3 km',
    image: require('../../assets/images/griddle.jpg'),
  },
  {
    key: 'sizzling_skillet',
    name: 'The Sizzling Skillet',
    cuisine: 'Indian',
    location: 'Mangalore',
    rating: '4.6',
    time: '15 min',
    distance: '3 km',
    image: require('../../assets/images/griddle.jpg'),
  },
];

const HomecooksScreen = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const renderRestaurantCard = ({ item }) => (
    <TouchableOpacity style={styles.restaurantCard}>
      <Image source={item.image} style={styles.restaurantImage} />
      <View style={styles.ratingBadge}>
        <MaterialIcons name="star" size={12} color="#fff" />
        <Text style={styles.ratingText}>{item.rating}</Text>
      </View>
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName}>{item.name}</Text>
        <Text style={styles.restaurantCuisine}>{item.cuisine} • {item.location}</Text>
        <View style={styles.restaurantDetails}>
          <MaterialIcons name="access-time" size={14} color="#888" />
          <Text style={styles.detailText}>{item.time}</Text>
          <Text style={styles.detailSeparator}>•</Text>
          <Text style={styles.detailText}>{item.distance}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.favoriteButton}>
        <MaterialCommunityIcons name="heart-outline" size={20} color={colors.primary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderNearYouGrid = () => {
    const pairs = [];
    for (let i = 0; i < nearYouRestaurants.length; i += 2) {
      pairs.push(nearYouRestaurants.slice(i, i + 2));
    }

    return pairs.map((pair, index) => (
      <View key={index} style={styles.restaurantRow}>
        {pair.map((restaurant) => (
          <TouchableOpacity 
            key={restaurant.key} 
            style={styles.gridCard}
            onPress={() => navigation.navigate('RestaurantDetailScreen', { restaurant })}
            activeOpacity={0.8}
          >
            <Image source={restaurant.image} style={styles.gridImage} />
            <View style={styles.gridRatingBadge}>
              <MaterialIcons name="star" size={10} color="#fff" />
              <Text style={styles.gridRatingText}>{restaurant.rating}</Text>
            </View>
            <View style={styles.gridOverlay}>
              <Text style={styles.gridRestaurantName}>{restaurant.name}</Text>
              <Text style={styles.gridRestaurantCuisine}>{restaurant.cuisine} • {restaurant.location}</Text>
              <View style={styles.gridRestaurantDetails}>
                <MaterialIcons name="access-time" size={12} color="#fff" />
                <Text style={styles.gridDetailText}>{restaurant.time} • {restaurant.distance}</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.gridFavoriteButton}
              onPress={(e) => {
                e.stopPropagation();
                // Handle favorite toggle here
              }}
            >
              <MaterialCommunityIcons name="heart-outline" size={16} color={colors.primary} />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    ));
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
        <Text style={styles.headerTitle}>Homecooks</Text>
        <TouchableOpacity style={styles.menuButton}>
          <MaterialCommunityIcons name="dots-vertical" size={24} color="#222" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Near You Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Near You!</Text>
              <Text style={styles.sectionSubtitle}>Explore the Restaurants that is near you</Text>
            </View>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterButtonText}>Filter</Text>
              <MaterialCommunityIcons name="filter-variant" size={16} color={colors.primary} style={{ marginLeft: 4 }} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.restaurantsGrid}>
            {renderNearYouGrid()}
          </View>
        </View>

        {/* Top Recommended Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Top Recommended</Text>
              <Text style={styles.sectionSubtitle}>Explore the Best Restaurants around You!</Text>
            </View>
          </View>

          {/* Filter Tabs */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.filterTabs}
            contentContainerStyle={{ paddingHorizontal: 18 }}
          >
            {categoryFilters.map(filter => {
              const isSelected = selectedFilter === filter.key;
              return (
                <TouchableOpacity
                  key={filter.key}
                  style={[
                    styles.filterTab,
                    isSelected ? styles.activeFilterTab : styles.inactiveFilterTab
                  ]}
                  onPress={() => setSelectedFilter(filter.key)}
                >
                  <Text style={[
                    styles.filterTabText,
                    isSelected ? styles.activeFilterTabText : styles.inactiveFilterTabText
                  ]}>
                    {filter.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Top Recommended Grid */}
          <View style={[styles.restaurantsGrid, { marginTop: 16 }]}>
            {topRecommended.reduce((pairs, restaurant, index) => {
              if (index % 2 === 0) {
                pairs.push([restaurant]);
              } else {
                pairs[pairs.length - 1].push(restaurant);
              }
              return pairs;
            }, []).map((pair, index) => (
              <View key={index} style={styles.restaurantRow}>
                {pair.map((restaurant) => (
                  <TouchableOpacity 
                    key={restaurant.key} 
                    style={styles.gridCard}
                    onPress={() => navigation.navigate('RestaurantDetailScreen', { restaurant })}
                    activeOpacity={0.8}
                  >
                    <Image source={restaurant.image} style={styles.gridImage} />
                    <View style={styles.gridRatingBadge}>
                      <MaterialIcons name="star" size={10} color="#fff" />
                      <Text style={styles.gridRatingText}>{restaurant.rating}</Text>
                    </View>
                    <View style={styles.gridOverlay}>
                      <Text style={styles.gridRestaurantName}>{restaurant.name}</Text>
                      <Text style={styles.gridRestaurantCuisine}>{restaurant.cuisine} • {restaurant.location}</Text>
                      <View style={styles.gridRestaurantDetails}>
                        <MaterialIcons name="access-time" size={12} color="#fff" />
                        <Text style={styles.gridDetailText}>{restaurant.time} • {restaurant.distance}</Text>
                      </View>
                    </View>
                    <TouchableOpacity 
                      style={styles.gridFavoriteButton}
                      onPress={(e) => {
                        e.stopPropagation();
                        // Handle favorite toggle here
                      }}
                    >
                      <MaterialCommunityIcons name="heart-outline" size={16} color={colors.primary} />
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginRight: 32, // To center the title accounting for back button
  },
  menuButton: {
    padding: 4,
  },
  section: {
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 18,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#888',
    lineHeight: 20,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: '#fff',
  },
  filterButtonText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  restaurantsGrid: {
    paddingHorizontal: 18,
  },
  restaurantRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  gridCard: {
    width: '48%',
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  gridImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gridRatingBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  gridRatingText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
    marginLeft: 2,
  },
  gridOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 12,
  },
  gridRestaurantName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  gridRestaurantCuisine: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.9,
    marginBottom: 4,
  },
  gridRestaurantDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gridDetailText: {
    color: '#fff',
    fontSize: 11,
    marginLeft: 4,
    opacity: 0.9,
  },
  gridFavoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 28,
    height: 28,
    backgroundColor: '#fff',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterTabs: {
    marginBottom: 8,
  },
  filterTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
  },
  activeFilterTab: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  inactiveFilterTab: {
    backgroundColor: '#fff',
    borderColor: '#e0e0e0',
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  activeFilterTabText: {
    color: '#fff',
  },
  inactiveFilterTabText: {
    color: '#666',
  },
});

export default HomecooksScreen;