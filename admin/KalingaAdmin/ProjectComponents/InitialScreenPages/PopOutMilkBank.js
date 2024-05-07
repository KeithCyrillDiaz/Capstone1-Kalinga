import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const PopOutMilkBank = ({ visible, onClose }) => {
    if (!visible) return null;

    const data = [
        { id: '1', name: 'MilkBank', phoneNumber: 'Quezon City General Hospital' },
        { id: '2', name: 'Address', phoneNumber: 'Quezon City' },
        { id: '3', name: 'Contact Number', phoneNumber: ' +63 2 426 1314' },
        { id: '4', name: 'Website', phoneNumber: 'qcgh.doh.ph' },
     
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
        height: '30%',
        justifyContent: 'space-between',
        borderColor: '#E60965',
        borderWidth: 1,
        
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

export default PopOutMilkBank;
