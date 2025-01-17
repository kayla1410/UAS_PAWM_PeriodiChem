import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import supabase from '../supabaseClient';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Profile'
>;

type ProfileProps = {
  navigation: ProfileScreenNavigationProp;
};

const Profile: React.FC<ProfileProps> = ({ navigation }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [user, setUser] = useState<any>(null);
  
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const { data, error } = await supabase.auth.getUser();
          if (error) {
            throw error;
          }
          setUser(data.user);
        } catch (error) {
          Alert.alert('Error', 'Failed to fetch user data');
          console.error(error);
        }
      };
  
      fetchUser();
    }, []);
  
    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };
  
    const handleLogout = async () => {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) {
          throw error;
        }
        navigation.replace('SignIn'); 
      } catch (error) {
        Alert.alert('Error', 'Failed to log out');
        console.error(error);
      }
    };
  
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>PeriodiChem</Text>
          <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Dashboard')}>
            <Image source={{ uri: 'https://img.icons8.com/ios-filled/50/home.png' }} style={styles.homeIcon} />
          </TouchableOpacity>
        </View>
  
        {/* Profile Container */}
        <View style={styles.profileContainer}>
          <Text style={styles.title}>Profile</Text>
          <Image source={{ uri: 'https://img.icons8.com/ios-filled/100/user-male-circle.png' }} style={styles.profileIcon} />
          <Text style={styles.infoText}>Email: {user?.email || 'Loading...'}</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  header: {
    width: '100%',
    backgroundColor: '#F3C623',
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003366',
  },
  profileButton: {
    padding: 10,
  },
  homeIcon: {
    width: 30,
    height: 30,
  },
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    width: '80%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  profileIcon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  eyeIcon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  logoutButton: {
    backgroundColor: '#003366',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Profile;
