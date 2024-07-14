import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditExperienceScreen = ({navigation}) => {
  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');
  const [workYear, setWorkYear] = useState('');
  const [workMonth, setWorkMonth] = useState('');
  const [description, setDescription] = useState('');

  const handleAddExperience = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.post(
        'https://peworld-be-three.vercel.app/experience',
        {
          position,
          company,
          work_year: workYear,
          work_month: workMonth,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res.data.status === 'success') {
        Alert.alert('Success', 'Experience added successfully.');
        navigation.navigate('WorkerProfile', {updated: true});
      } else {
        Alert.alert('Error', 'Failed to add experience.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to add experience.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Experience</Text>
      <TextInput
        style={styles.input}
        placeholder="Position"
        value={position}
        onChangeText={setPosition}
      />
      <TextInput
        style={styles.input}
        placeholder="Company"
        value={company}
        onChangeText={setCompany}
      />
      <TextInput
        style={styles.input}
        placeholder="Work Year"
        value={workYear}
        onChangeText={setWorkYear}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Work Month"
        value={workMonth}
        onChangeText={setWorkMonth}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Button title="Add Experience" onPress={handleAddExperience} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default EditExperienceScreen;
