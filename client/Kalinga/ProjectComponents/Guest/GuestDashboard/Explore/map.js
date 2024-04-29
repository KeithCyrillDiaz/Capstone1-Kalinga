import React, { useContext, useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, Image, Text, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { UserLocationContext } from '../../../../Context/UserLocationContext';
import MapMarker from './MapMarker';
import getMilkBankList from './MilkBankList';
import DetailsModal from './DetailsModal';
import Carousel from 'react-native-snap-carousel';
import { FontAwesome } from '@expo/vector-icons';
import MapViewDirections from 'react-native-maps-directions'; // Import MapViewDirections
import { GOOGLE_MAPS_API_KEY } from './sec';

//const apiKey = process.env.GOOGLE_MAPS_API_KEY;


const MapContainer = () => {
  const [mapRegion, setMapRegion] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const { location, setLocation } = useContext(UserLocationContext);
  const milkBankList = getMilkBankList();
  const mapRef = useRef();

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

  const handleMarkerPress = (place) => {
    setSelectedPlace(place);
    setModalVisible(true);
  };

  // const handleDirections = () => {
  //   if (location && selectedPlace) {
  //     return (
  //       <MapViewDirections
  //         origin={{
  //           latitude: location.coords.latitude,
  //           longitude: location.coords.longitude,
  //         }}
  //         destination={{
  //           latitude: selectedPlace.latitude,
  //           longitude: selectedPlace.longitude,
  //         }}
  //         apikey={GOOGLE_MAPS_API_KEY}
  //       />
  //     );
  //   } else {
  //     return null;
  //   }
  // };

  const closeModal = () => {
    setModalVisible(false);
  };

  const onCarouselItemChange = (index) => {
    const carouselLoc = milkBankList[index];
    if (carouselLoc) {
      mapRef.current?.animateToRegion({
        latitude: carouselLoc.latitude,
        longitude: carouselLoc.longitude,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2
      });
    }
  };

  const handleCarouselItemClick = (index) => {
    const place = milkBankList[index];
    setSelectedPlace(place);
    setModalVisible(true);
  };

  const renderCarouselItem = ({ item, index }) => (
    <View style={styles.cardContainer}>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <TouchableOpacity onPress={() => handleCarouselItemClick(index)}>
          <FontAwesome style={styles.cardIcon} name="expand" size={20} color="#E60965" />
        </TouchableOpacity>
      </View>
      <Image style={styles.cardImage} source={item.image} />
    </View>
  );

  if (!mapRegion) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.carouselContainer}>
        <MapView
          ref={mapRef}
          apiKey={GOOGLE_MAPS_API_KEY}
          style={styles.map}
          initialRegion={{
            latitude: mapRegion.latitude,
            longitude: mapRegion.longitude,
            latitudeDelta: mapRegion.latitudeDelta,
            longitudeDelta: mapRegion.longitudeDelta,
          }}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          showsMyLocationButtons
          showsTraffic
          showsCompass={true}
        >
          {/*{handleDirections()}  Render MapViewDirections */}
          {milkBankList.map((list) => (
            <MapMarker key={list.id} list={list} onPress={handleMarkerPress} />
          ))}
        </MapView>

        <DetailsModal
          visible={modalVisible}
          onClose={closeModal}
          selectedPlace={selectedPlace}
          currentLocation={currentLocation}
        />
      </View>
      <Carousel
        ref={(c) => {
          this._carousel = c;
        }}
        data={milkBankList}
        containerCustomStyle={styles.carousel}
        renderItem={renderCarouselItem}
        sliderWidth={Dimensions.get("window").width}
        itemWidth={300} // Adjust the width as needed
        onSnapToItem={(index) => onCarouselItemChange(index)}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },

  carouselContainer: {
    ...StyleSheet.absoluteFillObject
  },

  carousel: {
    position: 'absolute',
    bottom: 0,
  },

  cardContainer: {
    backgroundColor: '#FFE7DA',
    height: 200,
    width: 300,
    padding: 15,
    borderRadius: 20,
    elevation: 10,
    marginBottom: 60,
    flexDirection: 'row',
  },

  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Align title and icon to the opposite sides
    //alignItems: 'right', // Align items vertically in the container
  },

  cardTitle: {
    color: '#E60965',
    fontSize: 20,
    fontFamily: 'OpenSans-Regular',
  },

  cardIcon: {
    position: 'absolute',
    left: 45,
  },
  
  cardImage: {
    height: 150,
    width: 300,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    position: 'absolute',
    bottom: 0,
  }
});

export default MapContainer;
