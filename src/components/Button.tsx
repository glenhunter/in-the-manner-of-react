/**
 * Button component
 * Reusable button with primary/secondary variants
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors, Typography, Spacing} from '../constants';

interface ButtonProps {
  title: string;
  onPress: () => void;
  icon?: string;
  variant?: 'primary' | 'secondary';
  color?: string;
  disabled?: boolean;
  style?: ViewStyle;
}

export function Button({
  title,
  onPress,
  icon,
  variant = 'primary',
  color,
  disabled = false,
  style,
}: ButtonProps) {
  const backgroundColor =
    variant === 'primary' ? Colors.overlay.medium : Colors.overlay.light;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {backgroundColor},
        color && {borderColor: color, borderWidth: 2},
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}>
      {icon && (
        <Icon
          name={icon}
          size={24}
          color={Colors.text.primary}
          style={styles.icon}
        />
      )}
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 60,
    borderRadius: 15,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    shadowColor: Colors.shadow,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  icon: {
    marginRight: Spacing.sm,
  },
  text: {
    fontSize: Typography.fontSize.largeBody,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
  },
  disabled: {
    opacity: 0.5,
  },
});
