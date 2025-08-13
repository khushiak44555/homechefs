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
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';

// Mock data for orders
const currentOrder = {
  key: 'current_1',
  name: 'Chicken Biriyani',
  restaurant: 'Gourmet Griddle',
  location: 'Mangalore',
  price: '$10.09',
  time: '15 min',
  distance: '3 km',
  status: 'Delivery in Progress',
  isBestseller: true,
  image: require('../../assets/images/category-biryani.jpg'),
};

const recentOrders = [
  {
    key: 'recent_1',
    name: 'Cheese Pizza',
    restaurant: 'Two Spoons',
    location: 'Mangalore',
    price: '$6.50',
    status: 'completed',
    image: require('../../assets/images/category-pizza.jpg'),
  },
  {
    key: 'recent_2',
    name: 'Grilled Chicken Burger',
    restaurant: 'Super Burger',
    location: 'Mangalore',
    price: '$7.25',
    status: 'completed',
    image: require('../../assets/images/burger.jpg'),
  },
  {
    key: 'recent_3',
    name: 'Momos',
    restaurant: 'Two Spoons',
    location: 'Mangalore',
    price: '$4.70',
    status: 'completed',
    image: require('../../assets/images/category-momos.jpg'),
  },
  {
    key: 'recent_4',
    name: 'Chicken Burger',
    restaurant: 'Sip & Savour',
    location: 'Mangalore',
    price: '$6.49',
    status: 'completed',
    image: require('../../assets/images/burger.jpg'),
  },
];

const OrdersScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('All');

  const filteredOrders = recentOrders.filter(order => {
    if (selectedTab === 'All') return true;
    if (selectedTab === 'Completed') return order.status === 'completed';
    if (selectedTab === 'Cancelled') return order.status === 'cancelled';
    return true;
  });

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
        <Text style={styles.headerTitle}>Orders</Text>
        <TouchableOpacity style={styles.menuButton}>
          <MaterialIcons name="more-vert" size={24} color="#222" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Delivery in Progress Section - Compact */}
        {currentOrder && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Delivery in Progress</Text>
            
            <View style={styles.currentOrderCard}>
              <View style={styles.currentOrderRow}>
                <Image source={currentOrder.image} style={styles.currentOrderImage} />
                
                {currentOrder.isBestseller && (
                  <View style={styles.bestsellerTag}>
                    <Text style={styles.bestsellerText}>Bestseller</Text>
                  </View>
                )}
                
                <TouchableOpacity style={styles.favoriteButton}>
                  <MaterialIcons name="favorite" size={16} color="#ff6b6b" />
                </TouchableOpacity>
                
                <View style={styles.currentOrderInfo}>
                  <Text style={styles.currentOrderName}>{currentOrder.name}</Text>
                  <Text style={styles.currentOrderRestaurant}>
                    {currentOrder.restaurant} • {currentOrder.location}
                  </Text>
                  <Text style={styles.currentOrderPrice}>{currentOrder.price}</Text>
                  
                  <View style={styles.orderTimeInfo}>
                    <MaterialIcons name="access-time" size={12} color="#ff6b6b" />
                    <Text style={styles.orderTimeText}>
                      {currentOrder.time} • {currentOrder.distance}
                    </Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.currentOrderButtons}>
                <TouchableOpacity style={styles.trackButton}>
                  <Text style={styles.trackButtonText}>Track Order</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.orderAgainButton}>
                  <Text style={styles.orderAgainButtonText}>Order Again</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* Recent Orders Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          
          {/* Filter Tabs */}
          <View style={styles.filterTabs}>
            {['All', 'Completed', 'Cancelled'].map(tab => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.filterTab,
                  selectedTab === tab && styles.activeFilterTab
                ]}
                onPress={() => setSelectedTab(tab)}
              >
                <Text style={[
                  styles.filterTabText,
                  selectedTab === tab && styles.activeFilterTabText
                ]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Orders Grid */}
          <View style={styles.ordersGrid}>
            {filteredOrders.map((order, index) => (
              <View key={order.key} style={styles.orderCard}>
                <Image source={order.image} style={styles.orderImage} />
                
                <View style={styles.orderInfo}>
                  <Text style={styles.orderName}>{order.name}</Text>
                  <Text style={styles.orderRestaurant}>
                    {order.restaurant} • {order.location}
                  </Text>
                  <Text style={styles.orderPrice}>{order.price}</Text>
                </View>
                
                <TouchableOpacity style={styles.reorderButton}>
                  <Text style={styles.reorderButtonText}>Order Again</Text>
                </TouchableOpacity>
              </View>
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
  section: {
    backgroundColor: '#fff',
    marginTop: 12,
    paddingVertical: 16, // Reduced from 20
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    paddingHorizontal: 20,
    marginBottom: 12, // Reduced from 16
  },
  currentOrderCard: {
    marginHorizontal: 20,
    borderRadius: 12, // Reduced from 16
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  currentOrderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentOrderImage: {
    width: 80, // Much smaller than before (was full width with 180 height)
    height: 80,
    borderRadius: 8,
    margin: 12,
    backgroundColor: '#f0f0f0',
  },
  bestsellerTag: {
    position: 'absolute',
    top: 8, // Reduced from 12
    left: 8, // Reduced from 12
    backgroundColor: '#FCA652',
    paddingHorizontal: 6, // Reduced from 8
    paddingVertical: 3, // Reduced from 4
    borderRadius: 4, // Reduced from 6
  },
  bestsellerText: {
    color: '#fff',
    fontSize: 10, // Reduced from 12
    fontWeight: 'bold',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8, // Reduced from 12
    right: 8, // Reduced from 12
    width: 28, // Reduced from 36
    height: 28, // Reduced from 36
    borderRadius: 14, // Reduced from 18
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  currentOrderInfo: {
    flex: 1,
    paddingRight: 12,
    paddingVertical: 12,
  },
  currentOrderName: {
    fontSize: 16, // Reduced from 20
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 3, // Reduced from 4
  },
  currentOrderRestaurant: {
    fontSize: 12, // Reduced from 14
    color: '#666',
    marginBottom: 4, // Reduced from 8
  },
  currentOrderPrice: {
    fontSize: 14, // Reduced from 18
    fontWeight: 'bold',
    color: '#FCA652',
    marginBottom: 4, // Reduced from 8
  },
  orderTimeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderTimeText: {
    fontSize: 12, // Reduced from 14
    color: '#666',
    marginLeft: 3, // Reduced from 4
  },
  currentOrderButtons: {
    flexDirection: 'row',
    paddingHorizontal: 12, // Reduced from 16
    paddingBottom: 12, // Reduced from 16
    gap: 8, // Reduced from 12
  },
  trackButton: {
    flex: 1,
    backgroundColor: '#FCA652',
    paddingVertical: 8, // Reduced from 12
    borderRadius: 6, // Reduced from 8
    alignItems: 'center',
  },
  trackButtonText: {
    color: '#fff',
    fontSize: 14, // Reduced from 16
    fontWeight: 'bold',
  },
  orderAgainButton: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 8, // Reduced from 12
    borderRadius: 6, // Reduced from 8
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FCA652',
  },
  orderAgainButtonText: {
    color: '#FCA652',
    fontSize: 14, // Reduced from 16
    fontWeight: 'bold',
  },
  filterTabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 12, // Reduced from 20
    gap: 8, // Reduced from 12
  },
  filterTab: {
    paddingHorizontal: 16, // Reduced from 20
    paddingVertical: 6, // Reduced from 8
    borderRadius: 16, // Reduced from 20
    borderWidth: 1,
    borderColor: '#FCA652',
    backgroundColor: '#fff',
  },
  activeFilterTab: {
    backgroundColor: '#FCA652',
  },
  filterTabText: {
    fontSize: 12, // Reduced from 14
    fontWeight: '600',
    color: '#FCA652',
  },
  activeFilterTabText: {
    color: '#fff',
  },
  ordersGrid: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  orderCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 8, // Reduced from 12
    marginBottom: 8, // Reduced from 16
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 }, // Reduced shadow
    shadowOpacity: 0.08, // Reduced shadow
    shadowRadius: 2, // Reduced shadow
    elevation: 1, // Reduced shadow
    overflow: 'hidden',
  },
  orderImage: {
    width: '100%',
    height: 80, // Reduced from 120
    backgroundColor: '#f0f0f0',
  },
  orderInfo: {
    padding: 8, // Reduced from 12
  },
  orderName: {
    fontSize: 14, // Reduced from 16
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2, // Reduced from 4
  },
  orderRestaurant: {
    fontSize: 11, // Reduced from 12
    color: '#666',
    marginBottom: 4, // Reduced from 8
  },
  orderPrice: {
    fontSize: 13, // Reduced from 14
    fontWeight: 'bold',
    color: '#FCA652',
    marginBottom: 6, // Reduced from 12
  },
  reorderButton: {
    marginHorizontal: 8, // Reduced from 12
    marginBottom: 8, // Reduced from 12
    paddingVertical: 6, // Reduced from 8
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FCA652',
    borderRadius: 4, // Reduced from 6
    alignItems: 'center',
  },
  reorderButtonText: {
    color: '#FCA652',
    fontSize: 11, // Reduced from 12
    fontWeight: '600',
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

export default OrdersScreen;