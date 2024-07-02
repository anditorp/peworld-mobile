import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Button} from '../../components/index';
import {useNavigation} from '@react-navigation/native';

const OptionLogin = () => {
  const navigation = useNavigation();

  const handleButtonWorkerPress = () => {
    navigation.navigate('LoginWorker');
  };
  const handleButtonRecruiterPress = () => {
    navigation.navigate('LoginWorker');
  };

  return (
    <ImageBackground
      source={require('../../../assets/option-login.png')}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.contentWrapper}>
          <View style={styles.headerWrapper}>
            <Image
              source={require('../../../assets/logo-option.png')}
              style={styles.image}
            />
            <Text style={styles.header}>
              Find talented & best developers in various areas of expertise
            </Text>
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              title={'Login as worker'}
              onPress={handleButtonWorkerPress}
              styleButton={{
                backgroundColor: '#FFF',
              }}
              styleText={{color: '#5E50A1'}}
            />
            <Text
              style={{
                alignSelf: 'center',
                marginVertical: 10,
                fontSize: 19,
                fontWeight: 500,
                color: '#FFF',
              }}>
              or
            </Text>
            <Button
              title={'Login as recruiter'}
              onPress={handleButtonRecruiterPress}
              styleButton={{
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderWidth: 1,
                borderColor: '#FFF',
              }}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default OptionLogin;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(94, 80, 161, 0.7)',
  },
  contentWrapper: {
    marginHorizontal: 20,
  },
  image: {
    marginTop: 40,
  },
  header: {
    fontSize: 34,
    fontWeight: '700',
    lineHeight: 44,
    color: '#FFF',
    marginTop: 250,
  },
  buttonWrapper: {
    marginTop: 200,
    alignContent: 'center',
  },
});
