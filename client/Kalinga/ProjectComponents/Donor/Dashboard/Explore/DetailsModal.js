import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Linking } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { GOOGLE_MAPS_API_KEY } from './sec';
import { UserLocationContext } from '../../../../Context/UserLocationContext';
import MapViewDirections from 'react-native-maps-directions'; // Import MapViewDirections

//const apiKey = process.env.GOOGLE_MAPS_API_KEY;


const DetailsModal = ({ visible, onClose, selectedPlace }) => {
  const [mapRegion, setMapRegion] = useState(null);
  const { location, setLocation } = useContext(UserLocationContext);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    if (location) {
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setCurrentLocation(location);
    }
  }, [location]);

  const handleDirections = () => {
    if (mapRegion && selectedPlace) {
      const origin = {
        latitude: mapRegion.latitude,
        longitude: mapRegion.longitude,
      };
      return origin;
    }
    return null;
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <TouchableOpacity
        style={[styles.modalContainer, { display: visible ? "flex" : "none" }]}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.modalContent}>
          <TouchableOpacity
            onPress={onClose}
            style={{ ...styles.closeButton, marginBottom: 10 }}
          >
            <AntDesign name="close" size={25} color="#E60965" />
          </TouchableOpacity>

          <View style={styles.detailsContainer}>
            <View style={styles.detailsItem}>
              <MaterialCommunityIcons
                style={{ marginRight: 10 }}
                name="baby-bottle-outline"
                size={30}
                color="#E60965"
              />
              <Text style={{ ...styles.detailText, fontWeight: "bold" }}>
                {selectedPlace?.name}
              </Text>
            </View>
            <View style={styles.detailsItem}>
              <Ionicons
                style={{ marginRight: 10 }}
                name="location-outline"
                size={30}
                color="#E60965"
              />
              <Text style={styles.detailText}>{selectedPlace?.address}</Text>
            </View>
            <View style={styles.detailsItem}>
              <SimpleLineIcons
                style={{ marginRight: 10 }}
                name="phone"
                size={30}
                color="#E60965"
              />
              <Text style={styles.detailText}>{selectedPlace?.contactNum}</Text>
            </View>
            <View style={styles.detailsItem}>
              <FontAwesome5
                name="facebook-messenger"
                size={28}
                color="#E60965"
              />
              <TouchableOpacity 
                onPress={() => Linking.openURL(selectedPlace?.fblink)}
              >
                <Text style={{...styles.detailText, textDecorationLine: 'underline', marginLeft: 15}}>{selectedPlace?.fb}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {handleDirections() && (
            <MapViewDirections
              origin={handleDirections()}
              destination={{
                latitude: selectedPlace.latitude,
                longitude: selectedPlace.longitude,
              }}
              apikey={GOOGLE_MAPS_API_KEY}
            />
          )}
          <TouchableOpacity 
            style={styles.directionButton}
            onPress={handleDirections}
          >
            <MaterialIcons name="directions" size={20} color="white" />
            <Text style={styles.directionButtonText}>Directions</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal> 
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginTop: '15%'
  },

  modalContent: {
    backgroundColor: '#FFE7DA',
    padding: 25,
    width: "80%",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E60965',
  },

  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },

  detailsContainer: {
    margin: 5,
    marginRight: 10,
    marginTop: 20
  },

  detailsItem: {
    alignItems: 'center',
    marginBottom: 10,
    flexDirection: 'row',
  },

  detailText: {
    fontFamily: 'OpenSans-Regular',
    color: '#E60965',
    fontSize: 18 
  },

  directionButton: {
    marginTop: 5,
    backgroundColor: '#E60965',
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },

  directionButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 5
  },
});

export default DetailsModal;
