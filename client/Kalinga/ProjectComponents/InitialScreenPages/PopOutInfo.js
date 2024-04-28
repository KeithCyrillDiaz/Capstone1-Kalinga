import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
const PopOutInfo = ({ visible, onClose }) => {
    if (!visible) return null;

    // Dummy data for table-like structure
    const data = [
        { id: '1', name: 'Name', phoneNumber: '123-456-7890' },
        { id: '2', name: 'Age', phoneNumber: '987-654-3210' },
        { id: '3', name: 'City', phoneNumber: '123-456-7890' },
        { id: '4', name: 'Email', phoneNumber: '987-654-3210' },
        { id: '5', name: 'Family Status', phoneNumber: '123-456-7890' },
        { id: '7', name: 'Phone Number', phoneNumber: '987-654-3210' },
    ];

    const renderItem = ({ item }) => (
        <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.name}</Text>
            <View style={styles.verticalLine} /> 
            <Text style={styles.tableCell}>{item.phoneNumber}</Text>
        </View>
    );

    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.popOutContainer}>
                    <View style={styles.popOutContent}>
                        <View style={styles.popOutRow}>
                        </View>
                        <View style={styles.popOutRow}>
                        </View>
                    </View>
                   
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                </View>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                     <AntDesign name="closecircle" size={30} color="white"/>
                </TouchableOpacity>
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
    popOutContainer: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        width: '90%',
        height: '40%',
        justifyContent: 'space-between',
        borderColor: '#E60965',
        borderWidth: 1
    },
    popOutContent: {
        marginBottom: 5,
    },
    popOutRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    popOutTitle: {
        fontWeight: 'bold',
    },
    popOutData: {},

    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#E60965',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    tableCell: {
        flex: 1,
        textAlign: 'center',
        color: '#E60965'
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#E60965',
        padding: 5,
        borderRadius: 36,
    },
    verticalLine: {
        width: 1,
        height: '100%',
        backgroundColor: '#E60965', 
    },
});

export default PopOutInfo;
