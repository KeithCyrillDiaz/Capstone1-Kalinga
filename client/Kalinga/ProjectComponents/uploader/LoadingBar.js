import React, {useEffect} from 'react';
import { View, Text, Image, StyleSheet} from 'react-native'
import Svg, { Rect } from 'react-native-svg';

export const LoadingBar = ({progressNum, ImageUri, onClose, loaderLabel}) => {
    
    
    const barWidth = 230;
    const progressWidth = (progressNum / 100) * barWidth;
    // useEffect(() => {
    //     if(progressWidth === barWidth){
    //         onClose()
    //     }
           
    // },[progressWidth])

    return (
        <View style = {styles.container}>
            {ImageUri !== "" && (
                <Image
                style={styles.image}
               source = {{uri: ImageUri}}
               />
            )}
            
            <Text style={styles.text}>{loaderLabel}</Text>

            <Svg width={barWidth} height="7">
                <Rect fill={"#eee"} width={barWidth} height={"100%"} rx={3.5} ry={3.5}/>
                <Rect fill={"pink"} width={progressWidth} height={"100%"} rx={3.5} ry={3.5}/>
            </Svg>
            
            
     
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        width: "70%",
        borderRadius: 15,
        paddingVertical: "5%"
    },

    image:{
        height: 75, 
        width: 75, 
        marginBottom: 10,
        borderRadius: 17
    },

    text: {
        textAlign: "center",
        marginBottom: 10
    }

})