import React, { useState, useRef } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import WelcomePageRequestData from './WelcomePageRequestData';
import { FlatList } from 'react-native-gesture-handler';
import OnboardingItem from './OnboardingItem';

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const navigation = useNavigation(); // Get navigation object using useNavigation hook

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const handleNext = () => {
    // Redirect to the GetStarted screen
    navigation.navigate('GetStarted');
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={WelcomePageRequestData}
        renderItem={({ item }) => (
          <OnboardingItem item={item} data={WelcomePageRequestData} scrollX={scrollX} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
        scrollEventThrottle={32}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfig}
      />
      {currentIndex === WelcomePageRequestData.length - 1 && (
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    nextButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: "#E60965",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    nextButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });

