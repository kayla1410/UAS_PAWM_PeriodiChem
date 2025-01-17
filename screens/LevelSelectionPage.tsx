import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { RootStackScreenProps } from '../navigation/StackNavigator'; 
import supabase from '../supabaseClient';

const LevelSelectionPage: React.FC<RootStackScreenProps<'LevelSelectionPage'>> = ({ navigation }) => {
  const levels = [
    { id: '1', name: 'Level 1' },
    { id: '2', name: 'Level 2' },
    { id: '3', name: 'Level 3' },
  ];

  const [passedLevels, setPassedLevels] = React.useState<{ [key: string]: boolean }>({
    1: false,
    2: false,
    3: false,
  });

  React.useEffect(() => {
    const fetchProgress = async () => {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
  
        if (userError || !user) {
          throw new Error(userError?.message || 'User not logged in');
        }
  
        const { data, error } = await supabase
          .from('user_progress')
          .select('level_1_passed, level_2_passed, level_3_passed')
          .eq('user_id', user.id)
          .single();
  
        if (error) {
          console.error('Failed to fetch progress:', error);
          Alert.alert('Error', 'Failed to load progress. Please try again.');
          return;
        }
  
        setPassedLevels({
          1: data?.level_1_passed || false,
          2: data?.level_2_passed || false,
          3: data?.level_3_passed || false,
        });
  
        console.log('Fetched progress:', data); 
      } catch (err) {
        console.error('Unexpected error:', err);
        Alert.alert('Error', 'An unexpected error occurred.');
      }
    };
  
    fetchProgress();
  }, []);  
  
  const handleLevelSelection = (level: string) => {
    console.log('Selected Level:', level);
    console.log('Passed Levels:', passedLevels);
    if (
      level === '1' || // Level 1 selalu bisa diakses
      (level === '2' && passedLevels[1]) || // Level 2 hanya jika level 1 lulus
      (level === '3' && passedLevels[2]) // Level 3 hanya jika level 2 lulus
    ) {
      navigation.navigate('QuizPage', { level });
    } else {
      Alert.alert('Locked', 'You must complete the previous level to unlock this level.');
    }
  };  

  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Level</Text>
      <View style={styles.levelContainer}>
        {levels.map((level) => (
        <TouchableOpacity
            key={level.id}
            style={[
                styles.levelButton,
                (!passedLevels[parseInt(level.id) - 1] && level.id !== '1') && styles.disabledButton,
            ]}
            onPress={() => handleLevelSelection(level.id)}
            disabled={!passedLevels[parseInt(level.id) - 1] && level.id !== '1'} 
        >
            <Text style={styles.levelText}>{level.name}</Text>
        </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.dashboardButton}
        onPress={() => navigation.navigate('Dashboard')}
      >
        <Text style={styles.dashboardButtonText}>Back to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  levelContainer: {
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelButton: {
    padding: 25,
    backgroundColor: '#003366',
    borderRadius: 15,
    marginHorizontal: 15, 
    alignItems: 'center',
  },
  levelButtonHover: {
    backgroundColor: '#FFD700',
  },
  disabledButton: {
    backgroundColor: '#B0BEC5',
  },
  levelText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  dashboardButton: {
    marginTop: 40,
    backgroundColor: '#F3C623',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    width: '30%',
  },
  dashboardButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LevelSelectionPage;
