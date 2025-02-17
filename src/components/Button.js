import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ buttonname, buttonpress, bgcolor, padding }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={buttonpress}>
      <Text style={[styles.buttonText,{backgroundColor:bgcolor}]}>{buttonname}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton;
