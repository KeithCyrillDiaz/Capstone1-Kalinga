import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {
    View,
    Text,
} from 'react-native';
//import { globalStyles } from '../styles/globalStyles';
import Tabs from './MainTabs.js'


const NavigateTabs = ({userT}) => {
    
    return (
        <NavigationContainer>          
            <Tabs userType = {userT}/>

        </NavigationContainer>
    );

}


export default NavigateTabs;