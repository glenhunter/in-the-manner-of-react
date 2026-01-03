/**
 * NavigationHeader component
 * Standard navigation header with back button and title
 */

import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Typography, Spacing} from '../constants';

interface NavigationHeaderProps {
  title: string;
  onBack?: () => void;
  onClose?: () => void;
}

export function NavigationHeader({
  title,
  onBack,
  onClose,
}: NavigationHeaderProps) {
  const handlePress = onBack || onClose;

  return (
    <View style={styles.container}>
      {handlePress ? (
        <TouchableOpacity onPress={handlePress} style={styles.button}>
          <Icon
            name={onBack ? 'arrow-back' : 'close'}
            size={24}
            color="#333"
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
      <Text style={styles.title}>{title}</Text>
      <View style={styles.placeholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  button: {
    padding: 4,
  },
  title: {
    fontSize: Typography.fontSize.medium,
    fontWeight: Typography.fontWeight.semibold,
    color: '#333',
  },
  placeholder: {
    width: 24,
  },
});
