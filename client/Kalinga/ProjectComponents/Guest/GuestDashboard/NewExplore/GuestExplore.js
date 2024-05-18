import React, { useState, useEffect} from 'react'
import { View, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity, Image} from 'react-native'
import { SmallHeader} from '../../../header/Header.js';
import MapComponent from './MapComponent.js';
import { SearchBox } from './SearchBox.js'
import { TextInput } from 'react-native-gesture-handler';
import { globalStyles } from '../../../../styles_kit/globalStyles.js';
import { MilkBankList } from './MilbanksList.js'
import { MilkBankDetails } from './MilkBankDetails.js';
import { Carousel } from './Carousel.js';

const GuestExplore = () => {

    
        const [id, setId] = useState(null)
        const [showDirections, setShowDirections]=useState(false)
        const [region, setRegion] = useState({
            latitude: 0,
            longitude: 0
        })
        console.log("id: ",id)
        const handleSearch = (input) => {
            setId(input)
        }

        const handleSetRegion = (milkBank) => {
            const {latitude, longitude} = milkBank
            if(!latitude || !longitude){
                console.log("Invalid MilkBank coordinates")
                return
            }
            setRegion(prevState=> ({
                ...prevState,
                latitude: latitude,
                longitude: longitude
            }))
        }

        const handleSearchClear = () => {
            setRegion(prevState=> ({
                ...prevState,
                latitude: 0,
                longitude: 0
            }))
        }

    return (   
        <View style= {globalStyles.defaultBackgroundColor}>
            <SmallHeader title = {"Explore"} />
            <SearchBox data = {MilkBankList} onSelect={handleSearch} onClear = {handleSearchClear}/>
            <MapComponent regionLat={region.latitude} regionLong={region.longitude}/>
            {/* {id && (
                <MilkBankDetails id={id} onSelect={handleSetRegion}/>
            )} */}
            <MilkBankDetails id={id} onSelect={handleSetRegion}/>
            
        </View>
          
    )
}

export default GuestExplore
