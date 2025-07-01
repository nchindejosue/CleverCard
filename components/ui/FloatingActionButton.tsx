import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Plus } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';

interface FloatingActionButtonProps {
  onPress: () => void;
  icon?: React.ReactNode;
}

export function FloatingActionButton({ onPress, icon }: FloatingActionButtonProps) {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const tap = Gesture.Tap()
    .onBegin(() => {
      scale.value = withSpring(0.9);
      rotation.value = withSequence(
        withSpring(45),
        withSpring(0)
      );
    })
    .onFinalize(() => {
      scale.value = withSpring(1);
      onPress();
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
    ],
  }));

  return (
    <GestureDetector gesture={tap}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <LinearGradient
          colors={Colors.gradients.sunset}
          style={styles.button}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {icon || <Plus size={24} color={Colors.neutral[50]} strokeWidth={2.5} />}
        </LinearGradient>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    shadowColor: Colors.neutral[900],
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
});