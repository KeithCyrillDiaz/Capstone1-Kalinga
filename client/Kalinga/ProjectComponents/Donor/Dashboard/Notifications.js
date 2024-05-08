import React, { useState, useEffect } from "react";
import { 
  ScrollView,
  TouchableOpacity, 
  Text, 
  View, 
  SafeAreaView, 
  StatusBar,
  StyleSheet,
  Modal,
  Alert
} from 'react-native';
import { globalHeader } from "../../../styles_kit/globalHeader.js";
import { Octicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

const DonorNotification = () => {
  const [readNotifications, setReadNotifications] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const toggleReadStatus = (index) => {
    setReadNotifications([...readNotifications, index]);
  };

  const isRead = (index) => {
    return readNotifications.includes(index);
  };

  const openModal = (index) => {
    setSelectedNotification(index);
    setModalVisible(true);
    toggleReadStatus(index);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      Alert.alert(
        "Sorry, this feature is not yet available right now.",
        "Rest assured, our team is hard at work developing new features to better serve our community. Your continued support means the world to us. Thank you for your patience!",
        [
          {
            text: "Okay",
          }
        ]
      );
      return
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
      <View style={globalHeader.SmallHeader}>
        <Text style={globalHeader.SmallHeaderTitle}>Notifications</Text>
      </View>

      <ScrollView
        overScrollMode='never'
        nestedScrollEnabled={true} 
        showsVerticalScrollIndicator={false}
      >
        {[1, 2, 3, 4].map((index) => (
          <TouchableOpacity
            key={index}
            onPress={() => openModal(index)}
            style={[
              styles.notificationItem,
              isRead(index) && styles.readNotificationItem,
            ]}
          >
            {!isRead(index) && <View style={styles.dot}></View>}
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>Your Milk is now ready for Pickup!</Text>
              <Text style={styles.notificationDescription}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Octicons name="x" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.notificationTitle}>Your Milk is now ready for Pickup!</Text>
              <Text style={styles.notificationDescription}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
              <View style={styles.notificationMeta}>
                <Text style={styles.metaText}>Date and Time: XX:XX AM/PM - XX - XX - XXXX</Text>
                <Text style={styles.metaText}>MilkBank Location: Lorem ipsum dolor sit amet</Text>
              </View>
            </View>
          </View>
        </Modal>

      </ScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8EB",
  },
  notificationItem: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    margin: 10,
    marginBottom: 2,
    elevation: 5,
    position: 'relative', // Make sure the container is positioned relatively
  },
  readNotificationItem: {
    backgroundColor: "#EDEDED",
    borderRadius: 10,
    padding: 20,
    margin: 10,
    marginBottom: 2,
    elevation: 2,
    position: 'relative', // Make sure the container is positioned relatively
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: "#E60965", // Customize dot color as needed
    borderRadius: 5,
    position: 'absolute',
    top: 5,
    right: 5,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  notificationDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    elevation: 5,
    margin: 20,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  notificationMeta: {
    borderTopWidth: 1,
    borderTopColor: "#CCCCCC",
    paddingTop: 10,
  },
  metaText: {
    fontSize: 14,
    color: "#555555",
  },
});

export default DonorNotification;
