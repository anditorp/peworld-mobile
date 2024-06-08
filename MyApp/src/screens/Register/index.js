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

export default function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [validatePassword, setValidatePassword] = useState('');
  const navigation = useNavigation();

  const handleButtonPress = () => {
    navigation.navigate('Login');
  };

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.image}>
          <Image source={require('../../../assets/logoAuth.png')} />
        </View>
        <View style={styles.header}>
          <Text style={styles.h1}>Signup</Text>
          <Text style={styles.h2}>Lorom ipsum dolor si amet uegas anet.</Text>
        </View>
        <View style={styles.content}>
          <Input
            label="Nama"
            value={name}
            onChangeText={setName}
            placeholder="Masukan nama panjang"
            keyboardType="default"
          />
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Masukan alamat email"
            keyboardType="default"
          />
          <Input
            label="No handphone"
            value={phone}
            onChangeText={setPhone}
            placeholder="Masukan np handphone"
            keyboardType="numeric"
          />
          <Input
            label="Kata sandi"
            value={password}
            onChangeText={setPassword}
            placeholder="Masukan kata sandi"
            keyboardType="default"
            secureTextEntry
          />
          <Input
            label="Konfirmasi kata sandi"
            value={validatePassword}
            onChangeText={setValidatePassword}
            placeholder="Masukan Konfirmasi kata sandi"
            keyboardType="default"
            secureTextEntry
          />
        </View>
        <View>
          <Button
            style={{marginTop: 35}}
            title="Daftar"
            onPress={handleButtonPress}></Button>
        </View>
        <View style={styles.login}>
          <Text>Anda sudah punya akun?</Text>
          <TouchableOpacity onPress={handleLoginPress}>
            <Text style={styles.linkLogin}>Masuk disini</Text>
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
  login: {
    marginTop: 20,
    flexDirection: 'row',
    gap: 5,
  },
  linkLogin: {
    color: '#FBB017',
  },
  image: {
    marginBottom: 35,
  },
});
