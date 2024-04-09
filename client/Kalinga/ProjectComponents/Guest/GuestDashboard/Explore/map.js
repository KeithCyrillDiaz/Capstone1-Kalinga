import React, { useState } from 'react';
import { View, StyleSheet} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const apiKey = process.env.GOOGLE_MAPS_API_KEY;


const MapContainer = () => {


    const defaultCenter = {
        latitude: 14.5995,
        longitude: 120.9842,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
    
      const [mapCenter, setMapCenter] = useState(defaultCenter);

  return (
       <MapView
        apiKey={apiKey}
        style={styles.map}
        initialRegion={{
          latitude: mapCenter.latitude,
          longitude: mapCenter.longitude,
          latitudeDelta: mapCenter.latitudeDelta,
          longitudeDelta: mapCenter.longitudeDelta,
        }}
      >
        <Marker
          coordinate={{ latitude: 14.5995, longitude: 120.9842 }}
          title="Marker Title"
          description="Marker Description"
        />
      </MapView>
  );
};

export default MapContainer;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    map: {
    zIndex: -1,
    flex: 1, // Take up all available space
      ...StyleSheet.absoluteFillObject,
    },
  });