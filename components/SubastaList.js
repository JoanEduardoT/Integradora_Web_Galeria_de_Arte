import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'

//iconos
import Feather from '@expo/vector-icons/Feather';

const SubastaList = ({nombre, precio, tiempo, descripcion, imageSource, onDelete}) => {

    return (
        <View style={styles.containerPrincipal}>

            <View style={styles.containerSecundario}>
                {imageSource && (<Image source={imageSource} style={styles.image}/>)}

                <View style={{ width: '95%'}}>
                    <Text style={styles.titulo}>{nombre}</Text>
                    <Text style={styles.precio}>Oferta Actual: ${precio} MXN</Text>
                    <Text style={styles.tiempo}>Vencimiento: {tiempo}</Text>

                    <Text style={styles.titulo2}>Descripcion</Text>
                    <View >
                        <Text style={styles.descripcion}>{descripcion}</Text>
                    </View> 
                    
                </View>

                
            </View>

            <TouchableOpacity style={styles.eliminarBtn} onPress={onDelete}>
                    <Feather name="trash-2" size={30} color="#FFFFF3" />
                </TouchableOpacity>
            

        </View>
    )
}

export default SubastaList

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
        alignItems: 'center',
        width: '80%',
        
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
    tiempo:{
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
