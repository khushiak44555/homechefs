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

const recentHistory = [
  'Cheese Burgers',
  'Mexican Chicken Burgers',
  'Burgers',
  'Chicken Burgers',
];

const burgers = [
  {
    key: 'chicken-burger',
    name: 'Chicken Burger',
    rating: '4.8',
    reviews: '1.2k',
    oldPrice: '$7.00',
    price: '$5.00',
    discount: '10% off',
    image: require('../../assets/images/burger.jpg'),
  },
  {
    key: 'mexican-burger',
    name: 'Mexican Burger',
    rating: '4.8',
    reviews: '1.2k',
    oldPrice: '',
    price: '$8.00',
    discount: '',
    image: require('../../assets/images/mexican-burger.jpg'),
  },
  {
    key: 'cheese-burger',
    name: 'Cheese Burger',
    rating: '4.8',
    reviews: '1.2k',
    oldPrice: '$7.00',
    price: '$5.00',
    discount: '10% off',
    image: require('../../assets/images/cheese-burger.jpg'),
  },
];

const categories = [
  {
    key: 'burgers',
    name: 'Burgers',
    image: require('../../assets/images/category-burger.jpg'),
  },
  {
    key: 'pizza',
    name: 'Pizza',
    image: require('../../assets/images/category-pizza.jpg'),
  },
  {
    key: 'biryani',
    name: 'Biryani',
    image: require('../../assets/images/category-biryani.jpg'),
  },
  {
    key: 'shawarma',
    name: 'Shawarma',
    image: require('../../assets/images/category-shawarma.jpg'),
  },
  {
    key: 'south-indian',
    name: 'South Indian',
    image: require('../../assets/images/category-south-indian.jpg'),
  },
  {
    key: 'chinese',
    name: 'Chinese',
    image: require('../../assets/images/category-chinese.jpg'),
  },
  {
    key: 'momos',
    name: 'Momos',
    image: require('../../assets/images/category-momos.jpg'),
  },
  {
    key: 'drinks',
    name: 'Drinks',
    image: require('../../assets/images/category-drinks.jpg'),
  },
];

const homecooks = [
  {
    key: 'super-burger',
    name: 'Super Burger',
    cuisine: 'Indian',
    location: 'Mangalore',
    time: '15 min',
    distance: '3 km',
    rating: '4.6',
    image: require('../../assets/images/super-burger.jpg'),
  },
  {
    key: 'two-spoons',
    name: 'Two Spoons',
    cuisine: 'Indian',
    location: 'Mangalore',
    time: '15 min',
    distance: '3 km',
    rating: '4.6',
    image: require('../../assets/images/two-spoons.jpg'),
  },
  {
    key: 'sip-bite',
    name: 'Sip & Bite',
    cuisine: 'Indian',
    location: 'Mangalore',
    time: '15 min',
    distance: '3 km',
    rating: '4.6',
    image: require('../../assets/images/sip-bite.jpg'),
  },
];

const SearchScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('Burgers');

  const goBack = () => {
    navigation.goBack();
  };

  const clearHistory = () => {
    // Clear search history logic
  };

  const addToFavorites = (item) => {
    // Add to favorites logic
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Header */}
      <View style={styles.header}>
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
          <TouchableOpacity style={styles.iconCircle}>
            <MaterialCommunityIcons name="bell-outline" size={22} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconCircle}>
            <MaterialCommunityIcons name="shopping-outline" size={22} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <MaterialIcons name="search" size={22} color="#999" style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Burgers"
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
            autoFocus={true}
          />
          <MaterialIcons name="keyboard-voice" size={22} color={colors.primary} />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Recently History */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recently History</Text>
          <TouchableOpacity onPress={clearHistory}>
            <Text style={styles.clearAll}>Clear All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.historyContainer}>
          {recentHistory.map((item, index) => (
            <TouchableOpacity key={index} style={styles.historyItem}>
              <Text style={styles.historyText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Burgers Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Burgers</Text>
          <TouchableOpacity>
            <Text style={styles.sectionAction}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
        >
          {burgers.map(burger => (
            <View key={burger.key} style={styles.burgerCard}>
              <Image source={burger.image} style={styles.burgerImage} />
              {burger.discount ? (
                <View style={styles.discountTag}>
                  <Text style={styles.discountText}>{burger.discount}</Text>
                </View>
              ) : null}
              <TouchableOpacity
                style={styles.favoriteBtn}
                onPress={() => addToFavorites(burger)}
              >
                <MaterialCommunityIcons name="heart-outline" size={20} color={colors.primary} />
              </TouchableOpacity>

              <View style={styles.burgerInfo}>
                <Text style={styles.burgerName}>{burger.name}</Text>
                <View style={styles.ratingRow}>
                  <MaterialIcons name="star" size={14} color={colors.primary} />
                  <Text style={styles.rating}> {burger.rating}</Text>
                  <Text style={styles.reviews}>({burger.reviews})</Text>
                </View>
                <View style={styles.priceRow}>
                  {burger.oldPrice ? (
                    <Text style={styles.oldPrice}>{burger.oldPrice}</Text>
                  ) : null}
                  <Text style={styles.price}>{burger.price}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Browse by Category</Text>
          <TouchableOpacity onPress={() => navigation.navigate('CategoryScreen')}>
            <Text style={styles.sectionAction}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.categoriesGrid}>
          {categories.map(category => (
            <TouchableOpacity key={category.key} style={styles.categoryItem}>
              <Image source={category.image} style={styles.categoryImage} />
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Browse by Homecooks */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Browse by Homecooks</Text>
          <TouchableOpacity>
            <Text style={styles.sectionAction}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
        >
          {homecooks.map(homecook => (
            <View key={homecook.key} style={styles.homecookCard}>
              <Image source={homecook.image} style={styles.homecookImage} />
              <View style={styles.homecookRatingTag}>
                <MaterialIcons name="star" size={12} color="#fff" />
                <Text style={styles.homecookRatingText}> {homecook.rating}</Text>
              </View>
              <TouchableOpacity style={styles.homecookFavoriteBtn}>
                <MaterialCommunityIcons name="heart-outline" size={20} color={colors.primary} />
              </TouchableOpacity>

              <View style={styles.homecookInfo}>
                <Text style={styles.homecookName}>{homecook.name}</Text>
                <Text style={styles.homecookDetails}>
                  {homecook.cuisine} • {homecook.location}
                </Text>
                <View style={styles.homecookTimeDistance}>
                  <MaterialIcons name="access-time" size={14} color="#888" />
                  <Text style={styles.timeDistance}> {homecook.time} • {homecook.distance}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
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
    paddingTop: 10,
    marginBottom: 15,
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginBottom: 20,
  },
  backButton: {
    marginRight: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: colors.primary,
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
    marginTop: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  sectionAction: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: 'bold',
  },
  clearAll: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: 'bold',
  },
  historyContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 18,
    marginBottom: 20,
  },
  historyItem: {
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 8,
  },
  historyText: {
    fontSize: 14,
    color: '#666',
  },
  horizontalScroll: {
    paddingLeft: 18,
    marginBottom: 20,
  },
  burgerCard: {
    width: 160,
    backgroundColor: '#fff',
    borderRadius: 18,
    marginRight: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  burgerImage: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  discountTag: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  discountText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  favoriteBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 6,
  },
  burgerInfo: {
    padding: 12,
  },
  burgerName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  rating: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: 'bold',
  },
  reviews: {
    fontSize: 12,
    color: '#888',
    marginLeft: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  oldPrice: {
    fontSize: 12,
    color: '#888',
    textDecorationLine: 'line-through',
    marginRight: 6,
  },
  price: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: 'bold',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 18,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryItem: {
    width: '22%',
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 15,
    marginBottom: 6,
  },
  categoryName: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
  },
  homecookCard: {
    width: 220,
    backgroundColor: '#fff',
    borderRadius: 18,
    marginRight: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  homecookImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  homecookRatingTag: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  homecookRatingText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  homecookFavoriteBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 6,
  },
  homecookInfo: {
    padding: 14,
  },
  homecookName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  homecookDetails: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
  },
  homecookTimeDistance: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeDistance: {
    fontSize: 12,
    color: '#888',
  },
});

export default SearchScreen;