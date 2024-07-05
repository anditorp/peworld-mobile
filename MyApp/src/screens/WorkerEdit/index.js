import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, SkillCardProfile} from '../../components';
import {useNavigation} from '@react-navigation/native';
import Svg, {Path} from 'react-native-svg';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-picker';
import {ScrollView} from 'react-native-gesture-handler';

const WorkerEdit = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [domicile, setDomicile] = useState('');
  const [description, setDescription] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const navigation = useNavigation();
  const [photo, setPhoto] = useState(null);

  const handleChoosePhoto = () => {
    // Display an alert with the options
    Alert.alert(
      'Choose Photo',
      'Do you want to take a photo from:',
      [
        {
          text: 'Camera',
          onPress: () => launchCameraAction(),
        },
        {
          text: 'Image Library',
          onPress: () => launchImageLibraryAction(),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };

  const launchCameraAction = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error:', response.errorMessage);
      } else {
        setPhoto(response);
      }
    });
  };

  const launchImageLibraryAction = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error:', response.errorMessage);
      } else {
        setPhoto(response);
      }
    });
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(
        'https://peworld-be-three.vercel.app/worker/profile',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('API Response:', response.data);
      if (response.data.status !== 'success') {
        throw new Error('Failed to fetch profile data');
      }
      const profileData = response.data.data;
      setProfile(profileData);
      setName(profileData.name);
      setJobDesc(profileData.job_desc);
      setDomicile(profileData.domicile);
      setDescription(profileData.description);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile data:', error);
      setLoading(false);
      if (error.response && error.response.status === 404) {
        Alert.alert('Profile not found. Please try again later.');
      } else {
        Alert.alert('Failed to fetch profile data. Please try again later.');
      }
    }
  };

  const handleSaveProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      let formData = new FormData();
      if (photo) {
        formData.append('photo', {
          uri: photo.uri,
          type: 'image/jpeg',
          name: 'profile_photo.jpg',
        });
      }

      formData.append('name', name);
      formData.append('job_desc', jobDesc);
      formData.append('domicile', domicile);
      formData.append('description', description);

      const response = await axios.put(
        'https://peworld-be-three.vercel.app/worker/update-profile',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      console.log('Profile Updated:', response.data);
      Alert.alert('Profile Updated Successfully');
      navigation.navigate('WorkerProfile', {updated: true});
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Failed to update profile');
    }
  };

  const handleDeleteSkill = async skillId => {
    try {
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
      const updatedSkills = profile.skills.filter(
        skill => skill.id !== skillId,
      );
      setProfile(prevProfile => ({
        ...prevProfile,
        skills: updatedSkills,
      }));
      Alert.alert('Skill Deleted Successfully');
    } catch (error) {
      console.error('Error deleting skill:', error);
      Alert.alert('Failed to delete skill');
    }
  };

  const handleAddSkill = async () => {
    try {
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
      const updatedSkills = [...profile.skills, response.data.data];
      setProfile(prevProfile => ({
        ...prevProfile,
        skills: updatedSkills,
      }));
      setNewSkill('');
      Alert.alert('Skill Added Successfully');
    } catch (error) {
      console.error('Error adding skill:', error);
      Alert.alert('Failed to add skill');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

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

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.sectionTitle}>Edit Profile</Text>
          <View style={styles.imageWrapper}>
            <Image
              source={
                profile.photo
                  ? {uri: profile.photo}
                  : require('../../../../MyApp/assets/user-dumy.jpeg')
              }
              style={styles.image}
              resizeMode="cover"
            />
            <TouchableOpacity
              style={{alignSelf: 'center'}}
              onPress={handleChoosePhoto}>
              <Text>Choose Photo</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={text => setName(text)}
              placeholder="Enter your name"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Job Description</Text>
            <TextInput
              style={styles.input}
              value={jobDesc}
              onChangeText={text => setJobDesc(text)}
              placeholder="Enter your job description"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Domicile</Text>
            <TextInput
              style={styles.input}
              value={domicile}
              onChangeText={text => setDomicile(text)}
              placeholder="Enter your domicile"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, {height: 100}]}
              multiline
              value={description}
              onChangeText={text => setDescription(text)}
              placeholder="Enter your description"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Skills</Text>
            <View style={styles.skillWrapper}>
              {profile.skills.map(skill => (
                <View key={skill.id} style={styles.skillCard}>
                  <TouchableOpacity
                    style={{flexDirection: 'row', alignItems: 'center'}}
                    onPress={() => handleDeleteSkill(skill.id)}>
                    <SkillCardProfile skillname={skill.skill_name} />
                    <DeleteIcon />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            <View style={styles.addSkillRow}>
              <TextInput
                style={[styles.input, {flex: 1}]}
                value={newSkill}
                onChangeText={text => setNewSkill(text)}
                placeholder="Enter new skill"
              />
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddSkill}>
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Button
            title="Save"
            onPress={handleSaveProfile}
            styleButton={{
              backgroundColor: '#5E50A1',
              marginVertical: 20,
            }}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default WorkerEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontSize: 16,
  },
  addSkillRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#FBB017',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 10,
  },
  addButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skillWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillCard: {
    marginRight: 10,
    marginBottom: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 999999,
    marginTop: 40,
    overflow: 'hidden',
    alignSelf: 'center',
  },
});
