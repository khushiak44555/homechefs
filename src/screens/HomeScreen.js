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

const categories = [
  { key: 'all', label: 'All', icon: <MaterialCommunityIcons name="food" size={20} /> },
  { key: 'north', label: 'North Indian', icon: <MaterialCommunityIcons name="hamburger" size={20} /> },
  { key: 'biryani', label: 'Biryani', icon: <MaterialCommunityIcons name="pizza" size={20} /> },
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

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 90 }}
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
            <TouchableOpacity style={styles.iconCircle}>
              <MaterialCommunityIcons name="bell-outline" size={22} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconCircle}>
              <MaterialCommunityIcons name="shopping-outline" size={22} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Foods, Restaurants.."
            placeholderTextColor="#999"
          />
          <MaterialIcons name="keyboard-voice" size={22} color={colors.primary} style={{ marginLeft: 8 }} />
        </View>
        {/* Special Offers */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Special Offers</Text>
          <TouchableOpacity>
            <Text style={styles.sectionAction}>See All</Text>
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
          <TouchableOpacity>
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
            <View key={food.key} style={styles.foodCard}>
              <Image source={food.image} style={styles.foodImage} />
              {food.discount ? (
                <View style={styles.discountTag}>
                  <Text style={styles.discountText}>{food.discount}</Text>
                </View>
              ) : null}
              <Text style={styles.foodName}>{food.name}</Text>
              <View style={styles.foodRatingRow}>
                <MaterialIcons name="star" size={14} color={colors.primary} />
                <Text style={styles.foodRating}> {food.rating}</Text>
                <Text style={styles.foodReviews}>({food.reviews})</Text>
              </View>
              <View style={styles.foodPriceRow}>
                {food.oldPrice ? (
                  <Text style={styles.foodOldPrice}>{food.oldPrice}</Text>
                ) : null}
                <Text style={styles.foodPrice}>{food.price}</Text>
                <TouchableOpacity>
                  <MaterialCommunityIcons name="heart-outline" size={18} color={colors.primary} style={{ marginLeft: 8 }} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
        {/* Homecooks Near You */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Homecooks near You</Text>
          <TouchableOpacity>
            <Text style={styles.sectionAction}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {homecooks.map(hc => (
            <View key={hc.key} style={styles.homecookCard}>
              <Image source={hc.image} style={styles.homecookImage} />
              <View style={styles.homecookRatingTag}>
                <MaterialIcons name="star" size={12} color="#fff" />
                <Text style={styles.homecookRatingText}> {hc.rating}</Text>
              </View>
              <Text style={styles.homecookName}>{hc.name}</Text>
              <Text style={styles.homecookSubtitle}>{hc.subtitle}</Text>
              <Text style={styles.homecookInfo}>{hc.time} · {hc.distance}</Text>
            </View>
          ))}
        </ScrollView>
        {/* Food Vouchers */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Food Vouchers</Text>
          <TouchableOpacity>
            <Text style={styles.sectionAction}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {vouchers.map(voucher => (
            <View key={voucher.key} style={styles.voucherCard}>
              <Image source={voucher.image} style={styles.voucherImage} />
              <Text style={styles.voucherTitle}>{voucher.title}</Text>
              <Text style={styles.voucherDiscount}>{voucher.discount}</Text>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
      {/* Sticky Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navBtn}>
          <MaterialCommunityIcons name="home-variant" size={28} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtn}>
          <MaterialCommunityIcons name="clipboard-text-outline" size={28} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtn}>
          <MaterialCommunityIcons name="percent" size={28} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtn}>
          <MaterialCommunityIcons name="heart-outline" size={28} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtn}>
          <MaterialCommunityIcons name="account-outline" size={28} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 10,
    marginBottom: 10,
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
    backgroundColor: '#f7f7f7',
    borderRadius: 16,
    marginHorizontal: 18,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 16,
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
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
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
    fontSize: 15,
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
    justifyContent: 'space-between',
    marginHorizontal: 18,
    marginBottom: 10,
  },
  foodCard: {
    width: 150,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 10,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  foodImage: {
    width: '100%',
    height: 80,
    borderRadius: 12,
    marginBottom: 6,
  },
  discountTag: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  discountText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  foodName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  foodRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  foodRating: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: 'bold',
  },
  foodReviews: {
    fontSize: 12,
    color: '#888',
    marginLeft: 4,
  },
  foodPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  foodOldPrice: {
    fontSize: 12,
    color: '#888',
    textDecorationLine: 'line-through',
    marginRight: 4,
  },
  foodPrice: {
    fontSize: 15,
    color: colors.primary,
    fontWeight: 'bold',
    marginRight: 8,
  },
  foodFav: {
    fontSize: 18,
    color: colors.primary,
    marginLeft: 'auto',
  },
  homecookCard: {
    width: 220,
    backgroundColor: '#fff',
    borderRadius: 18,
    marginRight: 14,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  homecookImage: {
    width: '100%',
    height: 100,
    borderRadius: 14,
    marginBottom: 8,
  },
  homecookRatingTag: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  homecookRatingText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  homecookName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  homecookSubtitle: {
    fontSize: 13,
    color: '#888',
    marginBottom: 2,
  },
  homecookInfo: {
    fontSize: 12,
    color: '#888',
  },
  voucherCard: {
    width: 180,
    height: 80,
    borderRadius: 18,
    backgroundColor: colors.primary,
    marginRight: 14,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  voucherImage: {
    position: 'absolute',
    left: 10,
    top: 10,
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  voucherTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 70,
  },
  voucherDiscount: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 70,
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
  },
  navIcon: {
    fontSize: 28,
    color: colors.primary,
  },
});

export default HomeScreen;