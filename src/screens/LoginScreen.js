import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Dimensions,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import { colors } from '../styles/colors';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const handleNumberLogin = () => {
    navigation.navigate('Register', { registrationType: 'phone' });
  };

  const handleEmailLogin = () => {
    navigation.navigate('Register', { registrationType: 'email' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.primary} />
      
      {/* Logo Circle Container */}
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          {/* Replace this Image source with your actual logo path */}
          <Image 
            source={require('../../assets/images/logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Content Section */}
      <View style={styles.contentContainer}>
        <Text style={styles.appTitle}>HomeChefs</Text>
        <Text style={styles.subtitle}>Home cooked foods, delivered in a click!</Text>

        {/* Buttons Container */}
        <View style={styles.buttonsContainer}>
          <CustomButton
            title="Login with Number"
            onPress={handleNumberLogin}
            variant="primary"
            style={styles.button}
          />
          
          <CustomButton
            title="Login with Email"
            onPress={handleEmailLogin}
            variant="secondary"
            style={styles.button}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  logoContainer: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  logoCircle: {
    width: width * 0.65,
    height: width * 0.65,
    borderRadius: (width * 0.65) / 2,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  logo: {
    width: '80%',
    height: '80%',
  },
  contentContainer: {
    flex: 0.4,
    paddingHorizontal: 24,
    justifyContent: 'flex-start',
    paddingTop: 40,
  },
  appTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.black,
    textAlign: 'left',
    marginBottom: 8,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 16,
    color: colors.darkText,
    textAlign: 'left',
    marginBottom: 40,
    opacity: 0.8,
  },
  buttonsContainer: {
    width: '100%',
  },
  button: {
    marginVertical: 6,
  },
});

export default LoginScreen;