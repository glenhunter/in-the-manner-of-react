/**
 * AnimatedBackground component
 * Displays a bokeh effect with blurry dots that slowly move and change size
 */

import React, {useEffect, useRef, useMemo} from 'react';
import {Animated, StyleSheet, View, Easing, Dimensions} from 'react-native';

// Color palette from coolors.co
const BOKEH_COLORS = [
  '#005f73', // dark teal
  '#0a9396', // teal
  '#94d2bd', // light teal/mint
  '#e9d8a6', // cream
  '#ee9b00', // orange
  '#ca6702', // dark orange
  '#bb3e03', // burnt orange
  '#ae2012', // dark red
  '#9b2226', // burgundy
];

const BACKGROUND_COLOR = '#001219'; // darkest color as background

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

interface BokehDotProps {
  color: string;
  initialX: number;
  initialY: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

function BokehDot({
  color,
  initialX,
  initialY,
  size,
  duration,
  delay,
  opacity,
}: BokehDotProps) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: duration,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: duration,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();
    return () => animation.stop();
  }, [animatedValue, duration, delay]);

  // Animate scale between 0.6 and 1.4
  const scale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 1.4],
  });

  // Subtle position drift
  const translateX = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 20, -10],
  });

  const translateY = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -15, 25],
  });

  return (
    <Animated.View
      style={[
        styles.bokehDot,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          opacity,
          left: initialX,
          top: initialY,
          transform: [{scale}, {translateX}, {translateY}],
          // Soft glow effect for bokeh blur
          shadowColor: color,
          shadowOffset: {width: 0, height: 0},
          shadowOpacity: 0.8,
          shadowRadius: size / 3,
        },
      ]}
    />
  );
}

// Generate random dots configuration
function generateDots(count: number): BokehDotProps[] {
  const dots: BokehDotProps[] = [];

  for (let i = 0; i < count; i++) {
    dots.push({
      color: BOKEH_COLORS[Math.floor(Math.random() * BOKEH_COLORS.length)],
      initialX: Math.random() * SCREEN_WIDTH - 50,
      initialY: Math.random() * SCREEN_HEIGHT - 50,
      size: 80 + Math.random() * 200, // 80-280px
      duration: 8000 + Math.random() * 12000, // 8-20 seconds
      delay: Math.random() * 3000, // 0-3 second delay
      opacity: 0.15 + Math.random() * 0.35, // 0.15-0.5 opacity
    });
  }

  return dots;
}

export function AnimatedBackground() {
  // Memoize dots so they don't regenerate on re-render
  const dots = useMemo(() => generateDots(12), []);

  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      {dots.map((dot, index) => (
        <BokehDot key={index} {...dot} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND_COLOR,
    overflow: 'hidden',
  },
  bokehDot: {
    position: 'absolute',
  },
});
