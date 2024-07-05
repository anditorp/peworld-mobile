import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const SkillCard = ({skill}) => {
  const {skill_name} = skill;

  return (
    <View style={styles.skillCard}>
      <Text style={styles.skillText}>{skill_name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  skillCard: {
    backgroundColor: '#FBB017',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
    margin: 4,
  },
  skillText: {
    fontSize: 14,
    color: '#333',
  },
});

export default SkillCard;
