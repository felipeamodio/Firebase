//!anotações das primeiras aulas

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

  //! anotações segunda aula
  //criando um nó
      await firebase.database().ref('tipo').set('Vendedor'); 

      //removendo um nó
      await firebase.database().ref('tipo').remove();

      //inserindo um usuário novo dentro de cada child
      await firebase.database().ref('usuarios').child(3).set({
        nome: 'Tony',
        idade: 2
      })

      //não gerar conflito ao atualizar um campo e o outro não
      await firebase.database().ref('usuarios').child(3).update({
        idade: 1.9 
      })

      //!resumão de tudo feito até agora

      import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import firebase from './src/firebaseConnection'; 
import Listagem from './src/Listagem';

export default function App() {
  const [nome, setNome] = useState('Carregando...');
  const [userNome, setUserNome] = useState('');
  const [userIdade, setUserIdade] = useState('');
  const [cargo, setCargo] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //o firebase é algo assincrono e por isso pede uma requisição async
    async function dados(){
      await firebase.database().ref('usuarios').on('value', (snapshot) => {
        setUsuarios([]);
        snapshot.forEach((childItem) =>  {
          let data = {
            key: childItem.key,
            nome: childItem.val().userNome,
            cargo: childItem.val().cargo
          }
          setUsuarios(oldArray => [...oldArray, data].reverse())
        })
        setLoading(false);
      })
    }

    dados();
    // dadosNome();
    // dadosIdade();
    // infosUser();

  }, []);

  async function cadastrar(){
    if(userNome !== '' & cargo !== ''){
      let usuarios = await firebase.database().ref('usuarios');
      let chave = usuarios.push().key;

      usuarios.child(chave).set({
        nome: userNome,
        cargo: cargo
      })
    }

    alert('Cadastrado com sucesso')
    setCargo('');
    setUserNome('');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.texto}>Nome:</Text>
      <TextInput 
        style={styles.input}
        onChangeText={(texto) => setUserNome(texto)}
        value={userNome}
      />

      <Text style={[styles.texto, {marginTop: 40}]}>Cargo:</Text>
      <TextInput 
        style={styles.input}
        onChangeText={(texto) => setCargo(texto)}
        value={cargo}
      />

      <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={cadastrar}>
        <Text style={styles.textButton}>Novo Funcionário</Text>
      </TouchableOpacity>

        {loading ? (
          <ActivityIndicator color='#121212' size={45} />
        ) :
        ( <FlatList 
            keyExtractor={item => item.key}
            data={usuarios}
            renderItem={({item}) => ( <Listagem data={item} /> )}
          />
        )
        }
    </SafeAreaView>
  );
}

//! sistema de cadastro

import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import firebase from './src/firebaseConnection'; 

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  async function cadastrar(){
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((value) => {
      alert('Usuário criado: ' + value.user.email)
    })
    .catch((error) => {
      if(error.code === 'auth/weak-password'){
        alert('Sua senha deve ter pelo menos 6 caracteres')
        return;
      }
      if(error.code === 'auth/invalid-email'){
        alert('Email inválido')
        return;
      }else{
        alert('Ops, algo deu errado')
        return;
      }
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

      <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={cadastrar}>
        <Text style={styles.textButton}>Cadastrar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

