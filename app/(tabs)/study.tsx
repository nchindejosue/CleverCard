import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { GradientButton } from '@/components/ui/GradientButton';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { Colors } from '@/constants/Colors';
import {
  BookOpen,
  Brain,
  Trophy,
  Target,
  Clock,
  Star,
  Play,
  ChevronRight,
} from 'lucide-react-native';

interface Subject {
  id: string;
  name: string;
  icon: string;
  progress: number;
  score: number;
  color: string;
  questionsAvailable: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
}

export default function StudyHubScreen() {
  const [subjects] = useState<Subject[]>([
    {
      id: '1',
      name: 'Mathematics',
      icon: '🔢',
      progress: 75,
      score: 82,
      color: Colors.primary.blue,
      questionsAvailable: 45,
    },
    {
      id: '2',
      name: 'English',
      icon: '📚',
      progress: 60,
      score: 78,
      color: Colors.primary.green,
      questionsAvailable: 38,
    },
    {
      id: '3',
      name: 'Science',
      icon: '🔬',
      progress: 45,
      score: 71,
      color: Colors.primary.orange,
      questionsAvailable: 52,
    },
    {
      id: '4',
      name: 'Social Studies',
      icon: '🌍',
      progress: 85,
      score: 88,
      color: Colors.primary.yellow,
      questionsAvailable: 29,
    },
  ]);

  const [achievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'Quick Learner',
      description: 'Complete 10 quizzes in a day',
      icon: <Trophy size={20} color={Colors.primary.yellow} />,
      unlocked: true,
    },
    {
      id: '2',
      title: 'Math Champion',
      description: 'Score 90% in Mathematics',
      icon: <Target size={20} color={Colors.primary.blue} />,
      unlocked: false,
    },
    {
      id: '3',
      title: 'Consistent Student',
      description: 'Study for 7 days straight',
      icon: <Star size={20} color={Colors.primary.green} />,
      unlocked: true,
    },
  ]);

  const headerOpacity = useSharedValue(0);
  const contentTranslateY = useSharedValue(30);
  const aiCardScale = useSharedValue(0.9);

  React.useEffect(() => {
    headerOpacity.value = withTiming(1, { duration: 600 });
    contentTranslateY.value = withDelay(200, withSpring(0));
    aiCardScale.value = withDelay(400, withSpring(1));
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
  }));

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: contentTranslateY.value }],
  }));

  const aiCardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: aiCardScale.value }],
  }));

  const handleStartQuiz = (subject: Subject) => {
    console.log('Start quiz for:', subject.name);
  };

  const handleAITutor = () => {
    console.log('Open AI Tutor');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={Colors.gradients.primary}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView edges={['top']}>
          <Animated.View style={[styles.headerContent, headerAnimatedStyle]}>
            <View style={styles.headerTop}>
              <View>
                <Text style={styles.greeting}>Ready to learn,</Text>
                <Text style={styles.studentName}>Amir? 🎓</Text>
              </View>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg' }}
                style={styles.avatar}
              />
            </View>
            
            <View style={styles.streakContainer}>
              <View style={styles.streakItem}>
                <Text style={styles.streakNumber}>7</Text>
                <Text style={styles.streakLabel}>Day Streak</Text>
              </View>
              <View style={styles.streakItem}>
                <Text style={styles.streakNumber}>245</Text>
                <Text style={styles.streakLabel}>Points</Text>
              </View>
              <View style={styles.streakItem}>
                <Text style={styles.streakNumber}>12</Text>
                <Text style={styles.streakLabel}>Completed</Text>
              </View>
            </View>
          </Animated.View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.aiSection, aiCardAnimatedStyle]}>
          <AnimatedCard style={styles.aiCard} onPress={handleAITutor}>
            <LinearGradient
              colors={Colors.gradients.sunset}
              style={styles.aiCardGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.aiCardContent}>
                <Brain size={32} color={Colors.neutral[50]} />
                <View style={styles.aiCardText}>
                  <Text style={styles.aiCardTitle}>AI Study Companion</Text>
                  <Text style={styles.aiCardSubtitle}>
                    Get personalized help with your studies
                  </Text>
                </View>
                <ChevronRight size={20} color={Colors.neutral[50]} />
              </View>
            </LinearGradient>
          </AnimatedCard>
        </Animated.View>

        <Animated.View style={contentAnimatedStyle}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Continue Learning</Text>
            <View style={styles.subjectsGrid}>
              {subjects.map((subject, index) => (
                <AnimatedCard
                  key={subject.id}
                  style={styles.subjectCard}
                  onPress={() => handleStartQuiz(subject)}
                >
                  <View style={styles.subjectHeader}>
                    <Text style={styles.subjectIcon}>{subject.icon}</Text>
                    <ProgressRing
                      progress={subject.progress}
                      size={40}
                      strokeWidth={3}
                      color={subject.color}
                    />
                  </View>
                  <Text style={styles.subjectName}>{subject.name}</Text>
                  <Text style={styles.subjectScore}>Best: {subject.score}%</Text>
                  <View style={styles.subjectFooter}>
                    <Text style={styles.questionsCount}>
                      {subject.questionsAvailable} questions
                    </Text>
                    <Play size={16} color={subject.color} />
                  </View>
                </AnimatedCard>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionsRow}>
              <GradientButton
                title="Daily Challenge"
                onPress={() => console.log('Daily challenge')}
                gradient={Colors.gradients.primary}
                style={styles.actionButton}
              />
              <GradientButton
                title="Practice Test"
                onPress={() => console.log('Practice test')}
                gradient={Colors.gradients.success}
                style={styles.actionButton}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            {achievements.map((achievement) => (
              <AnimatedCard
                key={achievement.id}
                style={[
                  styles.achievementCard,
                  !achievement.unlocked && styles.lockedAchievement,
                ]}
              >
                <View style={styles.achievementContent}>
                  <View style={[
                    styles.achievementIcon,
                    !achievement.unlocked && styles.lockedIcon,
                  ]}>
                    {achievement.icon}
                  </View>
                  <View style={styles.achievementInfo}>
                    <Text style={[
                      styles.achievementTitle,
                      !achievement.unlocked && styles.lockedText,
                    ]}>
                      {achievement.title}
                    </Text>
                    <Text style={[
                      styles.achievementDescription,
                      !achievement.unlocked && styles.lockedText,
                    ]}>
                      {achievement.description}
                    </Text>
                  </View>
                  {achievement.unlocked && (
                    <View style={styles.unlockedBadge}>
                      <Star size={16} color={Colors.primary.yellow} fill={Colors.primary.yellow} />
                    </View>
                  )}
                </View>
              </AnimatedCard>
            ))}
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
  },
  header: {
    paddingBottom: 24,
  },
  headerContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 16,
    color: Colors.neutral[200],
    marginBottom: 4,
  },
  studentName: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.neutral[50],
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: Colors.neutral[50],
  },
  streakContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    paddingVertical: 16,
  },
  streakItem: {
    alignItems: 'center',
  },
  streakNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.neutral[50],
    marginBottom: 4,
  },
  streakLabel: {
    fontSize: 12,
    color: Colors.neutral[200],
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  aiSection: {
    marginTop: -12,
    marginBottom: 24,
  },
  aiCard: {
    padding: 0,
    overflow: 'hidden',
  },
  aiCardGradient: {
    padding: 20,
  },
  aiCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiCardText: {
    flex: 1,
    marginLeft: 16,
  },
  aiCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.neutral[50],
    marginBottom: 4,
  },
  aiCardSubtitle: {
    fontSize: 14,
    color: Colors.neutral[200],
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.neutral[800],
    marginBottom: 16,
  },
  subjectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  subjectCard: {
    width: '48%',
    paddingVertical: 20,
  },
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  subjectIcon: {
    fontSize: 24,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.neutral[800],
    marginBottom: 4,
  },
  subjectScore: {
    fontSize: 14,
    color: Colors.neutral[500],
    marginBottom: 12,
  },
  subjectFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionsCount: {
    fontSize: 12,
    color: Colors.neutral[400],
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
  achievementCard: {
    marginBottom: 12,
    paddingVertical: 16,
  },
  lockedAchievement: {
    opacity: 0.6,
  },
  achievementContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.neutral[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  lockedIcon: {
    backgroundColor: Colors.neutral[200],
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.neutral[800],
    marginBottom: 2,
  },
  achievementDescription: {
    fontSize: 14,
    color: Colors.neutral[500],
  },
  lockedText: {
    color: Colors.neutral[400],
  },
  unlockedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.neutral[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
});