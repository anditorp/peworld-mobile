import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PortofolioTab = () => {
  const [activeTab, setActiveTab] = useState('portfolio');
  const [portfolioData, setPortfolioData] = useState([]);
  const [experienceData, setExperienceData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'portfolio') {
      fetchPortfolioData();
    } else {
      fetchExperienceData();
    }
  }, [activeTab]);

  const fetchPortfolioData = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get(
        'https://peworld-be-three.vercel.app/portofolio/my-portofolio',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setPortfolioData(res.data.data);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to fetch portfolio data.');
    }
    setLoading(false);
  };

  const fetchExperienceData = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get(
        'https://peworld-be-three.vercel.app/experience/my-experience',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setExperienceData(res.data.data);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to fetch experience data.');
    }
    setLoading(false);
  };

  const renderTabContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }

    const data = activeTab === 'portfolio' ? portfolioData : experienceData;

    return (
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.item}>
            {activeTab === 'portfolio' ? (
              <>
                {/* <Text style={styles.title}>{item.application_name}</Text>
                <Text>{item.application}</Text>
                <Text style={styles.link}>{item.link_repository}</Text> */}
                {item.image && (
                  <Image source={{uri: item.image}} style={styles.image} />
                )}
              </>
            ) : (
              <>
                <Text style={styles.title}>{item.position}</Text>
                <Text>{item.company}</Text>
                <Text>
                  {item.work_month} {item.work_year}
                </Text>
                <Text>{item.description}</Text>
              </>
            )}
          </View>
        )}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setActiveTab('portfolio')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'portfolio' && styles.activeTabText,
            ]}>
            Portfolio
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('experience')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'experience' && styles.activeTabText,
            ]}>
            Experience
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.separator} />

      <View style={styles.contentContainer}>{renderTabContent()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tabText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#9EA0A5',
  },
  activeTabText: {
    color: 'black',
  },
  separator: {
    height: 1,
    backgroundColor: '#DFDFDF',
    marginVertical: 20,
  },
  contentContainer: {
    paddingHorizontal: 24,
  },
  item: {
    marginBottom: 20,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default PortofolioTab;
