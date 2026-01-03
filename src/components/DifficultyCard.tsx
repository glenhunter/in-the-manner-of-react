/**
 * DifficultyCard component
 * Card for selecting difficulty level
 */

import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Difficulty} from '../data/types';
import {Typography, Spacing} from '../constants';

interface DifficultyCardProps {
  difficulty: Difficulty | null;
  title: string;
  description: string;
  color: string;
  onPress: () => void;
}

export function DifficultyCard({
  difficulty,
  title,
  description,
  color,
  onPress,
}: DifficultyCardProps) {
  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor: `${color}1A`}]}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={[styles.title, {color}]}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <Icon name="chevron-forward" size={20} color={color} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: Typography.fontSize.medium,
    fontWeight: Typography.fontWeight.semibold,
    marginBottom: 4,
  },
  description: {
    fontSize: Typography.fontSize.tiny,
    color: '#666',
  },
});
