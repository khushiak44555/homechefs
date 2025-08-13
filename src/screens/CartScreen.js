import React, { useState, useEffect  } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';

const cartItems = [
  {
    key: 'chicken_burger',
    name: 'Chicken Burger',
    restaurant: 'Gourmet Griddle',
    description: 'Juicy grilled chicken with fresh lettuce',
    price: 12.99,
    quantity: 2,
    image: require('../../assets/images/burger.jpg'),
    isVeg: false,
  },
  {
    key: 'margherita_pizza',
    name: 'Margherita Pizza',
    restaurant: 'Urban Eats & Treats',
    description: 'Fresh mozzarella, tomatoes, basil',
    price: 14.99,
    quantity: 1,
    image: require('../../assets/images/category-pizza.jpg'),
    isVeg: true,
  },
  {
    key: 'alfredo_pasta',
    name: 'Creamy Alfredo Pasta',
    restaurant: 'Gourmet Griddle',
    description: 'Rich and creamy alfredo sauce',
    price: 16.99,
    quantity: 1,
    image: require('../../assets/images/burger.jpg'),
    isVeg: false,
  },
];

const defaultAddresses = [
  {
    key: 'home',
    type: 'Home',
    icon: 'home',
    address: '123 Main Street, Mangalore',
    completeAddress: '123 Main Street, Mangalore, Karnataka 575002',
    time: '15-20 min',
    displayName: 'Home',
    phoneNumber: '9876543210',
  },

];

const CartScreen = ({ navigation, route }) => {
  const [items, setItems] = useState(cartItems);
  const [promoCode, setPromoCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('home');
  const [savedAddresses, setSavedAddresses] = useState(defaultAddresses);

  // Handle address updates from location picker flow
  useEffect(() => {
    if (route.params?.selectedAddress) {
      const newAddress = route.params.selectedAddress;
      
      // Add to saved addresses if it doesn't exist
      setSavedAddresses(prev => {
        const exists = prev.find(addr => addr.key === newAddress.key || addr.id === newAddress.id);
        if (!exists) {
          return [...prev, {
            ...newAddress,
            key: newAddress.id || newAddress.key || Date.now().toString(),
            time: '15-25 min', // Default delivery time
          }];
        }
        return prev.map(addr => 
          (addr.key === newAddress.key || addr.id === newAddress.id) ? {
            ...addr,
            ...newAddress,
            time: addr.time, // Keep existing time
          } : addr
        );
      });

      // Set as selected address
      setSelectedAddress(newAddress.key || newAddress.id || Date.now().toString());
      
      // Clear the route params
      navigation.setParams({ selectedAddress: null });
    }
  }, [route.params?.selectedAddress]);

  const updateQuantity = (itemKey, change) => {
    setItems(prevItems =>
      prevItems.map(item => {
        if (item.key === itemKey) {
          const newQuantity = Math.max(0, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  const removeItem = (itemKey) => {
    setItems(prevItems => prevItems.filter(item => item.key !== itemKey));
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'save20') {
      setIsPromoApplied(true);
      Alert.alert('Success!', 'Promo code applied successfully');
    } else {
      Alert.alert('Invalid Code', 'Please enter a valid promo code');
    }
  };

  const handleChangeAddress = () => {
    // Navigate to location picker
    navigation.navigate('LocationPickerScreen', { fromCart: true });
  };

  const handleAddressSelection = (addressKey) => {
    setSelectedAddress(addressKey);
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = isPromoApplied ? subtotal * 0.2 : 0;
  const deliveryFee = subtotal > 25 ? 0 : 2.99;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + deliveryFee + tax;

  const currentAddress = savedAddresses.find(addr => addr.key === selectedAddress) || savedAddresses[0];

  if (items.length === 0) {
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
          <Text style={styles.headerTitle}>My Cart</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Empty Cart */}
        <View style={styles.emptyCart}>
          <MaterialCommunityIcons name="cart-outline" size={100} color="#ccc" />
          <Text style={styles.emptyCartTitle}>Your cart is empty</Text>
          <Text style={styles.emptyCartSubtitle}>Add some delicious items to get started</Text>
          <TouchableOpacity 
            style={styles.browseButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.browseButtonText}>Browse Menu</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

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
        <Text style={styles.headerTitle}>My Cart</Text>
        <TouchableOpacity style={styles.clearButton} onPress={() => setItems([])}>
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Delivery Address */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="location-on" size={20} color={colors.primary} />
            <Text style={styles.sectionTitle}>Delivery Address</Text>
            <TouchableOpacity onPress={handleChangeAddress}>
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          </View>
          
          {/* Current Selected Address */}
          <View style={styles.currentAddressContainer}>
            <View style={styles.addressOption}>
              <View style={styles.addressLeft}>
                <View style={styles.selectedAddressIcon}>
                  <MaterialCommunityIcons 
                    name={currentAddress?.icon || 'home'} 
                    size={18} 
                    color="#fff"
                  />
                </View>
                <View style={styles.addressInfo}>
                  <Text style={styles.addressType}>
                    {currentAddress?.displayName || currentAddress?.type || 'Home'}
                  </Text>
                  <Text style={styles.addressText}>
                    {currentAddress?.completeAddress || currentAddress?.address || 'No address selected'}
                  </Text>
                  {currentAddress?.phoneNumber && (
                    <Text style={styles.addressPhone}>📞 {currentAddress.phoneNumber}</Text>
                  )}
                </View>
              </View>
              <Text style={styles.deliveryTime}>{currentAddress?.time || '15-20 min'}</Text>
            </View>
          </View>

          {/* Other Available Addresses */}
          {savedAddresses.length > 1 && (
            <View style={styles.otherAddressesContainer}>
              <Text style={styles.otherAddressesTitle}>Other Saved Addresses</Text>
              {savedAddresses
                .filter(addr => addr.key !== selectedAddress)
                .slice(0, 2) // Show max 2 other addresses
                .map(address => (
                  <TouchableOpacity
                    key={address.key}
                    style={styles.addressOption}
                    onPress={() => handleAddressSelection(address.key)}
                  >
                    <View style={styles.addressLeft}>
                      <View style={styles.addressIconContainer}>
                        <MaterialCommunityIcons 
                          name={address.icon} 
                          size={18} 
                          color={colors.primary} 
                        />
                      </View>
                      <View style={styles.addressInfo}>
                        <Text style={styles.addressType}>
                          {address.displayName || address.type}
                        </Text>
                        <Text style={styles.addressText} numberOfLines={1}>
                          {address.completeAddress || address.address}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.deliveryTime}>{address.time}</Text>
                  </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Add New Address Button */}
          <TouchableOpacity 
            style={styles.addAddressButton}
            onPress={handleChangeAddress}
          >
            <MaterialIcons name="add" size={20} color={colors.primary} />
            <Text style={styles.addAddressText}>Add New Address</Text>
          </TouchableOpacity>
        </View>

        {/* Cart Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Items</Text>
          
          {items.map(item => (
            <View key={item.key} style={styles.cartItem}>
              <Image source={item.image} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <View style={styles.itemHeader}>
                  <View style={styles.vegIndicator}>
                    <View style={[
                      styles.vegDot,
                      { backgroundColor: item.isVeg ? '#4CAF50' : '#F44336' }
                    ]} />
                  </View>
                  <TouchableOpacity onPress={() => removeItem(item.key)}>
                    <MaterialIcons name="close" size={20} color="#999" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemRestaurant}>{item.restaurant}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
                
                <View style={styles.itemFooter}>
                  <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                  <View style={styles.quantityControls}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => updateQuantity(item.key, -1)}
                    >
                      <MaterialIcons name="remove" size={18} color={colors.primary} />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => updateQuantity(item.key, 1)}
                    >
                      <MaterialIcons name="add" size={18} color={colors.primary} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Promo Code */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Promo Code</Text>
          <View style={styles.promoContainer}>
            <View style={styles.promoInputContainer}>
              <MaterialCommunityIcons name="ticket-percent" size={20} color={colors.primary} />
              <TextInput
                style={styles.promoInput}
                placeholder="Enter promo code"
                value={promoCode}
                onChangeText={setPromoCode}
                editable={!isPromoApplied}
              />
              {isPromoApplied && (
                <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
              )}
            </View>
            <TouchableOpacity
              style={[
                styles.applyButton,
                (isPromoApplied || !promoCode) && styles.disabledButton
              ]}
              onPress={applyPromoCode}
              disabled={isPromoApplied || !promoCode}
            >
              <Text style={[
                styles.applyButtonText,
                (isPromoApplied || !promoCode) && styles.disabledButtonText
              ]}>
                {isPromoApplied ? 'Applied' : 'Apply'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bill Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bill Summary</Text>
          <View style={styles.billContainer}>
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Subtotal</Text>
              <Text style={styles.billValue}>${subtotal.toFixed(2)}</Text>
            </View>
            {isPromoApplied && (
              <View style={styles.billRow}>
                <Text style={[styles.billLabel, { color: '#4CAF50' }]}>Discount (20%)</Text>
                <Text style={[styles.billValue, { color: '#4CAF50' }]}>-${discount.toFixed(2)}</Text>
              </View>
            )}
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Delivery Fee</Text>
              <Text style={styles.billValue}>
                {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
              </Text>
            </View>
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Tax</Text>
              <Text style={styles.billValue}>${tax.toFixed(2)}</Text>
            </View>
            <View style={styles.billDivider} />
            <View style={styles.billRow}>
              <Text style={styles.billTotalLabel}>Total</Text>
              <Text style={styles.billTotalValue}>${total.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <TouchableOpacity style={styles.paymentMethod}>
            <View style={styles.paymentLeft}>
              <MaterialIcons name="credit-card" size={20} color={colors.primary} />
              <Text style={styles.paymentText}>Credit/Debit Card</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="#999" />
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Checkout Button */}
      <View style={styles.checkoutContainer}>
        <View style={styles.checkoutInfo}>
          <Text style={styles.totalItems}>{items.length} items</Text>
          <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
        </View>
        <TouchableOpacity 
          style={styles.checkoutButton}
          onPress={() => navigation.navigate('CheckoutScreen', { 
            items, 
            total: total.toFixed(2),
            address: currentAddress
          })}
        >
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
          <MaterialIcons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
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
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#fee',
  },
  clearButtonText: {
    color: '#ff4444',
    fontSize: 14,
    fontWeight: '600',
  },
  placeholder: {
    width: 60,
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    flex: 1,
    marginLeft: 8,
  },
  changeText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  currentAddressContainer: {
    marginBottom: 12,
  },
  otherAddressesContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  otherAddressesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
  },
  addressOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  selectedAddress: {
    borderColor: colors.primary,
    backgroundColor: '#f8f9ff',
  },
  addressLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  addressIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  selectedAddressIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  addressInfo: {
    flex: 1,
  },
  addressType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  addressPhone: {
    fontSize: 12,
    color: colors.primary,
    marginTop: 4,
  },
  deliveryTime: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },
  addAddressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary,
    borderStyle: 'dashed',
    marginTop: 12,
  },
  addAddressText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  cartItem: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  vegIndicator: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vegDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  itemRestaurant: {
    fontSize: 12,
    color: colors.primary,
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  itemFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 6,
  },
  quantityButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
    marginHorizontal: 12,
  },
  promoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  promoInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  promoInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
    color: '#222',
  },
  applyButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  disabledButtonText: {
    color: '#999',
  },
  billContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  billLabel: {
    fontSize: 14,
    color: '#666',
  },
  billValue: {
    fontSize: 14,
    color: '#222',
    fontWeight: '600',
  },
  billDivider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 8,
  },
  billTotalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  billTotalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
  },
  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentText: {
    fontSize: 16,
    color: '#222',
    marginLeft: 12,
  },
  checkoutContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  checkoutInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  totalItems: {
    fontSize: 14,
    color: '#666',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  checkoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  emptyCart: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyCartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 20,
    marginBottom: 8,
  },
  emptyCartSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  browseButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 8,
  },
  browseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartScreen;