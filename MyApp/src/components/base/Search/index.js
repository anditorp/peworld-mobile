import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import SearchIcon from '../../../../assets/SearchIcon';

const Search = (searchInput, updateSearch, ...props) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <SearchIcon />
        <TextInput
          style={styles.searchInput}
          placeholder="Type Here..."
          onChangeText={updateSearch}
          value={searchInput}
          {...props}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffff',
    borderRadius: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    color: '#000',
  },
});

export default Search;
