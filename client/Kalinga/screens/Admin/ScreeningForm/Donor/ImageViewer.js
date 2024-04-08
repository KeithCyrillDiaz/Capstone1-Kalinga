import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';

const ImageViewer = ({ route }) => {
  const { images } = route.params;

  if (!images) {
    // Handle case where images array is undefined
    return (
      <View style={styles.container}>
        <Text>No images available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {images.map((image, index) => (
        <TouchableOpacity key={index} style={styles.imageContainer}>
          <Image
            source={{ uri: `file://${image.path}` }}
            style={styles.image}
            onError={() => console.log('Image loading error')}
          />
          <Text style={styles.imageText}>{image.originalname}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  imageContainer: {
    margin: 10,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  imageText: {
    marginTop: 5,
    textAlign: 'center',
    fontFamily: 'Open-Sans-Regular',
    color: '#E60965',
  },
});

export default ImageViewer;
