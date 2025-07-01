import { useEffect } from 'react';
import { router } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';

export default function IndexScreen() {
  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      // For now, redirect to onboarding
      // In a real app, you'd check authentication state
      setTimeout(() => {
        router.replace('/(auth)/onboarding');
      }, 1000);
    };

    checkAuth();
  }, []);

  return (
    <LinearGradient
      colors={Colors.gradients.primary}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.content}>
        {/* Splash screen content can go here */}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});