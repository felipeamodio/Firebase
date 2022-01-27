import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import firebase from '../../firebaseConnection'; 
import {useNavigation} from '@react-navigation/native';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const navigation = useNavigation();
  

  async function logar(){
    await firebase.auth().signInWithEmailAndPassword(email, password)
    .then((value) => {
      navigation.navigate('Home')
      setUser(value.user.email)
    })
    .catch((error) => {
      alert('Ops, algo deu errado')
      return;
    })
    setEmail('');
    setPassword('');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.texto}>Email:</Text>
      <TextInput 
        style={styles.input}
        onChangeText={(texto) => setEmail(texto)}
        value={email}
        
      />

      <Text style={[styles.texto, {marginTop: 40}]}>Senha:</Text>
      <TextInput 
        style={styles.input}
        onChangeText={(texto) => setPassword(texto)}
        value={password}
      />

      <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={logar}>
        <Text style={styles.textButton}>Acessar</Text>
      </TouchableOpacity>

      <Text style={{fontSize: 20, marginTop: 20, textAlign: 'center'}}>{user}</Text>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20
  },
  texto: {
    fontSize: 24,
    fontWeight: '800'
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 0.8,
    borderColor: '#121212',
    borderRadius: 8,
    marginTop: 15,
    height: 45,
    fontSize: 17
  },
  button: {
    backgroundColor: '#0000FF',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 50
  },
  textButton: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold'
  }
});
