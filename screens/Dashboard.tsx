import React, { useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, Text, TouchableOpacity, StyleSheet, Image,  Alert, ActivityIndicator } from 'react-native';

type RootStackParamList = {
  Dashboard: undefined;
  PeriodicTable: undefined;
  LevelSelectionPage: undefined;
  Profile: undefined;
  SignIn: undefined;
};

type DashboardScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Dashboard'
>;

type DashboardProps = {
  navigation: DashboardScreenNavigationProp;
};

const Dashboard: React.FC<DashboardProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>PeriodiChem</Text>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')} // Navigasi ke halaman Profile
        >
          <Image
            source={{ uri: 'https://img.icons8.com/ios-filled/50/user-male-circle.png' }} // Ikon profil
            style={styles.profileIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Happy Learning!</Text>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('PeriodicTable')}
        >
          <Text style={styles.cardText}>Periodic Table</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('LevelSelectionPage')}
        >
          <Text style={styles.cardText}>Quiz</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#F3C623', 
    paddingVertical: 5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003366', 
  },
  profileButton: {
    padding: 10,
  },
  profileIcon: {
    width: 40,
    height: 40,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#F5F5F5',
    padding: 70,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Dashboard;
