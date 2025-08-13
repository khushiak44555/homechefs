import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';

const FAQScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState({});

  const faqData = [
    {
      id: 1,
      category: 'Orders',
      question: 'How can I track my order?',
      answer: 'You can track your order by going to "Past Orders" in your profile or by clicking the tracking link sent to your email/SMS. Real-time updates will show your order status from preparation to delivery.'
    },
    {
      id: 2,
      category: 'Orders',
      question: 'Can I cancel my order?',
      answer: 'Orders can be cancelled within 5 minutes of placing them. After that, cancellation depends on the restaurant\'s policy. You can try cancelling from the order tracking screen.'
    },
    {
      id: 3,
      category: 'Orders',
      question: 'What if my order is delayed?',
      answer: 'If your order is delayed beyond the estimated time, you can contact customer support for assistance. We may offer compensation or help expedite your order.'
    },
    {
      id: 4,
      category: 'Payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit/debit cards, UPI, net banking, digital wallets like Paytm, PhonePe, Google Pay, and cash on delivery (where available).'
    },
    {
      id: 5,
      category: 'Payment',
      question: 'Is it safe to pay online?',
      answer: 'Yes, all online payments are processed through secure, encrypted channels. We use industry-standard security measures and never store your card details.'
    },
    {
      id: 6,
      category: 'Payment',
      question: 'How do refunds work?',
      answer: 'Refunds are processed within 3-7 business days to your original payment method. For cash payments, refunds are credited to your wallet or bank account.'
    },
    {
      id: 7,
      category: 'Delivery',
      question: 'What are your delivery hours?',
      answer: 'We deliver from 8:00 AM to 11:00 PM daily. Some restaurants may have different operating hours, which will be shown on their listing.'
    },
    {
      id: 8,
      category: 'Delivery',
      question: 'Do you charge delivery fees?',
      answer: 'Delivery fees vary by distance and restaurant. Many restaurants offer free delivery above a minimum order value. All fees are clearly shown before you place your order.'
    },
    {
      id: 9,
      category: 'Account',
      question: 'How do I change my delivery address?',
      answer: 'You can add or change your delivery address from the "Address" section in your profile, or during checkout when placing an order.'
    },
    {
      id: 10,
      category: 'Account',
      question: 'Can I delete my account?',
      answer: 'Yes, you can request account deletion by contacting customer support. Please note that this action cannot be undone and you\'ll lose all order history and wallet balance.'
    },
    {
      id: 11,
      category: 'General',
      question: 'How do I contact customer support?',
      answer: 'You can reach us via phone (+91 1800-123-4567), email (support@foodapp.com), live chat in the app, or WhatsApp. Our support team is available 24/7.'
    },
    {
      id: 12,
      category: 'General',
      question: 'Do you have a loyalty program?',
      answer: 'Yes! Our loyalty program rewards you with points for every order. You can redeem these points for discounts on future orders. Check the "Offers" section for more details.'
    }
  ];

  const categories = ['All', 'Orders', 'Payment', 'Delivery', 'Account', 'General'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const toggleExpanded = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredFAQs = faqData.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
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
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FAQ</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialCommunityIcons name="magnify" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for questions..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearchQuery('')}
            style={styles.clearButton}
          >
            <MaterialCommunityIcons name="close-circle" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      {/* Category Filter */}
      <View style={styles.categoryContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScrollContent}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.activeCategoryButton
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === category && styles.activeCategoryText
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* FAQ Items */}
        <View style={styles.section}>
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((item, index) => (
              <View key={item.id} style={styles.faqItem}>
                <TouchableOpacity
                  style={styles.questionContainer}
                  onPress={() => toggleExpanded(item.id)}
                >
                  <View style={styles.questionContent}>
                    <Text style={styles.categoryLabel}>{item.category}</Text>
                    <Text style={styles.questionText}>{item.question}</Text>
                  </View>
                  <MaterialCommunityIcons
                    name={expandedItems[item.id] ? "chevron-up" : "chevron-down"}
                    size={24}
                    color="#666"
                  />
                </TouchableOpacity>
                
                {expandedItems[item.id] && (
                  <View style={styles.answerContainer}>
                    <Text style={styles.answerText}>{item.answer}</Text>
                  </View>
                )}
              </View>
            ))
          ) : (
            <View style={styles.noResultsContainer}>
              <MaterialCommunityIcons name="help-circle-outline" size={64} color="#ccc" />
              <Text style={styles.noResultsTitle}>No results found</Text>
              <Text style={styles.noResultsText}>
                Try adjusting your search or browse different categories
              </Text>
            </View>
          )}
        </View>

        {/* Still Need Help Section */}
        <View style={styles.section}>
          <View style={styles.helpSection}>
            <MaterialCommunityIcons name="headset" size={48} color={colors.primary} />
            <Text style={styles.helpTitle}>Still need help?</Text>
            <Text style={styles.helpDescription}>
              Can't find what you're looking for? Our support team is here to help.
            </Text>
            <TouchableOpacity
              style={styles.contactButton}
              onPress={() => navigation.navigate('HelpScreen')}
            >
              <Text style={styles.contactButtonText}>Contact Support</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginHorizontal: 20,
    marginVertical: 15,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    marginLeft: 10,
  },
  categoryContainer: {
    backgroundColor: colors.white,
    paddingVertical: 10,
  },
  categoryScrollContent: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#f0f0f0',
  },
  activeCategoryButton: {
    backgroundColor: colors.primary,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeCategoryText: {
    color: colors.white,
  },
  section: {
    backgroundColor: colors.white,
    marginBottom: 15,
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  questionContent: {
    flex: 1,
  },
  categoryLabel: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 4,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  answerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 18,
    paddingTop: 0,
  },
  answerText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  noResultsContainer: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  helpSection: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  helpTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  helpDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  contactButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  contactButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FAQScreen;