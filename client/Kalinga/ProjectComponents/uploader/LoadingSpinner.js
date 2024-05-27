import React from "react";
import Spinner from "react-native-loading-spinner-overlay";

export const LoadingSpinner = ({loading}) => {
    return (
            <Spinner 
            visible = {loading}
            textContent={'Processing...'}
            textStyle={{ color: '#FFF' }}
            />
      
    )
}