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

// Mock data for offers
const limitedTimeOffers = [
  {
    id: 1,
    title: '20% Off on All Orders Over $50',
    category: 'All Foods',
    image: require('../../assets/images/offer-1.jpg'),
    backgroundColor: '#e8f5e8',
  },
  {
    id: 2,
    title: 'Buy One Pizza, Get One Free',
    category: 'Pizza',
    image: require('../../assets/images/offer-2.jpg'),
    backgroundColor: '#fff3e0',
  },
];

const otherOffers = [
  {
    id: 1,
    title: 'Taco Tuesday',
    description: 'Get 3 tacos for the price of 2 every Tuesday.',
    code: 'TACOS10',
  },
  {
    id: 2,
    title: 'Burger Night',
    description: 'Every Thursday, enjoy any gourmet burger at half price.',
    code: 'BURGER10',
  },
  {
    id: 3,
    title: 'Family Feast Combo',
    description: 'Get a family-sized pizza, garlic bread, and a 2-liter soda for just $29.99.',
    code: 'FAMILY29',
  },
  {
    id: 4,
    title: 'Lunch Combo',
    description: 'Enjoy a sandwich, chips, and a drink for only $9.99.',
    code: 'LUNCH09',
  },
  {
    id: 5,
    title: '10% Student Discount',
    description: 'Show your student ID and get 10% off your order.',
    code: 'STUDENT10',
  },
  {
    id: 6,
    title: 'First Order Discount',
    description: 'New to our platform? Get $10 off your first order.',
    code: 'WELCOME10',
  },
  {
    id: 7,
    title: 'Happy Hour',
    description: 'From 4 PM to 6 PM, enjoy 50% off appetizers and select beverages.',
    code: 'HAPPYHOUR',
  },
];

const OffersScreen = ({ navigation }) => {
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
        <Text style={styles.headerTitle}>Offers</Text>
        <TouchableOpacity style={styles.menuButton}>
          <MaterialIcons name="more-vert" size={24} color="#222" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Limited Time Offers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Limited Time Offers</Text>
          
          <View style={styles.limitedOffersContainer}>
            {limitedTimeOffers.map((offer) => (
              <TouchableOpacity key={offer.id} style={[styles.limitedOfferCard, { backgroundColor: offer.backgroundColor }]}>
                <Image source={offer.image} style={styles.limitedOfferImage} />
                <View style={styles.limitedOfferContent}>
                  <View style={styles.categoryTag}>
                    <Text style={styles.categoryTagText}>{offer.category}</Text>
                  </View>
                  <Text style={styles.limitedOfferTitle}>{offer.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Other Offers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Other Offers</Text>
          
          {otherOffers.map((offer) => (
            <TouchableOpacity key={offer.id} style={styles.offerCard}>
              <View style={styles.offerIcon}>
                <Image 
                  source={require('../../assets/images/offer-3.jpg')} 
                  style={styles.offerIconImage}
                />
              </View>
              
              <View style={styles.offerContent}>
                <Text style={styles.offerTitle}>{offer.title}</Text>
                <Text style={styles.offerDescription}>{offer.description}</Text>
                
                <View style={styles.codeContainer}>
                  <Text style={styles.useCodeText}>Use Code</Text>
                  <MaterialIcons name="chevron-right" size={16} color="#666" />
                  <View style={styles.codeTag}>
                    <Text style={styles.codeText}>{offer.code}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  limitedOffersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  limitedOfferCard: {
    flex: 1,
    borderRadius: 12, // Reduced from 16
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 }, // Reduced shadow
    shadowOpacity: 0.08, // Reduced shadow
    shadowRadius: 2, // Reduced shadow
    elevation: 1, // Reduced shadow
  },
  limitedOfferImage: {
    width: '100%',
    height: 80, // Reduced from 120
    backgroundColor: '#f0f0f0',
  },
  limitedOfferContent: {
    padding: 10, // Reduced from 16
  },
  categoryTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 6, // Reduced from 8
    paddingVertical: 3, // Reduced from 4
    borderRadius: 10, // Reduced from 12
    marginBottom: 6, // Reduced from 8
  },
  categoryTagText: {
    color: '#fff',
    fontSize: 10, // Reduced from 12
    fontWeight: '600',
  },
  limitedOfferTitle: {
    fontSize: 12, // Reduced from 14
    fontWeight: 'bold',
    color: '#222',
    lineHeight: 16, // Reduced from 20
  },
  offerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  offerIcon: {
    width: 30, // Reduced from 60
    height: 30, // Reduced from 60
    borderRadius: 10, // Reduced from 12
    backgroundColor: '#fff3e0',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 12,
    overflow: 'hidden',
  },
  offerIconImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  offerContent: {
    flex: 1,
    paddingRight: 16,
    paddingVertical: 12,
  },
  offerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  offerDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    marginBottom: 8,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  useCodeText: {
    fontSize: 13,
    color: '#666',
    marginRight: 4,
  },
  codeTag: {
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 4,
  },
  codeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
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

export default OffersScreen;