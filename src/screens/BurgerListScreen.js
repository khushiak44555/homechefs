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
  FlatList,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';

const burgerItems = [
  {
    id: '1',
    name: 'BBQ Bourbon Burger',
    restaurant: 'Two Spoons',
    location: 'Mangalore',
    price: '$6.50',
    image: require('../../assets/images/burger.jpg'),
  },
  {
    id: '2',
    name: 'Spicy Jalapeño Crunch',
    restaurant: 'Two Spoons',
    location: 'Mangalore',
    price: '$6.50',
    image: require('../../assets/images/burger.jpg'),
  },
  {
    id: '3',
    name: 'BBQ Burger',
    restaurant: 'Two Spoons',
    location: 'Mangalore',
    price: '$6.50',
    image: require('../../assets/images/burger.jpg'),
  },
  {
    id: '4',
    name: 'Classic Burger',
    restaurant: 'Two Spoons',
    location: 'Mangalore',
    price: '$6.50',
    image: require('../../assets/images/burger.jpg'),
  },
  {
    id: '5',
    name: 'Double Decker Deluxe',
    restaurant: 'Two Spoons',
    location: 'Mangalore',
    price: '$6.50',
    image: require('../../assets/images/burger.jpg'),
  },
  {
    id: '6',
    name: 'Cheeseburger',
    restaurant: 'Two Spoons',
    location: 'Mangalore',
    price: '$6.50',
    image: require('../../assets/images/burger.jpg'),
  },
];

const BurgerListScreen = ({ navigation, route }) => {
  const [searchText, setSearchText] = useState('');
  const [favorites, setFavorites] = useState([]);
  
  // Get category name from route params, default to 'Burgers'
  const categoryName = route?.params?.categoryName || 'Burgers';

  const goBack = () => {
    navigation.goBack();
  };

  const toggleFavorite = (itemId) => {
    setFavorites(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const addToCart = (item) => {
    // Add to cart logic
    console.log('Added to cart:', item);
  };

  const renderBurgerItem = ({ item, index }) => {
    const isFavorite = favorites.includes(item.id);
    const isLeftColumn = index % 2 === 0;

    return (
      <View style={[styles.burgerCard, isLeftColumn ? styles.leftCard : styles.rightCard]}>
        <Image source={item.image} style={styles.burgerImage} />
        
        <TouchableOpacity 
          style={styles.favoriteBtn}
          onPress={() => toggleFavorite(item.id)}
        >
          <MaterialCommunityIcons 
            name={isFavorite ? "heart" : "heart-outline"} 
            size={20} 
            color={colors.primary} 
          />
        </TouchableOpacity>

        <View style={styles.burgerInfo}>
          <Text style={styles.burgerName}>{item.name}</Text>
          <Text style={styles.restaurantInfo}>
            {item.restaurant} • {item.location}
          </Text>
          <Text style={styles.price}>{item.price}</Text>
          
          <TouchableOpacity 
            style={styles.addToCartBtn}
            onPress={() => addToCart(item)}
          >
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{categoryName}</Text>
        <TouchableOpacity style={styles.menuButton}>
          <MaterialCommunityIcons name="dots-vertical" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <MaterialIcons name="search" size={22} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={`Search ${categoryName}`}
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />
          <MaterialIcons name="keyboard-voice" size={22} color="#333" />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <MaterialCommunityIcons name="tune-variant" size={22} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Burger Grid */}
      <FlatList
        data={burgerItems}
        renderItem={renderBurgerItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.gridContainer}
        columnWrapperStyle={styles.row}
      />
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
    paddingVertical: 15,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
    marginRight: 32,
  },
  menuButton: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 15,
    backgroundColor: colors.white,
    marginBottom: 8,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridContainer: {
    paddingHorizontal: 18,
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  burgerCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  leftCard: {
    width: '48%',
  },
  rightCard: {
    width: '48%',
  },
  burgerImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  favoriteBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  burgerInfo: {
    padding: 12,
  },
  burgerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
    lineHeight: 20,
  },
  restaurantInfo: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 12,
  },
  addToCartBtn: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  addToCartText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default BurgerListScreen;