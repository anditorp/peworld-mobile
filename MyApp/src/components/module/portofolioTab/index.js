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
import {useNavigation} from '@react-navigation/native';
import Svg, {Path} from 'react-native-svg';

const PortofolioTab = () => {
  const navigation = useNavigation();
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

    const navigateToAddPortfolio = () => {
      navigation.navigate('EditPortfolioScreen');
    };

    const DeleteIcon = () => (
      <Svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <Path d="M18 6L6 18M6 6l12 12" />
      </Svg>
    );

    const handleDeletePortfolio = async portfolioId => {
      try {
        const token = await AsyncStorage.getItem('token');
        await axios.delete(
          `https://peworld-be-three.vercel.app/portofolio/${portfolioId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        // After successful deletion, update the state or re-fetch data
        const updatedPortfolioData = portfolioData.filter(
          item => item.id !== portfolioId,
        );
        setPortfolioData(updatedPortfolioData);
        Alert.alert('Success', 'Portfolio deleted successfully.');
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to delete portfolio.');
      }
    };

    const handleDeleteExperience = async experienceId => {
      try {
        const token = await AsyncStorage.getItem('token');
        await axios.delete(
          `https://peworld-be-three.vercel.app/experience/${experienceId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        // After successful deletion, update the state or re-fetch data
        const updatedExperienceData = experienceData.filter(
          item => item.id !== experienceId,
        );
        setExperienceData(updatedExperienceData);
        Alert.alert('Success', 'Experience deleted successfully.');
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to delete experience.');
      }
    };

    return (
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.item}>
            {activeTab === 'portfolio' ? (
              <>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    paddingLeft: 300,
                  }}
                  onPress={() => handleDeletePortfolio(item.id)}>
                  <DeleteIcon />
                </TouchableOpacity>
                {item.image && (
                  <Image source={{uri: item.image}} style={styles.image} />
                )}
              </>
            ) : (
              <>
                <View>
                  <Text style={styles.title}>
                    {item.position}
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        paddingLeft: 250,
                      }}
                      onPress={() => handleDeleteExperience(item.id)}>
                      <DeleteIcon />
                    </TouchableOpacity>
                  </Text>
                  <Text>{item.company}</Text>
                  <Text>
                    {item.work_year} {item.work_month}
                  </Text>
                  <Text>{item.description}</Text>
                </View>
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
      <TouchableOpacity
        style={{marginHorizontal: 100, marginBottom: 5, alignItems: 'center'}}
        onPress={() => navigation.navigate('EditPortfolioScreen')}>
        <Text style={styles.link}>Add Portfolio</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{marginHorizontal: 100, alignItems: 'center'}}
        onPress={() => navigation.navigate('EditExperienceScreen')}>
        <Text style={styles.link}>Add Experience</Text>
      </TouchableOpacity>
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
    alignItems: 'start',
    marginHorizontal: 10,
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: 'white',
    backgroundColor: '#5E50A1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default PortofolioTab;
