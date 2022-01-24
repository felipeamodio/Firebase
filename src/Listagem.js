import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function Listagem({data}){
    return(
        <View style={styles.container}>
            <Text style={styles.texto}>{data.userNome}</Text>
            <Text style={styles.texto}>{data.cargo}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
        marginBottom: 5,
        padding: 10,
        backgroundColor: '#121212'
    },
    texto: {
        color: '#FFFFFF',
        fontSize: 20
    }
})