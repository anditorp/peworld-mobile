import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Input, Button} from '../../components/index';
import axios from 'axios';

export default function RegisterWorker() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    validatePassword: '',
  });
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();

  const handleChange = (key, value) => {
    setForm({...form, [key]: value});
    if (errors[key]) {
      setErrors({...errors, [key]: ''});
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = 'Nama is required';
    if (!form.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!form.phone) {
      newErrors.phone = 'No handphone is required';
    } else if (!/^\d{10,}$/.test(form.phone)) {
      newErrors.phone = 'No handphone must be at least 10 digits';
    }
    if (!form.password) newErrors.password = 'Kata sandi is required';
    if (!form.validatePassword)
      newErrors.validatePassword = 'Konfirmasi kata sandi is required';
    if (
      form.password &&
      form.validatePassword &&
      form.password !== form.validatePassword
    ) {
      newErrors.validatePassword =
        'Password and confirmation password do not match';
    }
    return newErrors;
  };

  const handleButtonPress = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const errorMessages = Object.values(validationErrors).join('\n');
      Alert.alert('Validation Errors', errorMessages);
      return;
    }

    try {
      const res = await axios.post(
        'https://peworld-be-three.vercel.app/worker/register',
        // `${process.env.API_BACKEND}/worker/register`,
        form,
      );
      navigation.navigate('LoginWorker');
    } catch (error) {
      const messageErr = error.response?.data?.message;
      console.log(messageErr);
      Alert.alert(messageErr || 'An error occurred');
    }
  };

  const handleLoginPress = () => {
    navigation.navigate('LoginWorker');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.image}>
          <Image source={require('../../../assets/logoAuth.png')} />
        </View>
        <View style={styles.header}>
          <Text style={styles.h1}>Signup</Text>
        </View>
        <View style={styles.content}>
          <Input
            label="Nama"
            value={form.name}
            onChangeText={value => handleChange('name', value)}
            placeholder="Masukan nama panjang"
            keyboardType="default"
            errorMessage={errors.name}
          />
          <Input
            label="Email"
            value={form.email}
            onChangeText={value => handleChange('email', value)}
            placeholder="Masukan alamat email"
            keyboardType="default"
            errorMessage={errors.email}
          />
          <Input
            label="No handphone"
            value={form.phone}
            onChangeText={value => handleChange('phone', value)}
            placeholder="Masukan no handphone"
            keyboardType="numeric"
            errorMessage={errors.phone}
          />
          <Input
            label="Kata sandi"
            value={form.password}
            onChangeText={value => handleChange('password', value)}
            placeholder="Masukan kata sandi"
            keyboardType="default"
            secureTextEntry
            errorMessage={errors.password}
          />
          <Input
            label="Konfirmasi kata sandi"
            value={form.validatePassword}
            onChangeText={value => handleChange('validatePassword', value)}
            placeholder="Masukan konfirmasi kata sandi"
            keyboardType="default"
            secureTextEntry
            errorMessage={errors.validatePassword}
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
