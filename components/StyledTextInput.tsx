// components/StyledTextInput.tsx

import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons'; // İkon kütüphanesi
import { Colors } from '../constants/Colors';

type StyledTextInputProps = TextInputProps & {
  iconName: React.ComponentProps<typeof Feather>['name']; // İkon adını tip olarak al
};

export default function StyledTextInput({ iconName, style, ...props }: StyledTextInputProps) {
  return (
    <View style={[styles.inputContainer, style]}>
      <Feather name={iconName} size={20} color={Colors.textSecondary} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholderTextColor={Colors.textSecondary}
        autoCapitalize="none"
        {...props} // value, onChangeText, secureTextEntry gibi diğer propları buraya aktar
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBackground,
    borderRadius: 30, // Tam yuvarlak kenarlar
    paddingHorizontal: 20,
    width: '100%',
    marginVertical: 8,
    borderWidth: 1,
    borderColor: Colors.borderColor,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 54, // Sabit bir yükseklik verelim
    fontSize: 15,
    color: Colors.text,
  },
});