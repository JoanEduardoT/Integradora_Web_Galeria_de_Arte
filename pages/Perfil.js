import React from 'react'
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity} from 'react-native'
import Navbar from '../components/Navbar'
import { useNavigation } from '@react-navigation/native'

const Perfil = () => {

    const navigation = useNavigation()

    return (
        <View style={{flex:1}}>
            <Navbar/>
            
            <ScrollView style={styles.scroll}>
                <Text style={styles.tituloBold}>MI PERFIL</Text>

                <View style={styles.botonContainer}>
                    <TouchableOpacity style={styles.botonEditar}>
                        <Text style={styles.textoBtn}>Editar Perfil</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.botonCerrar} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.textoBtn}>Cerrar Sesion</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.perfilContainer}>
                    <Image style={styles.image} source={require('../assets/icon.png')} />

                    
                    <View style={{width: '100%', flexDirection: 'row', alignItems: 'flex-start'}}>

                    
                    <View style={{width: '60%'}}>
                        <Text style={styles.nombreUsuario}>
                            Nombre Usuario
                        </Text>

                        <View style={styles.containerDescripcion}>
                            <Text style={styles.descripcion}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc euismod tincidunt nisi posuere molestie. Duis maximus, nunc non fringilla convallis, erat erat consectetur nisi, at malesuada massa erat nec diam. Donec vel lectus facilisis, scelerisque nibh eget, ornare dui. Nam porta, ante eget tempor vestibulum, sapien risus euismod augue, feugiat ullamcorper turpis lacus vel enim.
                            </Text>
                        </View>
                        
                    </View>

                    <View style={{width: '20%'}}>
                        <Text style={styles.informacionTitulo}>
                            Informacion
                        </Text>
                        <Text style={styles.informacion}>
                            • San Luis Rio Colorado
                        </Text>
                        <Text style={styles.informacion}>
                            • 10-05-2002
                        </Text>
                        
                    </View>

                    </View>


                </View>
            </ScrollView>

        </View>
    )
}

export default Perfil

const styles = StyleSheet.create({ 
    tituloBold: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: '8%',
        marginTop: 30,
        color: '#1A1A1A'
    },   
    scroll:{
        width: '100%', // Asegura que el ScrollView ocupe todo el ancho
        height: '100vh', // Usa el 100% de la altura de la ventana para que se active el scroll
        backgroundColor: '#fffff3',
        paddingBottom: '15%',  // Ajusta el padding al final si es necesario
        overflowY: 'auto',
    },
    botonContainer:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '80%',
        alignSelf: 'center'
    },
    botonEditar:{
        marginHorizontal: 5,
        width: '20vh',
        height: 40,
        backgroundColor: '#446e3e',
        borderRadius: 10,
        boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    botonCerrar:{
        width: '20vh',
        height: 40,
        backgroundColor: '#e3298f',
        borderRadius: 10,
        boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textoBtn:{
        fontSize: 15,
        color: '#FFFFF3'
    },
    perfilContainer:{
        width: '80%',
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',

    },
    image:{
        width: '30vh',
        height: '30vh',
        borderRadius: 100,
        marginTop: '5vh'
    },
    nombreUsuario:{
        marginLeft: '5vh',
        fontSize: 30,
        fontWeight: 'bold',
        color: '#1a1a1a'
    },
    containerDescripcion:{
        width: '80%',
        height: 'auto',
        marginLeft: '5vh',
    },
    descripcion:{
        fontSize: 15,
        color: '#1a1a1a'
    },
    informacionTitulo:{
        fontSize: 30,
        fontWeight: 'bold',
        color: '#634455'
    },
    informacion:{
        fontSize: 15,
        color: '#634455'
    }
});