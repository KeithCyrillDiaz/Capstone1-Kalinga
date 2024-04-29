import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';

const MapMarker = ({ list, onPress}) => {
    return (
      <Marker
        coordinate={{ latitude: list.latitude, longitude: list.longitude }}
        title={list.name}
        description={list.description}
        onPress={(e) => onPress(list)}

       
      />
    );
  };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MapMarker;