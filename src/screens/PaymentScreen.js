import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';

const PaymentScreen = ({ navigation }) => {
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  });

  const [savedCards, setSavedCards] = useState([
    {
      id: 1,
      type: 'visa',
      lastFour: '4532',
      expiryMonth: '12',
      expiryYear: '26',
      cardholderName: 'Esther Howard',
      isDefault: true,
    },
    {
      id: 2,
      type: 'mastercard',
      lastFour: '8901',
      expiryMonth: '08',
      expiryYear: '25',
      cardholderName: 'Esther Howard',
      isDefault: false,
    },
  ]);

  const [walletBalance] = useState(250.00);

  const digitalWallets = [
    {
      id: 'paytm',
      name: 'Paytm',
      icon: 'wallet',
      color: '#00BAF2',
      connected: true,
    },
    {
      id: 'phonepe',
      name: 'PhonePe',
      icon: 'cellphone',
      color: '#5F259F',
      connected: false,
    },
    {
      id: 'googlepay',
      name: 'Google Pay',
      icon: 'google-pay',
      color: '#4285F4',
      connected: true,
    },
    {
      id: 'amazonpay',
      name: 'Amazon Pay',
      icon: 'amazon',
      color: '#FF9900',
      connected: false,
    },
  ];

  const getCardIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'visa':
        return 'credit-card-outline';
      case 'mastercard':
        return 'credit-card-outline';
      case 'amex':
        return 'credit-card-outline';
      default:
        return 'credit-card-outline';
    }
  };

  const getCardColor = (type) => {
    switch (type.toLowerCase()) {
      case 'visa':
        return '#1A1F71';
      case 'mastercard':
        return '#EB001B';
      case 'amex':
        return '#006FCF';
      default:
        return '#333';
    }
  };

  const handleAddCard = () => {
    if (!cardData.cardNumber || !cardData.expiryDate || !cardData.cvv || !cardData.cardholderName) {
      Alert.alert('Error', 'Please fill in all card details');
      return;
    }

    const newCard = {
      id: savedCards.length + 1,
      type: 'visa', // You can detect card type based on card number
      lastFour: cardData.cardNumber.slice(-4),
      expiryMonth: cardData.expiryDate.split('/')[0],
      expiryYear: cardData.expiryDate.split('/')[1],
      cardholderName: cardData.cardholderName,
      isDefault: false,
    };

    setSavedCards([...savedCards, newCard]);
    setCardData({ cardNumber: '', expiryDate: '', cvv: '', cardholderName: '' });
    setShowAddCardModal(false);
    Alert.alert('Success', 'Card added successfully!');
  };

  const handleDeleteCard = (cardId) => {
    Alert.alert(
      'Delete Card',
      'Are you sure you want to remove this card?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setSavedCards(savedCards.filter(card => card.id !== cardId));
          },
        },
      ]
    );
  };

  const handleSetDefaultCard = (cardId) => {
    setSavedCards(cards =>
      cards.map(card => ({
        ...card,
        isDefault: card.id === cardId,
      }))
    );
  };

  const formatCardNumber = (text) => {
    const cleaned = text.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = cleaned.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return cleaned;
    }
  };

  const formatExpiryDate = (text) => {
    const cleaned = text.replace(/[^0-9]/gi, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
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
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Wallet Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Wallet Balance</Text>
          <View style={styles.walletContainer}>
            <View style={styles.walletIconContainer}>
              <MaterialCommunityIcons name="wallet" size={32} color={colors.primary} />
            </View>
            <View style={styles.walletContent}>
              <Text style={styles.walletBalance}>₹{walletBalance.toFixed(2)}</Text>
              <Text style={styles.walletDescription}>Available Balance</Text>
            </View>
            <TouchableOpacity style={styles.addMoneyButton}>
              <Text style={styles.addMoneyText}>Add Money</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Saved Cards Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Saved Cards</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowAddCardModal(true)}
            >
              <MaterialCommunityIcons name="plus" size={20} color={colors.primary} />
              <Text style={styles.addButtonText}>Add Card</Text>
            </TouchableOpacity>
          </View>

          {savedCards.map((card) => (
            <View key={card.id} style={styles.cardItem}>
              <View style={styles.cardInfo}>
                <View style={[styles.cardIconContainer, { backgroundColor: `${getCardColor(card.type)}15` }]}>
                  <MaterialCommunityIcons 
                    name={getCardIcon(card.type)} 
                    size={24} 
                    color={getCardColor(card.type)} 
                  />
                </View>
                <View style={styles.cardDetails}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardType}>{card.type.toUpperCase()}</Text>
                    {card.isDefault && (
                      <View style={styles.defaultBadge}>
                        <Text style={styles.defaultText}>Default</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.cardNumber}>**** **** **** {card.lastFour}</Text>
                  <Text style={styles.cardExpiry}>Expires {card.expiryMonth}/{card.expiryYear}</Text>
                  <Text style={styles.cardholderName}>{card.cardholderName}</Text>
                </View>
              </View>
              
              <View style={styles.cardActions}>
                {!card.isDefault && (
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleSetDefaultCard(card.id)}
                  >
                    <MaterialCommunityIcons name="star-outline" size={20} color="#666" />
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleDeleteCard(card.id)}
                >
                  <MaterialCommunityIcons name="delete-outline" size={20} color="#ff4757" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Digital Wallets Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Digital Wallets</Text>
          {digitalWallets.map((wallet) => (
            <View key={wallet.id} style={styles.walletItem}>
              <View style={[styles.walletIconContainer, { backgroundColor: `${wallet.color}15` }]}>
                <MaterialCommunityIcons name={wallet.icon} size={24} color={wallet.color} />
              </View>
              <View style={styles.walletItemContent}>
                <Text style={styles.walletName}>{wallet.name}</Text>
                <Text style={styles.walletStatus}>
                  {wallet.connected ? 'Connected' : 'Not Connected'}
                </Text>
              </View>
              <TouchableOpacity style={styles.connectButton}>
                <Text style={[
                  styles.connectButtonText,
                  { color: wallet.connected ? '#666' : colors.primary }
                ]}>
                  {wallet.connected ? 'Disconnect' : 'Connect'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Other Payment Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Other Payment Methods</Text>
          
          <TouchableOpacity style={styles.paymentMethodItem}>
            <MaterialCommunityIcons name="bank" size={24} color="#666" style={styles.paymentMethodIcon} />
            <View style={styles.paymentMethodContent}>
              <Text style={styles.paymentMethodTitle}>Net Banking</Text>
              <Text style={styles.paymentMethodDescription}>Pay using your bank account</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.paymentMethodItem}>
            <MaterialCommunityIcons name="qrcode-scan" size={24} color="#666" style={styles.paymentMethodIcon} />
            <View style={styles.paymentMethodContent}>
              <Text style={styles.paymentMethodTitle}>UPI</Text>
              <Text style={styles.paymentMethodDescription}>Pay using UPI ID or QR code</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.paymentMethodItem}>
            <MaterialCommunityIcons name="cash" size={24} color="#666" style={styles.paymentMethodIcon} />
            <View style={styles.paymentMethodContent}>
              <Text style={styles.paymentMethodTitle}>Cash on Delivery</Text>
              <Text style={styles.paymentMethodDescription}>Pay with cash upon delivery</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Add Card Modal */}
      <Modal
        visible={showAddCardModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAddCardModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Card</Text>
              <TouchableOpacity
                onPress={() => setShowAddCardModal(false)}
                style={styles.closeButton}
              >
                <MaterialCommunityIcons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContent}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Card Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="1234 5678 9012 3456"
                  value={cardData.cardNumber}
                  onChangeText={(text) => setCardData({...cardData, cardNumber: formatCardNumber(text)})}
                  keyboardType="numeric"
                  maxLength={19}
                />
              </View>

              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                  <Text style={styles.inputLabel}>Expiry Date</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="MM/YY"
                    value={cardData.expiryDate}
                    onChangeText={(text) => setCardData({...cardData, expiryDate: formatExpiryDate(text)})}
                    keyboardType="numeric"
                    maxLength={5}
                  />
                </View>

                <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
                  <Text style={styles.inputLabel}>CVV</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="123"
                    value={cardData.cvv}
                    onChangeText={(text) => setCardData({...cardData, cvv: text.replace(/[^0-9]/g, '')})}
                    keyboardType="numeric"
                    maxLength={4}
                    secureTextEntry
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Cardholder Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="John Doe"
                  value={cardData.cardholderName}
                  onChangeText={(text) => setCardData({...cardData, cardholderName: text})}
                />
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowAddCardModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleAddCard}
              >
                <Text style={styles.saveButtonText}>Add Card</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 34,
  },
  section: {
    backgroundColor: colors.white,
    marginBottom: 15,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '500',
    marginLeft: 5,
  },
  walletContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  walletIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: `${colors.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  walletContent: {
    flex: 1,
  },
  walletBalance: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  walletDescription: {
    fontSize: 14,
    color: '#666',
  },
  addMoneyButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  addMoneyText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  cardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  cardDetails: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardType: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginRight: 8,
  },
  defaultBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  defaultText: {
    fontSize: 10,
    color: colors.white,
    fontWeight: '600',
  },
  cardNumber: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
    fontFamily: 'monospace',
  },
  cardExpiry: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  cardholderName: {
    fontSize: 12,
    color: '#999',
  },
  cardActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  walletItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  walletItemContent: {
    flex: 1,
    marginLeft: 15,
  },
  walletName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  walletStatus: {
    fontSize: 12,
    color: '#666',
  },
  connectButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  connectButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  paymentMethodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  paymentMethodIcon: {
    marginRight: 15,
    width: 24,
  },
  paymentMethodContent: {
    flex: 1,
  },
  paymentMethodTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  paymentMethodDescription: {
    fontSize: 14,
    color: '#666',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  modalContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  modalFooter: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  saveButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 10,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
});

export default PaymentScreen;