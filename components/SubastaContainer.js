import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { useFonts } from 'expo-font'
import { useNavigation } from '@react-navigation/native';

const SubastaContainer = ({nombre, tiempo, oferta, imageSource}) => {

    return (
        <TouchableOpacity style={styles.containerPrincipal}>

            <View style={styles.containerSecundario}>
                {imageSource && (<Image source={imageSource} style={styles.image}/>)}

                <View>
                    <Text style={styles.titulo}>{nombre}</Text>
                    <Text style={styles.subtitulo}>Oferta Actual: ${oferta} MXN</Text>
                    <Text style={styles.subtitulo}>Tiempo Restante: {tiempo}</Text>
                </View>
            </View>
            
        </TouchableOpacity>
    )
}

export default SubastaContainer

const styles = StyleSheet.create({

    containerPrincipal: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        height: 70,
        padding: 20,
        backgroundColor: '#FFF9F9',
        borderRadius: 20,
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)',
        alignSelf: 'center',
        margin: 5
        
    },
    containerSecundario:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    image:{
        width: 45,
        height: 45,
        borderRadius: 100
    },
    titulo:{
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20,
        color: '#1A1A1A'
    },
    subtitulo:{
        fontSize: 11,
        marginLeft: 20,
        color: '#1a1a1a'
    },
    eliminarBtn:{
        width: 50,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#E3298F',
        justifyContent: 'center',
        alignItems: 'center'
    }
    

});
