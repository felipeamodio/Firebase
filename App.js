import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from './src/firebaseConnection'; 

export default function App() {
  const [nome, setNome] = useState('Carregando...');
  const [userNome, setUserNome] = useState('Carregando...');
  const [userIdade, setUserIdade] = useState('Carregando...');

  useEffect(() => {
    //o firebase é algo assincrono e por isso pede uma requisição async
    async function dados(){
      await firebase.database().ref('nome').on('value', (snapshot) => {
        setNome(snapshot.val());
      })
    }

    async function dadosNome(){
      await firebase.database().ref('usuarios/2/nome').on('value', (snapshot) => {
        setUserNome(snapshot.val());
      })
    }

    async function dadosIdade(){
      await firebase.database().ref('usuarios/2/idade').on('value', (snapshot) => {
        setUserIdade(snapshot.val());
      })
    }

    //poderia fazer assim pra puxar todos os childs
    async function infosUser(){
      await firebase.database().ref('usuarios/1').on('value', (snapshot) => {
        setUserNome(snapshot.val().nome);
        setUserIdade(snapshot.val().idade);
      })
    }

    dados();
    dadosNome();
    dadosIdade();
    // infosUser();

  }, []);

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 25}}>Olá, {nome}</Text>
      <Text style={{fontSize: 25, marginTop: 40}}>Nome: {userNome}</Text>
      <Text style={{fontSize: 25, marginTop: 15}}>Idade: {userIdade}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
