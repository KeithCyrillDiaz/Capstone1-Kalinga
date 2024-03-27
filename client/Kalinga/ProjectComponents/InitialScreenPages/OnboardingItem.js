import React from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions, SafeAreaView } from 'react-native';
import Paginator from './Paginator'; 


const OnboardingItem = ({ item, data, scrollX }) => { 
  const { width } = useWindowDimensions();

  return (
    <SafeAreaView style={styles.container}>
      <Image source={item.image} style={[styles.image, { width, resizeMode: 'cover' }]} />
      <View style={styles.overlay}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Paginator data={data} scrollX={scrollX} />
      </View>
    </SafeAreaView>
  );
};


export default OnboardingItem;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      flex: 1,
      width: '100%',
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    title: {
      fontWeight: '800',
      fontSize: 30,
      marginBottom: 20,
      color: 'white',
      textAlign: 'center',
    },
    description: {
      fontWeight: '500',
      fontSize: 20,
      color: 'white',
      textAlign: 'justify',
      marginBottom: 20, 
    },
  });
