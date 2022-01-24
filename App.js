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
