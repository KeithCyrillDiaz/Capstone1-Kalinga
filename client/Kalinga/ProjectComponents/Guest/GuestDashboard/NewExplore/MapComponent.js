import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { GetUsersLocation } from './UsersLocation';
// import MapViewDirections from 'react-native-maps-directions'; // Import MapViewDirections

export default MapComponent = ({ regionLat, regionLong, initialRegion }) => {
    const originalZoom = {
        latitudeDelta: 0.0077,
        longitudeDelta: 0.0077,
    };

    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [mapReady, setMapReady] = useState(false);

    const mapViewRef = useRef(null); // Reference to MapView

    const fetchUserLocation = async () => {
        try {
            setMapReady(false);
            await GetUsersLocation({
                latitude: setLatitude,
                longitude: setLongitude,
            });
        } catch (error) {
            console.log("Failed to get User's Location");
        } finally {
            setMapReady(true);
        }
    };

    useEffect(() => {
        fetchUserLocation();
    }, []);

    useEffect(() => {
        if (mapReady && mapViewRef.current && (regionLat !== 0 || regionLong !== 0)) {
            mapViewRef.current.animateToRegion({
                latitude: regionLat !== 0 ? regionLat : latitude,
                longitude: regionLong !== 0 ? regionLong : longitude,
                latitudeDelta: originalZoom.latitudeDelta,
                longitudeDelta: originalZoom.longitudeDelta,
            }, 1000); // Duration in milliseconds
        }
    }, [regionLat, regionLong, mapReady]);

    if (latitude!==0 && longitude !== 0 && mapReady) {
        return (
            <MapView
                ref={mapViewRef}
                style={{ flex: 1 }}
                showsUserLocation={true}
                showsMyLocationButton={true}
                mapPadding={{ top: 100, bottom: 50, right: 10 }}
                showsTraffic={false}
                showsBuildings={false}
                showsScale={false}
                mapType="standard"
                initialRegion={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: originalZoom.latitudeDelta,
                    longitudeDelta: originalZoom.longitudeDelta,
                }}
            >
                {regionLat !== 0 && regionLong !== 0 && (
                       <Marker
                       coordinate={{
                           latitude: regionLat,
                           longitude: regionLong,
                       }}
                       /> 
                )} 
                {/* Need may billing kaya comment nalang */}
                {/* {regionLat !== 0 && regionLong !== 0 &&(
                    <MapViewDirections
                    origin={{
                        latitude: latitude,
                        longitude: longitude,
                    }}
                    destination={{
                        latitude: regionLat,
                        longitude: regionLong,
                    }}
                    apikey={GOOGLE_MAPS_API_KEY}
                    strokeWidth={5}
                  />
                )} */}
                
            </MapView>
        );
    }

    return null;
};
