import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const InstantMess = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const idleTime = 3 * 60 * 1000; // 3 minutes in milliseconds

  useEffect(() => {
    const interval = setInterval(() => {
      setChatMessages((prevMessages) => {
        // Check for idle messages and update their status
        const updatedMessages = prevMessages.map((msg) => {
          const elapsedTime = new Date() - new Date(msg.timestamp);
          return {
            ...msg,
            idle: elapsedTime >= idleTime,
          };
        });
        return updatedMessages;
      });
    }, 1000); // Check every second for idle messages

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      {/* Render chat messages */}
      {chatMessages.map((chatMessage, index) => (
        <View key={index} style={styles.messageContainer}>
          {chatMessage.idle && (
            <Text style={styles.time}>Idle for 3 minutes</Text>
          )}
          <View style={styles.senderMessageBox}>
            {chatMessage.sender !== "You" && (
              <FontAwesome name="user-circle-o" size={40} color="#E60965" />
            )}
            <View style={styles.messageContent}>
              <Text style={styles.message}>{chatMessage.message}</Text>
            </View>
            {chatMessage.sender === "You" && (
              <FontAwesome name="user-circle-o" size={40} color="#E60965" />
            )}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    marginBottom: 10,
  },
  senderMessageBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  messageContent: {
    flex: 1,
    marginLeft: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 5,
  },
  time: {
    alignSelf: "flex-end",
    color: "gray",
  },
});

export default InstantMess;