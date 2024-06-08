import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Input, Button} from '../../components/index';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleButtonPress = () => {
    navigation.navigate('MainTab');
  };

  const handleRegisterPress = () => {
    navigation.navigate('Register');
  };

  const handleResetPasswordPress = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.image}>
          <Image source={require('../../../assets/logoAuth.png')} />
        </View>
        <View style={styles.header}>
          <Text style={styles.h1}>Login</Text>
          <Text style={styles.h2}>Lorom ipsum dolor si amet uegas anet.</Text>
        </View>
        <View style={styles.content}>
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Masukan alamat email"
            keyboardType="default"
          />
          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Masukan kata sandi"
            keyboardType="default"
            secureTextEntry
          />
        </View>
        <View style={styles.forgetPassword}>
          <TouchableOpacity onPress={handleResetPasswordPress}>
            <Text style={styles.p}>Lupa kata sandi?</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Button title="Masuk" onPress={handleButtonPress}></Button>
        </View>
        <View style={styles.register}>
          <Text>Anda belum punya akun?</Text>
          <TouchableOpacity onPress={handleRegisterPress}>
            <Text style={styles.linkRegister}>Daftar disini</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7F8',
  },
  scrollViewContent: {
    padding: 16,
  },
  content: {
    marginBottom: 5,
  },
  header: {
    marginBottom: 50,
  },
  forgetPassword: {
    flex: 1,
    alignItems: 'flex-end',
  },
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#46505C',
  },
  h2: {
    fontSize: 14,
    marginTop: 10,
  },
  p: {
    color: '#1F2A36',
    marginBottom: 25,
  },
  register: {
    marginTop: 20,
    flexDirection: 'row',
    gap: 5,
  },
  linkRegister: {
    color: '#FBB017',
  },
  image: {
    marginBottom: 35,
  },
});
