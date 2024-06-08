import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import SkillCard from './SkillCard';

const ProfileCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          source={require('../../../../assets/user-dumy.jpeg')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.name}>Louis Tomlinson</Text>
        <Text style={styles.role}>Web Developer</Text>
        <View style={styles.skillCardWrapper}>
          <SkillCard skillname="HTML" />
          <SkillCard skillname="CSS" />
          <SkillCard skillname="JavaScript" />
        </View>
      </View>
    </View>
  );
};

export default ProfileCard;

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
  role: {
    color: '#9EA0A5',
  },
  skillCardWrapper: {
    flexDirection: 'row',
    columnGap: 7,
  },
});
