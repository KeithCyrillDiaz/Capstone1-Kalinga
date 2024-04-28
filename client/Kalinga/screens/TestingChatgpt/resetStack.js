import React from 'react';
import { Button } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

const ResetButton = () => {
  const navigation = useNavigation();

  const handleReset = () => {
    // Reset the stack to the initial screen
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }], // Replace 'Home' with the name of your initial screen
    });
  };

  return (
    <Button title="Reset" onPress={handleReset} />
  );
};

const App = () => {
  return (
    <NavigationContainer>
      {/* Your navigation structure goes here */}
      {/* Example usage of the ResetButton */}
      <ResetButton />
    </NavigationContainer>
  );
};

export default App;
