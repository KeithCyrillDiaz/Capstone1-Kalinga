import React from 'react'
import { Modal, View, StyleSheet } from 'react-native'
import { LoadingBar } from './LoadingBar.js'
export const Uploading = ({Image, progress, onClose,  label}) => {
    
    return (
            <Modal transparent={true}>
                <View style={styles.container}>
                    <LoadingBar 
                    progressNum={progress}
                    // onClose={onClose}
                    ImageUri={Image}
                    loaderLabel = {label}
                    />
                </View>
               
            </Modal>

      
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent black background
        justifyContent: 'center',
        alignItems: 'center',
      },
})