import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
} from 'react-native-reanimated';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { FloatingActionButton } from '@/components/ui/FloatingActionButton';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { Colors } from '@/constants/Colors';
import {
  Search,
  Users,
  TrendingUp,
  FileText,
  ChevronRight,
  Plus,
} from 'lucide-react-native';

interface ClassItem {
  id: string;
  name: string;
  gradeLevel: string;
  pupilCount: number;
  completionRate: number;
  averageScore: number;
  recentActivity: string;
}

export default function ClassesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [classes] = useState<ClassItem[]>([
    {
      id: '1',
      name: 'Primary 3A',
      gradeLevel: 'Grade 3',
      pupilCount: 42,
      completionRate: 85,
      averageScore: 78,
      recentActivity: 'Reports generated 2 hours ago',
    },
    {
      id: '2',
      name: 'Primary 4B',
      gradeLevel: 'Grade 4',
      pupilCount: 38,
      completionRate: 92,
      averageScore: 82,
      recentActivity: 'Scanned documents 1 day ago',
    },
    {
      id: '3',
      name: 'Primary 5A',
      gradeLevel: 'Grade 5',
      pupilCount: 35,
      completionRate: 76,
      averageScore: 75,
      recentActivity: 'AI insights generated 3 hours ago',
    },
    {
      id: '4',
      name: 'Primary 2C',
      gradeLevel: 'Grade 2',
      pupilCount: 40,
      completionRate: 68,
      averageScore: 71,
      recentActivity: 'Pending document scan',
    },
  ]);

  const headerOpacity = useSharedValue(0);
  const listTranslateY = useSharedValue(30);

  React.useEffect(() => {
    headerOpacity.value = withSpring(1);
    listTranslateY.value = withDelay(200, withSpring(0));
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
  }));

  const listAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: listTranslateY.value }],
  }));

  const filteredClasses = classes.filter(classItem =>
    classItem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    classItem.gradeLevel.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddClass = () => {
    console.log('Add new class');
  };

  const handleClassPress = (classItem: ClassItem) => {
    console.log('Navigate to class details:', classItem.id);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <Animated.View style={[styles.header, headerAnimatedStyle]}>
          <Text style={styles.title}>My Classes</Text>
          <Text style={styles.subtitle}>Manage your classes and pupils</Text>
          
          <View style={styles.searchContainer}>
            <Search size={20} color={Colors.neutral[400]} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search classes..."
              placeholderTextColor={Colors.neutral[400]}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </Animated.View>

        <Animated.View style={[styles.content, listAnimatedStyle]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.statsRow}>
              <AnimatedCard style={styles.statCard}>
                <Users size={24} color={Colors.primary.blue} />
                <Text style={styles.statNumber}>{classes.length}</Text>
                <Text style={styles.statLabel}>Total Classes</Text>
              </AnimatedCard>
              <AnimatedCard style={styles.statCard}>
                <TrendingUp size={24} color={Colors.primary.green} />
                <Text style={styles.statNumber}>
                  {Math.round(classes.reduce((acc, c) => acc + c.averageScore, 0) / classes.length)}%
                </Text>
                <Text style={styles.statLabel}>Avg Performance</Text>
              </AnimatedCard>
            </View>

            <View style={styles.classList}>
              {filteredClasses.map((classItem, index) => (
                <AnimatedCard
                  key={classItem.id}
                  style={[styles.classCard, { marginBottom: 16 }]}
                  onPress={() => handleClassPress(classItem)}
                >
                  <View style={styles.classHeader}>
                    <View style={styles.classInfo}>
                      <Text style={styles.className}>{classItem.name}</Text>
                      <Text style={styles.gradeLevel}>{classItem.gradeLevel}</Text>
                    </View>
                    <View style={styles.progressContainer}>
                      <ProgressRing
                        progress={classItem.completionRate}
                        size={45}
                        strokeWidth={4}
                        color={
                          classItem.completionRate >= 80
                            ? Colors.primary.green
                            : classItem.completionRate >= 60
                            ? Colors.primary.yellow
                            : Colors.primary.orange
                        }
                      />
                      <Text style={styles.progressText}>
                        {classItem.completionRate}%
                      </Text>
                    </View>
                  </View>

                  <View style={styles.classStats}>
                    <View style={styles.statItem}>
                      <Users size={16} color={Colors.neutral[500]} />
                      <Text style={styles.statText}>{classItem.pupilCount} pupils</Text>
                    </View>
                    <View style={styles.statItem}>
                      <TrendingUp size={16} color={Colors.neutral[500]} />
                      <Text style={styles.statText}>Avg: {classItem.averageScore}%</Text>
                    </View>
                  </View>

                  <View style={styles.recentActivity}>
                    <FileText size={14} color={Colors.neutral[400]} />
                    <Text style={styles.activityText}>{classItem.recentActivity}</Text>
                    <ChevronRight size={16} color={Colors.neutral[400]} />
                  </View>
                </AnimatedCard>
              ))}
            </View>

            {filteredClasses.length === 0 && (
              <View style={styles.emptyState}>
                <Users size={48} color={Colors.neutral[300]} />
                <Text style={styles.emptyTitle}>No classes found</Text>
                <Text style={styles.emptySubtitle}>
                  {searchQuery ? 'Try adjusting your search' : 'Create your first class to get started'}
                </Text>
              </View>
            )}
          </ScrollView>
        </Animated.View>
      </SafeAreaView>

      <FloatingActionButton
        onPress={handleAddClass}
        icon={<Plus size={24} color={Colors.neutral[50]} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: Colors.neutral[50],
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.neutral[800],
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.neutral[500],
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral[100],
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.neutral[800],
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
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
  classList: {
    paddingBottom: 100,
  },
  classCard: {
    padding: 20,
  },
  classHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  classInfo: {
    flex: 1,
  },
  className: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.neutral[800],
    marginBottom: 4,
  },
  gradeLevel: {
    fontSize: 14,
    color: Colors.neutral[500],
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.neutral[600],
    marginTop: 4,
  },
  classStats: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 14,
    color: Colors.neutral[600],
    fontWeight: '500',
  },
  recentActivity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
  },
  activityText: {
    flex: 1,
    fontSize: 14,
    color: Colors.neutral[500],
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.neutral[600],
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.neutral[400],
    textAlign: 'center',
    lineHeight: 20,
  },
});