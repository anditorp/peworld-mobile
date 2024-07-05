import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const InboxCard = ({company}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        <Text style={styles.name}>{company ? company : 'PT. Harus Bisa'}</Text>
        <Text style={styles.jobDesc}>
          Congratulations, you have been recruited by{' '}
          {company ? company : 'PT. Harus Bisa'}
        </Text>
      </View>
    </View>
  );
};

export default InboxCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    marginVertical: 6,
    marginHorizontal: 10,
  },
  textWrapper: {
    justifyContent: 'center',
  },
  name: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 17,
  },
  jobDesc: {
    color: '#9EA0A5',
  },
});
