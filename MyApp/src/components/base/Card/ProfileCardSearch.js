import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../Button/index';

const ProfileCardSearch = ({name, jobDesc, photo, userId}) => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    // Fetch user role
    const fetchUserRole = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(
          'https://peworld-be-three.vercel.app/user/check-role',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setRole(response.data.data.role);
      } catch (error) {
        console.error('Failed to fetch user role:', error);
      }
    };

    fetchUserRole();
  }, []);

  const handleHire = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post(
        'https://peworld-be-three.vercel.app/hire',
        {worker_id: userId},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      Alert.alert('Success', 'Worker has been hired successfully');
    } catch (error) {
      console.error('Failed to hire worker:', error);
      Alert.alert('Error', 'Failed to hire worker');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image source={{uri: photo}} style={styles.image} resizeMode="cover" />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.jobDesc}>{jobDesc ? jobDesc : '-'}</Text>
        {role === 'recruiter' && (
          <View style={styles.buttonWrapper}>
            <Button title="Hire" onPress={handleHire} />
          </View>
        )}
      </View>
    </View>
  );
};

export default ProfileCardSearch;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    marginVertical: 6,
    marginHorizontal: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
    overflow: 'hidden',
  },
  imageWrapper: {
    marginRight: 10,
  },
  textWrapper: {
    justifyContent: 'center',
    rowGap: 2,
  },
  name: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 17,
  },
  jobDesc: {
    color: '#9EA0A5',
  },
  skillCardWrapper: {
    flexDirection: 'row',
    columnGap: 7,
  },
  buttonWrapper: {
    flexDirection: 'row',
  },
});
