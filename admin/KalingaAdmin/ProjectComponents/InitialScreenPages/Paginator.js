import React from 'react';
import { View, StyleSheet, Animated, useWindowDimensions } from 'react-native';

const Paginator = ({ data, scrollX }) => {
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      {data.map((_, index) => {
        const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

        // Interpolate opacity based on scroll position
        const dotOpacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.5, 1, 0.5],
          extrapolate: 'clamp',
        });

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={index.toString()}
            style={[styles.dot, { width: dotWidth, opacity: dotOpacity }]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 64,
    position: 'absolute',
    bottom: 20,
  },
  dot: {
    width: 15,
    height: 8,
    borderRadius: 5,
    backgroundColor: '#E60965',
    marginHorizontal: 8,
  },
});

export default Paginator;
