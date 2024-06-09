import React from 'react';
import { View, Modal, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

export const ImagePickerModal = ({ onSelect, onClose , type}) => {
    
  return (
    <Modal transparent animationType="fade" visible={true} onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Feather name="x-circle" size={24} color="black" />
          </TouchableOpacity>
         <View style={{
            flexDirection: "row",
            gap: 17
         }}>
            <TouchableOpacity 
            onPress={() => onSelect(type, "Camera")}
            style={styles.iconContainer}>
                <Feather name="camera" size={50} color="#E60965" />
                <Text style={styles.text}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => onSelect(type, "Gallery")}
            style={styles.iconContainer}>
                <Feather name="image" size={50} color="#E60965" />
                <Text style={styles.text}>Gallery</Text>
            </TouchableOpacity>
         </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#E60965',
    paddingBottom: '7%',
    maxHeight: 400,
    paddingHorizontal: 37,
    alignItems: 'center',
    paddingTop: 17,
    borderRadius: 17,
  },
  closeButton: {
    position: 'absolute',
    right: 7,
    top: 7,
    zIndex: 17,
  },
  iconContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 7,
    backgroundColor: 'white',
    borderRadius: 7,
    elevation: 7,
    paddingHorizontal:17,
    paddingVertical:7
  },
  text: {
    color: '#E60965',
    fontFamily: 'Open-Sans-SemiBold',
  },
});
