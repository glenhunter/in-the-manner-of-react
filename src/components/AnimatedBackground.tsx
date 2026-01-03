/**
 * AnimatedBackground component
 * Displays a gradient background with subtle animation
 */

import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, Easing} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {GRADIENT_COLORS} from '../constants';

export function AnimatedBackground() {
  const rotateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 20000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );

    animation.start();

    return () => animation.stop();
  }, [rotateValue]);

  // Animate a subtle rotation for visual interest
  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFill,
        {transform: [{rotate}, {scale: 1.5}]},
      ]}>
      <LinearGradient
        colors={[GRADIENT_COLORS[0], GRADIENT_COLORS[1], GRADIENT_COLORS[2]]}
        style={StyleSheet.absoluteFill}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
      />
    </Animated.View>
  );
}
