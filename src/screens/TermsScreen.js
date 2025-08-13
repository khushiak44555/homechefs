import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';

const TermsScreen = ({ navigation }) => {
  const termsContent = [
    {
      title: '1. Acceptance of Terms',
      content: 'By accessing and using this food delivery application ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.'
    },
    {
      title: '2. Use License',
      content: 'Permission is granted to temporarily download one copy of the materials on our application for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:\n\n• modify or copy the materials\n• use the materials for any commercial purpose or for any public display\n• attempt to reverse engineer any software contained in our application\n• remove any copyright or other proprietary notations from the materials'
    },
    {
      title: '3. User Account',
      content: 'To access certain features of our Service, you may be required to create an account. You are responsible for:\n\n• Maintaining the confidentiality of your account and password\n• All activities that occur under your account\n• Providing accurate, current and complete information\n• Updating your information to keep it accurate and current\n\nYou agree to immediately notify us of any unauthorized use of your account.'
    },
    {
      title: '4. Food Orders and Delivery',
      content: 'When you place an order through our Service:\n\n• All orders are subject to availability and confirmation\n• Prices are subject to change without notice\n• We reserve the right to refuse or cancel any order\n• Delivery times are estimates and may vary due to various factors\n• You are responsible for providing accurate delivery information\n• Risk of loss passes to you upon delivery'
    },
    {
      title: '5. Payment Terms',
      content: 'Payment for orders must be made in full before delivery. We accept various payment methods including:\n\n• Credit and debit cards\n• Digital wallets\n• UPI payments\n• Cash on delivery (where available)\n\nAll prices include applicable taxes unless otherwise stated. Delivery charges, if any, will be clearly displayed before order confirmation.'
    },
    {
      title: '6. Cancellation and Refund Policy',
      content: 'Order cancellations:\n\n• Orders can be cancelled within 5 minutes of placement\n• Cancellation after preparation begins may incur charges\n• Refunds will be processed within 3-7 business days\n• Refund amount may be subject to cancellation charges\n\nFor food quality issues, please contact customer support within 24 hours of delivery for resolution.'
    },
    {
      title: '7. User Conduct',
      content: 'You agree not to use the Service to:\n\n• Violate any applicable laws or regulations\n• Provide false or misleading information\n• Interfere with the proper working of the Service\n• Attempt to gain unauthorized access to any portion of the Service\n• Harass, abuse, or harm delivery personnel or restaurant staff\n• Post or transmit any unlawful, harmful, or offensive content'
    },
    {
      title: '8. Privacy Policy',
      content: 'Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our Service. By using our Service, you agree to the collection and use of information in accordance with our Privacy Policy.'
    },
    {
      title: '9. Disclaimer',
      content: 'The information on this application is provided on an "as is" basis. To the fullest extent permitted by law, we exclude:\n\n• All representations, warranties, and conditions relating to our Service\n• All liability for any damages arising out of or in connection with your use of our Service\n\nThis includes, without limitation, direct loss, loss of business or profits, interruption of business, or any other commercial damages or losses.'
    },
    {
      title: '10. Limitations of Liability',
      content: 'In no event shall our company or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use our Service, even if we have been notified orally or in writing of the possibility of such damage.'
    },
    {
      title: '11. Accuracy of Materials',
      content: 'The materials appearing in our application could include technical, typographical, or photographic errors. We do not warrant that any of the materials on our Service are accurate, complete, or current. We may make changes to the materials contained in our Service at any time without notice.'
    },
    {
      title: '12. Links to Third-Party Services',
      content: 'Our Service may contain links to third-party websites or services that are not owned or controlled by us. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.'
    },
    {
      title: '13. Modifications to Terms',
      content: 'We reserve the right to revise these terms of service at any time without notice. By using our Service, you are agreeing to be bound by the then current version of these terms of service. We will notify users of any material changes to these terms through the application or email.'
    },
    {
      title: '14. Governing Law',
      content: 'These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.'
    },
    {
      title: '15. Contact Information',
      content: 'If you have any questions about these Terms of Service, please contact us at:\n\nEmail: legal@foodapp.com\nPhone: +91 1800-123-4567\nAddress: 123 Food Street, Mumbai, Maharashtra 400001, India'
    }
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
        <Text style={styles.headerTitle}>Terms of Service</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Introduction */}
        <View style={styles.section}>
          <Text style={styles.introTitle}>Terms of Service</Text>
          <Text style={styles.introText}>
            Welcome to our food delivery service. These terms and conditions outline the rules and regulations for the use of our application and services.
          </Text>
          <Text style={styles.lastUpdated}>Last updated: January 15, 2025</Text>
        </View>

        {/* Terms Content */}
        {termsContent.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionContent}>{section.content}</Text>
          </View>
        ))}

        {/* Agreement Section */}
        <View style={styles.section}>
          <View style={styles.agreementContainer}>
            <Text style={styles.agreementTitle}>Agreement</Text>
            <Text style={styles.agreementText}>
              By using our food delivery service, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </Text>
          </View>
        </View>

        {/* Contact Section */}
        <View style={styles.section}>
          <View style={styles.contactContainer}>
            <Text style={styles.contactTitle}>Questions?</Text>
            <Text style={styles.contactText}>
              If you have any questions about these Terms of Service, please don't hesitate to contact our support team.
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
  section: {
    backgroundColor: colors.white,
    marginBottom: 15,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  introText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  lastUpdated: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  sectionContent: {
    fontSize: 15,
    color: '#666',
    lineHeight: 24,
    textAlign: 'justify',
  },
  agreementContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  agreementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  agreementText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  contactContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  contactText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 20,
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

export default TermsScreen;