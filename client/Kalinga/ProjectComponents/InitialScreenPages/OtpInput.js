import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const OtpInput = ({onOtpChange}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);

  const handleChangeText = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text !== '' && index < 5) {
      inputs.current[index + 1].focus();
    } else if (text === '' && index > 0) {
      inputs.current[index - 1].focus();
    }
    onOtpChange(newOtp.join(''));
  };



  return (
    <View style={styles.container}>
      {otp.map((value, index) => (
        <TextInput
          key={index}
          style={styles.input}
          maxLength={1}
          keyboardType="numeric"
          value={value}
          onChangeText={(text) => handleChangeText(text, index)}
          ref={(ref) => (inputs.current[index] = ref)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 40,
    height: 45,
    borderWidth: 1,
    borderColor: '#E60965',
    textAlign: 'center',
    margin: 5,
    borderRadius: 5,
    shadowColor: '#000', // For iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android
  },
});

export default OtpInput;
