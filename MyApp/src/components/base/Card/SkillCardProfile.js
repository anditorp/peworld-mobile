import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const SkillCardProfile = ({skillname, style, ...props}) => {
  return (
    <View style={[styles.container, style]} {...props}>
      <Text style={{color: '#fff', fontWeight: '800'}}>
        {skillname ? skillname : 'skill'}
      </Text>
    </View>
  );
};

export default SkillCardProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FBB017',
    alignSelf: 'flex-start',
    borderRadius: 5,
    padding: 5,
  },
});
