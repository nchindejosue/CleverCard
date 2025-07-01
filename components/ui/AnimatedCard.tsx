import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Colors } from '@/constants/Colors';

interface AnimatedCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  elevation?: number;
}

export function AnimatedCard({ children, style, onPress, elevation = 2 }: AnimatedCardProps) {
  const scale = useSharedValue(1);
  const pressed = useSharedValue(false);

  const tap = Gesture.Tap()
    .onBegin(() => {
      pressed.value = true;
      scale.value = withSpring(0.98);
    })
    .onFinalize(() => {
      pressed.value = false;
      scale.value = withSpring(1);
      if (onPress) {
        onPress();
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    const shadowOpacity = interpolate(
      scale.value,
      [0.98, 1],
      [0.1, 0.15]
    );

    return {
      transform: [{ scale: scale.value }],
      shadowOpacity: withTiming(shadowOpacity, { duration: 150 }),
    };
  });

  return (
    <GestureDetector gesture={tap}>
      <Animated.View style={[styles.card, { elevation }, animatedStyle, style]}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.neutral[50],
    borderRadius: 16,
    padding: 16,
    shadowColor: Colors.neutral[900],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
});