import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';

const BabyCategoryModal = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Baby Category Priorities</Text>
          <Text style={styles.modalText}>
            <Text style={styles.boldText}>Medically Fragile Baby:</Text> Milk Banks prioritize providing breast milk to these babies due to their delicate health conditions.
            </Text>
            <Text style={styles.modalText}>
            <Text style={styles.boldText}>Sick Baby:</Text> While important, Milk Banks prioritize providing breast milk to Medically Fragile Babies first, followed by Sick Babies with urgent needs.
            </Text>
            <Text style={styles.modalText}>
            <Text style={styles.boldText}>Well Baby:</Text> These babies, though important, are the lowest priority for Milk Banks in providing breast milk as they have no urgent medical needs.
            </Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: "Open-Sans-Bold",
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 17,
    marginBottom: 10,
    textAlign: "justify",
    fontFamily: "Open-Sans-Regular"
  },
  boldText: {
    fontWeight: 'bold',
    color: '#E60965',
    fontFamily: "Open-Sans-SemiBold"
  },
  closeButton: {
    backgroundColor: '#E60965',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BabyCategoryModal;
