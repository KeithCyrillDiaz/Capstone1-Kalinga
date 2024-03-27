import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
export default function Header({ title }) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#E60965",
    minHeight: 88,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  headerTitle: {
    fontFamily: "Kurale-Regular",
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    marginTop: 25
  },

  BackBtn: {
    minWidth: 24,
    minHeight: 24,
    position: "absolute",
    left: 0,
    marginHorizontal: 24,
    borderRadius: 100,
    justifyContent: "center",
   

  },
});
