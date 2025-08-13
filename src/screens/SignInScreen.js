import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import logoImg from '../../assets/images/logo.png'; // Adjust the path as necessary
import { Image } from 'react-native';
import { colors } from '../styles/colors';

const SignInScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('email');
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContinue = () => {
    // Handle login logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.primary} />
      <View style={styles.header}>
        <Image
          source={logoImg}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <KeyboardAvoidingView
        style={styles.formContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
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
        {/* Remember Me & Forgot Password */}
        <View style={styles.optionsRow}>
          <TouchableOpacity
            style={styles.rememberMeContainer}
            onPress={() => setRememberMe(!rememberMe)}
          >
            <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
              {rememberMe && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.rememberMeText}>Remember me</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {/* handle forgot password */ }}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
        {/* Continue Button */}
        <CustomButton
          title="Continue"
          onPress={() => navigation.navigate('MainApp')}
          variant="primary"
          style={styles.continueButton}
        />
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
    height: 380,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingTop: 0,
    paddingHorizontal: 0,
  },
  appTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.black,
    textAlign: 'center',
    marginBottom: 0,
    letterSpacing: -1,
  },
  formContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 64,
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
  logo: {
    width: 200,
    height: 200,
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
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  rememberMeText: {
    fontSize: 14,
    color: '#333',
  },
  forgotText: {
    fontSize: 14,
    color: '#666',
  },
  continueButton: {
    marginBottom: 20,
  },
});

export default SignInScreen;