import React, { useState, useEffect, useRef, useMemo } from 'react'
import { View, Text, StyleSheet, Modal, Alert, TouchableOpacity, TouchableHighlight, Image, Dimensions} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import ImageZoom from 'react-native-image-pan-zoom';
import { AntDesign } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';//need to be set up in Babel
import MapComponent from './MapComponent.js';

import { MilkBankList } from './MilbanksList.js';

export const Carousel = ({data}) => {

    const [imageSource, setImageSource] = useState("")
    const [showModal, setShowModal] = useState(false)

    const handleOnpress = (path) => {
        setImageSource(path)
        setShowModal(true)
    }
    return (
        <>
            <ScrollView
            style={{marginTop:-10, marginRight: 10}}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            overScrollMode='never'
            >
            {data.map((image, index) => (
                <TouchableOpacity
                onPress={() => handleOnpress(image)}
                 key={index}>
                    <Image
                        style={styles.image}
                        source={image}
                    />
                </TouchableOpacity>
                ))}
            </ScrollView>
             <Modal
             animationType="slide"
             transparent={true}
             visible={showModal}
             onRequestClose={() => {
                 setShowModal(false);
             }}
         >
             <View style={styles.modalContainer}>
             <ImageZoom
                 cropWidth={Dimensions.get('window').width}
                 cropHeight={Dimensions.get('window').height}
                 imageWidth={Dimensions.get('window').width}
                 imageHeight={Dimensions.get('window').height * 1} // Adjust the height as needed
                 enableSwipeDown={true}
                 onSwipeDown={() => setShowModal(false)} // Close modal on swipe down
                 style={{ backgroundColor: 'transparent' }} // Set background color to black to avoid seeing the underlying content
             >  
                {imageSource !== "" && (
                    <Image
                    source={imageSource}
                    style={{ height: 120, width: null, flex: 1 }}
                    resizeMode="contain"
                />
                )}
                 
             </ImageZoom>
                 <TouchableHighlight
                     style={styles.closeButton}
                     onPress={() => {
                        setShowModal(false);
                     }}
                 >
                     <AntDesign name="close" size={24} color="black" />
                 </TouchableHighlight>
             </View>
         </Modal>
        </>
       
    );
  };
  
  const styles = StyleSheet.create({
    image: {
        height: 120,
        width: 200,
        borderRadius: 17,
        marginHorizontal: 7,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
},
  });