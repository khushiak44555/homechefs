import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';

// Mock data for favourite restaurants
const favouriteRestaurants = [
  {
    id: 1,
    name: 'Gourmet Griddle',
    cuisine: 'Grill Chicken • Salad',
    rating: 4.6,
    time: '15 min',
    distance: '3 km',
    image: require('../../assets/images/griddle.jpg'),
    isFavourite: true,
  },
  {
    id: 2,
    name: 'Stack House',
    cuisine: 'Biriyani • Combo Deal',
    rating: 4.6,
    time: '15 min',
    distance: '3 km',
    image: require('../../assets/images/griddle.jpg'),
    isFavourite: true,
  },
];

// Mock data for favourite foods
const favouriteFoods = [
  {
    id: 1,
    name: 'Chicken Burger',
    rating: 4.8,
    reviews: '1.2k',
    originalPrice: '$7.00',
    price: '$5.00',
    discount: '10% off',
    image: require('../../assets/images/burger.jpg'),
    isFavourite: true,
  },
  {
    id: 2,
    name: 'Noodles',
    rating: 4.8,
    reviews: '1.2k',
    price: '$8.00',
    discount: null,
    image: require('../../assets/images/category-chinese.jpg'),
    isFavourite: true,
  },
  {
    id: 3,
    name: 'Butter Chicken',
    rating: 4.8,
    reviews: '1.2k',
    originalPrice: '$7.00',
    price: '$5.50',
    discount: '10% off',
    image: require('../../assets/images/category-chinese.jpg'),
    isFavourite: true,
  },
  {
    id: 4,
    name: 'Cheese Burger',
    rating: 4.8,
    reviews: '1.2k',
    originalPrice: '$7.00',
    price: '$5.00',
    discount: '10% off',
    image: require('../../assets/images/burger.jpg'),
    isFavourite: true,
  },
  {
    id: 5,
    name: 'Biriyani',
    rating: 4.8,
    reviews: '1.2k',
    price: '$8.00',
    discount: null,
    image: require('../../assets/images/category-biryani.jpg'),
    isFavourite: true,
  },
  {
    id: 6,
    name: 'Momos',
    rating: 4.8,
    reviews: '1.2k',
    originalPrice: '$7.00',
    price: '$5.50',
    discount: '10% off',
    image: require('../../assets/images/category-momos.jpg'),
    isFavourite: true,
  },
];

const FavouritesScreen = ({ navigation }) => {
  const toggleFavourite = (type, id) => {
    // Handle favourite toggle logic here
    console.log(`Toggle favourite for ${type} with id ${id}`);
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
        <Text style={styles.headerTitle}>Favourites</Text>
        <TouchableOpacity style={styles.menuButton}>
          <MaterialIcons name="more-vert" size={24} color="#222" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Favourite Restaurants Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Favourite Restaurants</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.restaurantsContainer}
          >
            {favouriteRestaurants.map((restaurant) => (
              <TouchableOpacity key={restaurant.id} style={styles.restaurantCard}>
                <View style={styles.restaurantImageContainer}>
                  <Image source={restaurant.image} style={styles.restaurantImage} />
                  
                  <View style={styles.ratingBadge}>
                    <MaterialIcons name="star" size={12} color="#fff" />
                    <Text style={styles.ratingText}>{restaurant.rating}</Text>
                  </View>
                  
                  <TouchableOpacity 
                    style={styles.favouriteButton}
                    onPress={() => toggleFavourite('restaurant', restaurant.id)}
                  >
                    <MaterialIcons 
                      name={restaurant.isFavourite ? "favorite" : "favorite-border"} 
                      size={18} 
                      color="#ff6b6b" 
                    />
                  </TouchableOpacity>
                  
                  {/* Restaurant name overlay on image */}
                  <View style={styles.restaurantNameOverlay}>
                    <Text style={styles.restaurantNameText}>{restaurant.name}</Text>
                  </View>
                </View>
                
                <View style={styles.restaurantInfo}>
                  <Text style={styles.restaurantCuisine}>{restaurant.cuisine}</Text>
                  
                  <View style={styles.restaurantDetails}>
                    <MaterialIcons name="access-time" size={12} color="#ff6b6b" />
                    <Text style={styles.restaurantTime}>{restaurant.time} • {restaurant.distance}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Favourite Foods Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Favourite Foods</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.foodsGrid}>
            {favouriteFoods.map((food) => (
              <TouchableOpacity key={food.id} style={styles.foodCard}>
                <View style={styles.foodImageContainer}>
                  <Image source={food.image} style={styles.foodImage} />
                  
                  {food.discount && (
                    <View style={styles.discountBadge}>
                      <Text style={styles.discountText}>{food.discount}</Text>
                    </View>
                  )}
                  
                  <TouchableOpacity 
                    style={styles.foodFavouriteButton}
                    onPress={() => toggleFavourite('food', food.id)}
                  >
                    <MaterialIcons 
                      name={food.isFavourite ? "favorite" : "favorite-border"} 
                      size={14} 
                      color="#ff6b6b" 
                    />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.foodInfo}>
                  <Text style={styles.foodName}>{food.name}</Text>
                  
                  <View style={styles.ratingContainer}>
                    <MaterialIcons name="star" size={12} color="#ff6b6b" />
                    <Text style={styles.foodRating}>{food.rating}</Text>
                    <Text style={styles.reviewCount}>({food.reviews})</Text>
                  </View>
                  
                  <View style={styles.priceContainer}>
                    {food.originalPrice && (
                      <Text style={styles.originalPrice}>{food.originalPrice}</Text>
                    )}
                    <Text style={styles.currentPrice}>{food.price}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
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
  menuButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 12,
    paddingVertical: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  seeAllText: {
    fontSize: 14,
    color: '#ff6b6b',
    fontWeight: '600',
  },
  restaurantsContainer: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  restaurantCard: {
    width: 240,
    marginRight: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  restaurantImageContainer: {
    position: 'relative',
  },
  restaurantImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#f0f0f0',
  },
  ratingBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#ff6b6b',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 2,
  },
  favouriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  restaurantNameOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  restaurantNameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  restaurantInfo: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  restaurantCuisine: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
  },
  restaurantDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  restaurantTime: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  foodsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  foodCard: {
    width: '31%',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  foodImageContainer: {
    position: 'relative',
  },
  foodImage: {
    width: '100%',
    height: 70,
    backgroundColor: '#f0f0f0',
  },
  discountBadge: {
    position: 'absolute',
    top: 4,
    left: 4,
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    color: '#fff',
    fontSize: 8,
    fontWeight: 'bold',
  },
  foodFavouriteButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  foodInfo: {
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  foodName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  foodRating: {
    fontSize: 11,
    color: '#222',
    fontWeight: '600',
    marginLeft: 2,
  },
  reviewCount: {
    fontSize: 11,
    color: '#666',
    marginLeft: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  originalPrice: {
    fontSize: 11,
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 6,
  },
  currentPrice: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ff6b6b',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingBottom: 34,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  navBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -8,
    width: 20,
    height: 3,
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
});

export default FavouritesScreen;