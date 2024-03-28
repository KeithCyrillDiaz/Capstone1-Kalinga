import React, {useState} from 'react';
import { View, StatusBar, StyleSheet, Text } from 'react-native';
import MapContainer from './map';
import { globalHeader } from '../../../../styles_kit/globalHeader';
import { TextInput } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';

const GuestMilkBank = () => {

  const [search, setSearch] = useState('');


  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
      <View style={styles.smallHeader}>
        <Text style={globalHeader.SmallHeaderTitle}>Saved Milk Banks</Text>
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
  container: {
    flex: 1,
  },

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

export default GuestMilkBank;