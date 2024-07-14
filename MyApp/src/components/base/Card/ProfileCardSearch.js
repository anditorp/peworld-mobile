import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../Button/index';

const ProfileCardSearch = ({name, jobDesc, photo, userId}) => {
  const [role, setRole] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [messagePurpose, setMessagePurpose] = useState('');
  const defaultImage = require('../../../../assets/dummy-user.png');

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
        {
          worker_id: userId,
          message_purpose: messagePurpose,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setModalVisible(false);
      Alert.alert('Success', 'Worker has been hired successfully');
    } catch (error) {
      console.error('Failed to hire worker:', error);
      Alert.alert('Error', 'Failed to hire worker');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          source={photo ? {uri: photo} : defaultImage}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.jobDesc}>{jobDesc ? jobDesc : '-'}</Text>
        {role === 'recruiter' && (
          <View style={styles.buttonWrapper}>
            <Button title="Hire" onPress={() => setModalVisible(true)} />
          </View>
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Message Purpose</Text>
            <TextInput
              style={styles.input}
              placeholder="Write your message here"
              value={messagePurpose}
              onChangeText={setMessagePurpose}
              multiline
            />
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <Button title="Hire" onPress={handleHire} />
            </View>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
