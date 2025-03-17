import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'

//iconos
import Feather from '@expo/vector-icons/Feather';

const ProductList = ({nombre, precio, cantidad, descripcion, imageSource, onDelete}) => {

    return (
        <TouchableOpacity style={styles.containerPrincipal}>

            <View style={styles.containerSecundario}>
                {imageSource && (<Image source={{ uri: imageSource }} style={styles.image}/>)}

                <View>
                    <Text style={styles.titulo}>{nombre}</Text>
                    <Text style={styles.precio}>Precio: ${precio} MXN</Text>
                    <Text style={styles.cantidad}>Cantidad: {cantidad}</Text>

                    <Text style={styles.titulo2}>Descripcion</Text>
                    <View>
                        <Text style={styles.descripcion}>{descripcion}</Text>
                    </View> 
                    
                </View>
            </View>

            <TouchableOpacity style={styles.eliminarBtn} onPress={onDelete}>
                <Feather name="trash-2" size={30} color="#FFFFF3" />
            </TouchableOpacity>
            

        </TouchableOpacity>
    )
}

export default ProductList

const styles = StyleSheet.create({

    containerPrincipal: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '99%',
        height: 250,
        paddingHorizontal: 50,
        backgroundColor: '#FFF9F9',
        borderRadius: 50,
        boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.3)',
        alignSelf: 'center',
        margin: 10,
        
    },
    containerSecundario:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    image:{
        width: 170,
        height: 170,
        borderRadius: 100
    },
    titulo:{
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20,
        color: '#1A1A1A'
    },
    titulo2:{
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 20,
        color: '#1A1A1A'
    },
    cantidad:{
        fontSize: 15,
        marginLeft: 20,
        color: '#1a1a1a'
    },
    precio:{
        fontSize: 15,
        marginLeft: 20,
        color: '#1a1a1a'
    },
    descripcion:{
        fontSize: 15,
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
})
