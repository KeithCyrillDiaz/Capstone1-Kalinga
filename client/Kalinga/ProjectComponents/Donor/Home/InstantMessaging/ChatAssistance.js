//Donor ChatAssistance
import React, { useState, useEffect, useRef }from "react";
import { globalStyles } from "../../../../styles_kit/globalStyles.js";
import { globalHeader } from "../../../../styles_kit/globalHeader.js";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { 
    ScrollView, 
    Text, 
    View, 
    SafeAreaView, 
    StatusBar, 
    StyleSheet, 
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';


const ChatAssistance = ({route}) => {
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const scrollViewRef = useRef();

    const handleMessageSend = () => {
        // Logic to handle sending the message
        console.log('Message sent:', message);
        // Add the message to the chatMessages array
        setChatMessages([...chatMessages, { message, sender: 'You' }]);
        // Clear the input field
        setMessage('');
    
    };

    const ScrolltoEnd = () => {

      useEffect(() => {
        scrollViewRef.current.scrollToEnd({ animated: true });
    }, [chatMessages]);
    
    };

    ScrolltoEnd();

    const userInformation = route.params.data;
    const token = route.params.token
  
    const navigate = useNavigation()
    
    useEffect(() => {
      Alert.alert(
        "Sorry, this feature is not yet available right now.",
        "Rest assured, our team is hard at work developing new features to better serve our community. Your continued support means the world to us. Thank you for your patience!",
        [
          {
            text: "Okay",
            onPress: () => navigate.goBack("MainTabs", { userInformation: userInformation, token: token })
          }
        ]
      );
      return
    }, [])

    return (
        <SafeAreaView style={styles.SafeArea}>
              <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
              <KeyboardAvoidingView style={globalStyles.keyBoardAvoidView}>
                  <View style={globalHeader.SmallHeader}>
                      <Text style={globalHeader.SmallHeaderTitle}>Instant Chat</Text>
                  </View>

              </KeyboardAvoidingView>

                  <ScrollView
                      style={globalStyles.scrollView}
                      overScrollMode='never'
                      nestedScrollEnabled={true}
                      ref={scrollViewRef}
                  >
                    
                      {chatMessages.map((chatMessage, index) => (
                              <View style = {styles.MessageBox}>
                                <View key={index} style={chatMessage.sender === 'You' ? styles.SenderMessageContainer : styles.ReceiverMessageContainer}>
                                <View style={styles.SenderMessageBox}>
                                    {chatMessage.sender !== 'You' && <FontAwesome name="user-circle-o" size={40} color="#E60965" />}
                                    <View style={styles.MessageContainer}>
                                        <Text style={styles.message}>{chatMessage.message}</Text>
                                    </View>
                                    {chatMessage.sender === 'You' && <FontAwesome name="user-circle-o" size={40} color="#E60965" />}
                                </View>
                                </View>
                              </View>
                          
                      ))}   
                  </ScrollView>

                  <View style={styles.inputContainer} >
                      <TextInput
                          style={styles.input}
                          value={message}
                          onChangeText={setMessage}
                          placeholder="Type your message..."
                          placeholderTextColor="#E60965"
                          onSubmitEditing={handleMessageSend}
                          returnKeyType="send"
                      />
                     <TouchableOpacity
                        style={styles.sendButton}
                        onPress={message ? handleMessageSend : null} // Only call handleMessageSend if message is not empty
                        disabled={!message} // Disable the button if message is empty
>
                          <Ionicons name="send" size={30} color="#E60965" />
                      </TouchableOpacity>
                  </View>
        </SafeAreaView>
    );
}

  const styles = StyleSheet.create({

    SafeArea: {
      flex: 1,
      backgroundColor: "#FFE7DA"
    }, 

    MessageBox: {
      flex:1,
      //backgroundColor: "gray",
    }, 

    time:{
      textAlign: "center",
      fontSize: 20,
      fontFamily: "Open-Sans-Regular",
      color: "#E60965",
    },

    SenderMessageContainer: {
      flex:1,
      //backgroundColor: "red",
      alignItems: "flex-end",
      marginLeft: "2.5%",
      marginRight: "2.5%",
      marginTop: "1%",
    },

    ReceiverMessageContainer: {
      flex:1,
      //backgroundColor: "red",
      alignItems: "flex-start",
      marginLeft: "2.5%",
      marginRight: "2.5%",
      marginTop: "1%",
    },

    SenderMessageBox: {
      flex: 1,
      //backgroundColor: "gray",
      flexDirection: "row",
      maxWidth: "70%",
      alignItems: "center"
    },


    MessageContainer:{
      flex: 1,
      margin: "2.5%",
      padding: "5%",  
      backgroundColor: "#FFE5EC",
      borderRadius: 10,
    },
    message: {
      fontSize: 20,
      fontFamily: "Open-Sans-Regular",
      color: "#E60965",
    },

    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingBottom: 10,
      backgroundColor: "#fff",
      paddingTop: "2%"
    },
    input: {
      flex: 1,
      height: 40,
      borderWidth: 1,
      borderColor: "#E60965",
      borderRadius: 20,
      paddingHorizontal: 15,
      marginRight: 10,
    },
    sendButton: {
      paddingVertical: 10,
      paddingHorizontal: 15,
    },
    sendButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },





  });

  export default ChatAssistance;

