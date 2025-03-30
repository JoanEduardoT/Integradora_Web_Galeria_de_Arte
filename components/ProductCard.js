import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

//iconos
import Feather from '@expo/vector-icons/Feather';

const ProductCard = ({nombre, precio, cantidad, categoria, imageSource, onDelete}) => {
    console.log(ProductCard)

    return (
        <View style={styles.cardbody}>
            
            {imageSource && (
                <View style={{height: '55%'}}>
                    <Image source={ imageSource } style={styles.image} />
                </View>
            )}

            <Text style={styles.nombre}>{nombre}</Text>

            <Text style={styles.detalles}>Precio: ${precio} MXN</Text>
            <Text style={styles.detalles}>Categoria: {categoria}</Text>

            <TouchableOpacity style={styles.boton} onPress={onDelete}>
                <Text style={styles.textoBtn}>Eliminar Producto</Text>
                <Feather name="trash-2" size={15} color="#FFFFF3" />
            </TouchableOpacity>
            
        </View>
    )
}

export default ProductCard

const styles = StyleSheet.create({
    cardbody: {
        height: 380,
        width: '24%',
        margin: 6,
        backgroundColor: '#FFF9F9',
        borderRadius: 20,
        boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.3)',
    },
    image: {
        flex: 1,
        width: '90%',
        marginHorizontal: 15,
        marginTop: 15,
        marginBottom: 10,
        borderRadius: 10,
        alignSelf: 'center'
    },
    nombre: {
        fontWeight: 'bold',
        fontSize: 20,
        alignSelf: 'center',
        color: '#1A1A1A',
        marginBottom: 10,
    },
    contenedor: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 15
    },
    detalles: {
        marginLeft: 20,
        fontSize: 15,
    },
    boton: {
        flexDirection: 'row',
        width: '80%',
        height: 35,
        marginTop: 20,
        backgroundColor: '#E3289F',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    textoBtn: {
        fontSize: 15,
        color: '#fffff3',
        fontWeight: 'bold',
        marginRight: 5
    }
})
