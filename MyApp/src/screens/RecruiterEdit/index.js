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
import {Button} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ScrollView} from 'react-native-gesture-handler';

const RecruiterEdit = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [city, setCity] = useState('');
  const [position, setPosition] = useState('');
  const [phone, setPhone] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(
        'https://peworld-be-three.vercel.app/recruiter/profile',
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
      setCompany(profileData.company);
      setCity(profileData.city);
      setPosition(profileData.position);
      setPhone(profileData.phone);
      setInstagram(profileData.instagram);
      setLinkedin(profileData.linkedin);
      setDescription(profileData.description);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile data:', error);
      setLoading(false);
      if (error.response && error.response.status === 403) {
        Alert.alert('Unauthorized access. Please log in again.');
      } else if (error.response && error.response.status === 404) {
        Alert.alert('Profile not found. Please try again later.');
      } else {
        Alert.alert('Failed to fetch profile data. Please try again later.');
      }
    }
  };

  const handleChoosePhoto = () => {
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
        setPhoto(response.assets[0]);
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
        setPhoto(response.assets[0]);
      }
    });
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
      formData.append('company', company);
      formData.append('city', city);
      formData.append('position', position);
      formData.append('phone', phone);
      formData.append('instagram', instagram);
      formData.append('linkedin', linkedin);
      formData.append('description', description);

      const response = await axios.put(
        'https://peworld-be-three.vercel.app/recruiter/update-profile',
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
      navigation.navigate('RecruiterProfile', {updated: true});
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Failed to update profile');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.sectionTitle}>Edit Profile</Text>
          <View style={styles.imageWrapper}>
            <Image
              // source={
              //   profile.photo
              //     ? {uri: profile.photo}
              //     : require('../../../../MyApp/assets/user-dumy.jpeg')
              // }
              source={
                photo
                  ? {uri: photo.uri}
                  : profile.photo
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
            <Text style={styles.label}>Company</Text>
            <TextInput
              style={styles.input}
              value={company}
              onChangeText={text => setCompany(text)}
              placeholder="Enter your company"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>City</Text>
            <TextInput
              style={styles.input}
              value={city}
              onChangeText={text => setCity(text)}
              placeholder="Enter your city"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Position</Text>
            <TextInput
              style={styles.input}
              value={position}
              onChangeText={text => setPosition(text)}
              placeholder="Enter your position"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={text => setPhone(text)}
              placeholder="Enter your phone number"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Instagram</Text>
            <TextInput
              style={styles.input}
              value={instagram}
              onChangeText={text => setInstagram(text)}
              placeholder="Enter your instagram"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={linkedin}
              onChangeText={text => setLinkedin(text)}
              placeholder="Enter your linkedin"
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
          <Button
            title="Save Profile"
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
});

export default RecruiterEdit;
