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


const DonorNotification = ({route}) => {

  const userInformation = route.params.userInformation
  const token = route.params.token.trim()

  const navigation = useNavigation()

  const [readNotifications, setReadNotifications] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState({});
  const [notifications, setNotification] = useState([])

  const toggleReadStatus = (index) => {
    setReadNotifications([...readNotifications, index]);
  };

  const isRead = (index) => {
    return readNotifications.includes(index);
  };

  const openModal = (index) => {
    const createdAt = new Date(index.createdAt);
    const formatDate = {
      ...index,
      createdAt: `${createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${createdAt.toLocaleDateString()}`
    }

    console.log("Date: ", formatDate.createdAt)
    setSelectedNotification(formatDate);
    setModalVisible(true);
    toggleReadStatus(index);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const fetchNotification = async () => {
    console.log("Fetching Notifications")
    console.log("Donor_ID: ", userInformation.Donor_ID)

    const response = await axios.get(`${BASED_URL}/kalinga/fetchUnreadNotification/${userInformation.Donor_ID}`,
      { 
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    )
      if(response.data.messages.code === 1) {
        console.log("Error fetching Notification: ", response.data.messages.message)
        Alert.alert("No Notifications", "You currently don't have any notifications.");
        return
      }
      console.log(response.data.messages.message)
      setNotification(response.data.notifications)
      return
  }

  const updateStatus = async (id) => {
  
    const response  = await axios.patch(`${BASED_URL}/kalinga/updateStatus/${id}`, null,
    {
        headers: {
        Authorization: `Bearer ${token}`,
      }
    })

    if(response.data.messages.message === "Unauthorized User"){
      await AsyncStorage.multiRemove(['token', 'userInformation', 'DPLink', 'Image_ID']);
      Alert.alert("Session Expired", "Your session has expired. Please log in again.", [
        {
          text: "OK",
          onPress: () => navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'LogIn' }],
            })
          ),
        },
      ]);
      return
    }
      const newNotificaiton = response.data.notification
      setSelectedNotification(newNotificaiton)
      return

  }

  useFocusEffect(
    React.useCallback(() => {
      fetchNotification()
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
        {notifications.length !== 0 && notifications.map((notification) => (
          <TouchableOpacity
            key={notification.notificationId}
            onPress={() => {
              updateStatus(notification.notificationId); 
              openModal(notification);
            }}
            style={[
              styles.notificationItem,
              isRead(notification) && styles.readNotificationItem,
            ]}
          >
            {!isRead(notification) && notification.status === "Unread" && <View style={styles.dot}></View>}
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationDescription}>
                {notification.content}
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
                <Text style={styles.metaText}>Date and Time: {selectedNotification.createdAt}</Text>
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
