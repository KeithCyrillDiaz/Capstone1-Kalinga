import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, Platform } from 'react-native';
import axios from 'axios';

const App = () => {
  const [error, setError] = useState(false);
  const [imageUri, setImageUri] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get('http://192.168.100.72:7000/kalinga/images/1712503827935.png');
        setImageUri(response.data.imagePath);
      } catch (error) {
        setError(true);
      }
    };

    fetchImage();
  }, []);

  // Convert Windows file path to URI
  let uri = '';
  if (imageUri) {
    uri = "file:///C:/Keith Diaz Files/School/College Files/4th Year/Capstone 1/Kalinga Phase 2/Capstone-1/Capstone1-Kalinga/server/uploads/Donor/Images/1712503827935.png";
  }

  return (
    <View style={styles.container}>
      {error ? (
        <Text>Error loading image</Text>
      ) : (
        <Image
          source={{ uri: "file:///C:/Keith Diaz Files/School/College Files/4th Year/Capstone 1/Kalinga Phase 2/Capstone-1/Capstone1-Kalinga/server/uploads/Donor/Images/1712503827935.png"}}
          style={styles.image}
          onError={() => setError(true)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default App;
