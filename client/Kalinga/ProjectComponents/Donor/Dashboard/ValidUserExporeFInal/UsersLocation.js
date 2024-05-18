import React, { useState, useEffect} from 'react'
import * as Location from 'expo-location';


export const GetUsersLocation = async({
    latitude,
    longitude,
}) => {
    return new Promise (async (resolve, reject) => {
       try {
        const manilaLocation = {
            location: "Manila",
            latitude: 14.5995,
            longitude: 120.9842
         }
    
        const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            console.log('Permission to access location was denied');
            latitude(manilaLocation.latitude)
            longitude(manilaLocation. longitude)
            resolve()
          }
          const location = await Location.getCurrentPositionAsync({});
          latitude(location.coords.latitude)
          longitude(location.coords.longitude)
        resolve()
       } catch (error){
        reject()
       }
    })
}

  