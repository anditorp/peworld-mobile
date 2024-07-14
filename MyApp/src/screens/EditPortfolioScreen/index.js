import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'react-native-image-picker';

const EditPortfolioScreen = ({navigation}) => {
  const [applicationName, setApplicationName] = useState('');
  const [linkRepository, setLinkRepository] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const pickImage = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          setImageUri(response.assets[0].uri);
        }
      },
    );
  };

  const handleSubmit = async () => {
    if (!applicationName || !linkRepository || !imageUri) {
      Alert.alert('Error', 'Please fill all fields and select an image.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const formData = new FormData();
      formData.append('application_name', applicationName);
      formData.append('link_repository', linkRepository);
      formData.append('image', {
        uri: imageUri,
        name: 'portfolio.jpg',
        type: 'image/jpeg',
      });

      await axios.post(
        'https://peworld-be-three.vercel.app/portofolio',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      Alert.alert('Success', 'Portfolio added successfully.');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to add portfolio.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Application Name"
        value={applicationName}
        onChangeText={setApplicationName}
      />
      <TextInput
        style={styles.input}
        placeholder="Link Repository"
        value={linkRepository}
        onChangeText={setLinkRepository}
      />
      <TouchableOpacity onPress={pickImage}>
        <Text style={styles.button}>Pick an image</Text>
      </TouchableOpacity>
      {imageUri && <Image source={{uri: imageUri}} style={styles.image} />}
      <Button style={styles.button} title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
  button: {
    color: 'white',
    backgroundColor: '#5E50A1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    textAlign: 'center',
  },
  image: {
    width: 300,
    height: 200,
    marginTop: 16,
    borderRadius: 10,
  },
});

export default EditPortfolioScreen;
