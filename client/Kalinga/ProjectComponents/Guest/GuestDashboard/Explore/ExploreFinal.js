import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, StatusBar, Text, TextInput, TouchableOpacity } from 'react-native';
import { globalHeader } from '../../../../styles_kit/globalHeader.js';
import MapContainer from './map.js';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Location from 'expo-location';

const GuestExplore = () => {
  

  const [search, setSearch] = useState('');
  const [initialLocation, setInitialLocation] = useState(null);

  useEffect(() => {
    const fetchInitialLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Permission to access location was denied');
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setInitialLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        });
      } catch (error) {
        console.error('Error fetching initial location:', error);
      }
    };

   

    fetchInitialLocation();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
      <View style={globalHeader.SmallHeader}>
        <Text style={globalHeader.SmallHeaderTitle}>Explore</Text>
      </View>
      <MapContainer initialLocation={initialLocation} />
    </View>
  );
};

const styles = StyleSheet.create({
  smallHeader: {
    backgroundColor: '#E60965',
    borderRadius: 34,
    paddingTop: '12%',
    paddingBottom: '5%',
    marginTop: '-10%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 1
  },
  container: {
    flex: 1,
  },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE7DA',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginTop: 10,
    marginHorizontal: "7%",
    borderWidth: 1,
    borderColor: "#E60965",
    borderRadius: 15,
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    backgroundColor: '#FFE7DA',
    height: 50,
    fontSize: 15,
    color: "#E60965",
  },
  icon: {
    marginRight: 10
  },
});

export default GuestExplore;
