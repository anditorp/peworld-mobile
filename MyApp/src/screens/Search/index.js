import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  TextInput,
  ActivityIndicator,
  Modal,
} from 'react-native';
import axios from 'axios';
import ProfileCard from '../../components/base/Card/ProfileCard';
import Svg, {Path} from 'react-native-svg';

const SearchScreen = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [worker, setWorker] = useState([]);
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: '',
    sort: '',
  });

  const [searchInput, setSearchInput] = useState('');
  const [selectedSort, setSelectedSort] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const getWorker = async () => {
    try {
      const res = await axios.get(
        'https://peworld-be-three.vercel.app/worker',
        // `${process.env.API_BACKEND}/worker`,
        {
          params: {
            limit: params.limit,
            page: params.page,
            ...(params.search ? {search: params.search} : {}),
            ...(params.sort ? {sort: params.sort} : {}),
          },
        },
      );

      const {data} = res.data;
      setWorker(current => [...current, ...data]);
      setLoading(false); // Set loading to false after successful data fetch
    } catch (error) {
      setLoading(false);
      setError('Failed to load data');
    }
  };

  useEffect(() => {
    getWorker();
  }, [params]);

  const renderLoader = () => {
    return loading && <ActivityIndicator size="large" color="#ffff" />;
  };

  const loadMoreItem = () => {
    setParams(current => ({
      ...current,
      page: current.page + 1,
    }));
  };

  const handleSearch = () => {
    setWorker([]);
    setParams({...params, search: searchInput, sort: selectedSort, page: 1});
    setLoading(true);
  };
  const handleSearchDropdown = () => {
    setWorker([]);
    setParams({...params, search: searchInput, sort: selectedSort, page: 1});
    setLoading(true);
    toggleOptions();
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleSelect = value => {
    setSelectedSort(value);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.containerSearch}>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.searchInput}
              placeholder="Type Here..."
              onChangeText={setSearchInput}
              value={searchInput}
            />
            <TouchableOpacity onPress={handleSearch}>
              <Svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <Path
                  d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                  stroke="#9EA0A5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M20.9984 20.9999L16.6484 16.6499"
                  stroke="#9EA0A5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </TouchableOpacity>
          </View>
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
        </View>
        <Modal
          visible={showOptions}
          transparent={true}
          animationType="slide"
          onRequestClose={toggleOptions}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={[
                  styles.option,
                  selectedSort === 'name' && styles.selectedOption,
                ]}
                onPress={() => handleSelect('name')}>
                <Text>Name (A-Z) || (Z-A)</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.option,
                  selectedSort === 'job_desc' && styles.selectedOption,
                ]}
                onPress={() => handleSelect('job_desc')}>
                <Text>Sort by Job Description</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSearchDropdown}
                style={{
                  alignItems: 'flex-end',
                  paddingTop: 10,
                  borderTopWidth: 1,
                  borderTopColor: '#ccc',
                }}>
                <Svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                    stroke="#9EA0A5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <Path
                    d="M20.9984 20.9999L16.6484 16.6499"
                    stroke="#9EA0A5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View>
          <FlatList
            data={worker}
            keyExtractor={(item, index) => `${item.id}_${index}`}
            renderItem={({item}) => (
              <ProfileCard name={item.name} jobDesc={item.job_desc} />
            )}
            ListFooterComponent={renderLoader}
            onEndReached={loadMoreItem}
            onEndReachedThreshold={0}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerSearch: {
    marginTop: 50,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 10,
    width: '90%',
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    color: '#000',
  },
  icon: {
    paddingHorizontal: 10,
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
  },
  selectedOption: {
    backgroundColor: '#d3d3d3',
    borderRadius: 5,
  },
});

export default SearchScreen;
