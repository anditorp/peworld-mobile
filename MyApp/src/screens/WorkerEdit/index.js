import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, {Path} from 'react-native-svg';

const DeleteIcon = () => (
  <Svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#000000"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <Path d="M18 6L6 18M6 6l12 12" />
  </Svg>
);

const WorkerEdit = ({profile, onUpdateProfile}) => {
  const [editedProfile, setEditedProfile] = useState({
    name: profile.name,
    job_desc: profile.job_desc,
    domicile: profile.domicile,
    description: profile.description,
  });
  const [newSkill, setNewSkill] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      const response = await axios.put(
        'https://peworld-be-three.vercel.app/worker/profile',
        editedProfile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('Profile Updated:', response.data);
      onUpdateProfile(response.data.data);
      setLoading(false);
      Alert.alert('Profile Updated Successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      setLoading(false);
      Alert.alert('Failed to update profile');
    }
  };

  const handleDeleteSkill = async skillId => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      const response = await axios.delete(
        `https://peworld-be-three.vercel.app/skill/${skillId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('Skill Deleted:', response.data);
      onUpdateProfile(prevProfile => ({
        ...prevProfile,
        skills: prevProfile.skills.filter(skill => skill.id !== skillId),
      }));
      setLoading(false);
      Alert.alert('Skill Deleted Successfully');
    } catch (error) {
      console.error('Error deleting skill:', error);
      setLoading(false);
      Alert.alert('Failed to delete skill');
    }
  };

  const handleAddSkill = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post(
        'https://peworld-be-three.vercel.app/skill',
        {skill_name: newSkill},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('Skill Added:', response.data);
      onUpdateProfile(prevProfile => ({
        ...prevProfile,
        skills: [...prevProfile.skills, response.data.data],
      }));
      setNewSkill('');
      setLoading(false);
      Alert.alert('Skill Added Successfully');
    } catch (error) {
      console.error('Error adding skill:', error);
      setLoading(false);
      Alert.alert('Failed to add skill');
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Edit Profile Section */}
        <Text style={styles.sectionTitle}>Edit Profile</Text>
        <TextInput
          style={styles.input}
          value={editedProfile.name}
          onChangeText={text =>
            setEditedProfile(prevState => ({
              ...prevState,
              name: text,
            }))
          }
          placeholder="Name"
        />
        <TextInput
          style={styles.input}
          value={editedProfile.job_desc}
          onChangeText={text =>
            setEditedProfile(prevState => ({
              ...prevState,
              job_desc: text,
            }))
          }
          placeholder="Job Description"
        />
        <TextInput
          style={styles.input}
          value={editedProfile.domicile}
          onChangeText={text =>
            setEditedProfile(prevState => ({
              ...prevState,
              domicile: text,
            }))
          }
          placeholder="Domicile"
        />
        <TextInput
          style={[styles.input, {height: 100}]}
          value={editedProfile.description}
          onChangeText={text =>
            setEditedProfile(prevState => ({
              ...prevState,
              description: text,
            }))
          }
          placeholder="Description"
          multiline
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleUpdateProfile}
          disabled={loading}>
          <Text style={styles.buttonText}>
            {loading ? 'Updating...' : 'Update Profile'}
          </Text>
        </TouchableOpacity>

        {/* Edit Skills Section */}
        <Text style={styles.sectionTitle}>Edit Skills</Text>
        <View style={styles.skillWrapper}>
          {profile.skills.map(skill => (
            <View key={skill.id} style={styles.skillCard}>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() => handleDeleteSkill(skill.id)}
                disabled={loading}>
                <Text>{skill.skill_name}</Text>
                <DeleteIcon />
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <View style={styles.addSkillContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add new skill"
            value={newSkill}
            onChangeText={text => setNewSkill(text)}
          />
          <TouchableOpacity
            style={[styles.button, {marginLeft: 10}]}
            onPress={handleAddSkill}
            disabled={loading}>
            <Text style={styles.buttonText}>
              {loading ? 'Adding...' : 'Add Skill'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#5E50A1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  skillWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  skillCard: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  addSkillContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default WorkerEdit;
