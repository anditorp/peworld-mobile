import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import React from 'react';
import {Search, Dropdown, SkillCard, ProfileCard} from '../../components/index';

const SearchScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.containerSearch}>
          <Search />
          <Dropdown />
        </View>
        <View>
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  containerSearch: {
    marginTop: 50,
    flexDirection: 'row',
  },
});
