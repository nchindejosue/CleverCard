import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
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
import { ProgressRing } from '@/components/ui/ProgressRing';
import { FloatingActionButton } from '@/components/ui/FloatingActionButton';
import { Colors } from '@/constants/Colors';
import {
  Users,
  FileText,
  TrendingUp,
  Award,
  Clock,
  Camera,
  Bell,
  ChevronRight,
} from 'lucide-react-native';

interface ClassData {
  id: string;
  name: string;
  pupilCount: number;
  completionRate: number;
  averageScore: number;
}

interface RecentActivity {
  id: string;
  type: 'scan' | 'report' | 'insight';
  title: string;
  subtitle: string;
  time: string;
  icon: React.ReactNode;
}

export default function DashboardScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [classes, setClasses] = useState<ClassData[]>([
    {
      id: '1',
      name: 'Primary 3A',
      pupilCount: 42,
      completionRate: 85,
      averageScore: 78,
    },
    {
      id: '2',
      name: 'Primary 4B',
      pupilCount: 38,
      completionRate: 92,
      averageScore: 82,
    },
    {
      id: '3',
      name: 'Primary 5A',
      pupilCount: 35,
      completionRate: 76,
      averageScore: 75,
    },
  ]);

  const [recentActivities] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'scan',
      title: 'Report cards scanned',
      subtitle: 'Primary 3A - 42 pupils processed',
      time: '2 hours ago',
      icon: <Camera size={20} color={Colors.primary.blue} />,
    },
    {
      id: '2',
      type: 'insight',
      title: 'AI Insight Generated',
      subtitle: 'John needs extra support in Mathematics',
      time: '4 hours ago',
      icon: <TrendingUp size={20} color={Colors.primary.green} />,
    },
    {
      id: '3',
      type: 'report',
      title: 'Reports Generated',
      subtitle: 'Primary 4B - All reports ready for distribution',
      time: '1 day ago',
      icon: <FileText size={20} color={Colors.primary.orange} />,
    },
  ]);

  const headerOpacity = useSharedValue(0);
  const cardTranslateY = useSharedValue(50);
  const statsOpacity = useSharedValue(0);

  useEffect(() => {
    headerOpacity.value = withTiming(1, { duration: 600 });
    cardTranslateY.value = withSpring(0, { damping: 15 });
    statsOpacity.value = withDelay(300, withTiming(1, { duration: 600 }));
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
  }));

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: cardTranslateY.value }],
  }));

  const statsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: statsOpacity.value,
  }));

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleScanReports = () => {
    // Navigate to camera/scan screen
    console.log('Navigate to scan screen');
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
                <Text style={styles.greeting}>Good morning,</Text>
                <Text style={styles.teacherName}>Mrs. Binta</Text>
              </View>
              <View style={styles.headerActions}>
                <AnimatedCard style={styles.notificationButton}>
                  <Bell size={24} color={Colors.neutral[50]} />
                  <View style={styles.notificationBadge} />
                </AnimatedCard>
                <Image
                  source={{ uri: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg' }}
                  style={styles.avatar}
                />
              </View>
            </View>
          </Animated.View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Animated.View style={[styles.statsContainer, statsAnimatedStyle]}>
          <View style={styles.statsRow}>
            <AnimatedCard style={styles.statCard}>
              <Users size={24} color={Colors.primary.blue} />
              <Text style={styles.statNumber}>115</Text>
              <Text style={styles.statLabel}>Total Pupils</Text>
            </AnimatedCard>
            <AnimatedCard style={styles.statCard}>
              <FileText size={24} color={Colors.primary.green} />
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Active Classes</Text>
            </AnimatedCard>
          </View>
          <View style={styles.statsRow}>
            <AnimatedCard style={styles.statCard}>
              <Award size={24} color={Colors.primary.yellow} />
              <Text style={styles.statNumber}>78%</Text>
              <Text style={styles.statLabel}>Avg. Score</Text>
            </AnimatedCard>
            <AnimatedCard style={styles.statCard}>
              <Clock size={24} color={Colors.primary.orange} />
              <Text style={styles.statNumber}>84%</Text>
              <Text style={styles.statLabel}>Completion</Text>
            </AnimatedCard>
          </View>
        </Animated.View>

        <Animated.View style={cardAnimatedStyle}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>My Classes</Text>
            {classes.map((classItem, index) => (
              <AnimatedCard
                key={classItem.id}
                style={[styles.classCard, { marginBottom: 12 }]}
                onPress={() => console.log('Navigate to class details')}
              >
                <View style={styles.classCardContent}>
                  <View style={styles.classInfo}>
                    <Text style={styles.className}>{classItem.name}</Text>
                    <Text style={styles.pupilCount}>
                      {classItem.pupilCount} pupils
                    </Text>
                    <View style={styles.classStats}>
                      <Text style={styles.averageScore}>
                        Avg: {classItem.averageScore}%
                      </Text>
                    </View>
                  </View>
                  <View style={styles.classProgress}>
                    <ProgressRing
                      progress={classItem.completionRate}
                      size={50}
                      strokeWidth={4}
                    />
                    <Text style={styles.progressText}>
                      {classItem.completionRate}%
                    </Text>
                  </View>
                  <ChevronRight size={20} color={Colors.neutral[400]} />
                </View>
              </AnimatedCard>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            {recentActivities.map((activity) => (
              <AnimatedCard
                key={activity.id}
                style={[styles.activityCard, { marginBottom: 8 }]}
              >
                <View style={styles.activityContent}>
                  <View style={styles.activityIcon}>
                    {activity.icon}
                  </View>
                  <View style={styles.activityInfo}>
                    <Text style={styles.activityTitle}>{activity.title}</Text>
                    <Text style={styles.activitySubtitle}>{activity.subtitle}</Text>
                  </View>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
              </AnimatedCard>
            ))}
          </View>
        </Animated.View>
      </ScrollView>

      <FloatingActionButton
        onPress={handleScanReports}
        icon={<Camera size={24} color={Colors.neutral[50]} />}
      />
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
  },
  greeting: {
    fontSize: 16,
    color: Colors.neutral[200],
    marginBottom: 4,
  },
  teacherName: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.neutral[50],
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary.orange,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: Colors.neutral[50],
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  statsContainer: {
    marginTop: -12,
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.neutral[800],
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.neutral[500],
    textAlign: 'center',
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
  classCard: {
    paddingVertical: 20,
  },
  classCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  classInfo: {
    flex: 1,
  },
  className: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.neutral[800],
    marginBottom: 4,
  },
  pupilCount: {
    fontSize: 14,
    color: Colors.neutral[500],
    marginBottom: 8,
  },
  classStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  averageScore: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primary.green,
  },
  classProgress: {
    alignItems: 'center',
    marginRight: 16,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.neutral[600],
    marginTop: 4,
  },
  activityCard: {
    paddingVertical: 16,
  },
  activityContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.neutral[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.neutral[800],
    marginBottom: 2,
  },
  activitySubtitle: {
    fontSize: 14,
    color: Colors.neutral[500],
  },
  activityTime: {
    fontSize: 12,
    color: Colors.neutral[400],
  },
});