import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Modal} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const Dropdown = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleSelect = value => {
    setSelectedValue(value);
    toggleOptions();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.icon} onPress={toggleOptions}>
        <Svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <Path
            d="M8 6H21"
            stroke="#9EA0A5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M8 12H21"
            stroke="#9EA0A5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M8 18H21"
            stroke="#9EA0A5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M3 6H3.01"
            stroke="#9EA0A5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M3 12H3.01"
            stroke="#9EA0A5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M3 18H3.01"
            stroke="#9EA0A5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </TouchableOpacity>

      <Modal
        visible={showOptions}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleOptions}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleSelect('nameAsc')}>
              <Text>Name (A-Z)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleSelect('nameDesc')}>
              <Text>Name (Z-A)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleSelect('priceAsc')}>
              <Text>Sort by Skill</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    paddingHorizontal: 10,
  },
  dropdownButton: {
    height: 40,
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  option: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Dropdown;
