/**
 * AnimatedBackground component
 * Displays a smooth animated gradient background
 */

import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, Easing} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {GRADIENT_COLORS} from '../constants';

export function AnimatedBackground() {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 10000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 10000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ]),
    );

    animation.start();

    return () => animation.stop();
  }, [animatedValue]);

  // Interpolate colors for smooth animation
  const startColor = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [GRADIENT_COLORS[0], GRADIENT_COLORS[1], GRADIENT_COLORS[2]],
  });

  const endColor = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [GRADIENT_COLORS[1], GRADIENT_COLORS[2], GRADIENT_COLORS[0]],
  });

  return (
    <Animated.View style={StyleSheet.absoluteFill}>
      <LinearGradient
        colors={[startColor as any, endColor as any]}
        style={StyleSheet.absoluteFill}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
      />
    </Animated.View>
  );
}
