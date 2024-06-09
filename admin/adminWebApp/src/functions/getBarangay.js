import React, { useState, useEffect} from 'react'
// import phil from 'philippine-location-json-for-geer'
import MunicipalityList from './Municipality.json'

export const getBarangayByCityName = ({city}) => {
    console.log ("City: ", city)
    const code = getCityCode({city: city})
    const barangayList = fetchBarangays({city_code: code})
    console.log("List ", barangayList)
}

export const getCityCode = ({value}) => {
    const City = MunicipalityList.filter(index => index.name.toLowerCase() === value.toLowerCase());
    return City.length > 0 ? City[0].mun_code : null;
}


// export const fetchBarangays = ({city_code}) => {
//     if(!city_code){
//         console.log("Invalid Code") 
//         return null
//     }
//     const barangays = phil.getBarangayByMun(city_code)
//     const barangayList = barangays.map(barangay => ({ label: barangay.name, value: barangay.brgy_code}))
//     const barangaySortedData = barangayList.sort((a, b) => a.label.toLowerCase() < b.label.toLowerCase() ? -1 : a.label.toLowerCase() > b.label.toLowerCase() ? 1 : 0);
//     if(!barangaySortedData){
//         console.log("Invalid Code") 
//         return null
//     }
//     return barangaySortedData
//   }