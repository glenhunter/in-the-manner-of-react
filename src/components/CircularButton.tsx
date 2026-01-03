/**
 * CircularButton component
 * Circular button with icon (used for refresh, etc.)
 */

import React from 'react';
import {TouchableOpacity, StyleSheet, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../constants';

interface CircularButtonProps {
  icon: string;
  onPress: () => void;
  size?: number;
  style?: ViewStyle;
}

export function CircularButton({
  icon,
  onPress,
  size = 60,
  style,
}: CircularButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {width: size, height: size, borderRadius: size / 2},
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}>
      <Icon name={icon} size={24} color={Colors.text.primary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.overlay.heavy,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
});
