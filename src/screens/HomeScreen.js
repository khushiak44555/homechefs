import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';
import { commonStyles } from '../styles/common';

const categories = [
  { key: 'all', label: 'All', icon: <MaterialCommunityIcons name="food" size={20} /> },
  { key: 'north', label: 'North Indian', icon: <MaterialCommunityIcons name="hamburger" size={20} /> },
  { key: 'biryani', label: 'Biryani', icon: <MaterialCommunityIcons name="pizza" size={20} /> },
  { key: 'chinese', label: 'Chinese', icon: <MaterialCommunityIcons name="noodles" size={20} /> },
  { key: 'south', label: 'South Indian', icon: <MaterialCommunityIcons name="food-variant" size={20} /> },
  { key: 'desserts', label: 'Desserts', icon: <MaterialCommunityIcons name="cupcake" size={20} /> },
  { key: 'beverages', label: 'Beverages', icon: <MaterialCommunityIcons name="coffee" size={20} /> },
  { key: 'fast', label: 'Fast Food', icon: <MaterialCommunityIcons name="french-fries" size={20} /> },
];

const offers = [
  {
    key: 'pancake',
    title: 'ENJOY THE DELICIOUS PANCAKE',
    subtitle: 'Upto 60% OFF',
    image: require('../../assets/images/pancake.jpg'),
  },
  {
    key: 'burger',
    title: 'BURGER SPECIAL',
    subtitle: 'Upto 50% OFF',
    image: require('../../assets/images/burger.jpg'),
  },
];

const foods = [
  {
    key: 'burger',
    name: 'Chicken Burger',
    price: '$5.00',
    oldPrice: '$7.00',
    discount: '10% off',
    rating: '4.8',
    reviews: '1.2k',
    image: require('../../assets/images/burger.jpg'),
  },
  {
    key: 'noodles',
    name: 'Noodles',
    price: '$8.00',
    oldPrice: '',
    discount: '',
    rating: '4.8',
    reviews: '1.2k',
    image: require('../../assets/images/noodles.jpg'),
  },
  {
    key: 'pancakes',
    name: 'Pancakes',
    price: '$2.00',
    oldPrice: '',
    discount: '',
    rating: '4.8',
    reviews: '1.2k',
    image: require('../../assets/images/pancake.jpg'),
  },
];

const homecooks = [
  {
    key: 'griddle',
    name: 'Gourmet Griddle',
    subtitle: 'Grill Chicken · Salad',
    rating: '4.6',
    time: '15 min',
    distance: '3 km',
    image: require('../../assets/images/griddle.jpg'),
  },
  {
    key: 'stackhouse',
    name: 'Stack House Deck',
    subtitle: 'Biryani · Combo Deals',
    rating: '4.6',
    time: '15 min',
    distance: '3 km',
    image: require('../../assets/images/stackhouse.jpg'),
  },
];

const vouchers = [
  {
    key: 'burger',
    title: 'BURGERS',
    discount: '30% Off',
    image: require('../../assets/images/burger-voucher.jpg'),
  },
  {
    key: 'donut',
    title: 'DONUTS',
    discount: '30% Off',
    image: require('../../assets/images/donut-voucher.jpg'),
  },
];

const HomeScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigateToOffers = () => {
    navigation.navigate('OffersScreen');
  };
  const navigateToFavourites = () => {
    navigation.navigate('FavouritesScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={commonStyles.contentContainer}
      >
        {/* Top Bar */}
        <View style={styles.topBar}>
          <Image
            source={require('../../assets/images/profile.jpg')}
            style={styles.profilePic}
          />
          <View style={styles.locationContainer}>
            <Text style={styles.deliverTo}>Deliver to</Text>
            <View style={styles.locationRow}>
              <MaterialIcons name="location-pin" size={18} color={colors.primary} style={{ marginRight: 4 }} />
              <Text style={styles.locationText}>Mangalore</Text>
            </View>
          </View>
          <View style={styles.topIcons}>
            <TouchableOpacity
              style={styles.iconCircle}
              onPress={() => navigation.navigate('Notifications')}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons name="bell-outline" size={22} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconCircle}
              onPress={() => navigation.navigate('Cart')}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons name="shopping-outline" size={22} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => navigation.navigate('Search')}
          activeOpacity={0.7}
        >
          <MaterialIcons name="search" size={22} color="#999" style={{ marginRight: 8 }} />
          <Text style={styles.searchPlaceholder}>Search Foods, Restaurants..</Text>
          <MaterialIcons name="keyboard-voice" size={22} color={colors.primary} style={{ marginLeft: 8 }} />
        </TouchableOpacity>

        {/* Special Offers */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Special Offers</Text>
          <TouchableOpacity onPress={() => navigation.navigate('OffersTab')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {offers.map(offer => (
            <View key={offer.key} style={styles.offerCard}>
              <Image source={offer.image} style={styles.offerImage} />
              <Text style={styles.offerTitle}>{offer.title}</Text>
              <Text style={styles.offerSubtitle}>{offer.subtitle}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Categories */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Category')}>
            <Text style={styles.sectionAction}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {categories.map(cat => {
            const isSelected = selectedCategory === cat.key;
            return (
              <TouchableOpacity
                key={cat.key}
                style={[
                  styles.categoryBtn,
                  isSelected ? styles.activeCategoryBtn : styles.inactiveCategoryBtn
                ]}
                onPress={() => setSelectedCategory(cat.key)}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {React.cloneElement(cat.icon, { color: isSelected ? '#fff' : colors.primary })}
                  <Text style={[
                    styles.categoryText,
                    isSelected ? styles.activeCategoryText : styles.inactiveCategoryText,
                    { marginLeft: 6 }
                  ]}>
                    {cat.label}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Foods */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.foodRow}
        >
          {foods.map(food => (
            <TouchableOpacity key={food.key} style={styles.foodCard}>
              <View style={styles.foodImageContainer}>
                <Image source={food.image} style={styles.foodImage} />
                {food.discount ? (
                  <View style={styles.discountTag}>
                    <Text style={styles.discountText}>{food.discount}</Text>
                  </View>
                ) : null}
                
                <TouchableOpacity style={styles.foodFavouriteButton}>
                  <MaterialCommunityIcons name="heart-outline" size={14} color={colors.primary} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.foodInfo}>
                <Text style={styles.foodName}>{food.name}</Text>
                <View style={styles.foodRatingRow}>
                  <MaterialIcons name="star" size={12} color={colors.primary} />
                  <Text style={styles.foodRating}> {food.rating}</Text>
                  <Text style={styles.foodReviews}>({food.reviews})</Text>
                </View>
                <View style={styles.foodPriceRow}>
                  {food.oldPrice ? (
                    <Text style={styles.foodOldPrice}>{food.oldPrice}</Text>
                  ) : null}
                  <Text style={styles.foodPrice}>{food.price}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Homecooks Near You */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Homecooks near You</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Homecooks')}>
            <Text style={styles.sectionAction}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {homecooks.map(hc => (
            <TouchableOpacity key={hc.key} style={styles.homecookCard}>
              <View style={styles.homecookImageContainer}>
                <Image source={hc.image} style={styles.homecookImage} />
                <View style={styles.homecookRatingTag}>
                  <MaterialIcons name="star" size={12} color="#fff" />
                  <Text style={styles.homecookRatingText}> {hc.rating}</Text>
                </View>
                
                <TouchableOpacity style={styles.homecookFavouriteButton}>
                  <MaterialIcons name="favorite-border" size={18} color={colors.primary} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.homecookInfo}>
                <Text style={styles.homecookName}>{hc.name}</Text>
                <Text style={styles.homecookSubtitle}>{hc.subtitle}</Text>
                <View style={styles.homecookDetails}>
                  <MaterialIcons name="access-time" size={12} color={colors.primary} />
                  <Text style={styles.homecookInfoText}>{hc.time} · {hc.distance}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Food Vouchers */}

      </ScrollView>
      {/* Sticky Bottom Navigation */}

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 10,
    marginBottom: 20,
  },
  profilePic: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 10,
  },
  locationContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  deliverTo: {
    fontSize: 14,
    color: '#888',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: 'bold',
  },
  topIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 16,
    color: '#999',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 18,
    marginTop: 18,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  sectionAction: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: 'bold',
  },
  seeAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: 'bold',
  },
  horizontalScroll: {
    paddingLeft: 18,
    marginBottom: 10,
  },
  offerCard: {
    width: 220,
    height: 120,
    borderRadius: 18,
    backgroundColor: '#222',
    marginRight: 14,
    padding: 16,
    justifyContent: 'flex-end',
  },
  offerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 220,
    height: 120,
    borderRadius: 18,
    opacity: 0.7,
  },
  offerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  offerSubtitle: {
    color: '#fff',
    fontSize: 13,
    marginTop: 2,
  },
  categoryBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    minWidth: 85,
    alignItems: 'center',
  },
  activeCategoryBtn: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  inactiveCategoryBtn: {
    backgroundColor: '#fff',
    borderColor: colors.primary,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  activeCategoryText: {
    color: '#fff',
  },
  inactiveCategoryText: {
    color: colors.primary,
  },
  foodRow: {
    flexDirection: 'row',
    marginLeft: 18,
    marginBottom: 10,
  },
  foodCard: {
    width: 130,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
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
  discountTag: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: colors.primary,
    borderRadius: 6,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  discountText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: 'bold',
  },
  foodFavouriteButton: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 24,
    height: 24,
    borderRadius: 12,
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
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  foodName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  foodRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  foodRating: {
    fontSize: 11,
    color: colors.primary,
    fontWeight: 'bold',
  },
  foodReviews: {
    fontSize: 10,
    color: '#888',
    marginLeft: 4,
  },
  foodPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  foodOldPrice: {
    fontSize: 11,
    color: '#888',
    textDecorationLine: 'line-through',
    marginRight: 6,
  },
  foodPrice: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: 'bold',
  },
  homecookCard: {
    width: 240,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  homecookImageContainer: {
    position: 'relative',
  },
  homecookImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#f0f0f0',
  },
  homecookRatingTag: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  homecookRatingText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  homecookFavouriteButton: {
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
  homecookInfo: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  homecookName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  homecookSubtitle: {
    fontSize: 13,
    color: '#888',
    marginBottom: 6,
  },
  homecookDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  homecookInfoText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
});

export default HomeScreen;