/**
 * ModalHeader component
 * Header for modal screens with title and close button
 */

import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Typography, Spacing} from '../constants';

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
}

export function ModalHeader({title, onClose}: ModalHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.placeholder} />
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Icon name="close" size={24} color="#333" />
      </TouchableOpacity>
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
  },
  placeholder: {
    width: 24,
  },
  title: {
    fontSize: Typography.fontSize.regular,
    fontWeight: Typography.fontWeight.semibold,
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
});
