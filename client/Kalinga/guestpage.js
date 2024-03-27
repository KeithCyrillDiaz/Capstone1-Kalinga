
import  React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/header';

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>

      </View>

    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE0E8',
  },
  
});
