/**
 * SettingsScreen
 * Menu for accessing game features and settings
 */

import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {RootStackParamList} from '../data/types';
import {NavigationHeader} from '../components/NavigationHeader';
import {Typography, Spacing, Colors} from '../constants';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

export function SettingsScreen({navigation}: Props) {
  const menuItems = [
    {
      title: 'Game',
      items: [
        {
          label: 'New Game',
          icon: 'play',
          iconColor: Colors.success,
          onPress: () => navigation.navigate('DifficultySelection', {}),
        },
        {
          label: 'Rules',
          icon: 'book-outline',
          iconColor: Colors.primaryAction,
          onPress: () => navigation.navigate('Rules'),
        },
      ],
    },
    {
      title: 'Management',
      items: [
        {
          label: 'Words',
          icon: 'list-outline',
          iconColor: Colors.success,
          onPress: () => navigation.navigate('WordsManagement'),
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <NavigationHeader
        title="Settings"
        onClose={() => navigation.goBack()}
      />

      <ScrollView>
        {menuItems.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.itemsContainer}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={[
                    styles.item,
                    itemIndex < section.items.length - 1 && styles.itemBorder,
                  ]}
                  onPress={item.onPress}>
                  <View style={styles.itemLeft}>
                    <Icon name={item.icon} size={24} color={item.iconColor} />
                    <Text style={styles.itemLabel}>{item.label}</Text>
                  </View>
                  <Icon name="chevron-forward" size={20} color="#ccc" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    marginTop: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.tiny,
    fontWeight: Typography.fontWeight.semibold,
    color: '#666',
    textTransform: 'uppercase',
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  itemsContainer: {
    backgroundColor: '#fff',
    marginHorizontal: Spacing.lg,
    borderRadius: 12,
    overflow: 'hidden',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  itemLabel: {
    fontSize: Typography.fontSize.medium,
    color: '#333',
  },
});
