import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';

const HelpScreen = ({ navigation }) => {
  const contactOptions = [
    {
      icon: 'phone-outline',
      title: 'Call Us',
      subtitle: '+91 1800-123-4567',
      description: '24/7 Customer Support',
      onPress: () => Linking.openURL('tel:+911800123456'),
    },
    {
      icon: 'email-outline',
      title: 'Email Support',
      subtitle: 'support@foodapp.com',
      description: 'We\'ll respond within 24 hours',
      onPress: () => Linking.openURL('mailto:support@foodapp.com'),
    },
    {
      icon: 'chat-outline',
      title: 'Live Chat',
      subtitle: 'Chat with our support team',
      description: 'Available 9 AM - 9 PM',
      onPress: () => {
        // Navigate to chat screen or open chat functionality
        console.log('Open live chat');
      },
    },
    {
      icon: 'whatsapp',
      title: 'WhatsApp',
      subtitle: '+91 9876543210',
      description: 'Quick support via WhatsApp',
      onPress: () => Linking.openURL('whatsapp://send?phone=919876543210'),
    },
  ];

  const helpTopics = [
    {
      icon: 'clipboard-list-outline',
      title: 'Order Issues',
      description: 'Problems with your order',
      onPress: () => navigation.navigate('OrderHelpScreen'),
    },
    {
      icon: 'credit-card-outline',
      title: 'Payment & Refunds',
      description: 'Payment problems and refund status',
      onPress: () => navigation.navigate('PaymentHelpScreen'),
    },
    {
      icon: 'account-outline',
      title: 'Account & Profile',
      description: 'Manage your account settings',
      onPress: () => navigation.navigate('AccountHelpScreen'),
    },
    {
      icon: 'truck-delivery-outline',
      title: 'Delivery Issues',
      description: 'Delivery related problems',
      onPress: () => navigation.navigate('DeliveryHelpScreen'),
    },
    {
      icon: 'silverware-fork-knife',
      title: 'Food Quality',
      description: 'Report food quality issues',
      onPress: () => navigation.navigate('QualityHelpScreen'),
    },
    {
      icon: 'gift-outline',
      title: 'Offers & Coupons',
      description: 'Issues with promotions',
      onPress: () => navigation.navigate('OffersHelpScreen'),
    },
  ];

  const quickActions = [
    {
      icon: 'history',
      title: 'Track Your Order',
      onPress: () => navigation.navigate('OrderTrackingScreen'),
    },
    {
      icon: 'refresh',
      title: 'Cancel Order',
      onPress: () => navigation.navigate('CancelOrderScreen'),
    },
    {
      icon: 'star-outline',
      title: 'Leave Feedback',
      onPress: () => navigation.navigate('FeedbackScreen'),
    },
  ];

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
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Contact Us Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <Text style={styles.sectionDescription}>
            Need immediate help? Choose your preferred way to reach us
          </Text>
          {contactOptions.map((option, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.contactItem}
              onPress={option.onPress}
            >
              <View style={styles.contactIconContainer}>
                <MaterialCommunityIcons 
                  name={option.icon} 
                  size={24} 
                  color={colors.primary}
                />
              </View>
              <View style={styles.contactContent}>
                <Text style={styles.contactTitle}>{option.title}</Text>
                <Text style={styles.contactSubtitle}>{option.subtitle}</Text>
                <Text style={styles.contactDescription}>{option.description}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#ccc" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          {quickActions.map((action, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.menuItem}
              onPress={action.onPress}
            >
              <MaterialCommunityIcons 
                name={action.icon} 
                size={22} 
                color="#666" 
                style={styles.menuIcon}
              />
              <Text style={styles.menuText}>{action.title}</Text>
              <MaterialIcons name="chevron-right" size={24} color="#ccc" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Help Topics Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Browse Help Topics</Text>
          {helpTopics.map((topic, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.helpTopicItem}
              onPress={topic.onPress}
            >
              <MaterialCommunityIcons 
                name={topic.icon} 
                size={24} 
                color="#666" 
                style={styles.helpTopicIcon}
              />
              <View style={styles.helpTopicContent}>
                <Text style={styles.helpTopicTitle}>{topic.title}</Text>
                <Text style={styles.helpTopicDescription}>{topic.description}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#ccc" />
            </TouchableOpacity>
          ))}
        </View>

        {/* FAQ Link */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.faqButton}
            onPress={() => navigation.navigate('FAQScreen')}
          >
            <MaterialCommunityIcons name="frequently-asked-questions" size={24} color={colors.primary} />
            <View style={styles.faqContent}>
              <Text style={styles.faqTitle}>Frequently Asked Questions</Text>
              <Text style={styles.faqDescription}>Find quick answers to common questions</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>
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
    marginBottom: 10,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  contactIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${colors.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  contactContent: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  contactSubtitle: {
    fontSize: 14,
    color: colors.primary,
    marginBottom: 2,
  },
  contactDescription: {
    fontSize: 12,
    color: '#666',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  menuIcon: {
    marginRight: 15,
    width: 22,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  helpTopicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  helpTopicIcon: {
    marginRight: 15,
    width: 24,
  },
  helpTopicContent: {
    flex: 1,
  },
  helpTopicTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  helpTopicDescription: {
    fontSize: 14,
    color: '#666',
  },
  faqButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 10,
  },
  faqContent: {
    flex: 1,
    marginLeft: 15,
  },
  faqTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  faqDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default HelpScreen;