import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import SkillCard from './SkillCard';

const ProfileCard = ({worker}) => {
  const {name, job_desc, photo, skills} = worker;

  return (
    <TouchableOpacity style={styles.card}>
      <Image source={{uri: photo}} style={styles.profileImage} />
      <View style={styles.cardContent}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.jobDesc}>{job_desc}</Text>
        <View style={styles.skillContainer}>
          {skills.map(skill => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  jobDesc: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  skillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default ProfileCard;
