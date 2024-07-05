import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import axios from 'axios';
import {Button, SkillCard, PortofolioTab} from '../../components/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, {G, Defs, ClipPath, Rect, Path} from 'react-native-svg';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-picker';

const RecruiterProfile = ({navigation, route}) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [photo, setPhoto] = useState(null);

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
      if (response.uri) {
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
      if (response.uri) {
        setPhoto(response);
      }
    });
  };

  const updateProfilePhoto = async photoData => {
    try {
      const token = await AsyncStorage.getItem('token');
      const formData = new FormData();
      formData.append('photo', {
        uri: photoData.uri,
        type: photoData.type,
        name: 'photo.jpg',
      });
      const response = await axios.post(
        'https://peworld-be-three.vercel.app/recruiter/update-profile',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log('Update Photo Response:', response.data);
      if (response.data.status === 'success') {
        setProfile(prevProfile => ({
          ...prevProfile,
          photo: response.data.data.photo_url,
        }));
      } else {
        throw new Error('Failed to update profile photo');
      }
    } catch (error) {
      console.error('Error updating profile photo:', error);
      // Handle error state or retry logic
    }
  };

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
      setProfile(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile data:', error);
      setLoading(false);
      // Handle error state or retry logic
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProfileData();
    }, []),
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Error fetching profile data.</Text>
      </View>
    );
  }

  const navigateToEditProfile = () => {
    navigation.navigate('RecruiterEdit');
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.contentContainer}>
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
          <View style={styles.descriptionWrapper}>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.skill}>{profile.company}</Text>
            <Text style={styles.city}>{profile.city}</Text>
            <Text style={styles.description}>{profile.description}</Text>
          </View>

          <View style={styles.contactWrapper}>
            <View style={styles.email}>
              <Svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <Path
                  d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                  stroke="#9EA0A5"
                  strokeWidth={2.33333}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M22 6L12 13L2 6"
                  stroke="#9EA0A5"
                  strokeWidth={2.33333}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
              <Text>louistom@gmail.com</Text>
            </View>
            <View style={styles.instagram}>
              <Svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <G clipPath="url(#clip0_154_107)">
                  <Path
                    d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z"
                    stroke="#9EA0A5"
                    strokeWidth={2.33333}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <Path
                    d="M15.9997 11.3701C16.1231 12.2023 15.981 13.0523 15.5935 13.7991C15.206 14.5459 14.5929 15.1515 13.8413 15.5297C13.0898 15.908 12.2382 16.0397 11.4075 15.906C10.5768 15.7723 9.80947 15.3801 9.21455 14.7852C8.61962 14.1903 8.22744 13.4229 8.09377 12.5923C7.96011 11.7616 8.09177 10.91 8.47003 10.1584C8.84829 9.40691 9.45389 8.7938 10.2007 8.4063C10.9475 8.0188 11.7975 7.87665 12.6297 8.00006C13.4786 8.12594 14.2646 8.52152 14.8714 9.12836C15.4782 9.73521 15.8738 10.5211 15.9997 11.3701Z"
                    stroke="#9EA0A5"
                    strokeWidth={2.33333}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <Path
                    d="M17.5 6.5H17.51"
                    stroke="#9EA0A5"
                    strokeWidth={2.33333}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </G>
                <Defs>
                  <ClipPath id="clip0_154_107">
                    <Rect width="24" height="24" fill="white" />
                  </ClipPath>
                </Defs>
              </Svg>
              <Text>{profile.instagram}</Text>
            </View>
            <View style={styles.github}>
              <Svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <G clipPath="url(#clip0_154_116)">
                  <Path
                    d="M16 21.9999V18.1299C16.0375 17.6531 15.9731 17.1737 15.811 16.7237C15.6489 16.2737 15.3929 15.8634 15.06 15.5199C18.2 15.1699 21.5 13.9799 21.5 8.51994C21.4997 7.12376 20.9627 5.78114 20 4.76994C20.4559 3.54844 20.4236 2.19829 19.91 0.999938C19.91 0.999938 18.73 0.649938 16 2.47994C13.708 1.85876 11.292 1.85876 9 2.47994C6.27 0.649938 5.09 0.999938 5.09 0.999938C4.57638 2.19829 4.54414 3.54844 5 4.76994C4.03013 5.78864 3.49252 7.1434 3.5 8.54994C3.5 13.9699 6.8 15.1599 9.94 15.5499C9.611 15.8899 9.35726 16.2953 9.19531 16.7399C9.03335 17.1844 8.96681 17.658 9 18.1299V21.9999M9 18.9999C4 20.4999 4 16.4999 2 15.9999L9 18.9999Z"
                    stroke="#9EA0A5"
                    strokeWidth={2.33333}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </G>
                <Defs>
                  <ClipPath id="clip0_154_116">
                    <Rect width="24" height="24" fill="white" />
                  </ClipPath>
                </Defs>
              </Svg>
              <Text>@Louistommo</Text>
            </View>
            <View style={styles.gitlab}>
              <Svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <G clipPath="url(#clip0_154_114)">
                  <Path
                    d="M22.6501 14.39L12.0001 22.13L1.35014 14.39C1.20737 14.285 1.10146 14.1375 1.04758 13.9687C0.993694 13.7998 0.994592 13.6183 1.05014 13.45L2.27014 9.66996L4.71014 2.15996C4.73381 2.09877 4.77148 2.04397 4.82014 1.99996C4.89938 1.92758 5.00282 1.88745 5.11014 1.88745C5.21746 1.88745 5.3209 1.92758 5.40014 1.99996C5.45153 2.04963 5.48939 2.11158 5.51014 2.17996L7.95014 9.66996H16.0501L18.4901 2.15996C18.5138 2.09877 18.5515 2.04397 18.6001 1.99996C18.6794 1.92758 18.7828 1.88745 18.8901 1.88745C18.9975 1.88745 19.1009 1.92758 19.1801 1.99996C19.2315 2.04963 19.2694 2.11158 19.2901 2.17996L21.7301 9.68996L23.0001 13.45C23.0507 13.6234 23.0439 13.8086 22.9808 13.9779C22.9178 14.1473 22.8018 14.2918 22.6501 14.39V14.39Z"
                    stroke="#9EA0A5"
                    strokeWidth={2.33333}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </G>
                <Defs>
                  <ClipPath id="clip0_154_114">
                    <Rect width="24" height="24" fill="white" />
                  </ClipPath>
                </Defs>
              </Svg>
              <Text>@Louistommo91</Text>
            </View>
            <Button
              onPress={navigateToEditProfile}
              title={'Edit Profile'}
              styleButton={{
                marginHorizontal: 20,
                backgroundColor: '#5E50A1',
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecruiterProfile;

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: '#FFF',
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 10,
  },
  descriptionWrapper: {
    marginHorizontal: 20,
  },
  choosePhoto: {
    alignContent: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 999999,
    marginTop: 40,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  name: {
    textAlign: 'center',
    color: '#000',
    fontSize: 22,
    lineHeight: 56,
    fontWeight: '600',
  },
  skill: {
    color: '#000',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
  city: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  description: {
    lineHeight: 24,
    marginVertical: 20,
  },
  skillWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 20,
  },
  skillCard: {
    marginRight: 10,
    marginBottom: 10,
  },
  addSkillContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  contactWrapper: {
    marginVertical: 30,
    marginHorizontal: 20,
    gap: 20,
  },
  github: {
    flexDirection: 'row',
    columnGap: 10,
  },
  email: {
    flexDirection: 'row',
    columnGap: 10,
  },
  instagram: {
    flexDirection: 'row',
    columnGap: 10,
  },
  gitlab: {
    flexDirection: 'row',
    columnGap: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
