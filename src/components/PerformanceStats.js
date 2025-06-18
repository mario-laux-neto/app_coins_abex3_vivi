import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const PerformanceStats = ({ 
  totalCoins = 0, 
  completedActivities = 0, 
  readSummaries = 0, 
  attendanceRate = 0 
}) => {
  const stats = [
    {
      id: 'coins',
      label: 'Moedas',
      value: totalCoins,
      icon: 'coin',
      gradient: ['#FFD700', '#FFA000']
    },
    {
      id: 'activities',
      label: 'Atividades',
      value: completedActivities,
      icon: 'check-circle',
      gradient: ['#4CAF50', '#2E7D32']
    },
    {
      id: 'summaries',
      label: 'Resumos',
      value: readSummaries,
      icon: 'book-open',
      gradient: ['#2196F3', '#1565C0']
    },
    {
      id: 'attendance',
      label: 'Frequência',
      value: attendanceRate + '%',
      icon: 'calendar-check',
      gradient: ['#9C27B0', '#6A1B9A']
    }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Suas Estatísticas</Text>
      <View style={styles.statsGrid}>
        {stats.map((stat) => (
          <View key={stat.id} style={styles.statCard}>
            <LinearGradient
              colors={stat.gradient}
              style={styles.statGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <MaterialCommunityIcons
                name={stat.icon}
                size={24}
                color="white"
                style={styles.statIcon}
              />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </LinearGradient>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 15,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statGradient: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 90,
  },
  statIcon: {
    marginBottom: 6,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: 'white',
    textAlign: 'center',
    opacity: 0.9,
  },
});

export default PerformanceStats;
