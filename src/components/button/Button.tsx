import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const Button = ({style, children, onPress}: any) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
};

export default Button;
