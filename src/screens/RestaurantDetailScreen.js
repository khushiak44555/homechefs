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
  Dimensions,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';

const { width } = Dimensions.get('window');

const menuCategories = [
  { key: 'recommended', label: 'Recommended' },
  { key: 'starters', label: 'Starters' },
  { key: 'main_course', label: 'Main Course' },
  { key: 'desserts', label: 'Desserts' },
  { key: 'beverages', label: 'Beverages' },
];

const menuItems = [
  {
    key: 'chicken_burger',
    name: 'Chicken Burger',
    description: 'Juicy grilled chicken with fresh lettuce, tomato and special sauce',
    price: '$12.99',
    oldPrice: '$15.99',
    rating: '4.8',
    reviews: '124',
    category: 'recommended',
    image: require('../../assets/images/burger.jpg'),
    isVeg: false,
  },
  {
    key: 'veg_pizza',
    name: 'Margherita Pizza',
    description: 'Fresh mozzarella, tomatoes, basil on crispy thin crust',
    price: '$14.99',
    oldPrice: '',
    rating: '4.6',
    reviews: '89',
    category: 'recommended',
    image: require('../../assets/images/category-pizza.jpg'),
    isVeg: true,
  },
  {
    key: 'pasta',
    name: 'Creamy Alfredo Pasta',
    description: 'Rich and creamy alfredo sauce with grilled chicken',
    price: '$16.99',
    oldPrice: '',
    rating: '4.7',
    reviews: '156',
    category: 'main_course',
    image: require('../../assets/images/burger.jpg'),
    isVeg: false,
  },
  {
    key: 'caesar_salad',
    name: 'Caesar Salad',
    description: 'Crisp romaine lettuce with caesar dressing and croutons',
    price: '$9.99',
    oldPrice: '',
    rating: '4.5',
    reviews: '67',
    category: 'starters',
    image: require('../../assets/images/burger.jpg'),
    isVeg: true,
  },
];

const RestaurantDetailScreen = ({ navigation, route }) => {
  const { restaurant } = route.params;
  const [selectedCategory, setSelectedCategory] = useState('recommended');
  const [cartItems, setCartItems] = useState({});

  const addToCart = (item) => {
    setCartItems(prev => ({
      ...prev,
      [item.key]: (prev[item.key] || 0) + 1
    }));
  };

  const removeFromCart = (item) => {
    setCartItems(prev => ({
      ...prev,
      [item.key]: Math.max((prev[item.key] || 0) - 1, 0)
    }));
  };

  const filteredItems = selectedCategory === 'recommended' 
    ? menuItems.filter(item => item.category === 'recommended')
    : menuItems.filter(item => item.category === selectedCategory);

  const totalCartItems = Object.values(cartItems).reduce((sum, count) => sum + count, 0);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Restaurant Image Header */}
        <View style={styles.imageContainer}>
          <Image 
            source={restaurant.image} 
            style={styles.restaurantImage} 
          />
          <View style={styles.imageOverlay} />
          
          {/* Header Controls */}
          <View style={styles.headerControls}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <MaterialIcons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.actionButton}>
                <MaterialCommunityIcons name="share-variant" size={22} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <MaterialCommunityIcons name="heart-outline" size={22} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Restaurant Info Overlay */}
          <View style={styles.restaurantInfoOverlay}>
            <Text style={styles.restaurantName}>{restaurant.name}</Text>
            <Text style={styles.restaurantCuisine}>{restaurant.cuisine} • {restaurant.location}</Text>
            <View style={styles.restaurantStats}>
              <View style={styles.statItem}>
                <MaterialIcons name="star" size={16} color="#FFD700" />
                <Text style={styles.statText}>{restaurant.rating}</Text>
              </View>
              <View style={styles.statItem}>
                <MaterialIcons name="access-time" size={16} color="#fff" />
                <Text style={styles.statText}>{restaurant.time}</Text>
              </View>
              <View style={styles.statItem}>
                <MaterialIcons name="location-on" size={16} color="#fff" />
                <Text style={styles.statText}>{restaurant.distance}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Restaurant Details */}
        <View style={styles.detailsContainer}>
          {/* Info Cards */}
          <View style={styles.infoCards}>
            <View style={styles.infoCard}>
              <MaterialIcons name="delivery-dining" size={20} color={colors.primary} />
              <Text style={styles.infoCardTitle}>Free Delivery</Text>
              <Text style={styles.infoCardSubtitle}>On orders above $25</Text>
            </View>
            <View style={styles.infoCard}>
              <MaterialIcons name="access-time" size={20} color={colors.primary} />
              <Text style={styles.infoCardTitle}>30-45 mins</Text>
              <Text style={styles.infoCardSubtitle}>Average delivery time</Text>
            </View>
            <View style={styles.infoCard}>
              <MaterialIcons name="local-offer" size={20} color={colors.primary} />
              <Text style={styles.infoCardTitle}>20% Off</Text>
              <Text style={styles.infoCardSubtitle}>Use code SAVE20</Text>
            </View>
          </View>

          {/* Menu Categories */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
            contentContainerStyle={{ paddingHorizontal: 20 }}
          >
            {menuCategories.map(category => {
              const isSelected = selectedCategory === category.key;
              return (
                <TouchableOpacity
                  key={category.key}
                  style={[
                    styles.categoryTab,
                    isSelected ? styles.activeCategoryTab : styles.inactiveCategoryTab
                  ]}
                  onPress={() => setSelectedCategory(category.key)}
                >
                  <Text style={[
                    styles.categoryTabText,
                    isSelected ? styles.activeCategoryTabText : styles.inactiveCategoryTabText
                  ]}>
                    {category.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Menu Items */}
          <View style={styles.menuItemsContainer}>
            {filteredItems.map(item => (
              <View key={item.key} style={styles.menuItem}>
                <View style={styles.menuItemContent}>
                  <View style={styles.vegIndicator}>
                    <View style={[
                      styles.vegDot,
                      { backgroundColor: item.isVeg ? '#4CAF50' : '#F44336' }
                    ]} />
                  </View>
                  <Text style={styles.menuItemName}>{item.name}</Text>
                  <Text style={styles.menuItemDescription}>{item.description}</Text>
                  <View style={styles.menuItemPriceRow}>
                    {item.oldPrice ? (
                      <Text style={styles.menuItemOldPrice}>{item.oldPrice}</Text>
                    ) : null}
                    <Text style={styles.menuItemPrice}>{item.price}</Text>
                    <View style={styles.menuItemRating}>
                      <MaterialIcons name="star" size={14} color="#FFD700" />
                      <Text style={styles.menuItemRatingText}>{item.rating}</Text>
                      <Text style={styles.menuItemReviews}>({item.reviews})</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.menuItemImageContainer}>
                  <Image source={item.image} style={styles.menuItemImage} />
                  <View style={styles.addButtonContainer}>
                    {cartItems[item.key] ? (
                      <View style={styles.quantityControls}>
                        <TouchableOpacity
                          style={styles.quantityButton}
                          onPress={() => removeFromCart(item)}
                        >
                          <MaterialIcons name="remove" size={16} color="#fff" />
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{cartItems[item.key]}</Text>
                        <TouchableOpacity
                          style={styles.quantityButton}
                          onPress={() => addToCart(item)}
                        >
                          <MaterialIcons name="add" size={16} color="#fff" />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => addToCart(item)}
                      >
                        <Text style={styles.addButtonText}>ADD</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Cart Button */}
      {totalCartItems > 0 && (
        <TouchableOpacity style={styles.cartButton}>
          <Text style={styles.cartButtonText}>
            View Cart ({totalCartItems} {totalCartItems === 1 ? 'item' : 'items'})
          </Text>
          <MaterialIcons name="shopping-cart" size={20} color="#fff" />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    height: 280,
    position: 'relative',
  },
  restaurantImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  headerControls: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerActions: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  restaurantInfoOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  restaurantName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  restaurantCuisine: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 10,
  },
  restaurantStats: {
    flexDirection: 'row',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  statText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 4,
    fontWeight: '600',
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
  },
  infoCards: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  infoCardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 4,
  },
  infoCardSubtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 2,
  },
  categoriesScroll: {
    marginBottom: 20,
  },
  categoryTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
  },
  activeCategoryTab: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  inactiveCategoryTab: {
    backgroundColor: '#fff',
    borderColor: '#e0e0e0',
  },
  categoryTabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  activeCategoryTabText: {
    color: '#fff',
  },
  inactiveCategoryTabText: {
    color: '#666',
  },
  menuItemsContainer: {
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemContent: {
    flex: 1,
    marginRight: 16,
  },
  vegIndicator: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  vegDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  menuItemPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemOldPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginRight: 16,
  },
  menuItemRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemRatingText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 2,
    fontWeight: '600',
  },
  menuItemReviews: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
  },
  menuItemImageContainer: {
    position: 'relative',
  },
  menuItemImage: {
    width: 100,
    height: 80,
    borderRadius: 8,
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: -8,
    right: 8,
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 4,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 6,
  },
  quantityButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: 12,
  },
  cartButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
});

export default RestaurantDetailScreen;