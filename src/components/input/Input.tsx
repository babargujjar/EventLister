import React from 'react';
import {View, TextInput} from 'react-native';

interface inputprops {
  autoCorrect: any;
  style: any;
  value: any;
  onChangeText: (e: any) => void;
  placeholder: any;
  placeholderTextColor: any;
  secureTextEntry: any;
  keyboardType: any;
  editable: any;
}

const Input = ({
  autoCorrect,
  style,
  value,
  onChangeText,
  placeholder,
  placeholderTextColor,
  secureTextEntry,
  keyboardType,
  editable,
}: inputprops) => {
  return (
    <View>
      <TextInput
        autoCorrect={autoCorrect}
        style={style}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        editable={editable}
      />
    </View>
  );
};

export default Input;
