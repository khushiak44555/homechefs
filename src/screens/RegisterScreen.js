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
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import { colors } from '../styles/colors';

const RegisterScreen = ({ route, navigation }) => {
  const { registrationType } = route.params; // 'email' or 'phone'
  const [selectedTab, setSelectedTab] = useState(registrationType || 'email');
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [acceptedTerms, setAcceptedTerms] = useState(true);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContinue = () => {
    // Handle registration logic here
  };

  const handleSocialLogin = (provider) => {
    // Handle social login
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.primary} />
      {/* Orange Header with only App Name */}
      <View style={styles.header}>
        <Text style={styles.appTitle}>HomeChefs</Text>
      </View>
      {/* White Drawer/Form */}
      <KeyboardAvoidingView
        style={styles.formContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Text style={styles.registerTitle}>Register</Text>
        {/* Tab Switcher */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'email' ? styles.activeTab : styles.inactiveTab
            ]}
            onPress={() => setSelectedTab('email')}
          >
            <Text style={[
              styles.tabText,
              selectedTab === 'email' ? styles.activeTabText : styles.inactiveTabText
            ]}>
              Email
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'phone' ? styles.activeTab : styles.inactiveTab
            ]}
            onPress={() => setSelectedTab('phone')}
          >
            <Text style={[
              styles.tabText,
              selectedTab === 'phone' ? styles.activeTabText : styles.inactiveTabText
            ]}>
              Phone No.
            </Text>
          </TouchableOpacity>
        </View>
        {/* Email/Phone Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>
            {selectedTab === 'email' ? 'Email' : 'Phone No.'}
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder={selectedTab === 'email' ? 'Enter your email' : 'Enter your phone number'}
            placeholderTextColor="#999"
            value={selectedTab === 'email' ? formData.email : formData.phone}
            onChangeText={(text) => handleInputChange(selectedTab, text)}
            keyboardType={selectedTab === 'email' ? 'email-address' : 'phone-pad'}
            autoCapitalize="none"
          />
        </View>
        {/* Password Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter password"
            placeholderTextColor="#999"
            value={formData.password}
            onChangeText={(text) => handleInputChange('password', text)}
            secureTextEntry
          />
        </View>
        {/* Confirm Password Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter password"
            placeholderTextColor="#999"
            value={formData.confirmPassword}
            onChangeText={(text) => handleInputChange('confirmPassword', text)}
            secureTextEntry
          />
        </View>
        {/* Terms & Conditions Checkbox */}
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setAcceptedTerms(!acceptedTerms)}
        >
          <View style={[styles.checkbox, acceptedTerms && styles.checkboxChecked]}>
            {acceptedTerms && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.termsText}>I accept the terms & Condition</Text>
        </TouchableOpacity>
        {/* Continue Button */}
        <CustomButton
          title="Continue"
          onPress={() => navigation.navigate('Home')}
          variant="primary"
          style={styles.continueButton}
        />
        {/* Already Have an Account */}
        <View style={styles.loginTextContainer}>
          <Text style={styles.loginText}>
            Already Have an Account?{' '}
            <Text
  style={styles.loginLink}
  onPress={() => navigation.navigate('SignIn')}
>
  LogIn
</Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  header: {
    height: 120,
    justifyContent: 'center', // Center vertically
    alignItems: 'center',     // Center horizontally
    backgroundColor: colors.primary,
    paddingTop: 0,            // Remove extra top padding
    paddingHorizontal: 0,     // Remove horizontal padding
  },
  appTitle: {
    fontSize: 36,             // Bigger font size
    fontWeight: 'bold',
    color: colors.black,
    textAlign: 'center',      // Center text
    marginBottom: 0,
    letterSpacing: -1,
  },
  formContainer: {
    flex: 1,
    minHeight: '100%', // Ensure white covers entire area below header
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 0, // Remove extra bottom padding
    justifyContent: 'flex-start',
  },

  registerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.darkText,
    textAlign: 'center',
    marginBottom: 30,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    backgroundColor: 'transparent',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 25,
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  inactiveTab: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
  },
  activeTabText: {
    color: colors.white,
  },
  inactiveTabText: {
    color: colors.primary,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.darkText,
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: colors.white,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 4,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  checkboxChecked: {
    backgroundColor: '#333',
    borderColor: '#333',
  },
  checkmark: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  termsText: {
    fontSize: 14,
    color: '#666',
  },
  continueButton: {
    marginBottom: 20,
  },
  orText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  socialButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  // ...existing code...
  loginTextContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  loginText: {
    fontSize: 16,
    color: '#333',
  },
  loginLink: {
    color: colors.primary,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
// ...existing code...
});

export default RegisterScreen;
// ...existing code...