import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'

//iconos
import Feather from '@expo/vector-icons/Feather';

const VentaList = ({nombre, cantidad, comprador, direccion, ciudad, imageSource}) => {

    return (
        <TouchableOpacity style={styles.containerPrincipal}>

            <View style={styles.containerSecundario}>
                {imageSource && (<Image source={imageSource} style={styles.image}/>)}

                <View>
                    <Text style={styles.titulo}>{nombre}</Text>
                    <Text style={styles.cantidad}>Cantidad: {cantidad}</Text>

                    <Text style={styles.titulo2}>Informacion</Text>
                    <View>
                        <Text style={styles.informacion}>Comprado por {comprador} de {ciudad} localizado en {direccion}</Text>
                    </View> 
                    
                </View>
            </View>

            <TouchableOpacity style={styles.eliminarBtn}>
                <Feather name="trash-2" size={30} color="#FFFFF3" />
            </TouchableOpacity>
            

        </TouchableOpacity>
    )
}

export default VentaList

const styles = StyleSheet.create({

    containerPrincipal: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%',
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
    informacion:{
        fontSize: 15,
        marginLeft: 20,
        color: '#1a1a1a'
    }

})