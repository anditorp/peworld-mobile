import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {InboxCard} from '../../components/index';

const Inbox = () => {
  const [inbox, setInbox] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchInbox = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(
        'https://peworld-be-three.vercel.app/hire/worker',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('API Response:', response.data);
      if (response.data.status !== 'success') {
        throw new Error('Failed to fetch inbox data');
      }
      setInbox(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching inbox data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInbox();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!inbox) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Error fetching inbox data.</Text>
      </View>
    );
  }

  return (
    <View>
      <Text style={styles.title}>Inbox</Text>
      {inbox.map(item => (
        <View key={item.id} style={styles.inboxCard}>
          <InboxCard
            company={item.company}
            message_purpose={item.message_purpose}
          />
        </View>
      ))}
    </View>
  );
};

export default Inbox;

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: '500',
    marginHorizontal: 15,
    marginVertical: 35,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inboxCard: {
    marginHorizontal: 15,
  },
});
