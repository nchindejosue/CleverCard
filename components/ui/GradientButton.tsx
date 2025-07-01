import React from 'react';
import { Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Colors } from '@/constants/Colors';

interface GradientButtonProps {
  title: string;
  onPress: () => void;
  gradient?: string[];
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

export function GradientButton({
  title,
  onPress,
  gradient = Colors.gradients.primary,
  style,
  textStyle,
  disabled = false,
}: GradientButtonProps) {
  const scale = useSharedValue(1);

  const tap = Gesture.Tap()
    .enabled(!disabled)
    .onBegin(() => {
      scale.value = withSpring(0.96);
    })
    .onFinalize(() => {
      scale.value = withSpring(1);
      if (!disabled) {
        onPress();
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <GestureDetector gesture={tap}>
      <Animated.View style={[animatedStyle, style]}>
        <LinearGradient
          colors={disabled ? [Colors.neutral[300], Colors.neutral[400]] : gradient}
          style={styles.button}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={[styles.text, textStyle, disabled && styles.disabledText]}>
            {title}
          </Text>
        </LinearGradient>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  text: {
    color: Colors.neutral[50],
    fontSize: 16,
    fontWeight: '600',
  },
  disabledText: {
    color: Colors.neutral[500],
  },
});