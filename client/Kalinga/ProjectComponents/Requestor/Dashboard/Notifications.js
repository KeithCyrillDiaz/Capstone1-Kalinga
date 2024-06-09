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
import { useNavigation, CommonActions, useFocusEffect } from '@react-navigation/native';
import axios from "axios"
import { BASED_URL } from '../../../MyConstants.js'
import { globalStyles } from "../../../styles_kit/globalStyles.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDateTime } from "../../functions/formatDateAndTime.js";
import moment from 'moment-timezone';

const RequestorNotification = ({route}) => {
  const userInformation = route.params.userInformation;
  const token = route.params.token.trim();

  const navigation = useNavigation();

  const [readNotifications, setReadNotifications] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const toggleReadStatus = (index) => {
    setReadNotifications(prev => [...prev, index]);
  };

  const isRead = (index) => {
    return readNotifications.includes(index);
  };

  const openModal = (notification) => {
    const { time, date } = getDateTime({ data: { selectedTime: notification.time, selectedDate: notification.date } });
    setTime(time);
    setDate(date);
    setSelectedNotification(notification);
    setModalVisible(true);
    toggleReadStatus(notification.notificationId);
  };

  const closeModal = () => {
    setSelectedNotification({});
    setModalVisible(false);
  };

  const fetchNotifications = async () => {
    console.log("Fetching Notifications");
    try {
      const response = await axios.get(`${BASED_URL}/kalinga/fetchUnreadNotification/${userInformation.Requestor_ID}`, { 
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.messages.code === 1) {
        console.log("Error fetching Notification: ", response.data.messages.message);
        return;
      }
      console.log(response.data.messages.message);
      setNotifications(response.data.notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      Alert.alert("Error", "An error occurred while fetching notifications.");
    }
  };

  const updateStatus = async (id) => {
    try {
      const response = await axios.patch(`${BASED_URL}/kalinga/updateStatus/${id}`, null, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.messages.message === "Unauthorized User") {
        await AsyncStorage.multiRemove(['token', 'userInformation', 'DPLink', 'Image_ID']);
        Alert.alert("Session Expired", "Your session has expired. Please log in again.", [
          {
            text: "OK",
            onPress: () => navigation.dispatch(
              CommonActions.reset({ index: 0, routes: [{ name: 'LogIn' }] })
            ),
          },
        ]);
        return;
      }
      const newNotification = response.data.notification;
      setSelectedNotification(newNotification);
    } catch (error) {
      setNotifications([])
      console.error("Error updating notification status:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchNotifications();
      return;
    }, [])
  );

  return (
    <SafeAreaView style={globalStyles.defaultBackgroundColor}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
      <View style={globalHeader.SmallHeader}>
        <Text style={globalHeader.SmallHeaderTitle}>Notifications</Text>
      </View>

      <ScrollView
        overScrollMode='never'
        nestedScrollEnabled={true} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingVertical: 20}}
      >
        {notifications.length === 0 && (
          <View style={{
            backgroundColor: "white",
            width: "90%",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 7,
            paddingVertical: 17,
            elevation: 7,
            borderRadius: 17,
            marginTop: "7%",
            alignSelf: "center"
          }}>
            <Text style={{
              fontFamily: "Open-Sans-SemiBold",
              color: '#E60965',
              textAlign: "center"
            }}>
              No donation notifications available at the moment.
            </Text>
          </View>
        )}
        {notifications.length !== 0 && notifications.map((notification) => (
          <TouchableOpacity
            key={notification.notificationId}
            onPress={() => {
              updateStatus(notification.notificationId); 
              openModal(notification);
            }}
            style={[
              styles.notificationItem,
              isRead(notification.notificationId) && styles.readNotificationItem,
            ]}
          >
            {!isRead(notification.notificationId) && notification.status === "Unread" && <View style={styles.dot}></View>}
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationDescription}>
                {notification.content}
              </Text>
              <Text style={styles.expiry}>
                This notification will expire on: {moment(notification.expiresAt).tz('Asia/Manila').format('MMMM Do YYYY, h:mm:ss a')}
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
              <Text style={styles.notificationTitle}>{selectedNotification.title}</Text>
              <Text style={styles.notificationDescription}>
               {selectedNotification.content}
              </Text>
              <View style={styles.notificationMeta}>
                <Text style={styles.metaText}>Date and Time: {time} - {date}</Text>
                <Text style={styles.metaText}>MilkBank Location: {selectedNotification.milkBank}</Text>
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
    elevation: 7,
    position: 'relative', // Make sure the container is positioned relatively
    width: "90%",
    alignSelf: "center"
  },
  readNotificationItem: {
    backgroundColor: "#EDEDED",
    borderRadius: 10,
    padding: 20,
    margin: 10,
    marginBottom: 2,
    elevation: 7,
    position: 'relative', // Make sure the container is positioned relatively
    width: "90%",
    alignSelf: "center"
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
    color: "#E60965",
    marginBottom: 5,
  },
  notificationDescription: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "justify"
  },

  expiry: {
    fontFamily: "Open-Sans-Regular",
    color: "#E60965",
    fontSize: 14,
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
    top: 7,
    right: 10,
    zIndex:10
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

export default RequestorNotification;
