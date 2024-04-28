import React, { useState } from 'react';
import { View, StyleSheet, StatusBar, Text, TextInput } from 'react-native';
import { globalHeader } from '../../../../styles_kit/globalHeader.js';
import MapContainer from './map.js';
import { FontAwesome5 } from '@expo/vector-icons';

const MAP_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const DonorExplore = () => {

  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
      <View style={styles.smallHeader}>
        <Text style={globalHeader.SmallHeaderTitle}>Explore</Text>
      </View>
      <View style={styles.searchBox}>
        <FontAwesome5 name="search" size={20} color="#E60965" style={styles.icon} />
        <TextInput
          style={styles.input}
          value={search}
          onChangeText={setSearch}
          placeholder="Search..."
          placeholderTextColor="#E60965"
        />
      </View>
      <MapContainer/>
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
    borderRadius: 20,
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
    marginLeft: 10
  },
});

export default DonorExplore;