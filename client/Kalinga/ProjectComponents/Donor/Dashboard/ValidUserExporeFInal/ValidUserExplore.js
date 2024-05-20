import React, { useState, useEffect} from 'react'
import { View, Alert } from 'react-native'
import { SmallHeader} from '../../../header/Header.js';
import MapComponent from './MapComponent.js';
import { SearchBox } from './SearchBox.js'
import { globalStyles } from '../../../../styles_kit/globalStyles.js';
import { MilkBankList } from './MilbanksList.js'
import { MilkBankDetails } from './MilkBankDetails.js';
import { useNavigation } from '@react-navigation/native';

const ValidUserExplore = ({route}) => {

    const {data, token, requestStatus} = route.params

    const navigation = useNavigation()

        const [id, setId] = useState(null)
        // const [showDirections, setShowDirections]=useState(false)
        const [region, setRegion] = useState({
            latitude: 0,
            longitude: 0
        })
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

        const handleSetAppointments = async () => {
            if(data.userType === "Donor"){
                navigation.navigate("SetAnAppointment", {data: data, token: token})
                return
            }
            handleMakeRequest()
        }

        const handleMakeRequest = () => {
            console.log('Current Request Status:', requestStatus);
        
            const canMakeRequest = requestStatus !== 'Pending' && requestStatus !== 'Approved';
            console.log('Can Make Request:', canMakeRequest); // Log the evaluation result
        
            if (canMakeRequest) {
                console.log('Navigating to MakeRequest');
                navigation.navigate('MakeRequest', {data: data, token: token})
            } else {
                console.log('Cannot Make Request');
                Alert.alert(
                    'Cannot Make Request',
                    'You already have a pending or ongoing request. Please wait until it is resolved.',
                    [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
                );
            }
        };

    return (   
        <View style= {globalStyles.defaultBackgroundColor}>
            <SmallHeader title = {"Explore"} />
            <SearchBox data = {MilkBankList} onSelect={handleSearch} onClear = {handleSearchClear}/>
            <MapComponent regionLat={region.latitude} regionLong={region.longitude}/>
            {/* {id && (
                <MilkBankDetails id={id} onSelect={handleSetRegion}/>
            )} */}
            <MilkBankDetails id={id} onSelect={handleSetRegion} onAppointment={handleSetAppointments}/>
            
        </View>
          
    )
}

export default ValidUserExplore