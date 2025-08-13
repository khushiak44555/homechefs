import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';

const addressTypes = [
  {
    key: 'home',
    label: 'Home',
    icon: 'home',
    subtitle: 'For all your orders',
  },
  {
    key: 'work',
    label: 'Work',
    icon: 'office-building',
    subtitle: 'Office, coworking space',
  },
  {
    key: 'other',
    label: 'Other',
    icon: 'map-marker',
    subtitle: 'Hotel, friend\'s house',
  },
];

const AddressDetailsScreen = ({ navigation, route }) => {
  // Provide default values to prevent the error
  const { 
    location = { fullAddress: 'Location not provided' },
    editAddress = null,
    fromCart = false,
    fromProfile = false 
  } = route?.params || {};
  
  const [formData, setFormData] = useState({
    selectedType: 'home',
    houseNumber: '',
    floor: '',
    building: '',
    landmark: '',
    phoneNumber: '',
    alternatePhone: '',
    instructions: '',
    nickname: '',
  });

  const [errors, setErrors] = useState({});

  // Populate form data if editing an existing address
  useEffect(() => {
    if (editAddress) {
      setFormData({
        selectedType: editAddress.type || 'home',
        houseNumber: editAddress.houseNumber || '',
        floor: editAddress.floor || '',
        building: editAddress.building || '',
        landmark: editAddress.landmark || '',
        phoneNumber: editAddress.phoneNumber?.replace('+91 ', '') || '',
        alternatePhone: editAddress.alternatePhone?.replace('+91 ', '') || '',
        instructions: editAddress.instructions || '',
        nickname: editAddress.nickname || editAddress.displayName || '',
      });
    }
  }, [editAddress]);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.houseNumber.trim()) {
      newErrors.houseNumber = 'House/Flat number is required';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveAddress = () => {
    if (!validateForm()) {
      return;
    }

    const completeAddress = {
      ...location,
      ...formData,
      id: editAddress?.id || Date.now(),
      type: formData.selectedType,
      displayName: formData.nickname || addressTypes.find(type => type.key === formData.selectedType)?.label,
      completeAddress: `${formData.houseNumber}${formData.building ? ', ' + formData.building : ''}${formData.floor ? ', Floor ' + formData.floor : ''}, ${location.fullAddress}`,
      phoneNumber: `+91 ${formData.phoneNumber}`,
      alternatePhone: formData.alternatePhone ? `+91 ${formData.alternatePhone}` : '',
    };

    const action = editAddress ? 'updated' : 'saved';
    
    Alert.alert(
      `Address ${action.charAt(0).toUpperCase() + action.slice(1)}!`,
      `Your address has been ${action} successfully.`,
      [
        {
          text: 'OK',
          onPress: () => {
            if (fromCart) {
              navigation.navigate('CartScreen', { selectedAddress: completeAddress });
            } else if (fromProfile) {
              navigation.navigate('AddressListScreen');
            } else {
              navigation.goBack();
            }
          },
        },
      ]
    );
  };

  const screenTitle = editAddress ? 'Edit Address' : 'Address Details';

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
        <Text style={styles.headerTitle}>{screenTitle}</Text>
        <View style={styles.placeholder} />
      </View>

      <KeyboardAvoidingView 
        style={styles.flex} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Selected Location */}
          <View style={styles.locationCard}>
            <View style={styles.locationHeader}>
              <MaterialIcons name="location-on" size={20} color={colors.primary} />
              <Text style={styles.locationTitle}>Selected Location</Text>
            </View>
            <Text style={styles.locationAddress}>{location.fullAddress}</Text>
          </View>

          {/* Address Type Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Save address as *</Text>
            <View style={styles.addressTypes}>
              {addressTypes.map(type => {
                const isSelected = formData.selectedType === type.key;
                return (
                  <TouchableOpacity
                    key={type.key}
                    style={[
                      styles.addressType,
                      isSelected && styles.selectedAddressType
                    ]}
                    onPress={() => updateField('selectedType', type.key)}
                  >
                    <MaterialCommunityIcons 
                      name={type.icon} 
                      size={24} 
                      color={isSelected ? colors.primary : '#999'} 
                    />
                    <Text style={[
                      styles.addressTypeLabel,
                      isSelected && styles.selectedAddressTypeLabel
                    ]}>
                      {type.label}
                    </Text>
                    <Text style={[
                      styles.addressTypeSubtitle,
                      isSelected && styles.selectedAddressTypeSubtitle
                    ]}>
                      {type.subtitle}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Address Details Form */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Complete Address</Text>
            
            {/* House/Flat Number */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>House/Flat Number *</Text>
              <TextInput
                style={[styles.textInput, errors.houseNumber && styles.errorInput]}
                placeholder="e.g., 101, A-23, etc."
                value={formData.houseNumber}
                onChangeText={(value) => updateField('houseNumber', value)}
              />
              {errors.houseNumber && (
                <Text style={styles.errorText}>{errors.houseNumber}</Text>
              )}
            </View>

            {/* Floor */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Floor (Optional)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g., 2nd Floor, Ground Floor"
                value={formData.floor}
                onChangeText={(value) => updateField('floor', value)}
              />
            </View>

            {/* Building Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Building/Society Name (Optional)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g., Sunshine Apartments"
                value={formData.building}
                onChangeText={(value) => updateField('building', value)}
              />
            </View>

            {/* Landmark */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nearby Landmark (Optional)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g., Near City Hospital"
                value={formData.landmark}
                onChangeText={(value) => updateField('landmark', value)}
              />
            </View>
          </View>

          {/* Contact Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Details</Text>
            
            {/* Phone Number */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Phone Number *</Text>
              <TextInput
                style={[styles.textInput, errors.phoneNumber && styles.errorInput]}
                placeholder="Enter 10-digit mobile number"
                value={formData.phoneNumber}
                onChangeText={(value) => updateField('phoneNumber', value)}
                keyboardType="phone-pad"
                maxLength={10}
              />
              {errors.phoneNumber && (
                <Text style={styles.errorText}>{errors.phoneNumber}</Text>
              )}
            </View>

            {/* Alternate Phone */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Alternate Phone (Optional)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter alternate number"
                value={formData.alternatePhone}
                onChangeText={(value) => updateField('alternatePhone', value)}
                keyboardType="phone-pad"
                maxLength={10}
              />
            </View>
          </View>

          {/* Additional Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Additional Information</Text>
            
            {/* Delivery Instructions */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Delivery Instructions (Optional)</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="e.g., Ring the bell twice, Call before delivery"
                value={formData.instructions}
                onChangeText={(value) => updateField('instructions', value)}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>

            {/* Address Nickname */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Save as (Optional)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g., Mom's House, Office Building"
                value={formData.nickname}
                onChangeText={(value) => updateField('nickname', value)}
              />
            </View>
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Save Button */}
        <View style={styles.saveButtonContainer}>
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={saveAddress}
          >
            <MaterialIcons name="save" size={20} color="#fff" />
            <Text style={styles.saveButtonText}>
              {editAddress ? 'Update Address' : 'Save Address'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  flex: {
    flex: 1,
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
  placeholder: {
    width: 32,
  },
  locationCard: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginLeft: 8,
  },
  locationAddress: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 20,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 16,
  },
  addressTypes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addressType: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#f8f9fa',
  },
  selectedAddressType: {
    borderColor: colors.primary,
    backgroundColor: '#f0f8ff',
  },
  addressTypeLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 8,
    marginBottom: 4,
  },
  selectedAddressTypeLabel: {
    color: colors.primary,
  },
  addressTypeSubtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  selectedAddressTypeSubtitle: {
    color: colors.primary,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#222',
    backgroundColor: '#fff',
  },
  textArea: {
    height: 80,
  },
  errorInput: {
    borderColor: '#ff4444',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 12,
    marginTop: 4,
  },
  saveButtonContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default AddressDetailsScreen;