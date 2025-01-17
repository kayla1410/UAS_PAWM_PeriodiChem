import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Modal } from 'react-native';
import { RootStackScreenProps } from '../navigation/StackNavigator';
import ConfettiCannon from 'react-native-confetti-cannon';
import supabase from '../supabaseClient';

const gridSize = 40; 
const periodicTable = [
    { symbol: 'H', name: 'Hydrogen', row: 0, col: 0 },
    { symbol: '3', name: 'Helium', row: 0, col: 17 },
    { symbol: 'Li', name: 'Lithium', row: 1, col: 0 },
    { symbol: 'Be', name: 'Beryllium', row: 1, col: 1 },
    { symbol: 'B', name: 'Boron', row: 1, col: 12 },
    { symbol: 'C', name: 'Carbon', row: 1, col: 13 },
    { symbol: '1', name: 'Nitrogen', row: 1, col: 14 },
    { symbol: '4', name: 'Oxygen', row: 1, col: 15 },
    { symbol: 'F', name: 'Fluorine', row: 1, col: 16 },
    { symbol: 'Ne', name: 'Neon', row: 1, col: 17 },
    { symbol: 'Na', name: 'Sodium', row: 2, col: 0 },
    { symbol: '2', name: 'Magnesium', row: 2, col: 1 },
    { symbol: 'Al', name: 'Aluminium', row: 2, col: 12 },
    { symbol: 'Si', name: 'Silicon', row: 2, col: 13 },
    { symbol: 'P', name: 'Phosphorus', row: 2, col: 14 },
    { symbol: 'S', name: 'Sulfur', row: 2, col: 15 },
    { symbol: 'Cl', name: 'Chlorine', row: 2, col: 16 },
    { symbol: 'Ar', name: 'Argon', row: 2, col: 17 },
    { symbol: 'K', name: 'Potassium', row: 3, col: 0 },
    { symbol: 'Ca', name: 'Calcium', row: 3, col: 1 },
    { symbol: 'Sr', name: 'Strontium', row: 4, col: 1 },
    { symbol: '8', name: 'Barium', row: 5, col: 1 },
    { symbol: 'Ra', name: 'Radium', row: 6, col: 1 },
    { symbol: 'Sc', name: 'Scandium', row: 3, col: 2 },
    { symbol: 'Y', name: 'Yttrium', row: 4, col: 2 },
    { symbol: 'La', name: 'Lanthanum', row: 5, col: 2 },
    { symbol: 'Ac', name: 'Actinium', row: 6, col: 2 },
    { symbol: 'Ga', name: 'Gallium', row: 3, col: 12 },
    { symbol: 'In', name: 'Indium', row: 4, col: 12 },
    { symbol: 'Ti', name: 'Titanium', row: 3, col: 3 },
    { symbol: 'Nh', name: 'Nihonium', row: 6, col: 12 },
    { symbol: 'Si', name: 'Silicon', row: 2, col: 13 },
    { symbol: 'Ge', name: 'Germanium', row: 3, col: 13 },
    { symbol: 'Sn', name: 'Tin', row: 4, col: 13 },
    { symbol: 'Pb', name: 'Lead', row: 5, col: 13 },
    { symbol: 'Fl', name: 'Flerovium', row: 6, col: 13 },
    { symbol: 'As', name: 'Arsenic', row: 3, col: 14 },
    { symbol: 'Sb', name: 'Antimony', row: 4, col: 14 },
    { symbol: 'Bi', name: 'Bismuth', row: 5, col: 14 },
    { symbol: 'Mc', name: 'Moscovium', row: 6, col: 14 },
    { symbol: '7', name: 'Selenium', row: 3, col: 15 },
    { symbol: 'Te', name: 'Tellurium', row: 4, col: 15 },
    { symbol: 'Po', name: 'Polonium', row: 5, col: 15 },
    { symbol: 'Lv', name: 'Livermorium', row: 6, col: 15 },
    { symbol: 'Br', name: 'Bromine', row: 3, col: 16 },
    { symbol: 'I', name: 'Iodine', row: 4, col: 16 },
    { symbol: 'At', name: 'Astatine', row: 5, col: 16 },
    { symbol: 'Ts', name: 'Tennessine', row: 6, col: 16 },
    { symbol: '5', name: 'Rubidium', row: 4, col: 0 },
    { symbol: 'Cs', name: 'Cesium', row: 5, col: 0 },
    { symbol: 'Fr', name: 'Francium', row: 6, col: 0 },
    { symbol: 'Zr', name: 'Zirconium', row: 4, col: 3 },
    { symbol: 'Hf', name: 'Hafnium', row: 5, col: 3 },
    { symbol: 'Rf', name: 'Rutherfordium', row: 6, col: 3 },
    { symbol: 'Tl', name: 'Thallium', row: 5, col: 12 },
    { symbol: 'Kr', name: 'Krypton', row: 3, col: 17 },
    { symbol: '11', name: 'Xenon', row: 4, col: 17 },
    { symbol: 'Rn', name: 'Radon', row: 5, col: 17 },
    { symbol: 'Og', name: 'Oganesson', row: 6, col: 17 },
    { symbol: 'V', name: 'Vanadium', row: 3, col: 4 },
    { symbol: '6', name: 'Niobium', row: 4, col: 4 },
    { symbol: 'Ta', name: 'Tantalum', row: 5, col: 4 },
    { symbol: 'Db', name: 'Dubnium', row: 6, col: 4 },
    { symbol: 'Cr', name: 'Chromium', row: 3, col: 5 },
    { symbol: 'Mo', name: 'Molybdenum', row: 4, col: 5 },
    { symbol: 'W', name: 'Tungsten', row: 5, col: 5 },
    { symbol: 'Sg', name: 'Seaborgium', row: 6, col: 5 },
    { symbol: 'Mn', name: 'Manganese', row: 3, col: 6 },
    { symbol: 'Tc', name: 'Technetium', row: 4, col: 6 },
    { symbol: 'Re', name: 'Rhenium', row: 5, col: 6 },
    { symbol: 'Bh', name: 'Bohrium', row: 6, col: 6 },
    { symbol: '12', name: 'Iron', row: 3, col: 7 },
    { symbol: 'Co', name: 'Cobalt', row: 3, col: 8 },
    { symbol: 'Rh', name: 'Rhodium', row: 4, col: 8 },
    { symbol: 'Ir', name: 'Iridium', row: 5, col: 8 },
    { symbol: 'Mt', name: 'Meitnerium', row: 6, col: 8 },
    { symbol: 'Ni', name: 'Nickel', row: 3, col: 9 },
    { symbol: 'Pd', name: 'Palladium', row: 4, col: 9 },
    { symbol: '10', name: 'Platinum', row: 5, col: 9 },
    { symbol: 'Ds', name: 'Darmstadtium', row: 6, col: 9 },
    { symbol: 'Ru', name: 'Ruthenium', row: 4, col: 7 },
    { symbol: 'Os', name: 'Osmium', row: 5, col: 7 },
    { symbol: 'Hs', name: 'Hassium', row: 6, col: 7 },
    { symbol: '9', name: 'Copper', row: 3, col: 10 },
    { symbol: 'Ag', name: 'Silver', row: 4, col: 10 },
    { symbol: 'Au', name: 'Gold', row: 5, col: 10 },
    { symbol: 'Rg', name: 'Roentgenium', row: 6, col: 10 },
    { symbol: 'Zn', name: 'Zinc', row: 3, col: 11 },
    { symbol: 'Cd', name: 'Cadmium', row: 4, col: 11 },
    { symbol: 'Hg', name: 'Mercury', row: 5, col: 11 },
    { symbol: 'Cn', name: 'Copernicium', row: 6, col: 11 }
  ];  

const QuizPage: React.FC<RootStackScreenProps<'QuizPage'>> = ({ route, navigation }) => {
  const { level } = route.params;
  const totalSlots = level === '1' ? 4 : level === '2' ? 8 : 12;
  const [selectedElements, setSelectedElements] = useState<(string | null)[]>(Array(totalSlots).fill(null));
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showCongratsModal, setShowCongratsModal] = useState(false);
  const [score, setScore] = useState(0);
  const [passedLevels, setPassedLevels] = useState<{ [key: string]: boolean }>({ 1: true }); // Default level 1 passed
  const [showConfetti, setShowConfetti] = useState(false);
  const elements = level === '1'
  ? ['O', 'Fe', 'Mg', 'N', 'He']
  : level === '2'
  ? ['K', 'O', 'Nb', 'Fe', 'Se', 'Rb', 'Mg', 'He', 'Ba', 'N']
  : ['Cu', 'Mg', 'Pt', 'O', 'Ba', 'Rb', 'Nb', 'N', 'Fe', 'He', 'Xe', 'Se'];

  const correctAnswers = level === '1'
  ? ['N', 'Mg', 'He', 'O']
  : level === '2'
  ? ['N', 'Mg', 'He', 'O', 'Rb', 'Nb', 'Se', 'Ba']
  : ['N', 'Mg', 'He', 'O', 'Rb', 'Nb', 'Se', 'Ba', 'Cu', 'Pt', 'Xe', 'Fe'];

  useEffect(() => {
    setSelectedElements(Array(totalSlots).fill(null));
  }, [level]);

  const handleSelectSlot = (index: number) => {
    if (selectedElement) {
      const updatedElements = [...selectedElements];
      updatedElements[index] = selectedElement;
      setSelectedElements(updatedElements);
      setSelectedElement(null); 
    } else {
      Alert.alert('Error', 'Please select an element first!');
    }
  };

  const handleSubmit = async () => {
    let calculatedScore = 0;
    selectedElements.forEach((element, index) => {
      if (element === correctAnswers[index]) {
        calculatedScore++;
      }
    });
  
    setScore(calculatedScore);
  
    const isPassed = calculatedScore >= Math.ceil(totalSlots / 2);
  
    if (isPassed) {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
  
        if (userError || !user) {
          throw new Error(userError?.message || 'User not logged in');
        }
  
        const { error } = await supabase.from('user_progress').upsert(
            {
              user_id: user.id, 
              [`level_${level}_passed`]: true, 
            },
            {
              onConflict: ['user_id'], 
            }
          );
          
        if (error) {
          console.error('Failed to update progress:', error);
          Alert.alert('Error', 'Failed to save progress. Please try again.');
          return;
        }
  
        setPassedLevels((prev) => ({
          ...prev,
          [level]: true,
        }));
  
        if (level === '3') {
          setShowCongratsModal(true);
          setShowConfetti(true);
        } else {
          setShowModal(true);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        Alert.alert('Error', 'An unexpected error occurred.');
      }
    } else {
      setShowModal(true);
    }
  };
  
  const handleRestart = () => {
    setSelectedElements(Array(totalSlots).fill(null));
    setScore(0);
    setShowModal(false);
  };

  const handleNext = () => {
    if (score >= Math.ceil(totalSlots / 2)) {
      const nextLevel = String(Number(level) + 1);
      if (passedLevels[nextLevel] || Number(nextLevel) > 3) {
        Alert.alert('No more levels', 'You have completed all levels!');
      } else {
        navigation.navigate('QuizPage', { level: nextLevel });
      }
    } else {
      Alert.alert('Score too low', 'You need at least half the stars to proceed.');
    }
    setShowModal(false);
  };

  const handleCongratsNext = () => {
    setShowCongratsModal(false);
    setShowConfetti(false); // Hentikan confetti
    navigation.navigate('LevelSelectionPage');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>LEVEL {level}</Text>

      {/* Tabel Periodik */}
      <View style={styles.tableContainer}>
        <View style={styles.table}>
          {periodicTable.map((element, index) => (
            <View
              key={index}
              style={[
                styles.elementBox,
                {
                  top: element.row * gridSize, 
                  left: element.col * gridSize,
                },
                !isNaN(Number(element.symbol)) && styles.numberBox, 
              ]}
            >
              <Text style={styles.elementText}>{element.symbol}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Pertanyaan */}
      <View style={styles.gridContainer}>
        {Array.from({ length: totalSlots }).map((_, index) => (
          <TouchableOpacity
            key={index}
            style={styles.gridSlot}
            onPress={() => handleSelectSlot(index)}
          >
            <Text style={styles.gridText}>{selectedElements[index] || index + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Pilihan Elemen */}
      <View style={styles.optionsContainer}>
        {elements.map((element, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.optionItem, selectedElement === element && styles.selectedBox]}
            onPress={() => setSelectedElement(element)}
          >
            <Text style={styles.optionText}>{element}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tombol Submit */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      {/* Confetti */}
      {showConfetti && <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} fadeOut={true} />}

      {/* Modal untuk Skor */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Your Score</Text>
            <View style={styles.starsContainer}>
              {Array.from({ length: 5 }).map((_, index) => (
                <Text key={index} style={index < Math.round((score / totalSlots) * 5) ? styles.filledStar : styles.emptyStar}>
                  ★
                </Text>
              ))}
            </View>
            <Text style={styles.scoreText}>{score} / {totalSlots} Correct</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.restartButton} onPress={handleRestart}>
                <Text style={styles.buttonText}>Restart</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showCongratsModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCongratsModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.congratsTitle}>🎉 Congratulations! 🎉</Text>
            <Text style={styles.congratsMessage}>You have successfully completed all levels!</Text>
            <TouchableOpacity style={styles.backToSelectionButton} onPress={handleCongratsNext}>
                <Text style={styles.backToSelectionText}>Back to Level Selection</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  tableContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  table: {
    position: 'relative',
    width: gridSize * 18, 
    height: gridSize * 7,
  },
  elementBox: {
    position: 'absolute',
    width: gridSize - 5,
    height: gridSize - 5,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    margin: 2,
  },
  elementText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  gridSlot: {
    width: 60,
    height: 60,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    margin: 5,
  },
  gridText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  optionItem: {
    width: 70,
    height: 50,
    backgroundColor: '#03346E',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 5,
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#28a745',
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    height: '60%',
    width: '40%',
    backgroundColor: '#F3C623',
    borderRadius: 30,
    padding: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  filledStar: {
    fontSize: 30,
    color: '#00000',
    marginHorizontal: 5,
  },
  emptyStar: {
    fontSize: 30,
    color: '#FFFF',
    marginHorizontal: 5,
  },
  scoreText: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  restartButton: {
    flex: 1,
    backgroundColor: '#03346E',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  nextButton: {
    flex: 1,
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  congratsTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00000',
    marginBottom: 10,
    textAlign: 'center',
  },
  congratsMessage: {
    fontSize: 18,
    color: '#00000',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  selectedBox: {
    backgroundColor: '#FFC107',
  },
  numberBox: {
    backgroundColor: '#FFD700',
  },
  backToSelectionButton: {
    backgroundColor: '#28a745', 
    paddingVertical: 15, 
    paddingHorizontal: 20, 
    borderRadius: 10, 
    alignItems: 'center', 
    justifyContent: 'center', 
    width: '70%', 
    alignSelf: 'center', 
    marginTop: 20, 
  },
  backToSelectionText: {
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold', 
  },
  
});

export default QuizPage;
