import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { GradientButton } from '@/components/ui/GradientButton';
import { Colors } from '@/constants/Colors';
import { BookOpen, Users, TrendingUp } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const onboardingData = [
  {
    id: 1,
    title: 'Transform Education',
    subtitle: 'Digitize handwritten reports with AI-powered OCR technology',
    icon: BookOpen,
    gradient: Colors.gradients.primary,
  },
  {
    id: 2,
    title: 'Empower Teachers',
    subtitle: 'Save hours of manual work and focus on what matters most - teaching',
    icon: Users,
    gradient: Colors.gradients.success,
  },
  {
    id: 3,
    title: 'Track Progress',
    subtitle: 'Get intelligent insights and personalized recommendations for every pupil',
    icon: TrendingUp,
    gradient: Colors.gradients.sunset,
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      opacity.value = withTiming(0, { duration: 200 }, () => {
        setCurrentIndex(currentIndex + 1);
        opacity.value = withTiming(1, { duration: 300 });
      });
    } else {
      router.replace('/(auth)/login');
    }
  };

  const currentData = onboardingData[currentIndex];
  const IconComponent = currentData.icon;

  return (
    <LinearGradient
      colors={currentData.gradient}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Image
            source={require('@/assets/images/-7hqLpQi5H_u4awntIWve.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.brandName}>CleverCard</Text>
        </View>

        <Animated.View style={[styles.content, animatedStyle]}>
          <View style={styles.iconContainer}>
            <IconComponent size={80} color={Colors.neutral[50]} strokeWidth={1.5} />
          </View>

          <Text style={styles.title}>{currentData.title}</Text>
          <Text style={styles.subtitle}>{currentData.subtitle}</Text>
        </Animated.View>

        <View style={styles.footer}>
          <View style={styles.pagination}>
            {onboardingData.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index === currentIndex && styles.activeDot,
                ]}
              />
            ))}
          </View>

          <GradientButton
            title={currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
            onPress={handleNext}
            gradient={[Colors.neutral[50], Colors.neutral[100]]}
            textStyle={styles.buttonText}
            style={styles.button}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 60,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  brandName: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.neutral[50],
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.neutral[50],
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.neutral[100],
    textAlign: 'center',
    lineHeight: 26,
    opacity: 0.9,
  },
  footer: {
    paddingBottom: 40,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.neutral[300],
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: Colors.neutral[50],
    width: 24,
  },
  button: {
    marginHorizontal: 0,
  },
  buttonText: {
    color: Colors.primary.blue,
    fontWeight: '600',
  },
});