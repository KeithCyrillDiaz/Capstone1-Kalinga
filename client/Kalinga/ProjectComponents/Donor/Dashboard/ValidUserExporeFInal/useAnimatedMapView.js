import { useRef, useCallback } from 'react';

const useAnimatedMapView = (initialRegion) => {
  const mapViewRef = useRef(null);

  const animateToRegion = useCallback((region, duration = 1000) => {
    if (mapViewRef.current) {
      mapViewRef.current.animateToRegion(region, duration);
    }
  }, []);

  return { mapViewRef, animateToRegion };
};

export default useAnimatedMapView;