import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import Navbar from '../components/Navbar'
import { useFonts } from 'expo-font'
import ProductContainer from '../components/ProductContainer'
import { TextInput } from 'react-native-web'
import { useState } from 'react'

//iconos
import Feather from '@expo/vector-icons/Feather';
import SubastaList from '../components/SubastaList';

const Subastas = () => {

    //Fuentes Personalizadas
        const [fontsLoaded] = useFonts({
            MadeTommy: require('../assets/fonts/MADE TOMMY Regular_PERSONAL USE.otf'),
            MadeTommyBold: require('../assets/fonts/MADE TOMMY Bold_PERSONAL USE.otf'),
            MalgunGothic: require('../assets/fonts/malgun-gothic.ttf'),
        });

    /* Codigo para cargar imagen */
    const [image, setImage] = useState('')

    const handleImagePickerPress = async() => {
        let result = await ImagePicker.launchImageLibraryAsync({
        quality: 1,})

        if (!result.canceled){
            setImage(result.assets[0].uri)
        }
    }

    return (
        <View style={{flex:1}}>
            <Navbar/>

            <ScrollView style={styles.scroll}>
                    <Text style={styles.tituloBold}>CREAR SUBASTAS</Text>

                    <View style={styles.containerForm}>
                        <View>
                            <View style={styles.inputGroup}>
                                <TextInput style={styles.input} placeholder='Nombre'/>
                                <TextInput style={styles.input} placeholder='Precio'/>
                                <TextInput style={styles.input} placeholder='Tiempo'/>
                            </View>

                            <TextInput multiline={true} style={styles.inputDescripcion} placeholder='Descripcion'/>                      
                        </View>

                        <View>
                            <TouchableOpacity style={styles.imagePickerBtn}>
                                <Feather name="upload" size={24} color="black" />
                                <Text>Cargar Imagen</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.boton}>
                        <Text style={styles.textoBtn}>Crear Subasta</Text>
                    </TouchableOpacity>

                    <Text style={styles.tituloBold}>MIS SUBASTAS</Text>

                    
                    <View style={{marginVertical: '5vh'}}>

                        <SubastaList nombre={'Nombre Subasta'} precio={300} tiempo={'10:00:22'} imageSource={require('../assets/producto3.jpg')}
                                                descripcion={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '}/>

                        <SubastaList nombre={'Nombre Subasta'} precio={300} tiempo={'22:10:12'} imageSource={require('../assets/producto.jpg')}
                                                descripcion={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '}/>

                        <SubastaList nombre={'Nombre Subasta'} precio={300} tiempo={'05:22'} imageSource={require('../assets/producto2.jpeg')}
                                                descripcion={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '}/>

                        <SubastaList nombre={'Nombre Subasta'} precio={300} tiempo={"09:16"} imageSource={require('../assets/producto4.jpg')}
                                                descripcion={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '}/>
                    </View>
                    

                    
                
            </ScrollView>
            
        </View>
    )
}

export default Subastas

const styles = StyleSheet.create({
    scroll:{
        width: '100%', // Asegura que el ScrollView ocupe todo el ancho
        height: '100vh', // Usa el 100% de la altura de la ventana para que se active el scroll
        backgroundColor: '#fffff3',
        paddingBottom: '15%',  // Ajusta el padding al final si es necesario
        overflowY: 'auto',
    },
    tituloBold: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: '8%',
        marginTop: 30,
        color: '#1A1A1A'
    },
    containerForm:{
        width: '80%',
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: '5vh',
        backgroundColor: '#FFF9F9',
        padding: 30,
        borderRadius: 50,
        boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.3)',

    },
    inputGroup:{
        flexDirection: 'row',
        justifyContent: 'space-between'
        
    },
    input:{
        backgroundColor: '#e9e9e9',
        width: '30%',
        height: 60,
        paddingHorizontal: 20,
        marginBottom: 20,
        borderRadius: 10,
        boxShadow: 'inset 0px 1px 2px rgba(0, 0, 0, 0.3)',
    },
    inputDescripcion:{
        padding: 10,
        backgroundColor: '#e9e9e9',
        width: '100%',
        height: 100,
        paddingHorizontal: 20,
        marginRight: 20,
        borderRadius:10,
        boxShadow: 'inset 0px 1px 2px rgba(0, 0, 0, 0.3)', 
    },
    imagePickerBtn:{
        padding: 10,
        backgroundColor: '#e9e9e9',
        width: '100%',
        height: 180,
        paddingHorizontal: 20,
        marginHorizontal: 20,
        borderRadius:10,
        boxShadow: 'inset 0px 1px 2px rgba(0, 0, 0, 0.3)',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    boton:{
        marginTop: 5,
        width: '20vh',
        height: 50,
        backgroundColor: '#e3298f',
        borderRadius: 10,
        boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    textoBtn:{
        fontSize: 15,
        color: '#FFFFF3'
    }
})

