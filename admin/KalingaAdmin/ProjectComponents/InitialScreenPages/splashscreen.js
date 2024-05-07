// SplashScreen.js

import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import KalingaSplashScreen from './../../assets/KalingaSplashScreen.png'

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
   
    const timer = setTimeout(() => {
      navigation.replace('Onboard');  
    }, 2000); 

    
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={KalingaSplashScreen} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
});

export default SplashScreen;
