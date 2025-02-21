import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { useFonts } from 'expo-font'

const VentaContainer = ({nombre, cantidad, imageSource}) => {

    //Fuentes Personalizadas
        const [fontsLoaded] = useFonts({
            MadeTommy: require('../assets/fonts/MADE TOMMY Regular_PERSONAL USE.otf'),
            MadeTommyBold: require('../assets/fonts/MADE TOMMY Bold_PERSONAL USE.otf'),
            MalgunGothic: require('../assets/fonts/malgun-gothic.ttf'),
        });

    return (
        <TouchableOpacity style={styles.containerPrincipal}>

            <View style={styles.containerSecundario}>
                {imageSource && (<Image source={imageSource} style={styles.image}/>)}

                <View>
                    <Text style={styles.titulo}>{nombre}</Text>
                    <Text style={styles.cantidad}>Cantidad: {cantidad}</Text>
                </View>
            </View>
            
        </TouchableOpacity>
    )
}

export default VentaContainer

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
    cantidad:{
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
