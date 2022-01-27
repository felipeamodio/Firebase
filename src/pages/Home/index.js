import React, {useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import firebase from '../../firebaseConnection';

export default function Home(){
  const [user, setUser] = useState('');
  const navigation = useNavigation();

    async function logout(){
        await firebase.auth().signOut();
        setUser(navigation.navigate('Home'));
      }

    return(
        <SafeAreaView>
            <Text style={{fontSize: 20, padding: 15}}>Bem-vindo,</Text>
            <Text style={{fontSize: 16, padding: 14}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices ex felis, non imperdiet erat tempus vel. 
                Vivamus mi leo, ultrices eu arcu convallis, tristique venenatis massa. Nulla fringilla tincidunt neque, eget auctor
                massa blandit ac. Fusce risus odio, volutpat in venenatis sit amet, dictum pharetra lacus. Ut non nulla varius, 
                rutrum elit et, gravida quam. Curabitur faucibus mi quis libero tincidunt vehicula. Nunc et elit vestibulum leo 
                tempus vestibulum in vel tortor.
            </Text>

            <Text style={{fontSize: 16, padding: 14}}>
                Pellentesque lacinia congue mauris, nec tincidunt elit pharetra eu. Morbi a mauris ligula. Mauris fermentum et 
                ligula id euismod. Donec metus elit, venenatis sit amet tincidunt vel, pulvinar sit amet orci. Integer vehicula 
                eleifend pretium. Phasellus volutpat sollicitudin accumsan. Cras commodo ipsum id leo vehicula fringilla. Donec sit 
                amet commodo mi.
            </Text>

    {
      user.length > 0
      ?
      (
        <TouchableOpacity style={{backgroundColor: '#FF0000', 
        marginTop: 50, 
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8}} activeOpacity={0.7} onPress={logout}>
          <Text style={{color: '#FFFFFF', fontSize: 22, fontWeight: 'bold'}}>Logout</Text>
        </TouchableOpacity>
      )
      :
      (
        <TouchableOpacity style={{backgroundColor: '#FF0000', 
        marginTop: 50, 
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8}} activeOpacity={0.7} onPress={logout}>
            <Text style={{color: '#FFFFFF', fontSize: 22, fontWeight: 'bold'}}>Logout</Text>
        </TouchableOpacity>
      )
    }
        </SafeAreaView>
    )
}