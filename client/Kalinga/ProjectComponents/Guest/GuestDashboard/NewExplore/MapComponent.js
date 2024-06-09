import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { GetUsersLocation } from './UsersLocation';
import MapViewDirections from 'react-native-maps-directions'; // Import MapViewDirections
import Spinner from 'react-native-loading-spinner-overlay';
import { MilkBankList } from './MilbanksList';
import { GOOGLE_MAPS_API_KEY } from '../../../../MyConstants';
export default MapComponent = ({ regionLat, regionLong, showDirections, showMilkBank }) => {
    const originalZoom = {
        latitudeDelta: 0.0077,
        longitudeDelta: 0.0077,
    };

    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [mapReady, setMapReady] = useState(false);
    const [loading, setLoading] =  useState(false)
    const [nearestLat, setNearestLat] = useState(0)
    const [nearestLong, setNearestLong] = useState(0)
    const [id, setId] = useState(null)

    const mapViewRef = useRef(null); // Reference to MapView

    const fetchUserLocation = async () => {
        try {
            setLoading(true)
            setMapReady(false);
            await GetUsersLocation({
                latitude: setLatitude,
                longitude: setLongitude,
            });
        } catch (error) {
            console.log("Failed to get User's Location");
        } finally {
            setMapReady(true);
            setLoading(false)
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
    
    useEffect(() => {
        if (mapReady && mapViewRef.current && (nearestLat !== 0 || nearestLong !== 0)) {
            mapViewRef.current.animateToRegion({
                latitude: nearestLat !== 0 ? nearestLat : latitude,
                longitude: nearestLong !== 0 ? nearestLong : longitude,
                latitudeDelta: originalZoom.latitudeDelta,
                longitudeDelta: originalZoom.longitudeDelta,
            }, 1000); // Duration in milliseconds
        }
    }, [nearestLat, nearestLong, mapReady]);

    const handleNearMePress = () => {
        let minDistance = Infinity;
        let nearestLat;
        let nearestLng;
        let milkBankId;
        let lat = latitude
        let long = longitude

        MilkBankList.forEach(({ latitude, longitude, name, id }) => {
            const distance = calculateDistance(latitude, longitude, lat, long);
            console.log(`Distance to ${name}: `, distance);
    
            if (distance < minDistance) {
                minDistance = distance;
                nearestLat = latitude;
                nearestLng = longitude;
                milkBankId = id
            }
        });
        console.log("nearestLat: ", nearestLat)
        console.log("nearestLng: ", nearestLng)
        setNearestLat(nearestLat)
        setNearestLong(nearestLng)
        showMilkBank(milkBankId)
    };

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the Earth in kilometers
        const dLat = deg2rad(lat2 - lat1);  // deg2rad below
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in kilometers
        return distance;
    };

    const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
    };

    if (latitude !== 0 && longitude !== 0 && mapReady && !loading) {
        return (
            <>
            <Spinner 
                visible = {loading}
                textContent={'Processing...'}
                textStyle={{ color: '#FFF' }}
            />
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
                {nearestLat !== 0 && nearestLong !== 0 && (
                    <Marker
                    coordinate={{
                        latitude: nearestLat,
                        longitude: nearestLong,
                    }}
                    /> 
                )} 
                {/* Need may billing kaya comment nalang */}
                {regionLat !== 0 && regionLong !== 0 &&(
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
                )}
                
            </MapView>
            <TouchableOpacity 
            onPress={() => handleNearMePress()}
            style={{
                zIndex: 10, 
                position: "absolute", 
                top: 170, 
                right: 7, 
                backgroundColor: "pink", 
                padding: 4, 
                borderRadius: 7}}>
                <Text style={{
                    color: "white"
                }}>Near Me</Text>
            </TouchableOpacity>
    </>
        );
    }

    return null;
};
