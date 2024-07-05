import {StyleSheet, Text, View} from 'react-native';
import {InboxCard} from '../../components/index';
import React from 'react';

const Inbox = () => {
  return (
    <View>
      <Text style={styles.title}>Inbox</Text>
      <InboxCard></InboxCard>
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
});
